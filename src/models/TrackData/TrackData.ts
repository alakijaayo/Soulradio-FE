interface Image {
  height?: number | null | undefined;
  url: string;
  size?: string | null | undefined;
  width?: number | null | undefined;
}
export interface URI {
  uri: string;
}
export interface Artists {
  name: string;
}
export interface Album {
  name: string;
  uri: string;
  images: Image[];
}

export interface QueuedTracks {
  image: string;
  name: string;
  artist: string;
  uri: URI[];
  votesUp: number;
  votesDown: number;
}

export interface Track {
  name: string;
  artists: Artists[];
  uri: string;
  album: Album;
  durationMs: number;
  id: string | null;
  timestamp?: number;
}

export interface Tracks {
  trackName: string;
  trackArtist: string;
  trackuri: string;
  trackImage: Image[];
  trackDuration: number;
  trackId: string | null;
}
