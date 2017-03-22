import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router' 
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Routes from './app/routes'
import reducer from './app/reducers/finalReducer'

injectTapEventPlugin()

const store = createStore(reducer, applyMiddleware(thunk))
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Routes history={history} />
    </Provider>,
    document.getElementById('app-todolist')
)

