import { getCookie } from '../reducers';


export const ADD_TIMEZONE = 'ADD_TIMEZONE';
export const DELETE_TIMEZONE = 'DELETE_TIMEZONE';
export const UPDATE_NOTES = 'UPDATE_NOTES';
export const SORT_TIMEZONES = 'SORT_TIMEZONES';
export const LOAD_COOKIE = 'LOAD_COOKIE';

// Add a timezone to list
export const addTimezone = name => ({
  type: ADD_TIMEZONE,
  payload: { z: name, n: '' }
});

// Delete a timezone from list
export const deleteTimezone = payload => ({
  type: DELETE_TIMEZONE,
  payload
});

// Update notes for a given timezone
export const updateNotes = (idx, notes = '') => ({
  type: UPDATE_NOTES,
  payload: { idx, notes }
});

// Load timezones from cookie
export const loadCookie = () => {
  const c = getCookie();

  return {
    type: LOAD_COOKIE,
    payload: c.data
  }
};

// Change order of timezones list
export const sortTimezones = (oldIndex, newIndex) => ({
  type: SORT_TIMEZONES,
  payload: { oldIndex, newIndex }
});
