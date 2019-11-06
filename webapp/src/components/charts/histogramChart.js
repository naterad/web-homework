import React, { Component } from 'react'
import { BarChart } from 'react-d3-components'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const tooltipScatter = function (x, y, y0) {
  const text = x + ': $' + y0
  return <div>{text}</div>
}

class HistogramChartContainer extends Component {
  static propTypes = {
    data: PropTypes.any.isRequired
  }
  render () {
    const { data } = this.props
    return (
      <div css={histogramStyle}>
        <BarChart
          data={data}
          height={300}
          margin={{ top: 10, bottom: 30, left: 0, right: 0 }}
          tooltipHtml={tooltipScatter}
          width={300}
        />
      </div>
    )
  }
}

export default HistogramChartContainer

const histogramStyle = css`
  .tooltip {
    background-color: white;
    border: solid black 1px;
    border-radius: 5px;
    padding: 5px;
    top: 25px;
  }
`
