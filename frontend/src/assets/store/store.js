import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import usageSlice from "./usageSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    usage: usageSlice,
  },
});

export default store;

export const AppDispatch = store.dispatch;
