import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import AppContainer from './components/containers/appContainer'


export default (props) => {
	return (
		<Router history={props.history}>
			<Route path="/" component={AppContainer} />
		</Router>
	)
}