import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment)

class NewInvoiceModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      roomTypes: [
      '---Select Room Type---', '2 Bed Priv', '3 Bed Priv', '4 Bed Mix Ens', '4 Bed Mix', '6 Bed Mix', '8 Bed Mix', '8 Bed Mix Ens'
    ]
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  renderField = ({ input, label, type, meta: { touched, error }, ...custom }) =>
    <fieldset className="form-control-sm">
      <input {...input} {...custom} placeholder={label} className="form-control" type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </fieldset>

  renderDateTimePicker = ({ input: { onChange, value }, showTime, placeholder, meta: { touched, error } }) =>
    <fieldset className="form-control-sm">
      <DateTimePicker
        onChange={onChange}
        format="YYYY-MM-DD"
        time={showTime}
        placeholder={placeholder}
        value={!value ? null : new Date(value)}
      />
      {touched && error && <span className="error">{error}</span>}
    </fieldset>

  renderDropdownList = ({ input, data, meta: { touched, error } }) =>
    <fieldset className="form-control-sm">
      <DropdownList
        data={data}
        defaultValue={data[0]}
        readOnly={data[0]}
        onChange={input.onChange}
      />
      {touched && error && <span className="error">{error}</span>}
    </fieldset>

  toNumber = value => value && parseFloat(value)
  dateToString = value => value && moment(value).format("YYYY-MM-DD")

  handleSaveBooking = formProps => {
    this.props.editAllBooking(formProps)
    // this.toggle()
  }

  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <span>
        <button className="btn btn-danger hidden-print" onClick={this.toggle}>{this.props.buttonText}</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New/Edit Booking</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(this.handleSaveBooking)}>
              <Field name="first_name" component={this.renderField} type="text" label="First Name" />
              <Field name="last_name" component={this.renderField} type="text" label="Last Name" />
              <Field name="email" component={this.renderField} type="text" label="Email" />
              <Field name="company" component={this.renderField} type="text" label="Company" />
              <Field name="street" component={this.renderField} type="text" label="Street / No" />
              <Field name="city" component={this.renderField} type="text" label="Post Code / City" />
              <Field name="country" component={this.renderField} type="text" label="Country" />
              <Field name="booking_date" component={this.renderDateTimePicker} showTime={false} type="text" normalize={this.dateToString} placeholder="Booking Date" />
              <Field name="arrival_date" component={this.renderDateTimePicker} showTime={false} type="text" normalize={this.dateToString} placeholder="Arrival Date" />
              <Field name="departure_date" component={this.renderDateTimePicker} showTime={false} type="text" normalize={this.dateToString} placeholder="Departure Date" />
              <Field name="room_names" component={this.renderDropdownList} data={this.state.roomTypes} placeholder="Room Type" />
              <Field name="total_price" component={this.renderField} type="number" normalize={this.toNumber} min={0} label="Total Price (excluding taxes etc)" />
              <Field name="deposit" component={this.renderField} type="number" normalize={this.toNumber} min={0} label="Deposit Paid" />
              <Field name="nights" component={this.renderField} type="number" normalize={this.toNumber} min={0} label="Nights" />
              <Field name="pax" component={this.renderField} type="number" normalize={this.toNumber} min={0} label="Guests" />
              <ModalFooter>
                <button type="submit" className="btn btn-success">Save</button>
                <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

function validate(formProps) {
  const errors = {}

  if(!formProps.first_name) {
    errors.first_name = 'Please enter a First Name'
  }
  if(!formProps.last_name) {
    errors.last_name = 'Please enter a Last Name'
  }
  if(!formProps.booking_date) {
    errors.booking_date = 'Please enter a Booking Date'
  }
  if(!formProps.arrival_date) {
    errors.arrival_date = 'Please enter a Arrival Date'
  }
  if(!formProps.departure_date) {
    errors.departure_date = 'Please enter a Departure Date'
  }
  if(!formProps.room_names) {
    errors.room_names = 'Please choose a Room Type'
  }
  if(!formProps.total_price) {
    errors.total_price = 'Please enter a Total Price'
  }
  if(!formProps.deposit && formProps.deposit != 0) {
    errors.deposit = 'Please enter a Deposit amount (can be 0)'
  }
  if(!formProps.nights) {
    errors.nights = 'Please enter a number of Nights'
  }
  if(!formProps.pax) {
    errors.pax = 'Please enter a number of Guests'
  }

  return errors
}

const mapStateToProps = ({ booking }) => ({
  booking: booking.booking, address: booking.address
})

NewInvoiceModal = connect(mapStateToProps, actions)(NewInvoiceModal)

export default reduxForm({
  form: 'new-invoice',
  validate
})(NewInvoiceModal);