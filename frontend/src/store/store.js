import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { bookingReducer } from "./booking/reducer";
import { eventReducer } from "./event/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  booking: bookingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
