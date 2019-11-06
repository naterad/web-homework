import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { createStore, applyMiddleware } from 'redux'
import { client } from './network/apollo-client'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'

// use applyMiddleware to add the thunk middleware to the store
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  (
    <div data-app-init=''>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </Provider>
    </div>
  ),
  document.getElementById('react-app')
)
