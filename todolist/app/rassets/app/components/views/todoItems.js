import React, {Component} from 'react'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'

import Styles from '../styles/todolist.css'

export default class TodoItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedSelectTodoId: ""
        }
    }

    getCheckedValue = (item) => {
        if (item.status === 'doing') {
            return item.id === this.state.checkedSelectTodoId ? true : false
        } else if (item.status === 'done') {
            return item.id === this.state.checkedSelectTodoId ? false : true
        } else {
            return false
        }
    }

    onChangeHandle = (todoId) => {
        this.setState({
            checkedSelectTodoId: todoId
        })
        setTimeout(() => {
            this.setState({
                checkedSelectTodoId: ""
            })
            this.props.onChangeHandle(todoId)
        }, 300)
    }

    render() {
        // console.log('items', this.props.items)
        return (
            <div>
                {
                    this.props.items.map((item) => {
                        return (
                            <Paper
                                key={item.id}
                                className={Styles.doingTodoLabel}
                                onClick={this.selectTodoHandle}
                                ref="todo"
                            >
                                <div>
                                    <Checkbox
                                        onCheck={this.onChangeHandle.bind(this, item.id)}
                                        checked={this.getCheckedValue(item)}
                                    />
                                </div>
                                <span>{item.todo}</span>
                            </Paper>
                        )
                    })
                }
            </div>
        )
    }
}