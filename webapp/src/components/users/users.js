import React, { Component } from 'react'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { Select } from 'react-dropdown-select'
import { setSelectedUser } from '../../redux/actions/userActions'
import { setEditTransaction } from '../../redux/actions/transactionActions'
import { saveTransaction, deleteTransaction } from '../../redux/actions/settingsActions'
import { timeConverter } from '../../helpers/dateConverter'
import { translate } from '../../helpers/translator'
import NumberFormatter from '../formatters/numberFormatter'

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    selectedUser: state.users.selectedUser,
    transactions: state.transactions.transactions,
    merchants: state.merchants.merchants,
    editTransaction: state.transactions.editTransaction,
    language: state.settings.language
  }
}

const mapDispatchToProps = {
  setSelectedUser: setSelectedUser,
  setEditTransaction: setEditTransaction,
  saveTransaction: saveTransaction,
  deleteTransaction: deleteTransaction
}

function formatUserTransactions (selectedUser, transactions, merchants) {
  let userTransactions = []
  let merchantIds = {}
  for (let merchant of merchants) {
    merchantIds[merchant.id] = merchant
  }
  if (selectedUser.id) {
    for (let transaction of transactions) {
      if (transaction.user_id === selectedUser.id) {
        if (merchantIds[transaction.merchant_id]) {
          transaction.merchantName = merchantIds[transaction.merchant_id].merchantName
        }
        userTransactions.push(transaction)
      }
    }
  }
  return userTransactions
}

function calculateTotalSpend (userTransactions) {
  let total = 0
  for (let transaction of userTransactions) {
    if (transaction.debit) {
      total += parseFloat(transaction.amount)
    } else {
      total -= parseFloat(transaction.amount)
    }
  }
  return total.toFixed(2)
}

class Users extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    selectedUser: PropTypes.shape({}).isRequired,
    setSelectedUser: PropTypes.func.isRequired,
    setEditTransaction: PropTypes.func.isRequired,
    saveTransaction: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    merchants: PropTypes.array.isRequired,
    editTransaction: PropTypes.shape({}).isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired
  }

  selectUser = (value) => {
    this.props.setSelectedUser(value[0].id)
  }

  transactionEdit = (value) => {
    this.props.setEditTransaction(value)
  }

  transactionDelete = (value) => {
    this.props.deleteTransaction(value)
  }

  onAmountChange = (event) => {
    let transaction = this.props.editTransaction
    transaction.amount = event.target.value
    this.props.setEditTransaction(transaction)
  }

  onDescriptionChange = (event) => {
    let transaction = this.props.editTransaction
    transaction.description = event.target.value
    this.props.setEditTransaction(transaction)
  }

  onSubmit = (event) => {
    this.props.saveTransaction(this.props.editTransaction)
    event.preventDefault()
  }

  render () {
    const { users, selectedUser, transactions, merchants, editTransaction, language } = this.props
    const values = [selectedUser]
    const userTransactions = formatUserTransactions(selectedUser, transactions, merchants)
    const totalSpend = calculateTotalSpend(userTransactions)
    let valid = true
    if (editTransaction.amount && editTransaction.description) {
      valid = false
    }
    return (
      <div className={'main_content'} css={usersStyle}>
        <h1>{translate(language, 'users.users')}Users</h1>
        <hr />
        <Select
          key={'id'}
          labelField={'name'}
          onChange={(value) => this.selectUser(value)}
          options={users}
          sortBy={'name'}
          valueField={'id'}
          values={values}
        />
        <br />
        {selectedUser.name ? (
          <div>
            <h3>{selectedUser.name}</h3>
            <div>{translate(language, 'users.total_spent')}: <NumberFormatter value={totalSpend} /></div>
            <br />
            <table>
              <thead>
                <tr>
                  <th>{translate(language, 'users.merchant')}</th>
                  <th>{translate(language, 'users.amount')}</th>
                  <th>{translate(language, 'users.date')}</th>
                  <th>{translate(language, 'users.description')}</th>
                  <th className={'button_column'} />
                  <th className={'button_column'} />
                </tr>
              </thead>
              {userTransactions.map((transaction) => {
                return (
                  <tbody key={transaction.id}>
                    <tr onClick={() => this.set}>
                      <td>{transaction.merchantName}</td>
                      <td><NumberFormatter value={transaction.amount} /></td>
                      <td>{timeConverter(transaction.timestamp)}</td>
                      <td>{transaction.description}</td>
                      <td><button className={'edit_button'} onClick={() => this.transactionEdit(transaction)}>{translate(language, 'users.edit')}</button></td>
                      <td><button className={'delete_button'} onClick={() => this.transactionDelete(transaction)}>{translate(language, 'users.delete')}</button></td>
                    </tr>
                    {editTransaction.id === transaction.id ? (
                      <tr>
                        <td colSpan={6}>
                          <form onSubmit={this.onSubmit}>
                            <label>
                              {translate(language, 'users.amount')}:
                              <input
                                className={'input'}
                                defaultValue={editTransaction.amount}
                                name='amount'
                                onChange={this.onAmountChange}
                                placeholder='Amount'
                                type='text'
                              />
                            </label>
                            <label>
                              {translate(language, 'users.description')}:
                              <input
                                className={'input'}
                                defaultValue={editTransaction.description}
                                name='description'
                                onChange={this.onDescriptionChange}
                                placeholder='Description'
                                type='text'
                              />
                            </label>
                            <button disabled={valid} type='submit'>{translate(language, 'users.submit')}</button>
                          </form>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                )
              })}
            </table>
          </div>
        ) : null}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)

const usersStyle = css`
  .button_column {
    width: 74px;
  }
  .delete_button {
    color: white;
    background-color: red;
  }
  .input {
    padding: 5px;
    margin: 10px;
    font-size: 12px;
    border-radius: 4px;
    border: solid black 1px;

  }
`
