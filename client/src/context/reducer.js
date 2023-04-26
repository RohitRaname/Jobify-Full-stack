import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CLEAR_VALUES,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  SHOW_STATS_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
} from "./actions";

import { initialState } from "./AppContext";

const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === DISPLAY_ALERT)
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Provide all values",
    };

  if (type === CLEAR_ALERT)
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };

  if (type === REGISTER_BEGIN)
    return {
      ...state,
      isLoading: true,
    };
  if (type === REGISTER_SUCCESS)
    return {
      ...state,
      isLoading: false,
      user: payload.user,
      userLocation: payload.user.location,
      jobLocation: payload.user.location,

      showAlert: true,
      alertType: "success",
      alertText: "User created. Redirecting...",
    };
  if (type === REGISTER_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: payload.msg,
    };
  if (type === LOGIN_BEGIN)
    return {
      ...state,
      isLoading: true,
    };
  if (type === LOGIN_SUCCESS)
    return {
      ...state,
      isLoading: false,
      user: payload.user,
      userLocation: payload.user.location,
      jobLocation: payload.user.location,

      showAlert: true,
      alertType: "success",
      alertText: "Login Successful. Redirecting...",
    };
  if (type === LOGIN_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: payload.msg,
    };

  if (type === TOGGLE_SIDEBAR)
    return { ...state, showSidebar: !state.showSidebar };

  // watch 1 video then execute it
  // everything should reset
  if (type === LOGOUT_USER) return { ...initialState, user: null };

  if (type === UPDATE_USER_BEGIN)
    return {
      ...state,
      isLoading: true,
    };
  if (type === UPDATE_USER_SUCCESS)
    return {
      ...state,
      isLoading: false,
      user: payload.user,
      userLocation: payload.user.location,
      jobLocation: payload.user.location,

      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated.",
    };
  if (type === UPDATE_USER_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: payload.msg,
    };

  if (type === HANDLE_CHANGE) {
    const { name, value } = payload;
    return { ...state, [name]: value, page: 1 };
  }

  if (type === CLEAR_VALUES) {
    const resetJobState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
    };
    return { ...state, ...resetJobState };
  }

  if (type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Created",
    };
  }
  if (type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: payload.msg,
    };
  }

  if (type === GET_JOBS_BEGIN)
    return { ...state, isLoading: true, showAlert: false };
  if (type === GET_JOBS_SUCCESS) {
    console.log("payload", payload);
    return {
      ...state,
      isLoading: false,
      jobs: payload.jobs,
      numOfPages: payload.numOfPages,
      totalJobs: payload.totalJobs,
    };
  }

  if (type === SET_EDIT_JOB) {
    const { _id, position, company, jobLocation, jobType, status } =
      state.jobs.find((job) => job._id === payload.id);

    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }

  if (type === DELETE_JOB_BEGIN) return { ...state, isLoading: true };
  if (type === DELETE_JOB_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: payload.msg,
    };
  if (type === DELETE_JOB_SUCCESS) return { ...state, isLoading: false };

  if (type === EDIT_JOB_BEGIN)
    return {
      ...state,
      isLoading: true,
    };
  if (type === EDIT_JOB_SUCCESS)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "JOB UPDATED.",
    };
  if (type === EDIT_JOB_ERROR)
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: payload.msg,
    };

  if (type === SHOW_STATS_BEGIN)
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  if (type === SHOW_STATS_SUCCESS) {
    const { stats, monthlyApplications } = payload;
    return {
      ...state,
      isLoading: false,
      stats,
      monthlyApplications,
    };
  }
  if (type === SHOW_STATS_ERROR)
    return {
      ...state,
      isLoading: false,
    };

  if (type === CLEAR_FILTERS)
    return {
      ...state,
      searchText: "",
      searchJobStatus: "all",
      searchJobType: "all",
      searchSort: "latest",
    };

  if (type === CHANGE_PAGE) return { ...state, page: payload.page };

  if (type === GET_USER_BEGIN)
    return { ...state, userLoading: true, showAlert: false };
  if (type === GET_USER_SUCCESS)
    return {
      ...state,
      userLoading: false,
      user: payload.user,
      userLocation: payload.user.location,
      jobLocation: payload.user.location,
    };

  throw new Error("action-type not matched", type);
};

export default reducer;
