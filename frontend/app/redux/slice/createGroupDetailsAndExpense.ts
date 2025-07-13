import { AxiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IGroupDetailsAndExpense {
  userEmails: string[];
  summary: string;
  category: string;
}

export const createGroupDetailsAndExpense = createAsyncThunk(
  "createGroupDetailsAndExpense",
  async () => {
    const res = await AxiosInstance.post("/group/detailsAndExpense");
    return res.data;
  }
);
