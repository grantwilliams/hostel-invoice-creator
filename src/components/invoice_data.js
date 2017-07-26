import React, { Component } from 'react';
import moment from 'moment';

class InvoiceData extends Component{
  constructor(props) {
    super(props)

    this.state = {
      fee: this.props.booking.channel === 'hc' ? 2 : 0,
      booking: this.props.booking,
      deposit: this.props.booking.deposit,
      invoiceDate: moment(this.props.booking.arrival_date) > moment() ? moment().format("YYYY-MM-DD") : this.props.booking.arrival_date
    }
    this.handleAddNight = this.handleAddNight.bind(this);
    this.handleSubtractNight = this.handleSubtractNight.bind(this)
  }

  componentWillMount() {
    this.setState({
      totalPrice: this.props.booking.total_price - this.state.fee
    }, () => this.setState({
      pricePerNight: this.state.totalPrice / this.state.booking.nights / this.state.booking.pax,
      vat: this.state.totalPrice * 0.07,
      cityTax: this.state.totalPrice * 0.05
    }));
  }

  handleAddNight(location) {
    let dateToChange;
    if(location == 'start') {
      dateToChange = {
        arrival_date: moment(this.state.booking.arrival_date).subtract(1, 'days').format("YYYY-MM-DD")
      }
      } else {
        dateToChange = {
          departure_date: moment(this.state.booking.departure_date).add(1, 'days').format("YYYY-MM-DD")
      }
    }
    this.setState({
      booking: {
        ... this.state.booking,
        ...dateToChange,
        nights: this.state.booking.nights + 1
      },
      totalPrice: this.state.totalPrice + (this.state.pricePerNight * this.state.booking.pax),
      vat: (this.state.totalPrice + (this.state.pricePerNight * this.state.booking.pax)) * 0.07,
      cityTax: (this.state.totalPrice + (this.state.pricePerNight * this.state.booking.pax)) * 0.05
    });
  }

  handleSubtractNight(location) {
    let dateToChange;
    if(location == 'start') {
      dateToChange = {
        arrival_date: moment(this.state.booking.arrival_date).add(1, 'days').format("YYYY-MM-DD")
      }
      } else {
        dateToChange = {
          departure_date: moment(this.state.booking.departure_date).subtract(1, 'days').format("YYYY-MM-DD")
      }
    }
    this.setState({
      booking: {
        ... this.state.booking,
        ...dateToChange,
        nights: this.state.booking.nights - 1
      },
      totalPrice: this.state.totalPrice - (this.state.pricePerNight * this.state.booking.pax),
      vat: (this.state.totalPrice - (this.state.pricePerNight * this.state.booking.pax)) * 0.07,
      cityTax: (this.state.totalPrice - (this.state.pricePerNight * this.state.booking.pax)) * 0.05,
      deposit: this.state.deposit / this.state.booking.nights * (this.state.booking.nights - 1)
    });
  }

  renderItems() {
    const { booking } = this.state
    const vat = this.state.vat ? this.state.vat : Number((this.state.totalPrice * 0.07))
    const cityTax = this.state.cityTax ? this.state.cityTax : Number((this.state.totalPrice * 0.05))
    const pricePerNight = this.state.totalPrice / booking.nights / booking.pax

    return [
      <tr className="row no-gutters" key={0}>
        <td className="col-9">
          <div className="hidden-print">
            <button onClick={() => this.handleSubtractNight('start')} className="btn btn-sm btn-danger nights-button">Subtract night start</button>
            <button onClick={() => this.handleSubtractNight('end')} className="btn btn-sm btn-danger nights-button">Subtract night end</button>
          </div>
          <strong>{booking.room_names.slice(0, 1)}</strong> room from {booking.arrival_date} to {booking.departure_date}<br />
          {booking.pax} person(s) for {booking.nights} nights<br />
          Price per person per night <strong>{pricePerNight.toFixed(2)}€</strong>
          <div className="hidden-print">
            <button onClick={() => this.handleAddNight('start')} className="btn btn-sm btn-success nights-button">Add night start</button>
            <button onClick={() => this.handleAddNight('end')} className="btn btn-sm btn-success nights-button">Add night end</button>
          </div>
        </td>
        <td className="col-2 text-center">{vat.toFixed(2)}€</td>
        <td className="col-1 text-center">{this.state.totalPrice.toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters" key={1}>
        <td className="col-11">
          <strong>City Tax</strong> charged at 5%
        </td>
        <td className="col-1 text-center">{cityTax.toFixed(2)}€</td>
      </tr>,<tr className="row no-gutters" key={2}><td className="col-12"></td></tr>,
      <tr className="row no-gutters" key={3}>
        <td className="col-11">
          <strong>Deposit Paid</strong> online on {booking.booking_date}
        </td>
        <td className="col-1 text-center">{this.state.deposit.toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters" key={4}>
        <td className="col-11">
          <strong>Balance Paid</strong> on {this.state.invoiceDate}
        </td>
        <td className="col-1 text-center">{(this.state.totalPrice - this.state.deposit + cityTax).toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters" key={5}>
        <td className="col-11">
          <strong>Total Paid</strong>
        </td>
        <td className="col-1 text-center"><strong>{(this.state.totalPrice + cityTax).toFixed(2)}€</strong></td>
      </tr>
    ]
  }

  render() {
    return (
      <div>
        <div className="row no-gutters">
          <h5 className="col-6">Reservation No: {this.state.booking.booking_id}</h5>
          <h5 className="col-6 text-right">Invoice Date: {this.state.invoiceDate}</h5>
        </div>
        <hr />
        <table className="table">
          <thead>
            <tr className="row no-gutters">
              <td className="col-9"><strong>Description and Quantity</strong></td>
              <td className="col-2 text-center"><strong>VAT inc (7%)</strong></td>
              <td className="col-1 text-center"><strong>Total</strong></td>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
      </div>
    );
  }
};

export default InvoiceData;