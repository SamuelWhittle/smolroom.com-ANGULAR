import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainHeaderComponent } from './components/main-header/main-header.component';
import { LowProfileHeaderComponent } from './components/low-profile-header/low-profile-header.component';
import { BgCanvasComponent } from './components/bg-canvas/bg-canvas.component';
import { HamburgerButtonComponent } from './components/hamburger-button/hamburger-button.component';

import { ProjectsPageComponent } from './components/pages/projects-page/projects-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AboutComponent } from './components/pages/about/about.component';

import { DesatScaleComponent } from './components/projects/desat-scale/desat-scale.component';
import { PerlinNoise1Component } from './components/projects/perlin-noise1/perlin-noise1.component';
import { PerlinNoiseComponent } from './components/projects/perlin-noise/perlin-noise.component';
import { CircumcenterComponent } from './components/projects/circumcenter/circumcenter.component';
import { LedMatrixComponent } from './components/projects/led-matrix/led-matrix.component';
import { LedMatrixDisplayInteractiveComponent } from './components/projects/led-matrix/led-matrix-display-interactive/led-matrix-display-interactive.component';
import { LedMatrixDisplayOnlyComponent } from './components/projects/led-matrix/led-matrix-display-only/led-matrix-display-only.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    BgCanvasComponent,
    HamburgerButtonComponent,
    DesatScaleComponent,
    ProjectsPageComponent,
    HomePageComponent,
    AboutComponent,
    PerlinNoise1Component,
    PerlinNoiseComponent,
    CircumcenterComponent,
    LowProfileHeaderComponent,
    LedMatrixComponent,
    LedMatrixDisplayInteractiveComponent,
    LedMatrixDisplayOnlyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
