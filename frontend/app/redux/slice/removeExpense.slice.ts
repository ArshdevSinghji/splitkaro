import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const removeExpenseThunk = createAsyncThunk(
  "expense/removeExpense",
  async ({
    groupName,
    expenseId,
  }: {
    groupName: string;
    expenseId: number;
  }) => {
    const res = await AxiosInstance.delete(
      `/expense?groupName=${groupName}&expenseId=${expenseId}`
    );
    return res.data;
  }
);

interface RemoveExpenseState {
  isLoading: boolean;
  error: string | null;
}

const initialState: RemoveExpenseState = {
  isLoading: false,
  error: null,
};

const removeExpenseSlice = createSlice({
  name: "removeExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeExpenseThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeExpenseThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeExpenseThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to remove expense";
      });
  },
});

export default removeExpenseSlice.reducer;
