import { axiosInstance } from "../../utils/axiosConfig";
import * as types from "./actionTypes";

export const loginAPI = (creds) => async (dispatch) => {
  dispatch({ type: types.ACCOUNT_LOADING });
  axiosInstance
    .post("/users/login", creds)
    .then((res) => {
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: types.ACCOUNT_ERROR, payload: err.response.data.message });
    });
};

export const signupAPI = (creds) => async (dispatch) => {
  dispatch({ type: types.ACCOUNT_LOADING });
  axiosInstance
    .post("/users/signup", creds)
    .then((res) => {
      dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: types.ACCOUNT_ERROR, payload: err.response.data.message });
    });
};
