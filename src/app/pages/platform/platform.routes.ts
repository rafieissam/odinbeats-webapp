import { Routes } from '@angular/router';
import { PlatformComponent } from './platform.component';

export const platformRoutes: Routes = [
    { path: '', component: PlatformComponent, children: [
        { title: 'OdinBeats | Your Music Companion', path: '', loadComponent: () => import('../../subpages/home/home.component').then(m => m.HomeComponent) },
        { title: 'Liked', path: 'likes', loadComponent: () => import('../../subpages/likes/likes.component').then(m => m.LikesComponent) },
        { title: 'Library', path: 'library', loadComponent: () => import('../../subpages/library/library.component').then(m => m.LibraryComponent) },
        { title: 'Playlist', path: 'library/:playlistId', loadComponent: () => import('../../subpages/playlist/playlist.component').then(m => m.PlaylistComponent) },
        { title: 'User Settings', path: 'settings', loadComponent: () => import('../../subpages/settings/settings.component').then(m => m.SettingsComponent) },
    ]},
];
