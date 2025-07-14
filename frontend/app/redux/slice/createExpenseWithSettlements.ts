import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ICreateExpenseWithSettlements {
  members: string[];
  description: string;
  category: string;
  totalAmount: number;
  paidBy: string;
  amountToPay: {
    [key: string]: number;
  };
}

export const createExpenseWithSettlements = createAsyncThunk(
  "createExpenseWithSettlements",
  async (payload: {
    data: ICreateExpenseWithSettlements;
    groupName: string;
  }) => {
    const res = await AxiosInstance.post(
      `expense?groupName=${payload.groupName}`,
      payload.data
    );
    return res.data;
  }
);

export interface ICreateExpenseWithSettlementsState {
  isLoading: boolean;
  error: string | null;
}

const initialState: ICreateExpenseWithSettlementsState = {
  isLoading: false,
  error: null,
};

const createExpenseWithSettlementsSlice = createSlice({
  name: "createExpenseWithSettlements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createExpenseWithSettlements.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createExpenseWithSettlements.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createExpenseWithSettlements.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message || "Failed to create expense with settlements";
    });
  },
});

export default createExpenseWithSettlementsSlice.reducer;
