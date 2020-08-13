import Cookies from 'js-cookie';
import { arrayMove } from 'react-sortable-hoc';
import { combineReducers } from 'redux';

import {
  ADD_TIMEZONE,
  DELETE_TIMEZONE,
  LOAD_COOKIE,
  SORT_TIMEZONES,
  COOKIE_NAME
} from '../actions/index';


const TZ_DEFAULTS = [
  'Asia/Kolkata',
  'US/Eastern',
  'US/Central',
  'US/Mountain',
  'US/Pacific',
  'US/Hawaii'
];

const setCookie = (timezones = []) => {
  const value = { timezones };
  Cookies.set(COOKIE_NAME, value, { expires: 365 * 5 });
}

if (!Cookies.get(COOKIE_NAME)) {
  setCookie(TZ_DEFAULTS);
}

const timezonesReducer = (state=[], action) => {
  switch(action.type) {
    case ADD_TIMEZONE: {
      const timezones = [action.payload, ...state];
      setCookie(timezones);
      return timezones;
    }

    case DELETE_TIMEZONE: {
      const timezones = state.filter((name) => name !== action.payload);
      setCookie(timezones);
      return timezones;
    }

    case LOAD_COOKIE: {
      if(action.payload && action.payload.length) {
        return action.payload;
      }

      return state;
    }

    case SORT_TIMEZONES: {
      // NOTE: arrayMove uses slice and returns new array
      const timezones = arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
      setCookie(timezones);
      return timezones;
    }

    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  timezones: timezonesReducer
});

export default rootReducer;
