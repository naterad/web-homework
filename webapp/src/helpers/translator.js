const english = {
  'home.dashboard': 'Dashboard',
  'home.spend_date': 'Spend by Date',
  'home.spend_user': 'Spend by User',
  'home.spend_merchant': 'Spend by merchants',
  'home.no_transactions_1': 'No transactions found. Load data on',
  'home.no_transactions_2': 'Settings',
  'home.no_transactions_3': 'page.',
  'home.transactions_user': 'Transactions by User',
  'home.transactions_merchant': 'Transactions by Merchant',

  'merchants.merchants': 'Merchants',
  'merchants.total_spend': 'Total spent',
  'merchants.amount': 'Amount',
  'merchants.date': 'Date',
  'merchants.description': 'Description',

  'settings.settings_title': 'Settings',
  'settings.selected_language': 'Selected Language',
  'settings.number_format': 'Number Format',
  'settings.import_csv': 'Import CSV',

  'overview.name': 'Name',
  'overview.total': 'Total',

  'sidebar.users': 'users',
  'sidebar.merchants': 'merchants',
  'sidebar.dashboard': 'dashboard',
  'sidebar.settings': 'settings',

  'users.total_spent': 'Total spend',
  'users.merchant': 'Merchant',
  'users.amount': 'Amount',
  'users.date': 'Date',
  'users.description': 'Description',
  'users.edit': 'edit',
  'users.delete': 'delete',
  'users.submit': 'submit'
}

const gibberish = {
  'home.dashboard': 'Dsoisdoijd',
  'home.spend_date': 'Slksjdokfje',
  'home.spend_user': 'Ssidjfor',
  'home.spend_merchant': 'Slskdjlfkjsdlfkjs',
  'home.no_transactions_1': 'Nlskjdlkfjsldkjflskjflksjn',
  'home.no_transactions_2': 'Swijosjkds',
  'home.no_transactions_3': 'pslkdjfe.',
  'home.transactions_user': 'Tslkdjflkjsldkjfsfr',
  'home.transactions_merchant': 'Towijdovmojvovoijveft',

  'merchants.merchants': 'Misodioijsdofs',
  'merchants.total_spend': 'Tlksdjflkjt',
  'merchants.amount': 'Asldkfjlkjst',
  'merchants.date': 'Dsdfe',
  'merchants.description': 'Dlskjdlfkjn',

  'settings.settings_title': 'Slskjdfos',
  'settings.selected_language': 'Sslkjdlkjlkjv ssde',
  'settings.number_format': 'Nlskjdlfjovit',
  'settings.import_csv': 'IlskdjlvjiV',

  'overview.name': 'Nsdfe',
  'overview.total': 'Tsldkl',

  'sidebar.users': 'usdlfs',
  'sidebar.merchants': 'mslksfs',
  'sidebar.dashboard': 'dsljfld',
  'sidebar.settings': 'svkvpks',

  'users.total_spent': 'T;sokpvkovd',
  'users.merchant': 'Mslkdjfot',
  'users.amount': 'Aovjovt',
  'users.date': 'DSdfe',
  'users.description': 'Dlskjdlvkjn',
  'users.edit': 'esdft',
  'users.delete': 'dsdfsdfw',
  'users.submit': 'slooiojt'
}

export function translate (language, key) {
  if (language === 'gibberish' && gibberish[key]) {
    return gibberish[key]
  }
  return english[key]
}
