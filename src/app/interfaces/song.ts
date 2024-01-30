export interface Song {
  id: string;
  name: string;
  duration: number;
  path: string;
  artist: string;
  createdAt: Date;
  updatedAt: Date;

  myPlays?: number;
  // plays: SongPlay[];
  // likes: LikedSong[];
  // playlists: PlaylistSong[];

  image: string;
  isLiked?: boolean;
}
