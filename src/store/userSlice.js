import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isLoggedIn: false,
    isSignIn: false,
    signUser: null,
    error: null,
}
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          'https://reqres.in/api/login',
          userData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  );

export const sigInUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          'https://reqres.in/api/register',
          userData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  );

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logOutUser: (state) => {
        state.user = null;
        state.isLoggedIn = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload || 'Giris Yapilamadi';
        }).addCase(sigInUser.fulfilled, (state,action) =>{
            state.signUser = action.payload,
            state.isSignIn= true
        })
    },
  });

  export const { logOutUser } = userSlice.actions;
  export default userSlice.reducer;