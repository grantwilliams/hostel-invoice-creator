import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ term: event.target.value });
  }

  handleOnSubmit(event) {
    event.preventDefault()
    this.props.searchBookings(this.state.term)

  }

  render() {
    return (
      <div className="row justify-content-center">
        <form onSubmit={this.handleOnSubmit} className="form-inline search-bar">
          <div className="input-group">
            <input
            type="text"
            className="form-control"
            placeholder="Search bookings..."
            value={this.state.term}
            onChange={this.handleInputChange} />
            <button type="submit" className=" btn input-group-addon"><i className="fa fa-search"></i></button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(SearchBar);