export const actionTypes = {
  SET_USERS: 'SET_USERS',
  SET_SELECTED_USER: 'SET_SELECTED_USER'
}

export function setUsers (users) {
  return function (dispatch) {
    for (let user of users) {
      user.name = user.firstName + ' ' + user.lastName
    }
    dispatch({
      type: actionTypes.SET_USERS,
      payload: users
    })
    if (users.length > 0) {
      dispatch({
        type: actionTypes.SET_SELECTED_USER,
        payload: users[0]
      })
    }
  }
}

export function setSelectedUser (id, history) {
  return function (dispatch, getState) {
    let users = getState().users.users
    for (let user of users) {
      if (user.id === id) {
        dispatch({
          type: actionTypes.SET_SELECTED_USER,
          payload: user
        })
        if (history) {
          history.push('/users')
        }
      }
    }
  }
}
