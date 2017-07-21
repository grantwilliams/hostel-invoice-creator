import axios from 'axios';
import { SEARCH_BOOKINGS, FETCH_ALL, FETCH_BOOKING } from '../actions/types';

const ROOT_URL = 'http://127.0.0.1:8000'

export function fetchAllBookings() {
  const request = axios.get(`${ROOT_URL}/myallocator/search/all`);

  return {
    type: FETCH_ALL,
    payload: request
  }
}

export function searchBookings(query) {
  const request = axios.get(`${ROOT_URL}/myallocator/search/?q=${query}`)

  return {
    type: SEARCH_BOOKINGS,
    payload: request
  }
}

export function fetchBooking(id) {
  const request = axios.get(`${ROOT_URL}/myallocator/booking/?id=${id}`)

  return {
    type: FETCH_BOOKING,
    payload: request
  }
}