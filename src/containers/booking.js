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

  printPage(){
    window.print()
  }

  render() {
    const { booking } = this.props
    if(!booking) { return <div></div> }
    return (
      <div className="booking">
        <InvoiceHeader />
        <Address firstName={booking.first_name} lastName={booking.last_name} email={booking.email} />
        <hr />
        <InvoiceData booking={booking} />
        <button onClick={this.printPage} className="btn btn-primary hidden-print">PRINT</button>
      </div>
    );
  }
}

function mapStateToProps({ search }) {
  return {booking: search.booking}
}

export default connect(mapStateToProps, actions)(Booking);