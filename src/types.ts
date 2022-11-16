/* eslint-disable no-unused-vars */
export type StringOrNull = string | null;

export interface SearchArg {
  search_type: string;
  ordering: StringOrNull;
  date: StringOrNull;
  platform: StringOrNull;
  genre: StringOrNull;
}

export interface GetDataProps {
  getData(
    search_type: string,
    ordering: StringOrNull,
    date: StringOrNull,
    platform: StringOrNull,
    genre: StringOrNull
  ): void;
  type?: string;
}

export interface GameSeries {
  name: string;
  background_image: string;
  slug: string;
}

export interface Platform {
  platform: { name: string };
}
