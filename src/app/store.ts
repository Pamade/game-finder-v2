import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import dataReducer from "../features/data/dataSlice";
import singleGameDetailsReducer from "../features/singleGameDetails/singleGameDetailsSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
    singleGameDetails: singleGameDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
