import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addNewMembersToGroup = createAsyncThunk(
  "addNewMembersToGroup",
  async ({
    groupName,
    email,
    members,
  }: {
    groupName: string;
    email: string;
    members: string[];
  }) => {
    try {
      const response = await AxiosInstance.post(
        `/group/addMember?groupName=${groupName}`,
        {
          email,
          members,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to add new members to the group");
    }
  }
);

export const removeMemberFromGroup = createAsyncThunk(
  "removeMemberFromGroup",
  async ({
    groupName,
    memberEmail,
  }: {
    groupName: string;
    memberEmail: string;
  }) => {
    try {
      const response = await AxiosInstance.delete(
        `/group/deleteMember?groupName=${groupName}`,
        {
          data: memberEmail,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to remove member from the group");
    }
  }
);

export interface ICrudForGroupState {
  members: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ICrudForGroupState = {
  members: [],
  isLoading: false,
  error: null,
};

export const crudForGroupSlice = createSlice({
  name: "crudForGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewMembersToGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewMembersToGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload.members;
      })
      .addCase(addNewMembersToGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add members";
      })
      .addCase(removeMemberFromGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload.members;
      })
      .addCase(removeMemberFromGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to remove member";
      });
  },
});

export default crudForGroupSlice.reducer;
