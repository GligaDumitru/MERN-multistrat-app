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
  successMessage: "",
  currentProject: null,
  currentRequest: null,
  loading: false,
  projects: [],
  requests: [],
  people: [],
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
    return accessToken ? await getAPI(`${base_url}/v1/projects/${id}`) : null;
  }
);

export const getRequestById = createAsyncThunk(
  "data/fetchRequestById",
  async (id) => {
    const accessToken = getToken("access");
    return accessToken ? await getAPI(`${base_url}/v1/requests/${id}`) : null;
  }
);

export const getPeople = createAsyncThunk("data/fetchPeople", async () => {
  const accessToken = getToken("access");
  return accessToken ? await getAPI(`${base_url}/v1/users`) : null;
});

export const getProjects = createAsyncThunk("data/fetchProjects", async () => {
  const accessToken = getToken("access");
  return accessToken ? await getAPI(`${base_url}/v1/projects`) : null;
});

export const getRequests = createAsyncThunk("data/fetchRequests", async () => {
  const accessToken = getToken("access");
  return accessToken ? await getAPI(`${base_url}/v1/requests`) : null;
});

export const forgotPasswordAsync = createAsyncThunk(
  "auth/fetchForgotPassword",
  async (data) => {
    return await fetchAPIWithBearer(
      data,
      `${base_url}/v1/auth/forgot-password`
    );
  }
);

export const createEmployee = createAsyncThunk(
  "auth/createEmployee",
  async (data) => {
    return await fetchAPIWithBearer(data, `${base_url}/v1/users/create`);
  }
);

export const deleteProject = createAsyncThunk(
  "auth/deleteProject",
  async (id) => {
    const response = await fetchAPIWithBearer(
      {},
      `${base_url}/v1/projects/${id}`,
      "DELETE"
    );
    return { ...response, id };
  }
);

export const deleteRequest = createAsyncThunk(
  "auth/deleteRequest",
  async (id) => {
    const response = await fetchAPIWithBearer(
      {},
      `${base_url}/v1/requests/${id}`,
      "DELETE"
    );
    return { ...response, id };
  }
);

export const deletePerson = createAsyncThunk(
  "auth/deletePerson",
  async (id) => {
    const response = await fetchAPIWithBearer(
      {},
      `${base_url}/v1/users/${id}`,
      "DELETE"
    );
    return { ...response, id };
  }
);

export const createProject = createAsyncThunk(
  "auth/createProject",
  async (data) => {
    return await fetchAPIWithBearer(data, `${base_url}/v1/projects`);
  }
);
export const createRequest = createAsyncThunk(
  "auth/createRequest",
  async (data) => {
    return await fetchAPIWithBearer(data, `${base_url}/v1/requests`);
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

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (props) => {
    const { id, payload } = props;

    return await fetchAPIWithBearer(
      payload,
      `${base_url}/v1/projects/${id}`,
      "PATCH"
    );
  }
);

export const updateRequest = createAsyncThunk(
  "project/updateRequest",
  async (props) => {
    const { id, payload } = props;

    return await fetchAPIWithBearer(
      payload,
      `${base_url}/v1/requests/${id}`,
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
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deletePerson.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.status = "loading";
        state.loading = true;
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
      .addCase(getRequestById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateRequest.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getPeople.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getProjects.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createRequest.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getRequests.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProject.pending, (state) => {
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
        const { project = {} } = action.payload || {};
        state.currentProject = {
          ...project,
        };
        state.status = "success";
        state.loading = false;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.errors = ["Error on getProjectById"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(getRequests.fulfilled, (state, action) => {
        const { requests = [] } = action.payload || {};
        state.requests = requests;
        state.status = "success";
        state.loading = false;
      })
      .addCase(getRequests.rejected, (state, action) => {
        state.errors = ["Error on getRequests"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(getPeople.fulfilled, (state, action) => {
        const { results = [] } = action.payload || {};
        state.people = results;
        state.status = "success";
        state.loading = false;
      })
      .addCase(getPeople.rejected, (state, action) => {
        state.errors = ["Error on getPeople"];
        state.people = [];
        state.status = "error";
        state.loading = false;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        const { projects = [] } = action.payload || {};
        state.projects = projects;
        state.status = "success";
        state.loading = false;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.errors = ["Error on getProjects"];
        state.projects = [];
        state.status = "error";
        state.loading = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        console.log("createEmployee.fulfilled", action.payload);
        const { message = "", errors = [], user } = action.payload || {};
        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage =
            "Success! An email will be sent to confirm the account";

          if (user) {
            state.people.push(user);
          }
        }
        state.loading = false;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        console.log("createEmployee.rejected", action.payload);
        state.message = "Somethnig went wrong. Please try again later";
        state.status = "idle";
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        console.log("createProject.fulfilled", action.payload);
        const {
          message = "",
          errors = [],
          project = null,
        } = action.payload || {};
        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The project has been created";
        }
        if (project) {
          console.log(state.projects, project);
          state.projects.push(project);
        }
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        console.log("createEmployee.rejected", action.payload);
        state.message = "Somethnig went wrong. Please try again later";
        state.status = "idle";
        state.loading = false;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        console.log("createRequest.fulfilled", action.payload);
        const {
          message = "",
          errors = [],
          request = null,
        } = action.payload || {};
        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The request has been created";
        }
        if (request) {
          console.log(state.requests, request);
          state.requests.push(request);
        }
        state.loading = false;
      })
      .addCase(createRequest.rejected, (state, action) => {
        console.log("createEmployee.rejected", action.payload);
        state.message = "Somethnig went wrong. Please try again later";
        state.status = "idle";
        state.loading = false;
      })
      .addCase(getRequestById.fulfilled, (state, action) => {
        const { request = {} } = action.payload || {};
        state.currentRequest = {
          ...request,
        };
        state.status = "success";
        state.loading = false;
      })
      .addCase(getRequestById.rejected, (state, action) => {
        state.errors = ["Error on getRequestById"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        const { message = "", errors = [], id = null } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The project has been deleted";
          if (id) {
            const existId = state.requests.some((p) => p.id === id);
            if (existId) {
              state.requests.splice(state.requests.indexOf(id), 1);
            }
          }
        }
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.errors = ["Error on deleteRequest"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const { message = "", errors = [], id = null } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The project has been deleted";
          if (id) {
            const existId = state.projects.some((p) => p.id === id);
            if (existId) {
              state.projects.splice(state.projects.indexOf(id), 1);
            }
          }
        }
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.errors = ["Error on deleteProject"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        const { message = "", errors = [], id = null } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The employee has been deleted";
          if (id) {
            const existId = state.people.some((p) => p.id === id);
            if (existId) {
              state.people.splice(state.people.indexOf(id), 1);
            }
          }
        }
        state.loading = false;
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.errors = ["Error on deleteProject"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const {
          message = "",
          errors = [],
          project = {},
        } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The project has been updated";
          if (project) {
            const existId = state.projects.some((p) => p.id === project.id);
            if (existId) {
              state.projects[state.projects.indexOf(project.id)] = {
                ...project,
              };
            }
          }
        }
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.errors = ["Error on updateProject"];
        state.status = "error";
        state.loading = false;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        const {
          message = "",
          errors = [],
          request = {},
        } = action.payload || {};

        if (message || errors.length > 0) {
          state.message = message;
          state.errors = errors;
        } else {
          state.status = "idle";
          state.successMessage = "Success! The request has been updated";
          if (request) {
            const existId = state.requests.some((p) => p.id === request.id);
            if (existId) {
              alert('a')
              state.requests[state.requests.indexOf(request.id)] = {
                ...request,
              };
            }
          }
        }
        state.loading = false;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.errors = ["Error on updateRequest"];
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
