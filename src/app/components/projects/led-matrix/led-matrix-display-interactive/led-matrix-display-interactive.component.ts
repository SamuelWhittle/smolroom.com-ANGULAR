import { Component, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LEDMatrixService } from '../../../../services/led-matrix.service';

import { Color } from '../../../../classes/Color';

@Component({
  selector: 'led-matrix-display-interactive',
  templateUrl: './led-matrix-display-interactive.component.html',
  styleUrls: ['./led-matrix-display-interactive.component.css'],
  providers: [ LEDMatrixService ]
})
export class LedMatrixDisplayInteractiveComponent implements AfterViewInit {
    // main div reference, used for most events
    @ViewChild('divGrid') divGrid: ElementRef;
    // QueryList of the rest of the divs used to display color, one of these will be returned when the mouse position is used to get a div
    @ViewChildren('colorDiv') colorDivsQueryList: QueryList<ElementRef>;

    // control over the Controls Div
    @ViewChild('controls') controls: ElementRef;

    // Listen fot keyup for esc
    @HostListener('window:keyup', ['$event']) keyUp(event: KeyboardEvent) {
        switch(event.keyCode) {
            case 27:
                this.toggleControls();
                break;
        }
    }

    // Listen for keypress for typing
    @HostListener('window:keypress', ['$event']) keyPress(event: KeyboardEvent) {
        switch(event.keyCode) {
            case 13:
                this.processKeyStrokes();
                break;
            default:
                this.keyStrokes.push(event.keyCode);
                break;
        }
    }

    @HostListener('window:mouseup', []) windowOnMouseup() {
        this.mouseup();
    }

    @HostListener('window:touchend', []) windowOnTouchend() {
        this.touchend();
    }

    // 900 colors coresponding to the 30x30 grid
    public colors: Color[] = new Array(900).fill(new Color()).map((_, index) => new Color(255, 128, 0, 0, `${index}`));
    // Array used to save the ElementRefs from the QueryList
    public colorDivsArray: ElementRef[];

    // are they clicking?
    public mouseIsDown: boolean = false;

    // draw with this color
    public currentColor: Color = new Color(255, 128, 0);

    // subscription used to listen for the service to push a new frame/picture/array of 3600 numbers
    private stateSubscription: any;

    // The interval at which this script will ping the server for updates
    private updateInterval: number;

    // are the controls visible?
    public controlsVisible: boolean = false;

    // Command Line Variables
    // array of keyStroke IDs
    private keyStrokes: number[] = new Array();
    private commandMatch: RegExp = /white|off/g;

    constructor( @Inject(DOCUMENT) private document, private ledMatrixService: LEDMatrixService ) {
        this.stateSubscription = ledMatrixService.receivedState.subscribe((value) => this.receivedState(value));
    }

    ngAfterViewInit(): void {
        this.colorDivsArray = this.colorDivsQueryList.toArray();
        this.applyGridToDivs(this.colorDivsArray);
        this.main();
    }

    main() {
        this.updateInterval = setInterval(() => this.ledMatrixService.getPicture(), 1000/24);
    }

    // pass in an array of ElementRefs and the function wil move them to the correct locations
    applyGridToDivs(divs: ElementRef[]) {
        divs.map((div, index) => {
            let dims: number[] = this.oneDimIndexToTwoDim(index, 30);
            div.nativeElement.style.gridColumn = dims[0] + 1;
            div.nativeElement.style.gridRow = dims[1] + 1;
        });
    }

    receivedState(state: number[]) {
        for( let colorsIndex = 0; colorsIndex < 900; colorsIndex ++ ) {
            for( let rgbaIndex = 0; rgbaIndex < 4; rgbaIndex ++ ){
                this.colors[colorsIndex].rgb[rgbaIndex] = state[ ( colorsIndex * 4 ) + rgbaIndex ];
            }
        }
    }

    //Toggle controls visibility
    toggleControls() {
        if(this.controlsVisible) {
            this.controlsVisible = false;
        } else {
            this.controlsVisible = true;
        }
        this.controls.nativeElement.setAttribute('data-visible', this.controlsVisible);
    }

    // given a single dimensional index and the length of the second dimension, return the equivalent two dimensional index
    oneDimIndexToTwoDim(oneDimIndex: number, secondDimLength: number) {
        return [Math.floor(oneDimIndex / secondDimLength), oneDimIndex % secondDimLength];
    }

    // given a first and second dimension index and the length of the second dimension, return the equivalent single dimensional index
    twoDimIndexToOneDim(firstDimIndex: number, secondDimIndex: number, secondDimLength: number) {
        return ( firstDimIndex * secondDimLength ) + secondDimIndex;
    }

    // mouse down
    mousedown(event: any) {
        this.mouseIsDown = true;
        this.canvasDrag(event);
    }

    // mouse move
    mousemove(event: any) {
        if (this.mouseIsDown) {
            this.canvasDrag(event);
        }
    }

    // mouse up
    mouseup() {
        this.mouseIsDown = false;
    }

    // touch start
    touchstart(event: any) {
        var touch = event.touches[0];

        var mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.pageX,
            clientY: touch.pageY,
            buttons: 1
        });

        this.divGrid.nativeElement.dispatchEvent(mouseEvent);
    }

    // touch move
    touchmove(event: any) {
        var touch = event.touches[0];

        //var clientX = touch.clientX + canvas.offsetLeft;
        //var clientY = touch.clientY;

        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.pageX,
            clientY: touch.pageY,
            buttons: 1
        });

        this.divGrid.nativeElement.dispatchEvent(mouseEvent);
    }

    // touch end
    touchend() {
        //var mouseEvent = new MouseEvent("mouseup", {});
        //window.dispatchEvent(mouseEvent);
        this.mouseIsDown = false;
    }

    // Block the default right click behavior
    contextmenu(event: any) {
        event.preventDefault();
    }

    // get mouse location and change colors accordingly
    canvasDrag(event: any) {
        let selectedDiv: HTMLElement = (document.elementFromPoint(event.clientX, event.clientY) as HTMLElement);
        let singleDimIndex : number = parseInt(selectedDiv.id);
        this.ledMatrixService.setPixel(singleDimIndex, (event.buttons === 1) ? this.currentColor : new Color(0, 0, 0));
    }

    // set all to black
    offButtonClick() {
        this.ledMatrixService.allOff();
    }

    // New color selected
    colorPickerNewColor(event: any) {
        let tempColor: Color = new Color();
        let tempRgbArray: number[] = tempColor.hexToRgbArray(event.srcElement.value);
        this.currentColor.update(new Color(tempRgbArray[0], tempRgbArray[1], tempRgbArray[2]));
        this.toggleControls();
    }

    // when an image is uploaded, process into frame buffer
    handleImgSubmit(event: Event) {
        //this.ledMatrixService.handleImgSubmit();
    }

    // Send frame in the buffer to the server
    sendFrameBuffer() {
        this.ledMatrixService.sendFrameBuffer();
    }

    // send noise loop to server
    sendNoise() {
        this.ledMatrixService.sendNoise();
    }

    // process keystroke history for valid commands
    processKeyStrokes() {
        let tempString = String.fromCharCode(...this.keyStrokes);
        let result = tempString.match(this.commandMatch);

        if(result !== null) {
            switch( result[ result.length - 1 ] ) {
                case 'white':
                    this.ledMatrixService.allOn(new Color(0, 0, 0, 255));
                break;
                case 'off':
                    this.ledMatrixService.allOff();
                break;
            }
        }

        this.keyStrokes = new Array();
    }
}