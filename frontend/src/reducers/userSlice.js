import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: false,
  user: null,
  pendingUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.status = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPendingUsers.fulfilled, (state, action) => {
      state.pendingUsers = action.payload;
    });
  },
});

export const fetchPendingUsers = createAsyncThunk(
  "user/fetchPendingUsers",
  async () => {
    const response = await axios.get(
      "http://localhost:5001/auth/pending-users"
    );
    return response.data;
  }
);

export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ userId, role }) => {
    const response = await axios.post(
      "http://localhost:5001/auth/update-role",
      { user_id: userId, role }
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ userId }) => {
    const response = await axios.post(
      "http://localhost:5001/auth/delete-user",
      { user_id: userId }
    );
    return response.data;
  }
);

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
