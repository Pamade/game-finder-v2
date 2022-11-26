import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SearchArg, Creator } from "../../types";

export interface Data {
  count: number;
  next: string;
  previous: string;
  results: any;
  detail?: string;
}

interface DataState {
  loading: boolean;
  currentPage: number;
  data: Data;
  loadingFetchCreatorGames: boolean;
  isRejected: boolean;
}

const initialAllData = {
  count: 0,
  next: "",
  previous: "",
  results: [],
};

const initialState: DataState = {
  loading: false,
  currentPage: 1,
  data: initialAllData,
  loadingFetchCreatorGames: false,
  isRejected: false,
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (
    { search_type, ordering, date, platform, genre }: SearchArg,
    { getState }
  ) => {
    const { data } = getState() as { data: DataState };
    const findOrdering = ordering ? `&ordering=${ordering}` : "";
    const findDate = date ? `&dates=${date}` : "";
    const findPlatform = platform ? `&platforms=${platform}` : "";

    return fetch(
      `https://api.rawg.io/api/${search_type}?key=${
        process.env.REACT_APP_API_KEY
      }&page_size=10&${genre ? `genres=${genre}&` : ""}page=${
        data.currentPage
      }${findDate}${findOrdering}${findPlatform}`
    ).then((res) => res.json());
  }
);

export const fetchByName = createAsyncThunk(
  "data/fetchByName",
  async (name: string, { getState }) => {
    const { data } = getState() as { data: DataState };
    return fetch(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${name}&page_size=10&search_precise&page=${data.currentPage}`
    ).then((res) => res.json());
  }
);

export const fetchCreatorGames = createAsyncThunk(
  "data/fetchCreatorGames",
  async (
    {
      name,
      type,
      search,
    }: { name: string; type: string; search: string | null },
    { getState }
  ) => {
    const { data } = getState() as { data: DataState };
    let apiCall = "";

    if (search) {
      apiCall = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&${type}=${name}&page_size=10&page=${data.currentPage}&search=${search}&search_precise&ordering=-popularity`;
    } else {
      apiCall = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&${type}=${name}&page_size=10&page=${data.currentPage}&ordering=-popularity&search_precise`;
    }

    return fetch(apiCall).then((res) => res.json());
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
      state.data.detail = "";
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
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchByName.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCreatorGames.pending, (state) => {
        if (state.currentPage === 1) {
          state.loading = true;
        } else {
          state.loadingFetchCreatorGames = true;
        }
      })
      .addCase(fetchCreatorGames.fulfilled, (state, action) => {
        if (state.currentPage === 1) {
          state.data = action.payload;
          state.loading = false;
        } else {
          // append items to data when scrolling
          action.payload.results.map((publisher: Creator) =>
            state.data.results.push(publisher)
          );
          state.loadingFetchCreatorGames = false;
        }
      });
  },
});

export const { goToNextPage, goToPreviousPage, goToFirstPage, setupPage } =
  dataSlice.actions;
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
