import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const GetGroupsDetailsWithExpense = createAsyncThunk(
  "getGroupsDetailsWithExpense",
  async (groupName: string) => {
    const response = await AxiosInstance.get(`/group/name/${groupName}`);
    const data = response.data;

    const cleanData = {
      groupName: data.groupName,
      admin: {
        username: data.owner.username,
        email: data.owner.email,
      },
      expense: Array.isArray(data.expense)
        ? data.expense.map((exp: any) => ({
            id: exp.id,
            members: exp.members,
            description: exp.description,
            category: exp.category,
            totalAmount: exp.totalAmount,
            paidBy: exp.paidBy,
          }))
        : [],
    };

    return cleanData;
  }
);

interface IAdmin {
  email: string;
  username: string;
}

interface IExpense {
  id: number;
  members: string[];
  description: string;
  category: string;
  totalAmount: number;
  paidBy: string;
}

interface IGroupDetailsWithExpense {
  groupName: string;
  admin: IAdmin;
  expense: IExpense[];
}

interface IGetGroupsDetailsWithExpenseResponse {
  group: IGroupDetailsWithExpense;
  isLoading: boolean;
  error: string | null;
}

const initialState: IGetGroupsDetailsWithExpenseResponse = {
  group: {
    groupName: "",
    admin: { email: "", username: "" },
    expense: [],
  },
  isLoading: false,
  error: null,
};

const getGroupsDetailsWithExpenseSlice = createSlice({
  name: "getGroupsDetailsWithExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetGroupsDetailsWithExpense.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetGroupsDetailsWithExpense.fulfilled, (state, action) => {
      state.isLoading = false;
      state.group = action.payload;
    });
    builder.addCase(GetGroupsDetailsWithExpense.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message || "Failed to fetch group details with expense";
    });
  },
});

export default getGroupsDetailsWithExpenseSlice.reducer;
