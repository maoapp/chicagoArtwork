import {StackNavigationProp} from '@react-navigation/stack';

export interface IArtwork {
  id: string;
  title: string;
  place_of_origin: string;
  thumbnail: IThumbnail;
  image: string;
  config: IArtworkConfig;
  image_id: string;
  artist_display: string;
  artist_title: string;
  artwork_type_title: string;
}

export interface Artworks {
  data: IArtwork[];
  config: IArtworkConfig;
  pagination: IPagination;
}

export interface IArtworkConfig {
  iiif_url: string;
}

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

export interface INavigation {
  navigation: StackNavigationProp<any>;
}

export interface IPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}
