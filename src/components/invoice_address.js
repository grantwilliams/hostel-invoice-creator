import React, { Component } from 'react';

class InvoiceAddress extends Component {
  constructor(props) {
    super(props)

    this.state = {
      saved: false,
      address: {company: '', street: '', city: '', country: ''}
    };

    this.handleOnCompanyChange = this.handleOnCompanyChange.bind(this)
    this.handleOnStreetChange = this.handleOnStreetChange.bind(this)
    this.handleOnCityChange = this.handleOnCityChange.bind(this)
    this.handleOnCountryChange = this.handleOnCountryChange.bind(this)
    this.toggleSaveAddress = this.toggleSaveAddress.bind(this)
  }

  handleOnCompanyChange(event) {
    this.setState({ address: { ...this.state.address, company: event.target.value } });
  }

  handleOnStreetChange(event) {
    this.setState({ address: { ...this.state.address, street: event.target.value } });
  }

  handleOnCityChange(event) {
    this.setState({ address: { ...this.state.address, city: event.target.value } });
  }

  handleOnCountryChange(event) {
    this.setState({ address: { ...this.state.address, country: event.target.value } });
  }

  toggleSaveAddress(event) {
    event.preventDefault()
    this.setState({ saved: true });
  }

  renderAddress() {
    const { address } = this.state
    if(this.state.saved) {
      return (
        <div className="col-7">
        <h4>{this.props.firstName} {this.props.lastName}</h4>
        <h6>{this.props.email}</h6>
        <h6>{address.company}</h6>
        <h6>{address.street}</h6>
        <h6>{address.city}</h6>
        <h6>{address.country}</h6>
        </div>
      )
    }
    return (
      <div className="col-7">
        <h4>{this.props.firstName} {this.props.lastName}</h4>
        <h6>{this.props.email}</h6>
        <form className="no-gutters hidden-print" onSubmit={this.toggleSaveAddress}>
          <fieldset className="form-control-sm col-6">
            <input className="form-control" value={address.company} onChange={this.handleOnCompanyChange} placeholder="Company" />
          </fieldset>
          <fieldset className="form-control-sm col-6">
            <input className="form-control" value={address.street} onChange={this.handleOnStreetChange} placeholder="Street / No." />
          </fieldset>
          <fieldset className="form-control-sm col-6">
            <input className="form-control" value={address.city} onChange={this.handleOnCityChange} placeholder="Post Code / City" />
          </fieldset>
          <fieldset className="form-control-sm col-4">
            <input className="form-control" value={address.country} onChange={this.handleOnCountryChange} placeholder="Country" />
          </fieldset>
          <button type="submit" className="btn btn-success">Save</button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="row address">
        {this.renderAddress()}
        <div className="col-5 text-right">
          <h5>Bank Account</h5>
          <p>Deutsche Bank<br/>
          BLZ: 100 700 24<br/>
          Account#: 1444835<br/>
          IBAN: DE47 1007 0024 0144 4835 00<br/>
          Tax#: 18/451/51469</p>
        </div>
      </div>
    );
  }
};

export default InvoiceAddress;