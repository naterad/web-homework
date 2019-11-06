import { combineReducers } from 'redux'
import { merchants } from './merchantReducer'
import { transactions } from './transactionReducer'
import { settings } from './settingsReducer'
import { users } from './userReducer'

export default combineReducers({
  merchants,
  transactions,
  settings,
  users
})
