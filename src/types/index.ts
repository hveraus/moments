export interface SiteConfig {
  title: string;
  subtitle: string;
  social: {
    github?: string;
    twitter?: string;
    telegram?: string;
    email?: string;
  };
}

export interface TicketData {
  id: string;
  template: string;
  title: string;
  description: string;
  photos: string[];
  data: Record<string, string>;
}

export interface TripLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface Trip {
  slug: string;
  title: string;
  country: string;
  startDate: string;
  endDate: string;
  locations?: TripLocation[];
  tickets: TicketData[];
}

export interface AppData {
  site: SiteConfig;
  trips: Trip[];
}
