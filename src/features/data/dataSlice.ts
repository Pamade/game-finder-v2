import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SearchArg } from "../../types";
export const API_KEY = "c3430b4b38794123bcf646e92f920935";

interface DataState {
  loading: boolean;
  currentPage: number;
  data: any;
}

const initialState: DataState = {
  loading: false,
  currentPage: 1,
  data: [],
};

// ORDERINGS: name, released, added, created, updated, rating, metacritic. You can reverse the sort order adding a hyphen, for example: -released

// w zależnośći od linku pobrać endpoint - React Router
// ENDPOINTS FOR GAMES
// `https://api.rawg.io/api/games?key=${api_key}&page=${data.currentPage}&ordering=${wybierz z filtra}&dates={2020-01-01, 202-12-31}
// endpoint: search
// `https://api.rawg.io/api/games?key=${api_key}&search={nazwaGry}&page=${data.currentPage}
// endpoint: genres
// `https://api.rawg.io/api/games?key=${api_key}&genres={action}&page=${data.currentPage}
// ednpoint: mostpopular
// https://api.rawg.io/api/games?dates=2021-01-01,2022-12-31&ordering=-added -- here use new Date

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (
    { search_type, ordering, date, platform }: SearchArg,
    { getState }
  ) => {
    const { data } = getState() as { data: DataState };
    const findOrdering = ordering ? `&ordering=${ordering}` : "";
    const findDate = date ? `&dates=${date}` : "";
    const findPlatform = platform ? `&platforms=${platform}` : "";

    return fetch(
      `https://api.rawg.io/api/${search_type}?key=${API_KEY}&page=${data.currentPage}${findDate}${findOrdering}${findPlatform}`
    ).then((res) => res.json());
  }
);

export const fetchByName = createAsyncThunk(
  "data/fetchByName",
  async (name: string, { getState }) => {
    const { data } = getState() as { data: DataState };
    return fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page=${data.currentPage}`
    ).then((res) => res.json());
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    goToNextPage: (state) => {
      state.currentPage += 1;
    },
    goToPreviousPage: (state) => {
      state.currentPage -= 1;
    },
    goToFirstPage: (state) => {
      state.currentPage = 1;
    },
    setupPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchByName.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { goToNextPage, goToPreviousPage, goToFirstPage, setupPage } =
  dataSlice.actions;
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
