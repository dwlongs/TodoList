import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import BlueTheme from '../themes/blue-theme'
import AppBar from 'material-ui/AppBar'

import * as TodoActionCreaters from '../../actions'
import * as reducers from '../../reducers/finalReducer'
import TaskView from '../views/taskView'
import TodoView from '../views/todoView'

import Styles from '../styles/core.css'


require('../styles/core.css')

class AppContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: true,
            selectedTaskId: "",
            defaultSelectedTask: "",
        }
    }

    static defaultProps = {
        doingItemList: [],
        doneItemList: []
    }

    static defaultSelectedTask = "";

    handleToggle = () => {
        this.setState({ open: !this.state.open })
    }

    componentWillMount() {
        this.props.fetchTaskList()
    }

    selectedTaskHandle = (event, taskId) => {
        this.setState({
            selectedTaskId: taskId
        })
        this.props.fetchTodoList(taskId)
    }

    render() {
        if (AppContainer.defaultSelectedTask.length === 0 &&
            Object.keys(this.props.taskList).length > 0) {
            AppContainer.defaultSelectedTask = this.props.taskList[0].id
            this.props.fetchTodoList(AppContainer.defaultSelectedTask)
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(BlueTheme)}>
                <div className={Styles.flexContainer}>
                    <main>
                        <AppBar
                            title={<span style={{ cursor: 'pointer' }}>Todo List</span>}
                            onLeftIconButtonTouchTap={this.handleToggle}
                        />
                        <div className={Styles.mainTodoWrapper}>
                            <TaskView
                                open={this.state.open}
                                selectedTaskId={this.state.selectedTaskId}
                                defaultSelectedTask={AppContainer.defaultSelectedTask}
                                taskList={this.props.taskList}
                                addTask={this.props.addTask}
                                selectedTaskHandle={this.selectedTaskHandle}
                            />
                            <TodoView
                                doingItemList={this.props.doingItemList}
                                doneItemList={this.props.doneItemList}
                                addTodo={this.props.addTodo}
                                updateTodoStatus={this.props.updateTodoStatus}
                                taskId={this.state.selectedTaskId.length > 0 ?
                                        this.state.selectedTaskId : AppContainer.defaultSelectedTask}
                            />
                        </div>
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        taskList: state.taskList,
        doingItemList: state.todoList.doingItemList,
        doneItemList: state.todoList.doneItemList
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(TodoActionCreaters, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
