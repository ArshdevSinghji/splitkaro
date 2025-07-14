import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchGroups = createAsyncThunk(
  "fetchGroups",
  async (email: string) => {
    const res = await AxiosInstance.get(`/group/user/${email}`);
    return res.data;
  }
);

interface IGroup {
  email: string;
  groupName: string;
}
interface IGroupState {
  groups: IGroup[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGroupState = {
  groups: [],
  isLoading: false,
  error: null,
};

const fetchGroupsSlice = createSlice({
  name: "fetchGroups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groups = action.payload;
    });
    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch groups";
    });
  },
});

export default fetchGroupsSlice.reducer;
