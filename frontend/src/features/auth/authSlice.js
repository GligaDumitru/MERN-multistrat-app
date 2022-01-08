import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI, fetchAPIWithBearer, getAPI, getToken } from "../../api";

const initialState = {
  user: null,
  isLoggedIn: false,
  value: 1,
  status: "idle",
  errors: [],
  message: "",
  success: "",
  currentProject: null,
  currentTimesheet: null,
  loading: false,
  timesheets: [],
};

const base_url = "http://localhost:5000";

export const registerAsync = createAsyncThunk(
  "auth/fetchRegister",
  async (data) => {
    return await fetchAPI(data, `${base_url}/v1/auth/register`);
  }
);

export const getProjectById = createAsyncThunk(
  "auth/fetchProjectById",
  async (id) => {
    const accessToken = getToken("access");
    // #TODO: return accessToken ? await getAPI(`${base_url}/v1/projects/${id}`) : null;
    return accessToken
      ? await getAPI(
          `https://8bbc7624-a55c-425e-b713-6a13d3f3a967.mock.pstmn.io/v1/projects/${id}`
        )
      : null;
  }
);

export const getTimesheetById = createAsyncThunk(
  "data/fetchTimesheetById",
  async (id) => {
    const accessToken = getToken("access");
    // #TODO: return accessToken ? await getAPI(`${base_url}/v1/projects/${id}`) : null;
    return accessToken
      ? await getAPI(
          `https://8bbc7624-a55c-425e-b713-6a13d3f3a967.mock.pstmn.io/v1/timesheets/${id}`
        )
      : null;
  }
);

export const getTimesheets = createAsyncThunk(
  "data/fetchTimesheets",
  async () => {
    const accessToken = getToken("access");
    // #TODO: return accessToken ? await getAPI(`${base_url}/v1/projects/${id}`) : null;
    return accessToken
      ? await getAPI(
          `https://8bbc7624-a55c-425e-b713-6a13d3f3a967.mock.pstmn.io/v1/timesheets`
        )
      : null;
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/fetchForgotPassword",
  async (data) => {
    return await fetchAPIWithBearer(
      data,
      `${base_url}/v1/auth/forgot-password`
    );
  }
);

export const updateUserDataAsync = createAsyncThunk(
  "auth/fetchUpdateUserDataAsync",
  async (props) => {
    const { id, payload } = props;

    return await fetchAPIWithBearer(
      payload,
      `${base_url}/v1/users/${id}`,
      "PATCH"
    );
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const refreshToken = getToken("refresh");
  return await fetchAPI({ refreshToken }, `${base_url}/v1/auth/logout`);
});

export const aboutMeAsync = createAsyncThunk("auth/aboutMe", async () => {
  const accessToken = getToken("access");
  if (accessToken)
    return accessToken ? await getAPI(`${base_url}/v1/auth/me`) : null;
});

export const loginAsync = createAsyncThunk("auth/fetchLogin", async (data) => {
  return await fetchAPI(data, `${base_url}/v1/auth/login`);
});

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    const { password, token } = data;
    return await fetchAPI(
      { password },
      `${base_url}/v1/auth/reset-password?token=${token}`
    );
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setField: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(aboutMeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getTimesheetById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getTimesheets.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        const { errors = [], message = "", user } = action.payload || {};
        if (errors) {
          state.status = "error";
          state.errors = errors;
          state.message = message;
        }
        if (user) {
          state.user = user;
          state.success = "Updated successfully";
        }
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        const {
          errors = [],
          message = "",
          tokens,
          user,
        } = action.payload || {};
        if (errors) {
          state.status = "error";
          state.errors = errors;
          state.message = message;
        }
        if (user && tokens) {
          state.user = user;
          state.isLoggedIn = true;
          window.localStorage.setItem("ems-tokens", JSON.stringify(tokens));
        }
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const {
          errors = [],
          message = "",
          tokens,
          user,
        } = action.payload || {};
        if (errors) {
          state.status = "error";
          state.errors = errors;
          state.message = message;
        }
        if (user && tokens) {
          state.user = user;
          state.isLoggedIn = true;
          window.localStorage.setItem("ems-tokens", JSON.stringify(tokens));
        }
      })
      .addCase(aboutMeAsync.fulfilled, (state, action) => {
        const { errors = [], message = "", user = null } = action.payload || {};
        if (errors) {
          state.status = "error";
          state.errors = errors;
          state.message = message;
          state.user = user;
          state.isLoggedIn = user ? true : false;
        }
        if (user) {
          state.user = user;
          state.isLoggedIn = user ? true : false;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        window.localStorage.clear();

        state.user = null;
        state.isLoggedIn = false;
        state.value = 1;
        state.status = "idle";
        state.loading = false;
        state.errors = [];
        state.message = "";
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.status = "emailSent";
      })
      .addCase(forgotPasswordAsync.rejected, (state) => {
        state.status = "emailSent";
      })
      .addCase(logout.rejected, (state) => {
        window.localStorage.clear();

        state.user = null;
        state.isLoggedIn = false;
        state.value = 1;
        state.status = "idle";
        state.loading = false;
        state.errors = [];
        state.message = "";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        const { message = "" } = action.payload || {};

        if (message) {
          state.status = message;
          state.message = message;
        } else {
          state.status = "password-changed";
          state.message = "";
        }
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        const { message = "" } = action.payload || {};

        if (message) {
          state.status = message;
          state.message = message;
        } else {
          state.status = "password-changed";
          state.message = "";
        }
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        const { data = {} } = action.payload || {};
        state.currentProject = {
          ...data,
        };
        state.status = "success";
        state.loading = false;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.errors = ["Error on getProjectById"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(getTimesheetById.fulfilled, (state, action) => {
        const { data = {} } = action.payload || {};
        state.currentTimesheet = {
          ...data,
        };
        state.status = "success";
        state.loading = false;
      })
      .addCase(getTimesheetById.rejected, (state, action) => {
        state.errors = ["Error on getTimesheetById"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(getTimesheets.fulfilled, (state, action) => {
        const { timesheets = [] } = action.payload || {};
        state.timesheets = timesheets;
        state.status = "success";
        state.loading = false;
      })
      .addCase(getTimesheets.rejected, (state, action) => {
        state.errors = ["Error on getTimesheets"];
        state.status = "error";
        state.loading = false;
      });
  },
});

export const { increment, setField, decrement, incrementByAmount } =
  authSlice.actions;
export const selectCount = (state) => state.auth.value;
export const selectState = (state) => state.auth;
export default authSlice.reducer;
