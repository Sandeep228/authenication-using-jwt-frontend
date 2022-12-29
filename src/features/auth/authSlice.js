import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isLoggedIn: false,
  isValid: false,
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    console.log(error.response.data.message);
    toast.error(error.response.data.message);

    return thunkAPI.rejectWithValue(message);
  }
});

export const checkAuth = createAsyncThunk("auth/home", async () => {
  try {
    const authResponse = await authService.checkAuth();
    console.log(authResponse);
    if (authResponse) return authResponse;
    else throw new Error("unauthorized");
  } catch (error) {
    (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.response.data.messagetoString();
    console.log(error.response.data);
    // toast.error(error.response.data.message);
  }
});

export const emailvalidate = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const validate = await authService.validatemail(user);
      console.log("validaye ", validate);
      if (validate.isValid) return validate;
      else throw new Error("user doesn't exist ");
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.response.data.messagetoString();
      console.log(error.response.data.error);
      // toast.error(error.response.data.message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  toast.success("User logged out");
});

export const passwordresetrequest = createAsyncThunk(
  "auth/password",
  async (user, thunkAPI) => {
    try {
      return await authService.passwordreset(user);
    } catch (error) {
      (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.response.data.messagetoString();
      console.log(error.response.data.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      // state.message = "";
      // state.user = null;
      // state.isLoggedIn = false;
    },
    resetValidation: (state) => {
      state.emailValidation = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(emailvalidate.fulfilled, (state) => {
        state.isValid = true;
      })
      .addCase(emailvalidate.rejected, (state) => {
        state.isValid = false;
      });
  },
});

export const { reset, resetValidation } = authSlice.actions;
export default authSlice.reducer;
