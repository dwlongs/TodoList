import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import { green500 } from 'material-ui/styles/colors'

import Styles from '../styles/core.css'

import TodoItems from './todoItems'

export default class TodoView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textValue: "",
            errorText: "",
            items: [],
            doneItems: [],
        }
    }

    static styles = {
        underlineStyle: {
            borderColor: green500,
        },
    }

    onChangeHandle = (event) => {
        this.setState({ textValue: event.target.value })
    }

    addTodoHandle = (event) => {
        if (event.charCode === 13) {
            let text = this.refs.todoInput.getValue()
            if (text.length > 0) {
                this.props.addTodo(this.props.taskId, {todo: text})
                this.setState({ textValue: "" })
            } else {
                this.setState({ errorText: "Don't add an empty todo item." })
            }
        }
    }

    onFinishTodoHandle = (todoId) => {
        setTimeout(() => {
            this.props.updateTodoStatus(this.props.taskId, todoId, {status: "done"})
        }, 300)
    }

    onUnFinishTodoHandle = (todoId) => {
         setTimeout(() => {
            this.props.updateTodoStatus(this.props.taskId, todoId, {status: "doing"})
        }, 300)       
    }

    render() {
        let doneTotal = this.props.doneItemList.length
        let total = this.props.doingItemList.length + doneTotal
        return (
            <Paper className={Styles.todoWrapper} zDepth={2}>
                <h2>{`All items (${total}/${doneTotal})`}</h2>
                <h3 className={Styles.todoTitle}>
                    <span>To do :</span>
                    <div></div>
                </h3>
                <div className={Styles.todoListPanel}>
                    <TodoItems test={"doing"} items={this.props.doingItemList}
                        onChangeHandle={this.onFinishTodoHandle} />
                </div>
                <div className={Styles.textFieldWrapper}>
                    <TextField
                        hintText={"Type and hit Enter to add"}
                        underlineStyle={TodoView.styles.underlineStyle}
                        fullWidth={true}
                        onKeyPress={this.addTodoHandle}
                        errorText={this.state.errorText}
                        onChange={this.onChangeHandle}
                        value={this.state.textValue}
                        ref="todoInput"
                    />
                </div>
                <h3 className={Styles.doneTitle}>
                    <span>Done :</span>
                    <div></div>
                </h3>
                <div className={Styles.doneListPanel}>
                    <TodoItems test={"done"} items={this.props.doneItemList}
                        onChangeHandle={this.onUnFinishTodoHandle} />
                </div>
            </Paper>
        )
    }
}