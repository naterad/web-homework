import { gql } from 'apollo-boost'

// USERS
export const GET_USERS = gql`
  {
    users {
      id,
      firstName,
      lastName
    }
  }
`
export const ADD_USER = gql`
  mutation($firstName: String, $lastName: String, $dob: String) {
    addUser(dob: $dob, firstName: $firstName, lastName: $lastName) {
      id
      dob
      firstName
      lastName
    }
  }
`
export const UPDATE_USER = gql`
  mutation($id: String, $firstName: String, $lastName: String, $dob: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, dob: $dob) {
      id,
      firstName,
      lastName,
      dob
    }
  }
`
export const DELETE_USER = gql`
  mutation($id: String) {
    deleteUser(id: $id) {
      id
    }
  }
`
export const DELETE_ALL_USERS = gql`
  mutation {
    deleteAllUsers {
      id
    }
  }
`

// TRANSACTIONS
export const GET_TRANSACTIONS = gql`
  {
    transactions {
      id,
      user_id,
      amount,
      credit,
      debit,
      description,
      merchant_id,
      timestamp
    }
  }
`
export const ADD_TRANSACTION = gql`
  mutation($user_id: String, $amount: String, $credit: Boolean, $debit: Boolean, $description: String, $merchant_id: String, $timestamp: String) {
    addTransaction(user_id: $user_id, amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_id: $merchant_id, timestamp: $timestamp) {
      id,
      user_id,
      amount,
      credit,
      debit,
      description,
      merchant_id,
      timestamp
    }
  }
`
export const UPDATE_TRANSACTION = gql`
  mutation($id: String, $user_id: String, $amount: String, $credit: Boolean, $debit: Boolean, $description: String, $merchant_id: String, $timestamp: String) {
    updateTransaction(id: $id, user_id: $user_id, amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_id: $merchant_id, timestamp: $timestamp) {
      id,
      user_id,
      amount,
      credit,
      debit,
      description,
      merchant_id,
      timestamp
    }
  }
`
export const DELETE_TRANSACTION = gql`
  mutation($id: String) {
    deleteTransaction(id: $id) {
      id
    }
  }
`
export const DELETE_ALL_TRANSACTIONS = gql`
  mutation {
    deleteAllTransactions {
      id
    }
  }
`

// MERCHANTS
export const GET_MERCHANTS = gql`
  {
    merchants {
      id,
      merchantName
    }
  }
`
export const ADD_MERCHANT = gql`
  mutation($merchantName: String) {
    addMerchant(merchantName: $merchantName) {
      id
      merchantName
    }
  }
`
export const UPDATE_MERCHANT = gql`
  mutation($id: String, $merchantName: String) {
    updateMerchant(id: $id, merchantName: $merchantName) {
      id,
      merchantsName
    }
  }
`
export const DELETE_MERCHANT = gql`
  mutation($id: String) {
    deleteMerchant(id: $id) {
      id
    }
  }
`
export const DELETE_ALL_MERCHANTS = gql`
  mutation {
    deleteAllMerchants {
      id
    }
  }
`

// export const VIEW_USERS = gql`
//   query($id: Int) {
//     getUserInfo(id: $id) {
//       id
//       name
//       job_title
//       email
//     }
//   }
// `
