import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router' 
import { syncHistoryWithStore } from 'react-router-redux'
import reducer from './app/reducers'
import thunk from 'redux-thunk'
import finalCreateStore from './app/store/configureStore'
import Routes from './app/routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const store = finalCreateStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
    <Provider store={store}>
        <Routes history={history} />
    </Provider>,
    document.getElementById('appRoot')
)