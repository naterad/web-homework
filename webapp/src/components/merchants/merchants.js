import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Select } from 'react-dropdown-select'
import { setSelectedMerchant } from '../../redux/actions/merchantActions'
import { timeConverter } from '../../helpers/dateConverter'
import { translate } from '../../helpers/translator'
import NumberFormatter from '../formatters/numberFormatter'

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    selectedUser: state.users.selectedUser,
    selectedMerchant: state.merchants.selectedMerchant,
    transactions: state.transactions.transactions,
    merchants: state.merchants.merchants,
    language: state.settings.language
  }
}

const mapDispatchToProps = {
  setSelectedMerchant: setSelectedMerchant
}

function formatMerchantTransactions (selectedMerchant, transactions) {
  let merchantTransactions = []
  if (selectedMerchant.id) {
    for (let transaction of transactions) {
      if (transaction.merchant_id === selectedMerchant.id) {
        merchantTransactions.push(transaction)
      }
    }
  }
  return merchantTransactions
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

class Merchants extends Component {
  static propTypes = {
    selectedMerchant: PropTypes.shape({}).isRequired,
    setSelectedMerchant: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    merchants: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired
  }

  selectMerchant = (value) => {
    this.props.setSelectedMerchant(value[0].id)
  }

  render () {
    const { selectedMerchant, transactions, merchants, language } = this.props
    const values = [selectedMerchant]
    const merchantTransactions = formatMerchantTransactions(selectedMerchant, transactions)
    const totalSpend = calculateTotalSpend(merchantTransactions)
    return (
      <div className={'main_content'}>
        <h1>{translate(language, 'merchants.merchants')}</h1>
        <hr />
        <Select
          key={'id'}
          labelField={'merchantName'}
          onChange={(value) => this.selectMerchant(value)}
          options={merchants}
          sortBy={'merchantName'}
          valueField={'id'}
          values={values}
        />
        <br />
        {selectedMerchant.merchantName ? (
          <div>
            <h3>{selectedMerchant.merchantName}</h3>
            <div>{translate(language, 'merchants.total_spend')}: <NumberFormatter value={totalSpend} /></div>
            <br />
            <table>
              <thead>
                <tr>
                  <th>{translate(language, 'merchants.amount')}</th>
                  <th>{translate(language, 'merchants.date')}</th>
                  <th>{translate(language, 'merchants.description')}</th>
                </tr>
              </thead>
              {merchantTransactions.map((transaction) => {
                return (
                  <tbody key={transaction.id}>
                    <tr>
                      <td><NumberFormatter value={transaction.amount} /></td>
                      <td>{timeConverter(transaction.timestamp)}</td>
                      <td>{transaction.description}</td>
                    </tr>
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
)(Merchants)
