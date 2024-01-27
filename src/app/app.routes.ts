import { Routes } from '@angular/router';

export const routes: Routes = [
    { title: 'OdinBeats | Your Music Companion', path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
];
