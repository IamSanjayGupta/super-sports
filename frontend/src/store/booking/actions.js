import { axiosInstance } from "../../utils/axiosConfig";
import * as types from "./actionTypes";

export const createBookingAPI = (bookingDetails) => async (dispatch) => {
  dispatch({ type: types.BOOKING_LOADING });
  try {
    const res = await axiosInstance.post("/booking", bookingDetails);
    dispatch({ type: types.CREATE_BOOKING, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BOOKING_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};
