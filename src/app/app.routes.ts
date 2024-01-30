import { Routes } from '@angular/router';

export const routes: Routes = [
    { title: 'OdinBeats | Login', path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: '', loadChildren: () => import('./pages/platform/platform.routes').then(m => m.platformRoutes) },
];
