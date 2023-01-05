interface Images {
  height: number;
  url: string;
  width: number;
}

export interface Artists {
  name: string;
}
export interface Album {
  images: Images[];
}

export interface Track {
  name: string;
  artists: Artists[];
  uri: string;
  album: Album;
  durationMs: string;
  id: string;
}

export interface Tracks {
  trackName: string;
  trackArtist: string;
  trackuri: string;
  trackImage: Images[];
  trackDuraction: string;
  trackId: string;
}
