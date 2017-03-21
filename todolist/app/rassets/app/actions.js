import fetch from 'isomorphic-fetch'



const API_ROOT = `${window.location.protocol}//${location.host}`

export const FETCH_TASK_LIST = 'FETCH_TASK_LIST'
export const ADD_TASK = 'ADD_TASK'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST'

function receiveGet(json) {
	return {
		type: FETCH_TASK_LIST,
		response: json
	}
}

export function fetchTaskList() {
	return function(dispatch) {
	   	return fetch(`${API_ROOT}/api/tasks`)
	   	.then(response => response.json()
	   	.then(json => {
			dispatch(receiveGet(json)) 
		}))
	}
}

function postAPI(url, params, receive) {
	return function(dispatch) {
	   	return fetch(`${API_ROOT}${url}`, {
	   		method: 'POST', 
	   		body: JSON.stringify(params),
	   		headers: {'Content-Type': 'application/json'}
	   	})
	   	.then(response => response.json()
	   	.then(json => {
			dispatch(receive(json)) 
		}))
	}	
}

function putAPI(url, params, receive) {
	return function(dispatch) {
	   	return fetch(`${API_ROOT}${url}`, {
	   		method: 'PUT', 
	   		body: JSON.stringify(params),
	   		headers: {'Content-Type': 'application/json'}
	   	})
	   	.then(response => response.json()
	   	.then(json => {
			dispatch(receive(json)) 
		}))
	}	
}

function getAPI(url, receive) {
	return function(dispatch) {
	   	return fetch(`${API_ROOT}${url}`, {
	   		method: 'GET', 
	   		// body: JSON.stringify(params),
	   		// headers: {'Content-Type': 'application/json'}
	   	})
	   	.then(response => response.json()
	   	.then(json => {
			dispatch(receive(json)) 
		}))
	}	
}

export function addTask(params) {
	const url = '/api/tasks'
	return postAPI(url, params, (json) => {
		return {
			type: ADD_TASK,
			response: json
		}	
	})
}

export function fetchTodoList(task_id) {
	const url = `/api/tasks/${task_id}/items`
	return getAPI(url, (json) => {
		return {
			type: FETCH_TODO_LIST,
			response: json
		}
	})
}

export function addTodo(task_id, params) {
	const url = `/api/tasks/${task_id}/items`
	return postAPI(url, params, (json) => {
		return {
			type: ADD_TODO,
			response: json
		}
	})
}

export function updateTodoStatus(task_id, item_id, params) {
	const url = `/api/tasks/${task_id}/items/${item_id}/update_status`
	return putAPI(url, params, (json) => {
		return {
			type: UPDATE_TODO,
			response: json
		}		
	})
}
