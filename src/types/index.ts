export interface IArtwork {
  id: string;
  title: string;
  place_of_origin: string;
  thumbnail: IThumbnail;
}

export type Artworks = IArtwork[];

export interface IThumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

export interface IRequest<T> {
  loading: boolean;
  data: T;
  error: boolean;
  successful: boolean;
}
