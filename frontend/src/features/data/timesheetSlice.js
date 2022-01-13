import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPIWithBearer, getAPI, getToken } from "../../api";

const base_url = "http://localhost:5000";

const initialState = {
  mesage: "",
  errors: [],
  timesheets: [],
  success: "",
  loading: false,
  successMessage: "",
  currentTimesheet: null,
};

export const getTimesheets = createAsyncThunk(
  "timesheet/fetchTimesheets",
  async () => {
    const accessToken = getToken("access");
    console.log("accessToken", accessToken);
    return accessToken ? await getAPI(`${base_url}/v1/timesheets`) : null;
  }
);

export const createTimesheet = createAsyncThunk(
  "timesheet/createTimesheet",
  async (data) => {
    return await fetchAPIWithBearer(data, `${base_url}/v1/timesheets`);
  }
);

export const getTimesheetById = createAsyncThunk(
  "timesheet/fetchTimesheetById",
  async (id) => {
    const accessToken = getToken("access");
    return accessToken ? await getAPI(`${base_url}/v1/timesheets/${id}`) : null;
  }
);

export const deleteTimesheet = createAsyncThunk(
  "auth/deleteTimesheet",
  async (id) => {
    const response = await fetchAPIWithBearer(
      {},
      `${base_url}/v1/timesheets/${id}`,
      "DELETE"
    );
    return { ...response, id };
  }
);

export const updateTimesheet = createAsyncThunk(
  "timesheet/updateTimesheet",
  async (props) => {
    const { id, payload } = props;

    return await fetchAPIWithBearer(
      payload,
      `${base_url}/v1/timesheets/${id}`,
      "PATCH"
    );
  }
);

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setField: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimesheets.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createTimesheet.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getTimesheetById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateTimesheet.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteTimesheet.pending, (state) => {
        state.status = "loading";
        state.loading = true;
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
      })
      .addCase(createTimesheet.fulfilled, (state, action) => {
        const {
          message = "",
          errors = [],
          timesheet = null,
        } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The timesheet has been created";
        }
        if (timesheet) {
          state.timesheets.push(timesheet);
        }
        state.loading = false;
      })
      .addCase(createTimesheet.rejected, (state, action) => {
        state.errors = ["Error on getTimesheets"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(getTimesheetById.fulfilled, (state, action) => {
        const {
          message = "",
          errors = [],
          timesheet = null,
        } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
        }
        if (timesheet) {
          state.currentTimesheet = { ...timesheet };
        }
        state.loading = false;
      })
      .addCase(getTimesheetById.rejected, (state, action) => {
        state.errors = ["Error on getTimesheets"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(updateTimesheet.fulfilled, (state, action) => {
        const {
          message = "",
          errors = [],
          timesheet = {},
        } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The timesheet has been updated";
          if (timesheet) {
            const existId = state.timesheets.some((p) => p.id === timesheet.id);
            if (existId) {
              state.timesheets[state.timesheets.indexOf(timesheet.id)] = {
                ...timesheet,
              };
            }
          }
        }
        state.loading = false;
      })
      .addCase(updateTimesheet.rejected, (state, action) => {
        state.errors = ["Error on updateTimesheet"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(deleteTimesheet.fulfilled, (state, action) => {
        const { message = "", errors = [], id = null } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The timesheet has been deleted";
          if (id) {
            const existId = state.timesheets.some((p) => p.id === id);
            if (existId) {
              state.timesheets.splice(state.timesheets.indexOf(id), 1);
            }
          }
        }
        state.loading = false;
      })
      .addCase(deleteTimesheet.rejected, (state, action) => {
        state.errors = ["Error on deleteTimesheet"];
        state.status = "error";
        state.loading = false;
      });
  },
});

export const { setField } = timesheetSlice.actions;
export const selectStateTimesheet = (state) => state.timesheet;
export default timesheetSlice.reducer;
