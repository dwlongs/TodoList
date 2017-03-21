import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { taskListReducer, todoListReducer } from './todolist'

export default combineReducers({
	taskList: taskListReducer,
	todoList: todoListReducer,
	routing: routerReducer,
});