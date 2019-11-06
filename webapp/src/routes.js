import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import Home from './components/home/home'
import Users from './components/users/users'
import Merchants from './components/merchants/merchants'
import Sidebar from './components/sidebar/sidebar'
import Settings from './components/settings/settings'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <div>
          <Sidebar />
        </div>
        <div>
          <Route component={Home} exact path='/' />
          <Route component={Users} exact path='/users' />
          <Route component={Merchants} exact path='/merchants' />
          <Route component={Settings} exact path='/settings' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  display: grid;
  grid-template-columns: 100px auto;
  grid-column-gap: 12px;
  a {
    color: black;
    text-decoration: none;
  }
  a:visted {
    color: black;
    text-decoration: none;
  }
  .main_content {
    padding: 50px 30px 0px 30px;
  }
  hr {
    color: #f2f2f2;
  }
  button {
    background-color: white;
    border: solid black 1px;
    border-radius: 5px;
    padding: 5px 20px;
    font-size: 12px;
    text-transform: uppercase;
    margin: 5px 5px 5px 0px;
  }
  button:hover {
    cursor: pointer;
  }
  button.active {
    background-color: black;
    color: white;
  }
  button:focus {
    outline: none;
  }
  .link {
    color: blue;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead {
    border-bottom: solid #d9d9d9 2px;
  }
  tr {
    text-align: left;
    border-bottom: solid #f2f2f2 1px;
  }
  tr:hover {
    background-color: #d9d9d9;
  }
  td,th {
    padding: 12px;
  }
`
