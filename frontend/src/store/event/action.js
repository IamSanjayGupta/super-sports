import { axiosInstance } from "../../utils/axiosConfig";
import * as types from "./actionTypes";

export const createEventAPI = (eventDetails) => async (dispatch) => {
  dispatch({ type: types.EVENT_LOADING });
  try {
    const res = await axiosInstance.post("/events", eventDetails);
    dispatch({ type: types.CREATE_EVENT, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.EVENT_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};
