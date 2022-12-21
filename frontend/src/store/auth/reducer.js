import {
  clearLocalStorage,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";
import * as types from "./actionTypes";

const initData = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  signupStatus: false,
  auth: getLocalStorageItem("accessToken") || "",
  accessToken: getLocalStorageItem("accessToken") || "",
};

export const authReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case types.ACCOUNT_LOADING:
      return { ...state, isLoading: true, isError: false, signupStatus: false };
    case types.ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        signupStatus: false,
        errorMessage: payload,
      };
    case types.LOGIN_SUCCESS:
      setLocalStorageItem("accessToken", payload.accessToken);
      setLocalStorageItem("refreshToken", payload.refreshToken);
      return { ...state, isLoading: false, accessToken: payload.accessToken };
    case types.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, signupStatus: true };
    case types.ACCOUNT_LOGOUT:
      clearLocalStorage();
      return { ...state, isLoading: false, accessToken: "", auth: "" };

    default:
      return state;
  }
};
