export interface Song {
  id: string;
  image?: string;
  name: string;
  duration: number;
  path: string;
  artist: string;
  createdAt: Date;
  updatedAt: Date;
  isLiked?: boolean;
  _count?: {
    plays?: number;
    likes?: number;
  };
}
