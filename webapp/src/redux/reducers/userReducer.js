import { actionTypes as userActionTypes } from '../actions/userActions'

const initialState = {
  users: [],
  selectedUser: {},
  editUser: {}
}

export function users (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.SET_USERS:
      return { ...state, users: action.payload }
    case userActionTypes.SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload }
    default:
      return state
  }
}
