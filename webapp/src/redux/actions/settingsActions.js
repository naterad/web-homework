import { setTransactions, setEditTransaction } from './transactionActions'
import { setUsers } from './userActions'
import { setMerchants } from './merchantActions'
import { GET_USERS, ADD_USER, GET_MERCHANTS, GET_TRANSACTIONS, ADD_MERCHANT, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION, DELETE_ALL_MERCHANTS, DELETE_ALL_TRANSACTIONS, DELETE_ALL_USERS } from './queries'
// import { GET_USERS, ADD_USER, GET_MERCHANTS, GET_TRANSACTIONS, ADD_MERCHANT, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from './queries'
import { client } from '../../network/apollo-client'

export const actionTypes = {
  SET_SELECTED_LAUNGUAGE: 'SET_SELECTED_LAUNGUAGE',
  SET_NUMBER_FORMAT: 'SET_NUMBER_FORMAT'
}

export function loadAction () {
  return async function (dispatch) {
    //  this should always happen on load
    await client.mutate({ mutation: DELETE_ALL_USERS })
    await client.mutate({ mutation: DELETE_ALL_MERCHANTS })
    await client.mutate({ mutation: DELETE_ALL_TRANSACTIONS })

    let getUsers = await client.query({ query: GET_USERS })
    let getMerchants = await client.query({ query: GET_MERCHANTS })
    let getTransactions = await client.query({ query: GET_TRANSACTIONS })
    dispatch(setTransactions(getTransactions.data.transactions))
    dispatch(setUsers(getUsers.data.users))
    dispatch(setMerchants(getMerchants.data.merchants))
  }
}

export function loadData (data) {
  return async function (dispatch) {
    const transactions = []
    const userIds = {}
    const merchantIds = {}
    data.shift()
    for (let row of data) {
      if (row.length === 12) {
        const transaction = {
          id: row[0],
          user_id: row[1],
          description: row[2],
          merchant_id: row[3],
          debit: row[4] === 'TRUE',
          credit: row[5] === 'TRUE',
          amount: row[6],
          timestamp: row[7]
        }
        transactions.push(transaction)
        const user = {
          id: row[1],
          dob: row[8],
          firstName: row[9],
          lastName: row[10]
        }
        userIds[user.id] = user
        const merchant = {
          id: row[3],
          merchantName: row[11]
        }
        merchantIds[merchant.id] = merchant
      }
    }

    for (let userId in userIds) {
      let user = userIds[userId]
      delete user.id
      await client.mutate({
        mutation: ADD_USER,
        variables: user,
        refetchQueries: [{ query: GET_USERS }]
      })
    }
    for (let merchantId in merchantIds) {
      let merchant = merchantIds[merchantId]
      delete merchant.id
      await client.mutate({
        mutation: ADD_MERCHANT,
        variables: merchant,
        refetchQueries: [{ query: GET_MERCHANTS }]
      })
    }
    let usersResponse = await client.query({ query: GET_USERS })
    const userList = usersResponse.data.users
    let merchantsResponse = await client.query({ query: GET_MERCHANTS })
    const merchantList = merchantsResponse.data.merchants

    for (let transaction of transactions) {
      delete transaction.id
      if ((parseInt(transaction.user_id) - 1) >= userList.length) {
        transaction.user_id = userList[0].id
      } else {
        transaction.user_id = userList[parseInt(transaction.user_id) - 1].id
      }
      if ((parseInt(transaction.merchant_id) - 1) >= merchantList.length) {
        transaction.merchant_id = merchantList[0].id
      } else {
        transaction.merchant_id = merchantList[parseInt(transaction.merchant_id) - 1].id
      }
      await client.mutate({
        mutation: ADD_TRANSACTION,
        variables: transaction,
        refetchQueries: [{ query: GET_TRANSACTIONS }]
      })
    }

    let transactionsResponse = await client.query({ query: GET_TRANSACTIONS })
    const transactionList = transactionsResponse.data.transactions
    dispatch(setTransactions(transactionList))
    dispatch(setUsers(userList))
    dispatch(setMerchants(merchantList))
  }
}

export function saveTransaction (transaction) {
  return async function (dispatch) {
    delete transaction.merchantName
    await client.mutate({
      mutation: UPDATE_TRANSACTION,
      variables: transaction,
      refetchQueries: [{ query: GET_TRANSACTIONS }]
    })
    let transactionsResponse = await client.query({ query: GET_TRANSACTIONS })
    const transactionList = transactionsResponse.data.transactions
    dispatch(setTransactions(transactionList))
    dispatch(setEditTransaction({}))
  }
}

export function deleteTransaction (transaction) {
  return async function (dispatch) {
    delete transaction.merchantName
    await client.mutate({
      mutation: DELETE_TRANSACTION,
      variables: transaction,
      awaitRefetchQueries: 'true',
      refetchQueries: [{ query: GET_TRANSACTIONS }]
    })
    let transactionsResponse = await client.query({ query: GET_TRANSACTIONS })
    const transactionList = transactionsResponse.data.transactions
    dispatch(setTransactions(transactionList))
  }
}

export function setSelectedLaunguage (language) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_LAUNGUAGE,
      payload: language
    })
  }
}

export function setNumberFormat (format) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_NUMBER_FORMAT,
      payload: format
    })
  }
}
