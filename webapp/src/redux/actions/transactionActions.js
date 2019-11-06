export const actionTypes = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  SET_EDIT_TRANSACTION: 'SET_EDIT_TRANSACTION'
}

export function setTransactions (transactions) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_TRANSACTIONS,
      payload: transactions
    })
  }
}

export function setEditTransaction (transaction) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_EDIT_TRANSACTION,
      payload: transaction
    })
  }
}
