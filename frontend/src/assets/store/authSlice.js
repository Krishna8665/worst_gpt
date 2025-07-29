import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Status = {
  IDLE: "idle",
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};

const initialState = {
  user: null, // null means not logged in
  token: null,
  status: Status.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetStatus(state) {
      state.status = Status.IDLE;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = Status.IDLE;
      state.error = null;
      localStorage.removeItem("tokenHoYo");
    },
  },
});

export const {
  setUser,
  setToken,
  setStatus,
  setError,
  resetStatus,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Thunk to register a user (no token set on register)
export function registerUser(data) {
  return async (dispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        data
      );
      if (response.status >= 200 && response.status < 300) {
        // Registration successful, but do NOT set user/token here
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setError(null));
      } else {
        dispatch(setStatus(Status.ERROR));
        dispatch(setError("Registration failed"));
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      dispatch(setStatus(Status.ERROR));
      dispatch(setError(message));
    }
  };
}

// Thunk to login a user (set token + user on login)
export function loginUser(data) {
  return async (dispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );
      if (response.status >= 200 && response.status < 300) {
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("tokenHoYo", token);
          dispatch(setToken(token));
          dispatch(setUser(user || null));
          dispatch(setStatus(Status.SUCCESS));
          dispatch(setError(null));
        } else {
          dispatch(setStatus(Status.ERROR));
          dispatch(setError("No token returned"));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
        dispatch(setError("Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
      dispatch(setStatus(Status.ERROR));
      dispatch(setError(message));
    }
  };
}
