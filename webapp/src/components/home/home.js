import React, { Component } from 'react'
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { setSelectedUser } from '../../redux/actions/userActions'
import { setSelectedMerchant } from '../../redux/actions/merchantActions'
import PieChartContainer from '../charts/pieChart'
import HistogramChartContainer from '../charts/histogramChart'
import OverviewList from '../overview/overview'
import { translate } from '../../helpers/translator'
import { timeConverterMonth } from '../../helpers/dateConverter'

const mapStateToProps = state => {
  return {
    users: state.users.users,
    transactions: state.transactions.transactions,
    merchants: state.merchants.merchants,
    language: state.settings.language
  }
}

const mapDispatchToProps = {
  setSelectedUser: setSelectedUser,
  setSelectedMerchant: setSelectedMerchant
}

function formatUsersOverview (users, transactions) {
  let userMap = {}
  let userData = []
  for (let transaction of transactions) {
    if (userMap[transaction.user_id]) {
      if (transaction.debit) {
        userMap[transaction.user_id] += parseFloat(transaction.amount)
      } else {
        userMap[transaction.user_id] -= parseFloat(transaction.amount)
      }
    } else {
      userMap[transaction.user_id] = parseFloat(transaction.amount)
    }
  }
  for (let user of users) {
    if (userMap[user.id] || userMap[user.id] === 0) {
      userData.push({
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        value: parseFloat(userMap[user.id].toFixed(2))
      })
    }
  }
  return userData
}

function formatMerchantsOverview (merchants, transactions) {
  let merchantMap = {}
  let merchantData = []
  for (let transaction of transactions) {
    if (merchantMap[transaction.merchant_id]) {
      if (transaction.debit) {
        merchantMap[transaction.merchant_id] += parseFloat(transaction.amount)
      } else {
        merchantMap[transaction.merchant_id] -= parseFloat(transaction.amount)
      }
    } else {
      merchantMap[transaction.merchant_id] = parseFloat(transaction.amount)
    }
  }
  for (let merchant of merchants) {
    if (merchantMap[merchant.id] || merchantMap[merchant.id] === 0) {
      merchantData.push({
        id: merchant.id,
        name: merchant.merchantName,
        value: parseFloat(merchantMap[merchant.id].toFixed(2))
      })
    }
  }
  return merchantData
}

function formaChartData (data, label) {
  let values = []
  for (let point of data) {
    values.push({
      x: point.name,
      y: point.value
    })
  }
  return {
    label,
    values
  }
}

function formatBarChartData (transactions) {
  const label = 'Spend by Date'
  const now = Date.now() / 1000
  const month = 2592000
  const oneMonth = now - month
  const twoMonth = now - (2 * month)
  const threeMonth = now - (3 * month)
  const fourMonth = now - (4 * month)
  const fiveMonth = now - (5 * month)
  let oneMonthTotal = 0
  let twoMonthTotal = 0
  let threeMonthTotal = 0
  let fourMonthTotal = 0
  let fiveMonthTotal = 0

  for (let transaction of transactions) {
    let time = parseInt(transaction.timestamp)
    let amount = parseFloat(transaction.amount)
    if (time <= now && time > oneMonth) {
      if (transaction.debit) {
        oneMonthTotal += amount
      } else {
        oneMonthTotal -= amount
      }
    } else if (time <= oneMonth && time > twoMonth) {
      if (transaction.debit) {
        twoMonthTotal += amount
      } else {
        twoMonthTotal -= amount
      }
    } else if (time <= twoMonth && time > threeMonth) {
      if (transaction.debit) {
        threeMonthTotal += amount
      } else {
        threeMonthTotal -= amount
      }
    } else if (time <= threeMonth && time > fourMonth) {
      if (transaction.debit) {
        threeMonthTotal += amount
      } else {
        threeMonthTotal -= amount
      }
    } else if (time <= fourMonth && time > fiveMonth) {
      if (transaction.debit) {
        fourMonthTotal += amount
      } else {
        fourMonthTotal -= amount
      }
    }
  }
  return {
    label,
    values: [{
      x: timeConverterMonth(fourMonth),
      y: parseFloat(fiveMonthTotal.toFixed(2))
    }, {
      x: timeConverterMonth(threeMonth),
      y: parseFloat(fourMonthTotal.toFixed(2))
    }, {
      x: timeConverterMonth(twoMonth),
      y: parseFloat(threeMonthTotal.toFixed(2))
    }, {
      x: timeConverterMonth(oneMonth),
      y: parseFloat(twoMonthTotal.toFixed(2))
    }, {
      x: timeConverterMonth(now),
      y: parseFloat(oneMonthTotal.toFixed(2))
    }]
  }
}

class Home extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    transactions: PropTypes.array.isRequired,
    merchants: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    setSelectedUser: PropTypes.func.isRequired,
    setSelectedMerchant: PropTypes.func.isRequired,
    history: PropTypes.any
  }

  userOverviewClicked = item => {
    this.props.setSelectedUser(item.id, this.props.history)
  }

  merchantOverviewClicked = item => {
    this.props.setSelectedMerchant(item.id, this.props.history)
  }

  render () {
    const { transactions, users, merchants, language } = this.props
    const usersOverview = formatUsersOverview(users, transactions)
    const merchantsOverview = formatMerchantsOverview(merchants, transactions)
    const userChartData = formaChartData(usersOverview, 'Spend by User')
    const merchantChartData = formaChartData(merchantsOverview, 'Spend by Merchant')
    const barChartData = formatBarChartData(transactions)
    return (
      <div className={'main_content'} css={homeStyle}>
        <h1>{translate(language, 'home.dashboard')}</h1>
        {transactions.length > 0 ? (
          <div className={'grid_container_thirds'}>
            <div>
              <h3>{translate(language, 'home.spend_date')}</h3>
              <HistogramChartContainer data={barChartData} />
            </div>
            <div>
              <h3>{translate(language, 'home.spend_user')}</h3>
              <PieChartContainer data={userChartData} />
            </div>
            <div>
              <h3>{translate(language, 'home.spend_merchant')}</h3>
              <PieChartContainer data={merchantChartData} />
            </div>
          </div>
        ) : (
          <div>
            {translate(language, 'home.no_transactions_1')}
            <Link className={'link'} to='/settings'>
              {' '}
              {translate(language, 'home.no_transactions_2')}
              {' '}
            </Link>
            {translate(language, 'home.no_transactions_3')}
          </div>
        )}
        <br />
        <hr />
        <br />
        <div className={'grid_container_halves'}>
          <div>
            <h3>{translate(language, 'home.transactions_user')}</h3>
            <OverviewList data={usersOverview} language={language} rowClicked={this.userOverviewClicked} />
          </div>
          <div>
            <h3>{translate(language, 'home.transactions_merchant')}</h3>
            <OverviewList data={merchantsOverview} language={language} rowClicked={this.merchantOverviewClicked} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const homeStyle = css`
  .grid_container_thirds {
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }
  .grid_container_halves {
    display: grid;
    grid-template-columns: 50% 50%;
  }
`
