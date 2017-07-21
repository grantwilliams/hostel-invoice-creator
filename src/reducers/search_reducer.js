import { SEARCH_BOOKINGS, FETCH_ALL, FETCH_BOOKING } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case SEARCH_BOOKINGS:
      return action.payload.data
    case FETCH_ALL:
      return action.payload.data
    case FETCH_BOOKING:
      console.log(action.payload.data)
      return action.payload.data
    default:
      return state;
  }
}