import { Routes } from '@angular/router';

import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProjectsPageComponent } from './components/pages/projects-page/projects-page.component';
import { AboutComponent } from './components/pages/about/about.component';

import { DesatScaleComponent } from './components/projects/desat-scale/desat-scale.component';
import { PerlinNoise1Component } from './components/projects/perlin-noise1/perlin-noise1.component';
import { PerlinNoiseComponent } from './components/projects/perlin-noise/perlin-noise.component';
import { CircumcenterComponent } from './components/projects/circumcenter/circumcenter.component';
import { LedMatrixComponent } from './components/projects/led-matrix/led-matrix.component';
import { LedMatrixDisplayOnlyComponent } from './components/projects/led-matrix/led-matrix-display-only/led-matrix-display-only.component';
import { LedMatrixDisplayInteractiveComponent } from './components/projects/led-matrix/led-matrix-display-interactive/led-matrix-display-interactive.component';

export const AppRoutes: Routes = [
    { path: 'home-page', component: HomePageComponent },
    { path: 'projects-page', component: ProjectsPageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'desat-scale', component: DesatScaleComponent },
    { path: 'perlin-noise1', component: PerlinNoise1Component },
    { path: 'perlin-noise', component: PerlinNoiseComponent },
    { path: 'circumcenter', component: CircumcenterComponent },
    { path: 'led-matrix', component: LedMatrixComponent },
    { path: '', component: HomePageComponent }
];
