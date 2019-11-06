import { actionTypes as transactionActionTypes } from '../actions/transactionActions'

const initialState = {
  transactions: [],
  editTransaction: {}
}

export function transactions (state = initialState, action) {
  switch (action.type) {
    case transactionActionTypes.SET_TRANSACTIONS:
      return { ...state, transactions: action.payload }
    case transactionActionTypes.SET_EDIT_TRANSACTION:
      return { ...state, editTransaction: action.payload }
    default:
      return state
  }
}
