import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { BrowserRouter, Route, browserHistory, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import App from './containers/app';
import Header from './containers/header';
import SearchBar from './containers/search_bar';
import BookingList from './containers/bookings_list';
import Booking from './containers/booking';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/booking/:id" component={Booking} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));