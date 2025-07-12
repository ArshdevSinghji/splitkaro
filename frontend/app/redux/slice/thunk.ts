import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IGroup {
  email: string;
  groupName: string;
}

export const createGroup = createAsyncThunk(
  "createGroup",
  async (group: IGroup) => {
    const res = await AxiosInstance.post(`/group/${group.email}`, {
      groupName: group.groupName,
      ownerEmail: group.email,
    });
    return res.data;
  }
);

interface IGroupState {
  isLoading: boolean;
  error: string | null;
}

const initialState: IGroupState = {
  isLoading: false,
  error: null,
};

const creatingGroup = createSlice({
  name: "creatingGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGroup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createGroup.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to create group";
    });
  },
});

export default creatingGroup.reducer;
