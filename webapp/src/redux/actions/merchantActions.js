export const actionTypes = {
  SET_MERCHANTS: 'SET_MERCHANTS',
  SET_SELECTED_MERCHANT: 'SET_SELECTED_MERCHANT'
}

export function setMerchants (merchants) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_MERCHANTS,
      payload: merchants
    })
  }
}

export function setSelectedMerchant (id, history) {
  return function (dispatch, getState) {
    let merchants = getState().merchants.merchants
    for (let merchant of merchants) {
      if (merchant.id === id) {
        dispatch({
          type: actionTypes.SET_SELECTED_MERCHANT,
          payload: merchant
        })
        if (history) {
          history.push('/merchants')
        }
      }
    }
  }
}
