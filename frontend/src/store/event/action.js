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

export const getEventsAPI =
  ({ q, category }) =>
  async (dispatch) => {
    dispatch({ type: types.EVENT_LOADING });

    let url = `/events?q=${q}`;
    if (category) url += "&category=" + category;

    try {
      const res = await axiosInstance.get(url);
      dispatch({ type: types.GET_EVENTS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: types.EVENT_ERROR, payload: error.response.data.message });
    }
  };

export const getEventDetailsAPI = (eventId) => async (dispatch) => {
  dispatch({ type: types.EVENT_LOADING });
  try {
    const res = await axiosInstance.get("/events" + "/" + eventId);
    dispatch({ type: types.GET_EVENT_DETAILS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.EVENT_ERROR, payload: error.response.data.message });
    return Promise.reject(error.response.data.message);
  }
};
