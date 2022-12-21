import * as types from "./actionTypes";

const initData = {
  events: [],
  isloading: false,
  isError: false,
};

export const eventReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case types.EVENT_LOADING:
      return { ...state, isloading: true, isError: false };
    case types.EVENT_ERROR:
      return { ...state, isloading: false, isError: true };
    case types.CREATE_EVENT:
      return { ...state, isloading: false };
    case types.GET_EVENTS:
      return { ...state, isloading: false, events: payload };

    default:
      return state;
  }
};
