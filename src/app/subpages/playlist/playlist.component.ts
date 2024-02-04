import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamPlay, jamMusic, jamClock, jamMic, jamMoreHorizontalF, jamTrashAlt } from '@ng-icons/jam-icons';
import { MusicPlayerService } from '../../services/music-player.service';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserPillComponent } from '../../components/user-pill/user-pill.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { EditPlaylistComponent } from '../../components/edit-playlist/edit-playlist.component';
import { DurationToStringPipe } from '../../pipes/duration-to-string.pipe';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';
import { DeletePlaylistComponent } from '../../components/delete-playlist/delete-playlist.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    LoaderComponent,
    DurationToMinsPipe,
    DurationToStringPipe,
    UserPillComponent,
    SongListComponent,
    EditPlaylistComponent,
    DeletePlaylistComponent,
  ],
  providers: [
    provideIcons({ jamPlay, jamMusic, jamClock, jamMic, jamMoreHorizontalF, jamTrashAlt })
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit {
  @ViewChild('moreButton') moreButtonRef!: ElementRef;

  isLoading: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;
  moreIsOpen: boolean = false;
  playlistId!: string;
  playlist?: Playlist;
  listOfArtists: string = '';
  songs: Song[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playlistService: PlaylistApiService,
    private musicPlayerService: MusicPlayerService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('playlistId')) {
        this.playlistId = paramMap.get('playlistId') || '';
        this.fetchPlaylist();
      }
    });
  }

  fetchPlaylist() {
    this.isLoading = true;
    this.playlistService.getOne(this.playlistId).subscribe(playlist => {
      this.playlist = playlist;
      this.mapSongs();
      this.formatArtists();
      this.isLoading = false;
    })
  }

  mapSongs() {
    if (!this.playlist || !this.playlist.songs) {
      this.songs = [];
      return;
    }
    let songs: Song[] = [];
    this.playlist.songs.forEach(playlistSong => {
      songs.push(playlistSong.song);;
    });
    this.songs = songs;
  }

  formatArtists() {
    let artists: any = [];
    for (let song of this.songs) {
      if (song.artist && !artists.includes(song.artist)) {
        artists.push(song.artist);
        if (artists.length > 3) break;
      }
    }
    if (artists.length > 3) {
      artists = artists.slice(0, 3);
      artists.push('and more.');
    } 
    this.listOfArtists = artists.join(', ');
  }

  startAtSong(index: number) {
    if (!this.playlist) return;
    this.musicPlayerService.startPlaylist(this.playlist, index);
  }

  openEditing() {
    this.isEditing = true;
  }

  closeEditing() {
    this.isEditing = false;
  }

  updatePlaylist(updateDto: any) {
    this.closeEditing();
    if (this.playlist) {
      this.playlist.name = updateDto.name;
    }
  }

  openDeleting() {
    this.closeMore();
    this.isDeleting = true;
  }

  closeDeleting() {
    this.isDeleting = false;
  }

  deletedPlaylist() {
    this.router.navigate(['/library']);
  }
  
  @HostListener('document:click', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.moreIsOpen && !this.moreButtonRef.nativeElement.contains(event.target)) {
      this.closeMore();
    }
  }

  toggleMore() {
    if (this.moreIsOpen) {
      this.closeMore();
    } else {
      this.openMore();
    }
  }

  openMore() {
    this.moreIsOpen = true;
  }

  closeMore() {
    this.moreIsOpen = false;
  }
}
