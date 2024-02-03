import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { userResolver } from './resolvers/user.resolver';

export const routes: Routes = [
    { title: 'OdinBeats | Login', path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), canActivate: [guestGuard] },
    { path: '', loadChildren: () => import('./pages/platform/platform.routes').then(m => m.platformRoutes), canActivate: [authGuard], resolve: { user: userResolver } },
];
