import React, { Component } from 'react';
import Moment from 'react-moment';

const InvoiceData = ({ booking }) => {
  console.log(booking)
  const fee = booking.channel === 'hc' ? 2 : 0
  const totalPrice = booking.total_price -= fee;
  let vatTotal = 0;
  let cityTaxTotal = 0;
  let total = 0;
  const renderItems = () => {
    if(booking.length < 1) { return <tr></tr> }
    const vat = Number((totalPrice * 0.07))
    const cityTax = Number((totalPrice * 0.05))
    const perNight = Number((totalPrice / booking.nights))
    const totalPerNight = perNight + cityTax

    return [
      <tr className="row no-gutters">
        <td className="col-10">
          <strong>{booking.room_names.slice(0, 1)}</strong> room from {booking.arrival_date} to {booking.departure_date}<br />
          {booking.pax} person(s) for {booking.nights} nights<br />
          Price per person per night <strong>{(totalPrice / booking.nights / booking.pax).toFixed(2)}€</strong>
        </td>
        <td className="col-1 text-center">{vat.toFixed(2)}€</td>
        <td className="col-1 text-center">{totalPrice.toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters">
        <td className="col-10">
          <strong>City Tax</strong> charged at 5%
        </td>
        <td className="col-1 text-center"></td>
        <td className="col-1 text-center">{cityTax.toFixed(2)}€</td>
      </tr>,<hr />,
      <tr className="row no-gutters">
        <td className="col-10">
          <strong>Deposit Paid</strong> online on {booking.booking_date}
        </td>
        <td className="col-1 text-center"></td>
        <td className="col-1 text-center">{booking.deposit.toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters">
        <td className="col-10">
          <strong>Balance Paid</strong> on {booking.arrival_date}
        </td>
        <td className="col-1 text-center"></td>
        <td className="col-1 text-center">{(totalPrice - booking.deposit + cityTax).toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters">
        <td className="col-10">
          <strong>Total Paid</strong>
        </td>
        <td className="col-1 text-center"></td>
        <td className="col-1 text-center"><strong>{(totalPrice + cityTax).toFixed(2)}€</strong></td>
      </tr>
    ]
  }

  return (
    <div>
      <div className="row no-gutters">
        <h5 className="col-6">Reservation No: {booking.booking_id}</h5>
        <h5 className="col-6 text-right">Invoice Date: <Moment format="DD MMM, YYYY">{new Date()}</Moment></h5>
      </div>
      <hr />
      <table className="table">
        <thead>
          <tr className="row no-gutters">
            <td className="col-10">Description and Quantity</td>
            <td className="col-1 text-center">VAT inc<br/>(7%)</td>
            <td className="col-1 text-center">Total</td>
          </tr>
        </thead>
        <tbody className="test-color">
          {renderItems()}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceData;