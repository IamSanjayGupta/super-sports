import { axiosInstance } from "../../utils/axiosConfig";
import * as types from "./actionTypes";

//create booking
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

//get all bookings
export const getBookingAPI = () => async (dispatch) => {
  dispatch({ type: types.BOOKING_LOADING });
  try {
    const res = await axiosInstance.get("/booking");
    dispatch({ type: types.GET_BOOKINGS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BOOKING_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};

//get appoved player list
export const getApprovedPlayerListAPI = (eventId) => async (dispatch) => {
  dispatch({ type: types.BOOKING_LOADING });
  try {
    const res = await axiosInstance.get("/booking/" + eventId);
    dispatch({ type: types.GET_APPROVED_PLAYER_LIST, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BOOKING_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};

//get organizer approval pending bookings
export const getPendingApprovalAPI = () => async (dispatch) => {
  dispatch({ type: types.BOOKING_LOADING });
  try {
    const res = await axiosInstance.get("/booking/pendingBookings");
    dispatch({ type: types.GET_MY_PENDING_APPROVAL_BOOKINGS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BOOKING_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};

//Accept or reject booking handler
export const updateBookingAPI = (bookingId, data) => async (dispatch) => {
  dispatch({ type: types.BOOKING_LOADING });
  try {
    const res = await axiosInstance.patch("/booking/" + bookingId, data);
    dispatch({ type: types.UPDATE_BOOKING, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BOOKING_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};
