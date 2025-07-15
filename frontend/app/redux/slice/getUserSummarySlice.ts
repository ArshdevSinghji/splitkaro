import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "@/app/component/AddExpenseModal";

export const GetUserSettlements = createAsyncThunk(
  "user/getSettlements",
  async (email: string) => {
    const response = await AxiosInstance(`/user/find/${email}`);
    const data = response.data;
    const cleanedSettlements = data.settlements.map((settlement: any) => ({
      id: settlement.id,
      amountToPay: settlement.amountToPay,
      isPaid: settlement.isPaid,
      expense: {
        id: settlement.expense.id,
        members: settlement.expense.members,
        description: settlement.expense.description,
        category: settlement.expense.category,
        totalAmount: settlement.expense.totalAmount,
        paidBy: settlement.expense.paidBy,
        group: {
          groupName: settlement.expense.group.groupName,
        },
      },
    }));

    return cleanedSettlements;
  }
);

export const GetUserSettlementsByCategory = createAsyncThunk(
  "user/getSettlementsByCategory",
  async (payload: { email: string; category: string }) => {
    const response = await AxiosInstance(`/user/find/${payload.email}`);
    const data = response.data;

    const cleanedSettlements = data.settlements.map((settlement: any) => ({
      id: settlement.id,
      amountToPay: settlement.amountToPay,
      isPaid: settlement.isPaid,
      expense: {
        id: settlement.expense.id,
        members: settlement.expense.members,
        description: settlement.expense.description,
        category: settlement.expense.category,
        totalAmount: settlement.expense.totalAmount,
        paidBy: settlement.expense.paidBy,
        group: {
          groupName: settlement.expense.group.groupName,
        },
      },
    }));

    if (payload.category === "ALL" || payload.category === Category.ALL) {
      return cleanedSettlements;
    }

    return cleanedSettlements.filter(
      (settlement: any) => settlement.expense.category === payload.category
    );
  }
);

interface IGroup {
  groupName: string;
}

interface IExpense {
  id: number;
  members: string[];
  description: string;
  category: string;
  totalAmount: number;
  paidBy: string;
  group: IGroup;
}

interface Settlement {
  id: number;
  amountToPay: number;
  isPaid: boolean;
  expense: IExpense;
}

export interface IGetUserSummaryState {
  settlements: Settlement[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetUserSummaryState = {
  settlements: [],
  isLoading: false,
  error: null,
};

const getUserSummarySlice = createSlice({
  name: "getUserSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUserSettlements.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUserSettlements.fulfilled, (state, action) => {
      state.isLoading = false;
      state.settlements = action.payload;
    });
    builder.addCase(GetUserSettlements.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch settlements";
    });
    builder.addCase(GetUserSettlementsByCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetUserSettlementsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.settlements = action.payload;
    });
    builder.addCase(GetUserSettlementsByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message || "Failed to fetch settlements by category";
    });
  },
});

export default getUserSummarySlice.reducer;
