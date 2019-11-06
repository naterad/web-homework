import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSelectedLaunguage, setNumberFormat, loadData } from '../../redux/actions/settingsActions'
import { translate } from '../../helpers/translator'
import CSVReader from 'react-csv-reader'

const mapStateToProps = state => {
  return {
    language: state.settings.language,
    numberFormat: state.settings.numberFormat
  }
}

const mapDispatchToProps = {
  setSelectedLaunguage: setSelectedLaunguage,
  setNumberFormat: setNumberFormat,
  loadData: loadData
}

class Settings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    numberFormat: PropTypes.string.isRequired,
    setNumberFormat: PropTypes.func.isRequired,
    setSelectedLaunguage: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired
  }

  selectLanguage = language => {
    this.props.setSelectedLaunguage(language)
  }

  selectNumberFormat = format => {
    this.props.setNumberFormat(format)
  }

  loadCSV = file => {
    this.props.loadData(file)
  }

  render () {
    const { language, numberFormat } = this.props
    return (
      <div className={'main_content'}>
        <h1>{translate(language, 'settings.settings_title')}</h1>
        <hr />
        <h3>{translate(language, 'settings.selected_language')}</h3>
        <button
          className={language === 'english' ? 'active' : 'inactive'}
          onClick={() => this.selectLanguage('english')}
        >
          English
        </button>
        <button
          className={language === 'gibberish' ? 'active' : 'inactive'}
          onClick={() => this.selectLanguage('gibberish')}
        >
          Gibberish
        </button>
        <br />
        <hr />
        <h3>{translate(language, 'settings.number_format')}</h3>
        <button
          className={numberFormat === 'normal' ? 'active' : 'inactive'}
          onClick={() => this.selectNumberFormat('normal')}
        >
          Normal
        </button>
        <button
          className={numberFormat === 'roman' ? 'active' : 'inactive'}
          onClick={() => this.selectNumberFormat('roman')}
        >
          Roman Numberal
        </button>
        <br />
        <hr />
        <h3>{translate(language, 'settings.import_csv')}</h3>
        <CSVReader
          cssClass='csv-reader-input'
          inputId='ObiWan'
          inputStyle={{ color: 'red' }}
          onFileLoaded={this.loadCSV}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
