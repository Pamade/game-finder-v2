/* eslint-disable no-unused-vars */
export type StringOrNull = string | null;

export interface SearchArg {
  search_type: string;
  ordering: StringOrNull;
  date: StringOrNull;
  platform: StringOrNull;
  genre: StringOrNull;
}

export interface GameNameSlug {
  name: string;
  slug: string;
}

export interface Creator extends GameNameSlug {
  id: number;
  games: GameNameSlug[];
  games_count: number;
  image_background: string;
  background_image: string;
}

export interface GameSeries extends GameNameSlug {
  background_image: string;
}

export interface Platform {
  platform: { name: string };
}
export interface Game extends GameNameSlug {
  id: number;
  background_image: string;
  parent_platforms: Platform[];
  metacritic: number;
  genres: { name: string }[];
  released: string;
}

interface Dev {
  id: number;
  name: string;
  slug: string;
  image?: string;
  games_count: string;
}

export interface Developer extends Dev {
  games: GameNameSlug[];
  position: string;
}

export interface FetchedDeveloper extends Dev {
  positions: { name: string }[];
  games: GameNameSlug[];
}
