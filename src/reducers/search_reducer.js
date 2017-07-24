import { SEARCH_BOOKINGS, FETCH_ALL, FETCH_BOOKING } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case SEARCH_BOOKINGS:
      return {
        bookings: action.payload.data,
        pageCount: Math.ceil(action.payload.data.length / 10)
      }
    case FETCH_ALL:
      return {
        bookings: action.payload.data,
        pageCount: Math.ceil(action.payload.data.length / 10)
      }
    case FETCH_BOOKING:
      return action.payload.data
    default:
      return state;
  }
}