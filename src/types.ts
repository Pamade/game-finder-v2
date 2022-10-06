/* eslint-disable no-unused-vars */
//Fetch data types
export type StringOrNull = string | null;

export interface SearchArg {
  search_type: string;
  ordering: StringOrNull;
  date: StringOrNull;
  platform: StringOrNull;
}

export interface GetDataProps {
  getData(
    search_type: string,
    ordering: StringOrNull,
    date: StringOrNull,
    platform: StringOrNull
  ): void;
  type?: string;
}
