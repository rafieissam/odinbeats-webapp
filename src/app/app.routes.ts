import { Routes } from '@angular/router';

export const routes: Routes = [
    { title: 'OdinBeats | Your Music Companion', path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { title: 'Liked', path: 'likes', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { title: 'Recents', path: 'recents', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { title: 'Playlist', path: 'playlists/:id', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
];
