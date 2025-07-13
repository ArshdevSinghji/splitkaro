import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IGetUserByUsername {
  username: string;
}

export const GetUserByUsernameSchema = createAsyncThunk(
  "getUserByUsername",
  async (user: IGetUserByUsername) => {
    const res = await AxiosInstance.get(`/user`, {
      params: { username: user.username },
    });
    return res.data;
  }
);

export interface IUser {
  username: string;
  email: string;
}

export interface IGetUserByUsernameState {
  searchResults: IUser[];
  addedUsers: IUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetUserByUsernameState = {
  searchResults: [],
  addedUsers: [],
  isLoading: false,
  error: null,
};

const getUserByUsernameSlice = createSlice({
  name: "getUserByUsername",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const userExists = state.addedUsers.find(
        (user) => user.email === action.payload.email
      );
      if (!userExists) {
        state.addedUsers.push(action.payload);
      }
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserByUsernameSchema.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUserByUsernameSchema.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    });
    builder.addCase(GetUserByUsernameSchema.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch user by username";
    });
  },
});

export const { addUser, clearSearchResults } = getUserByUsernameSlice.actions;
export default getUserByUsernameSlice.reducer;
