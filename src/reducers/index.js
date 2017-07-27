import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import SearchReducer from './search_reducer';

const rootReducer = combineReducers({
  form,
  search: SearchReducer,
});

export default rootReducer;