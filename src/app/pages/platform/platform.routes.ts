import { Routes } from '@angular/router';
import { PlatformComponent } from './platform.component';

export const platformRoutes: Routes = [
    { path: '', component: PlatformComponent, children: [
        { title: 'OdinBeats | Your Music Companion', path: '', loadComponent: () => import('../../subpages/home/home.component').then(m => m.HomeComponent) },
        { title: 'Liked', path: 'likes', loadComponent: () => import('../../subpages/home/home.component').then(m => m.HomeComponent) },
        { title: 'Library', path: 'library', loadComponent: () => import('../../subpages/home/home.component').then(m => m.HomeComponent) },
        { title: 'Playlist', path: 'playlists/:id', loadComponent: () => import('../../subpages/home/home.component').then(m => m.HomeComponent) },
    ]},
];
