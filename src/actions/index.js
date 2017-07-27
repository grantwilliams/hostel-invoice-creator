import axios from 'axios';
import moment from 'moment';
import { SEARCH_BOOKINGS, FETCH_ALL, SHOW_BOOKING, FETCH_TODAY, SAVE_ADDRESS } from '../actions/types';

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
  return function(dispatch) {
  axios.get(`${ROOT_URL}/myallocator/booking/?id=${id}`)
    .then(({ data }) => {
      const fee = data.channel == 'hc' ? 2 : 0
      const total_price = data.total_price - fee
      const pricePerNight = total_price / data.nights / data.pax
      const vat = total_price * 0.07
      const cityTax = total_price * 0.05
      const invoiceDate = moment(data.arrival_date) > moment() ? moment().format("YYYY-MM-DD") : data.arrival_date

      dispatch({
        type: SHOW_BOOKING,
        payload: { ...data, fee, total_price, pricePerNight, vat, cityTax, invoiceDate }
      })
    })
  }
}

export function addNight(location) {
  return function(dispatch, getState) {
    let { booking } = getState().search
    let dateToChange;
    if(location == 'start') {
      dateToChange = {
        arrival_date: moment(booking.arrival_date).subtract(1, 'days').format("YYYY-MM-DD")
      }
      } else {
        dateToChange = {
          departure_date: moment(booking.departure_date).add(1, 'days').format("YYYY-MM-DD")
      }
    }
    booking = {
      ... booking,
      ...dateToChange,
      nights: booking.nights + 1,
      total_price: booking.total_price + (booking.pricePerNight * booking.pax),
      vat: (booking.total_price + (booking.pricePerNight * booking.pax)) * 0.07,
      cityTax: (booking.total_price + (booking.pricePerNight * booking.pax)) * 0.05
    };
    dispatch({
      type: SHOW_BOOKING,
      payload: booking
    })
  }
}

export function subtractNight(location) {
  return function(dispatch, getState) {
    let { booking } = getState().search
    let dateToChange;
    if(location == 'start') {
      dateToChange = {
        arrival_date: moment(booking.arrival_date).add(1, 'days').format("YYYY-MM-DD")
      }
      } else {
        dateToChange = {
          departure_date: moment(booking.departure_date).subtract(1, 'days').format("YYYY-MM-DD")
      }
    }
    booking = {
      ... booking,
      ...dateToChange,
      nights: booking.nights - 1,
      total_price: booking.total_price - (booking.pricePerNight * booking.pax),
      vat: (booking.total_price - (booking.pricePerNight * booking.pax)) * 0.07,
      cityTax: (booking.total_price - (booking.pricePerNight * booking.pax)) * 0.05
    };
    dispatch({
      type: SHOW_BOOKING,
      payload: booking
    })
  }
}

export function fetchTodaysArrivals() {
  const request = axios.get(`${ROOT_URL}/myallocator/search/today`)

  return {
    type: FETCH_TODAY,
    payload: request
  }
}

export const saveAddress = (formProps) => ({
  type: SAVE_ADDRESS,
  payload: formProps
})