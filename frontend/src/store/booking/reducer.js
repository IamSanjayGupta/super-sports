import * as types from "./actionTypes";

const initData = {
  bookings: [],
  bookingDetails: {},
  approvedPlayerList: [],
  isloading: false,
  isError: false,
};

export const bookingReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case types.BOOKING_LOADING:
      return { ...state, isloading: true, isError: false };
    case types.BOOKING_ERROR:
      return { ...state, isloading: false, isError: true };
    case types.CREATE_BOOKING:
      return { ...state, isloading: false };
    case types.GET_BOOKINGS:
      return { ...state, isloading: false, bookings: payload };
    case types.GET_BOOKING_DETAILS:
      return { ...state, isloading: false, bookingDetails: payload };
    case types.GET_APPROVED_PLAYER_LIST:
      return { ...state, isloading: false, approvedPlayerList: payload };

    default:
      return state;
  }
};
