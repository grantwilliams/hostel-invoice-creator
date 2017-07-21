import React from 'react';

const InvoiceData = ({channel, arrivalDate, nights, pax, totalPrice, deposit, dates, roomType}) => {
  const fee = channel === 'hc' ? 2 : 0
  totalPrice = channel === 'hc' ? totalPrice - 2 : totalPrice
  let vatTotal = 0;
  let cityTaxTotal = 0;
  let total = 0;
  const renderItems = () => {
    if(!dates) { return <tr></tr> }
    const vat = Number((totalPrice / nights * 0.07))
    const cityTax = Number((totalPrice / nights * 0.05))
    const perNight = Number((totalPrice / nights))
    const totalPerNight = perNight + cityTax

    return dates.map(date => {
      vatTotal += vat
      cityTaxTotal += cityTax
      total += totalPerNight
        return (
          <tr className="row" key={date}>
            <td className="col-9">{date} for {pax} person(s) in {roomType.slice(0, 1)}</td>
            <td className="col-1 text-center">{vat.toFixed(2)}€</td>
            <td className="col-1 text-center">{cityTax.toFixed(2)}€</td>
            <td className="col-1 text-center">{totalPerNight.toFixed(2)}€</td>
          </tr>
        )
      })
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr className="row">
            <td className="col-9">Description and Quantity</td>
            <td className="col-1 text-center">VAT inc<br/>(7%)</td>
            <td className="col-1 text-center">City Tax (5%)</td>
            <td className="col-1 text-center">Total</td>
          </tr>
        </thead>
        <tbody>
          {renderItems()}
          <tr className="row">
            <td className="col-2 offset-7 text-right"><strong>Totals</strong></td>
            <td className="col-1 text-center">{vatTotal.toFixed(2)}€</td>
            <td className="col-1 text-center">{cityTaxTotal.toFixed(2)}€</td>
            <td className="col-1 text-center"><strong>{total.toFixed(2)}€</strong></td>
          </tr>
          <tr className="row">
            <td className="col-2 offset-7 text-right"><strong>Depsosit Paid</strong></td>
            <td className="col-1 offset-2 text-center"><strong>{deposit}€</strong></td>
          </tr>
          <tr className="row">
            <td className="col-2 offset-7 text-right"><strong>Paid on arrival</strong></td>
            <td className="col-1 offset-2 text-center"><strong>{(total - deposit).toFixed(2)}€</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceData;