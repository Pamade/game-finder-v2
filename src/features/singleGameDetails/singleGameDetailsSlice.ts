import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Platform, GameNameSlug, Developer } from "../../types";

interface GameDetails {
  id: number;
  slug: string;
  description_raw: string;
  released: string;
  name: string;
  background_image: string;
  parent_platforms: Platform[];
  platforms: Platform[];
  esrb_rating: { name: string };
  ratings: { count: number; value: string }[];
  website: string;
  genres: GameNameSlug[];
  developers: Developer[];
  publishers: [];
  achievements: {
    name: string;
    image: string;
    percent: number;
    description: string;
  }[];
  series: { name: string; background_image: string; slug: string }[];
  detail?: string;
}

interface InitialState {
  singleGameDetails: GameDetails;
  singleGameDetailsLoading: boolean;
}
const initialState: InitialState = {
  singleGameDetails: {} as GameDetails,
  singleGameDetailsLoading: false,
};

export const fetchSingleGameDetails = createAsyncThunk(
  "singleGameDetails/fetchSingleGameDetails",
  async (slug: string) => {
    return fetch(
      `https://api.rawg.io/api/games/${slug}?key=${process.env.REACT_APP_API_KEY}`
    ).then((res) => res.json());
  }
);

export const singleGameDetailsSlice = createSlice({
  name: "singleGameDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleGameDetails.pending, (state) => {
        state.singleGameDetailsLoading = true;
        state.singleGameDetails = {} as GameDetails;
      })
      .addCase(fetchSingleGameDetails.fulfilled, (state, action) => {
        state.singleGameDetails = action.payload;
        state.singleGameDetailsLoading = false;
      });
  },
});

export const selectGameDetails = (state: RootState) => state.singleGameDetails;

export default singleGameDetailsSlice.reducer;
