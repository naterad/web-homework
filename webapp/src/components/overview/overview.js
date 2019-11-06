import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import NumberFormatter from '../formatters/numberFormatter'
import { translate } from '../../helpers/translator'

export default function Overview (props) {
  const { data, language, rowClicked } = props

  return (
    <div css={overviewStyle}>
      <table>
        <thead>
          <tr>
            <th>{translate(language, 'overview.name')}</th>
            <th>{translate(language, 'overview.total')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.name} onClick={() => rowClicked(item)}>
                <td>{item.name}</td>
                <td>
                  <NumberFormatter value={item.value} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Overview.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  rowClicked: PropTypes.func
}

const overviewStyle = css`
  padding: 15px;
  .grid_container_thirds {
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }
  .grid_container_halves {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  th:nth-of-type(2) {
    text-align: right;
  }
  td:nth-of-type(2) {
    text-align: right;
  }
`
