import React, { Component } from 'react'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import avatar from '../../public/images/avatar.png'
import divvyLogo from '../../public/images/divvy_logo.png'
import { translate } from '../../helpers/translator'
import { setSelectedLaunguage, loadAction } from '../../redux/actions/settingsActions'

const mapStateToProps = state => {
  return {
    language: state.settings.language
  }
}

const mapDispatchToProps = {
  setSelectedLaunguage,
  loadAction
}

class Sidebar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    setSelectedLaunguage: PropTypes.func.isRequired,
    loadAction: PropTypes.func.isRequired
  }

  componentDidMount () {
    const params = this.props.location.search.split()
    for (let param of params) {
      if (param.includes('i18n') && param.includes('true')) {
        this.props.setSelectedLaunguage('gibberish')
      }
    }
    this.props.loadAction()
  }

  render () {
    const { language } = this.props
    const pathname = this.props.location.pathname
    return (
      <div css={settingsStyle}>
        <div>
          <img alt={'logo'} height='60' src={divvyLogo} />
        </div>
        <div className={`link ${pathname === '/' ? 'active' : ''}`}>
          <Link to='/'>{translate(language, 'sidebar.dashboard')}</Link>
        </div>
        <div className={`link ${pathname === '/users' ? 'active' : ''}`}>
          <Link to='/users'>{translate(language, 'sidebar.users')}</Link>
        </div>
        <div className={`link ${pathname === '/merchants' ? 'active' : ''}`}>
          <Link to='/merchants'>{translate(language, 'sidebar.merchants')}</Link>
        </div>
        <div />
        <div>
          <img alt={'avatar'} height='35' src={avatar} />
        </div>
        <div className={`link ${pathname === '/settings' ? 'active' : ''}`}>
          <Link to='/settings'>{translate(language, 'sidebar.settings')}</Link>
        </div>
        <div />
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar))

const settingsStyle = css`
  position: fixed;
  width: 95px;
  display: grid;
  grid-template-rows: 80px 50px 50px 50px auto 50px 50px 30px;
  background-color: #f2f2f2;
  height: 100vh;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active {
    background-color: #d9d9d9;
  }
  .link {
    height: 50px;
  }
  .link:hover {
    background-color: #d9d9d9;
  }
`
