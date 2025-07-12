import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthenticatingUser {
  email: string;
  password: string;
}

export const authenticatingUser = createAsyncThunk(
  "authenticatingUser",
  async (authenticatingUser: IAuthenticatingUser) => {
    try {
      const res = await AxiosInstance.post("/auth/signIn", authenticatingUser);

      document.cookie = `access_token=${res.data.access_token}; path:/; max-age=86400`;

      return res.data;
    } catch (err) {
      throw new Error("failed to authenticate user!");
    }
  }
);

interface User {
  username: string;
  email: string;
}

interface IAuthUser {
  user: User;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: IAuthUser = {
  user: {
    username: "",
    email: "",
  },
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authenticateUserSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.user.username = "";
      state.user.email = "";
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;

      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticatingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user.email = action.payload.user.email;
        state.user.username = action.payload.user.username;
      })
      .addCase(authenticatingUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticatingUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Authentication failed";
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authenticateUserSlice.actions;
export default authenticateUserSlice.reducer;
