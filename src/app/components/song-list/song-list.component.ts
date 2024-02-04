import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { jamHeart, jamHeartF, jamPlusCircle, jamMinusCircle } from '@ng-icons/jam-icons';
import { firstValueFrom } from 'rxjs';
import { MusicPlayerService } from '../../services/music-player.service';
import { PlaylistApiService } from '../../services/playlist-api.service';
import { SongApiService } from '../../services/song-api.service';
import { DurationToMinsPipe } from '../../pipes/duration-to-mins.pipe';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [
    CommonModule,
    DurationToMinsPipe,
    NgIconComponent,
  ],
  providers: [
    provideIcons({ jamHeart, jamHeartF, jamPlusCircle, jamMinusCircle }),
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent implements OnInit {
  @Input('songs') songs?: Song[];
  @Input('playlist') playlist?: Playlist;
  @Input('showDetails') showDetails: boolean = true;

  playlistMode: boolean = false;
  addingToPlaylist: boolean | string = false;
  removingFromPlaylist: boolean | string = false;
  selectablePlaylists: Playlist[] = [];

  constructor(
    private musicPlayerService: MusicPlayerService,
    private playlistService: PlaylistApiService,
    private songService: SongApiService,
  ) { }

  get activeSongId() {
    return this.musicPlayerService.activeSongId;
  }

  ngOnInit(): void {
    this.playlistMode = !!this.playlist;
    if (this.playlistMode) {
      this.mapSongs();
    } else {
      this.playlistService.watchAll().subscribe(playlists => {
        this.selectablePlaylists = playlists;
      });
    }
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

  playSong(song: Song, index: number) {
    if (this.playlistMode) {
      this.startPlaylistAt(index);
    } else {
      this.musicPlayerService.startStandaloneSong(song);
    }
  }

  startPlaylistAt(index: number) {
    if (!this.playlist) return;
    this.musicPlayerService.startPlaylist(this.playlist, index);
  }

  // Add to Playlist
  @HostListener('document:click', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.addingToPlaylist = false;
  }

  addToPlaylist(event: MouseEvent, songId: string) {
    event.stopPropagation();
    this.addingToPlaylist = songId;
  }

  selectTargetPlaylist(event: MouseEvent, playlistId: string) {
    event.stopPropagation();
    if (typeof this.addingToPlaylist != 'string') return;
    let songId: string = this.addingToPlaylist;
    this.addingToPlaylist = false;
    firstValueFrom(this.playlistService.addSongToPlaylist(playlistId, songId));
  }

  like(event: MouseEvent, song: Song) {
    event.stopPropagation();
    if (song?.hasOwnProperty('isLiked')) {
      song.isLiked = true;
      firstValueFrom(this.songService.likeSong(song.id));
    }
  }

  unlike(event: MouseEvent, song: Song) {
    event.stopPropagation();
    if (song?.hasOwnProperty('isLiked')) {
      song.isLiked = false;
      firstValueFrom(this.songService.unlikeSong(song.id));
    }
  }

  removeFromPlaylist(event: MouseEvent, songId: string) {
    event.stopPropagation();
    this.removingFromPlaylist = songId;
  }

  confirmRemoveFromPlaylist(event: MouseEvent) {
    event.stopPropagation();
    if (!this.playlist || typeof this.removingFromPlaylist != 'string') return;
    let songId: string = this.removingFromPlaylist;
    this.removingFromPlaylist = false;
    this.playlistService.removeSongFromPlaylist(this.playlist.id, songId).subscribe(() => {
      this.songs = this.songs?.filter(s => s.id != songId);
    });
  }

}
