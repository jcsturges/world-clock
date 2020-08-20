import Cookies from 'js-cookie';
import { arrayMove } from 'react-sortable-hoc';
import { combineReducers } from 'redux';

import {
  ADD_TIMEZONE,
  DELETE_TIMEZONE,
  LOAD_COOKIE,
  UPDATE_NOTES,
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
].map(name => ({ z: name, n: '' }));

const setCookie = (data = []) => {
  const value = { data };
  Cookies.set(COOKIE_NAME, value, { expires: 365 * 5, sameSite: 'Strict' });
}

if (!Cookies.get(COOKIE_NAME)) {
  setCookie(TZ_DEFAULTS);
}

const timezonesReducer = (state=[], action) => {
  const data = action.payload;

  switch(action.type) {
    case ADD_TIMEZONE: {
      const timezones = [data, ...state];
      setCookie(timezones);
      return timezones;
    }

    case DELETE_TIMEZONE: {
      const timezones = [...state];
      timezones.splice(data, 1);

      setCookie(timezones);
      return timezones;
    }

    case UPDATE_NOTES: {
      const { idx, notes } = data;

      const timezones = [...state];
      timezones[idx].n = notes;

      setCookie(timezones);
      return timezones;
    }

    case LOAD_COOKIE: {
      if(data && data.length) {
        return data;
      }

      return state;
    }

    case SORT_TIMEZONES: {
      // NOTE: arrayMove uses slice and returns new array
      const timezones = arrayMove(state, data.oldIndex, data.newIndex);
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
