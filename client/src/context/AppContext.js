import axios from "axios";
import React, { createContext, useContext,  useEffect,  useReducer } from "react";

import reducer from "./reducer";
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
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  SHOW_STATS_ERROR,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
  GET_USER_BEGIN,
} from "./actions";

const AppContext = createContext();

const setUserInLocalStorage = (curUser) =>
  localStorage.setItem("user", JSON.stringify(curUser));
const removeUserFromLocalStorage = () => localStorage.removeItem("user");

const getUserFromLocalStorage = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : false;

const user = getUserFromLocalStorage();

export const initialState = {
  userLoading: false,

  isLoading: false,
  user: user,
  userLocation: user?.location,

  ///////////////////////////
  // components
  ///////////////////////////
  isAlert: false,
  alertType: "",
  alertText: "",
  showSidebar: false,

  // Job page
  isEditing: false,
  editJobId: "",
  company: "",
  jobLocation: user?.location,
  position: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",

  // jobs page
  jobs: [],
  page: 1,
  numOfPages: 0,
  totalJobs: [],

  stats: {},
  monthlyApplications: [],

  searchText: "",
  searchJobStatus: "all",
  searchJobType: "all",
  searchSort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],

  ///////////////////////////////
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // this send token to every fucking req
  // axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    function (config) {
      // config.headers["Authorization"] = `Bearer ${state.token}`;
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  authFetch.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response.status === 401) return logoutUser();
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  //////////////////////////////////////////
  // useEffect
  //////////////////////////////////////////
  const getCurrentUser = async () => {
    dispatch({ type: GET_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/auth/getCurrentUser");
      const { user } = data;

      setUserInLocalStorage(user);
      dispatch({ type: GET_JOBS_SUCCESS,payload:{user} });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) return;
    getCurrentUser();
  }, []);

  ///////////////////////////////////////////
  // functions
  ///////////////////////////////////////////
  const clearAlert = () => {
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);
  };
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const register = async (currentUser) => {
    dispatch({ type: REGISTER_BEGIN });
    try {
      const res = await axios.post("/api/v1/auth/register", currentUser);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }

    clearAlert();
  };

  const login = async (submitData) => {
    dispatch({ type: LOGIN_BEGIN });
    try {
      const res = await axios.post("/api/v1/auth/login", submitData);
      const { user } = res.data;

      dispatch({ type: LOGIN_SUCCESS, payload: { user } });
      setUserInLocalStorage(user)
    } catch (err) {
      const msg = err.response.data.msg;
      dispatch({
        type: LOGIN_ERROR,
        payload: { msg: msg },
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR });

  const logoutUser = () => {
    authFetch.get('/auth/logout')
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    // data get from db (token and user )

    try {
      const res = await authFetch.patch("/auth/updateUser", currentUser);
      const { user } = res.data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } });
    } catch (err) {
      // alert msg removed after 3 sec so if user after logout instant login then error show in form(to not error show )
      if (err.response.status !== 401)
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.data.msg },
        });
    }

    clearAlert();

    // dispatch({ type: UPDATE_USER, payload: {} });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => dispatch({ type: CLEAR_VALUES });

  const createJob = async (job) => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      await authFetch.post("/jobs", job);
      dispatch({ type: CREATE_JOB_SUCCESS });
      clearValues();
    } catch (err) {
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }

    clearAlert();
    // getJobs();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const getJobs = async () => {
    const { searchText, searchJobStatus, searchJobType, searchSort, page } =
      state;
    let url = `/jobs?page=${page}&${
      searchText ? `search=${searchText}&` : ""
    }jobStatus=${searchJobStatus}&jobType=${searchJobType}&sort=${searchSort}`;

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const res = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = res.data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (err) {
      // logoutUser();
    }

    clearAlert();
  };

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });

    try {
      await authFetch.delete(`/jobs/${id}`);
      dispatch({ type: DELETE_JOB_SUCCESS });
    } catch (err) {
      // logoutUser();
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });

      clearAlert();
    }
  };

  const editJob = async () => {
    const { editJobId, position, company, jobLocation, jobType, status } =
      state;

    try {
      dispatch({ type: EDIT_JOB_BEGIN });

      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      clearValues();
    } catch (err) {
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }

    clearAlert();
    // getJobs();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });

    try {
      const res = await authFetch.get(`/jobs/stats`);
      const { stats, monthlyApplications } = res.data;
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: { stats, monthlyApplications },
      });
    } catch (err) {
      // logoutUser();

      dispatch({
        type: SHOW_STATS_ERROR,
      });
    }

    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) =>
    dispatch({ type: CHANGE_PAGE, payload: { page } });

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        register,
        login,
        logoutUser,
        toggleSidebar,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        getJobs,
        getCurrentUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
