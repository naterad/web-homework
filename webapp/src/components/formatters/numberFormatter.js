import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    numberFormat: state.settings.numberFormat
  }
}

class NumberFormatter extends Component {
  static propTypes = {
    numberFormat: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  }

  translateToRomanNumberals = (value) => {
    return 'R' + value + 'N'
  }

  render () {
    const { numberFormat, value } = this.props
    if (numberFormat === 'roman') {
      return (
        <span>
          {this.translateToRomanNumberals(value)}
        </span>
      )
    }
    return (
      <span>
        ${value}
      </span>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(NumberFormatter)
