import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class BookingsList extends Component {
  componentWillMount() {
    this.props.fetchAllBookings()
  }

  handleOnClick(booking_id) {
    console.log(booking_id)
    this.props.history.push(`/booking/${booking_id}`)
  }

  renderTable() {
    if(!this.props.bookings) { return [<tr></tr>] }

    console.log(this.props.bookings.slice(0, 10))
    return this.props.bookings.slice(0, 10).map(booking => {
      // console.log(booking)
      return (
        <tr onClick={() => this.handleOnClick(booking.booking_id)} className="text-center" key={booking.booking_id}>
          <td>{booking.channel}</td>
          <td>{booking.booking_id}</td>
          <td>{booking.booking_date}</td>
          <td>{`${booking.last_name}, ${booking.first_name}`}</td>
          <td>{booking.arrival_date}</td>
          <td>{booking.nights}</td>
          <td>{booking.departure_date}</td>
          <td>{booking.pax}</td>
        </tr>
      )
    })
  } 

  render() {
    return (
      <table className="table table-striped table-responsive booking-list">
        <thead>
          <tr className="text-center">
            <td>Channel</td>
            <td>Booking ID</td>
            <td>Booking Date</td>
            <td>Name</td>
            <td>Arrival Date</td>
            <td>Nights</td>
            <td>Departure Date</td>
            <td>Guests</td>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return { bookings: state.search }
}

export default withRouter(connect(mapStateToProps, actions)(BookingsList));