import Cookies from 'js-cookie';


export const ADD_TIMEZONE = 'ADD_TIMEZONE';
export const DELETE_TIMEZONE = 'DELETE_TIMEZONE';
export const SORT_TIMEZONES = 'SORT_TIMEZONES';
export const LOAD_COOKIE = 'LOAD_COOKIE';

export const COOKIE_NAME = 'tzdata';

// Add a timezone to list
export const addTimezone = payload => ({
  type: ADD_TIMEZONE,
  payload
});

// Delete a timezone from list
export const deleteTimezone = payload => ({
  type: DELETE_TIMEZONE,
  payload
});

// Load timezones from cookie
export const loadCookie = () => {
  const data = Cookies.getJSON(COOKIE_NAME);
  return {
    type: LOAD_COOKIE,
    payload: data.timezones,
  }
};

// Change order of timezones list
export const sortTimezones = (oldIndex, newIndex) => ({
  type: SORT_TIMEZONES,
  payload: { oldIndex, newIndex }
});
