import React, { Component } from 'react'
import { PieChart } from 'react-d3-components'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const sort = null
const hide = true
const tooltipScatter = (x, y) => {
  const text = x + ': $' + y
  return <div>{text}</div>
}

class PieChartContainer extends Component {
  static propTypes = {
    data: PropTypes.any.isRequired
  }
  render () {
    const { data } = this.props
    return (
      <div css={pieStyle}>
        <PieChart
          data={data}
          height={300}
          hideLabels={hide}
          margin={{ top: 10, bottom: 10, left: 0, right: 0 }}
          sort={sort}
          tooltipHtml={tooltipScatter}
          width={300}
        />
      </div>
    )
  }
}

export default PieChartContainer

const pieStyle = css`
  .tooltip {
    background-color: white;
    border: solid black 1px;
    border-radius: 5px;
    padding: 5px;
    top: 25px;
  }
`
