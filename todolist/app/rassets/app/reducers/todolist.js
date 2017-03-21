import * as todolist from '../actions'

export function taskListReducer(state = {}, action) {
    switch (action.type) {
        case todolist.FETCH_TASK_LIST:
            return Object.assign({}, state, action.response)
        case todolist.ADD_TASK:
            let taskList = Object.values(state)
            taskList.unshift(action.response)
            return Object.assign({}, taskList)
        default:
            return Object.assign({}, state)
    }
}

function classifyItemList(itemList) {
    let doingItemList = []
    let doneItemList = []
    let otherItemList = []
    Object.values(itemList).forEach(function(element){
        if(element.status === 'doing'){
            doingItemList.push(element)
        } else if(element.status === 'done') {
            doneItemList.push(element)
        } else {
            otherItemList.push(element)
        }
    })
    return Object.assign({}, {doingItemList: doingItemList, doneItemList: doneItemList})
}

export function todoListReducer(state = {doingItemList: [], doneItemList: []}, action) {
    switch (action.type) {
        case todolist.FETCH_TODO_LIST:
            return classifyItemList(action.response)
        case todolist.ADD_TODO:
            let addItemList = []
            addItemList = addItemList.concat(state.doingItemList, state.doneItemList, action.response)
            return classifyItemList(addItemList)
        case todolist.UPDATE_TODO:
            let updatedItemList = []
            updatedItemList = updatedItemList.concat(state.doingItemList, state.doneItemList)
            let index = updatedItemList.findIndex(function(item){
                return item.id === action.response.id
            })
            updatedItemList[index] = action.response
            return classifyItemList(updatedItemList)
        default:
            return Object.assign({}, state, {doneItemList: [], doingItemList: []})
    }
}