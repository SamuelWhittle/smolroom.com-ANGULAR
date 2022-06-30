import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bg-canvas',
  templateUrl: './bg-canvas.component.html',
  styleUrls: ['./bg-canvas.component.css']
})
export class BgCanvasComponent implements AfterViewInit {
    // Angular DOM access creates an ELementRef
    @ViewChild('bgCanvas') bgCanvas: ElementRef<HTMLCanvasElement>;

    // Will be used later to store canvas context
    private ctx: CanvasRenderingContext2D;

    // last mouse coords
    private mouse: [number, number] = [0, 0];

    ngAfterViewInit(): void {
        this.ctx = this.bgCanvas.nativeElement.getContext('2d');
        this.restartBackground();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.restartBackground();
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event) {
        if(!(this.mouse[0] == 0 && this.mouse[1] == 0)) {
            this.ctx.strokeStyle = '#202030';
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse[0], this.mouse[1]);
            this.ctx.lineTo(event.clientX, event.clientY);
            this.ctx.stroke();
        }

        this.mouse[0] = event.clientX;
        this.mouse[1] = event.clientY;
    }

    restartBackground() { 
        this.bgCanvas.nativeElement.width = window.innerWidth;
        this.bgCanvas.nativeElement.height = window.innerHeight;

        this.ctx.fillStyle = '#16161d';
        this.ctx.beginPath();
        this.ctx.fillRect(0, 0, this.bgCanvas.nativeElement.width, this.bgCanvas.nativeElement.height);
        this.ctx.stroke();

        this.mouse = [0, 0];
    }
}
