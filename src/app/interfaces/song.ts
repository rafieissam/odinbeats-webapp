export interface Song {
  id: string;
  name: string;
  duration: number;
  path: string;
  format: string;
  artist: string;
  album: string;
  genre: string[];
  createdAt: Date;
  updatedAt: Date;

  // plays: SongPlay[];
  // likes: LikedSong[];
  // playlists: PlaylistSong[];

  image: string;
  isLiked?: boolean;
}
