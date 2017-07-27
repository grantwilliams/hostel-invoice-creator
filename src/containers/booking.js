import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import InvoiceHeader from '../components/invoice_header';
import InvoiceAddress from '../components/invoice_address';
import InvoiceData from './invoice_data';

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
        <InvoiceAddress />
        <hr />
        <InvoiceData />
        <button onClick={this.printPage} className="btn btn-primary hidden-print">PRINT</button>
      </div>
    );
  }
}

const mapStateToProps = ({ booking }) => ({ booking: booking.booking })

export default connect(mapStateToProps, actions)(Booking);