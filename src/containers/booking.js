import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import InvoiceHeader from '../components/invoice_header';
import Address from '../components/address';
import InvoiceData from '../components/invoice_data';

class Booking extends Component {
componentWillMount() {
  const { id } = this.props.match.params
  this.props.fetchBooking(id)
}

  render() {
    const { booking } = this.props
    if(!booking) { return <div></div> }
    return (
      <div className="booking">
        <InvoiceHeader />
        <Address firstName={booking.first_name} lastName={booking.last_name} />
        <hr />
        <InvoiceData
        booking_id={booking.booking_id}
        channel={booking.channel}
        arrivalDate={booking.arrival_date}
        nights={booking.nights}
        pax={booking.pax}
        totalPrice={booking.total_price}
        deposit={booking.deposit}
        dates={booking.dates}
        roomType={booking.room_names} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {booking: state.search}
}

export default connect(mapStateToProps, actions)(Booking);