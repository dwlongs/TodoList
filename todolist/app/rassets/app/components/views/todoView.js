import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import Styles from '../styles/todolist.css'

import TodoItems from './todoItems'

export default class TodoView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textValue: "",
            errorText: "",
            unShowDoneTodoList: true,
        }
    }

    static styles = {
        checkbox: {
            marginBottom: 16
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.currentTask != undefined &&
            nextProps.currentTask.id != this.props.currentTask.id) {
            this.setState({
                unShowDoneTodoList: true
            })
        }
    }

    onChangeHandle = (event) => {
        this.setState({textValue: event.target.value})
    }

    addTodoHandle = (event) => {
        if (event.charCode === 13) {
            let text = this.refs.inputTodo.value
            if (text.length > 0) {
                this.props.addTodo(this.props.currentTask.id, {todo: text})
                this.setState({textValue: ""})
            }
        }
    }

    showDoneTodoListHandle = () => {
        this.setState({
            unShowDoneTodoList: !this.state.unShowDoneTodoList
        })
    }

    onFinishTodoHandle = (todoId) => {
        this.props.updateTodoStatus(this.props.taskId, todoId, {status: "done"})
    }

    onUnFinishTodoHandle = (todoId) => {
        this.props.updateTodoStatus(this.props.taskId, todoId, {status: "doing"})
    }

    render() {
        let doneTotal = this.props.doneTodoList.length
        let total = this.props.doingTodoList.length + doneTotal
        return (
            <section className={Styles.taskTodoList}>
                <div>
                    {
                        this.props.currentTask != undefined ?
                            <h1>{`${this.props.currentTask.title} (${doneTotal}/${total})`}</h1> : null
                    }
                </div>
                <div>
                    <div className={Styles.addTodoInput}>
                        <input
                            type="text"
                            placeholder="Add a to-do..."
                            onChange={this.onChangeHandle}
                            onKeyPress={this.addTodoHandle}
                            value={this.state.textValue}
                            ref="inputTodo"
                        />
                    </div>
                    <div className={Styles.todoPanel}>
                        <TodoItems
                            test={"doing"}
                            items={this.props.doingTodoList}
                            onChangeHandle={this.onFinishTodoHandle}
                        />
                        <RaisedButton
                            label="Show completed to-dos"
                            className={Styles.showDoneListBar}
                            onTouchTap={this.showDoneTodoListHandle}
                        />
                        <div
                            className={this.state.unShowDoneTodoList ? Styles.unShowDoneTodoList : null}
                        >
                            <TodoItems
                                test={"done"}
                                items={this.props.doneTodoList}
                                onChangeHandle={this.onUnFinishTodoHandle}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

// {/*<Paper className={Styles.todoWrapper} zDepth={2}>*/}
//     {/*<h2>{`All items (${total}/${doneTotal})`}</h2>*/}
//     {/*<h3 className={Styles.todoTitle}>*/}
//         {/*<span>To do :</span>*/}
//         {/*<div></div>*/}
//     {/*</h3>*/}
//     {/*<div className={Styles.textFieldWrapper}>*/}
//         {/*<TextField*/}
//             {/*hintText={"Type and hit Enter to add"}*/}
//             {/*underlineStyle={TodoView.styles.underlineStyle}*/}
//             {/*fullWidth={true}*/}
//             {/*onKeyPress={this.addTodoHandle}*/}
//             {/*errorText={this.state.errorText}*/}
//             {/*onChange={this.onChangeHandle}*/}
//             {/*value={this.state.textValue}*/}
//             {/*ref="todoInput"*/}
//         {/*/>*/}
//     {/*</div>*/}
//     {/*<h3 className={Styles.doneTitle}>*/}
//         {/*<span>Done :</span>*/}
//         {/*<div></div>*/}
//     {/*</h3>*/}
//     {/*<div className={Styles.doneListPanel}>*/}
//         {/*<TodoItems test={"done"} items={this.props.doneItemList}*/}
//                    {/*onChangeHandle={this.onUnFinishTodoHandle} />*/}
//     {/*</div>*/}
// {/*</Paper>*/}