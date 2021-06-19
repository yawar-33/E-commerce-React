import { combineReducers } from 'redux'

import login from './login'
const allReducers = combineReducers({
  login: login,
})


export default allReducers;
