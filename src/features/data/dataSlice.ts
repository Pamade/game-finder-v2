import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SearchArg } from "../../types";
export const API_KEY = "8404099eca4445d68543b9380d1f7c66";

interface DataState {
  loading: boolean;
  currentPage: number;
  data: any;
  singleGameDetails: any;
  singleGameDetailsLoading: boolean;
}

const initialState: DataState = {
  loading: false,
  currentPage: 1,
  data: [],
  singleGameDetails: {},
  singleGameDetailsLoading: false,
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
      `https://api.rawg.io/api/${search_type}?key=${API_KEY}&${
        genre ? `genres=${genre}&` : ""
      }page=${data.currentPage}${findDate}${findOrdering}${findPlatform}`
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

export const fetchGameDetails = createAsyncThunk(
  "data/fetchGameDetails",
  async (slug: string) => {
    return fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`).then(
      (res) => res.json()
    );
  }
);

export const fetchPublishers = createAsyncThunk(
  "data/fetchPublishers",
  async (_, { getState }) => {
    const { data } = getState() as { data: DataState };
    return fetch(
      `https://api.rawg.io/api/publishers?key=${API_KEY}&page=${data.currentPage}`
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
        state.data = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchByName.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchGameDetails.pending, (state) => {
        state.singleGameDetailsLoading = true;
        state.singleGameDetails = [];
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.singleGameDetailsLoading = false;
        state.singleGameDetails = action.payload;
      });
  },
});

export const { goToNextPage, goToPreviousPage, goToFirstPage, setupPage } =
  dataSlice.actions;
export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
