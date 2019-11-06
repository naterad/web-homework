import { actionTypes as merchantActionTypes } from '../actions/merchantActions'

const initialState = {
  merchants: [],
  selectedMerchant: {}
}

export function merchants (state = initialState, action) {
  switch (action.type) {
    case merchantActionTypes.SET_MERCHANTS:
      return { ...state, merchants: action.payload }
    case merchantActionTypes.SET_SELECTED_MERCHANT:
      return { ...state, selectedMerchant: action.payload }
    default:
      return state
  }
}
