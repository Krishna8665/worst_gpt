import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Optional: Create a simple enum or object for statuses
export const Status = {
  IDLE: "idle",
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};

const initialState = {
  user: {
    username: null,
    email: null,
    password: null,
  },
  status: Status.IDLE,
  error:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, setStatus, setError } = authSlice.actions;
export default authSlice.reducer;

// Thunk to register a user
export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", data);
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUser(response.data.user)); // optional: if backend returns user data
          dispatch(setError(null)); // clear previous errors
      } else {
        dispatch(setStatus(Status.ERROR));
        dispatch(setError("Registration failed"));
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message = error.response?.data?.message || error.message || "Registration failed";
      dispatch(setStatus(Status.ERROR));
      dispatch(setError(message));
    }
  };
}

// Thunk to login a user
export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", data);
      console.log(response);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUser(response.data.user)); // optional
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
