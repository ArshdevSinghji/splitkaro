import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRegisteringUser {
  username: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "registerUser",
  async (registeringUser: IRegisteringUser) => {
    try {
      const res = await AxiosInstance.post(`/auth/signUp`, registeringUser);
      return res.data;
    } catch (err) {
      throw new Error("failed to register!");
    }
  }
);

interface IRegisterConditions {
  isLoading: boolean;
  isRegistered: boolean;
  error: string | null;
}

const initialState: IRegisterConditions = {
  isLoading: false,
  isRegistered: false,
  error: null,
};

const registerUserSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
        state.isRegistered = false;
      });
  },
});

export default registerUserSlice.reducer;
