import { PlaylistSong } from "./playlist-song";

export interface Playlist {
  id: string;
  name: string;
  image?: string;
  // user?: User;
  // userId: string;
  songs?: PlaylistSong[];
  totalDuration?: number;
  createdAt: Date;
  updatedAt: Date;
}
