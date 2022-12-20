import * as types from "./actionTypes";

const initData = {
  token: "",
  isloading: false,
  isError: false,
};

export const authReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case "value":
      break;

    default:
      return state;
  }
};
