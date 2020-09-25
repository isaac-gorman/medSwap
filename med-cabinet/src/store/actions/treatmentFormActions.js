import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

// action types
export const ADD_TREATMENT = "ADD_TREATMENT";
export const ADD_TREATMENT_SUCCESS = "ADD_TREATMENT_SUCCESS";
export const ADD_TREATMENT_ERROR = "ADD_TREATMENT_ERROR";

export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_ERROR = "EDIT_PROFILE_ERROR";

export const DELETE_PROFILE = "DELETE_PROFILE";
export const DELETE_PROFILE_SUCCESS = "DELETE_PROFILE_SUCCESS";
export const DELETE_PROFILE_ERROR = "DELETE_PROFILE_ERROR";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const SAVE_STRAIN = "SAVE_STRAIN";
export const SAVE_STRAIN_SUCCESS = "SAVE_STRAIN_SUCCESS";
export const SAVE_STRAIN_ERROR = "SAVE_STRAIN_ERROR";

export const DELETE_STRAIN = "DELETE_STRAIN";
export const DELETE_STRAIN_SUCCESS = "DELETE_STRAIN_SUCCESS";
export const DELETE_STRAIN_ERROR = "DELETE_STRAIN_ERROR";

// server API url
const url = "https://medswap.herokuapp.com/api/";
const vercel = "https://med-swap-project.vercel.app";
// action creators

// Login
export const loginUser = (info) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    console.log("====> info", info);
    axios
      .post("https://medswap.herokuapp.com/api/auth/login", info)
      .then((res) => {
        console.log(res.data.user, "<==== SUCCESSFUL LOGIN DATA");
        localStorage.setItem("token", res.data.token);
        // window.location = `${vercel}protected`;
        // window.location = `http://localhost:3000/protected`;
        window.location = `${vercel}/protected`;
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err, "<==== ERROR ON LOGIN");
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: {
            message: "Cant return",
          },
        });
      });
  };
};

// Register
export const registerUser = (info) => {
  console.log(info);
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    axios
      .post(`https://medswap.herokuapp.com/api/auth/register`, info)
      .then((res) => {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: REGISTER_USER_ERROR, payload: err });
      })
      .finally(() => {
        window.location = `${vercel}/login`;
      });
  };
};

// Add Treatment Action
export const addTreatment = (info) => {
  return (dispatch) => {
    dispatch({ type: ADD_TREATMENT });
    setTimeout(function () {
      axios
        .post(`https://potbot2020.herokuapp.com/predict`, info)
        .then((res) => {
          console.log("ACTION CONSOLEEE", res);
          console.log("ACTION res.data", res.data);
          dispatch({
            type: ADD_TREATMENT_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: ADD_TREATMENT_ERROR,
            payload: {
              message: "Cant return",
            },
          });
        });
    }, 3500);
  };
};

// Edit Profile Action
export const editProfile = (user, id) => {
  return (dispatch) => {
    dispatch({ type: EDIT_PROFILE });
    axiosWithAuth()
      .put(`auth/${id}`, user)
      .then((res) => {
        console.log(res, "!!!!!");
        dispatch({
          type: EDIT_PROFILE_SUCCESS,
          payload: res.config.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_PROFILE_ERROR,
          payload: {
            message: "ERROR",
          },
        });
      });
  };
};

// Delete Profile Action
export const deleteProfile = (user, id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_PROFILE });
    axiosWithAuth()
      .delete(`auth/${id}`, user)
      .then((res) => {
        dispatch({
          type: DELETE_PROFILE_SUCCESS,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: DELETE_PROFILE_ERROR,
          payload: "There was an error",
        });
      })
      .finally(() => {
        window.location = `${vercel}`;
      });
  };
};

// Save Treatment Action
export const saveTreatment = (info) => {
  return (dispatch) => {
    console.log("I am the info", info);
    // axiosWithAuth()
    axios
      .post("/savedstrains", info)
      .then((res) => {
        console.log("I am the res ", res);
        dispatch({ type: SAVE_STRAIN_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Delete SavedTreatment
export const deleteStrain = (id) => {
  return (dispatch) => {
    console.log("I am the id", id);
    axiosWithAuth()
      .delete(`savedstrains/${id}`)
      .then((res) => {
        console.log("I am the res ", res);
        dispatch({ type: DELETE_STRAIN_SUCCESS, payload: id });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
