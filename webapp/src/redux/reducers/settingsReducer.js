import { actionTypes as settingsActionTypes } from '../actions/settingsActions'

const initialState = {
  language: 'english',
  numberFormat: 'normal'
}

export function settings (state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEMS':
      return { ...state, itemList: action.payload }
    case settingsActionTypes.SET_NUMBER_FORMAT:
      return { ...state, numberFormat: action.payload }
    case settingsActionTypes.SET_SELECTED_LAUNGUAGE:
      return { ...state, language: action.payload }
    default:
      return state
  }
}
