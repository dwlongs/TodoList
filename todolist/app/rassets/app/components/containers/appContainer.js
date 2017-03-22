import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import BlueTheme from '../themes/blue-theme'
import * as TodoActionCreaters from '../../actions'


import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ContentAdd from 'material-ui/svg-icons/content/add'

import TaskView from '../views/taskView'
import CreateListDialog from '../views/createListDialog'
import TodoView from '../views/todoView'

import Styles from '../styles/todolist.css'


require('../styles/todolist.css')

class AppContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: true,
            selectedTaskId: "",
            defaultSelectedTask: "",
            searchStatus: false,
            createListDialogOpen: false,
        }
    }

    static defaultProps = {
        doingItemList: [],
        doneItemList: []
    }

    static defaultSelectedTask = "";

    iconStyles = () => {
        return {
            addIconStyle: {
                fill: "#396e3c",
            }
        }
    }

    handleToggle = () => {
        this.setState({open: !this.state.open})
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

    closeDialogHandle = () => {
        this.setState({
            createListDialogOpen: false
        })
    }

    openDialogHandle = () => {
        this.setState({
            createListDialogOpen: true
        })
    }

    getListValue = () => {
        const currentListId = this.state.selectedTaskId.length > 0 ?
            this.state.selectedTaskId : AppContainer.defaultSelectedTask
        return Object.values(this.props.taskList).find((task) => {
            return task.id == currentListId
        })
    }

    render() {
        const iconStyles = this.iconStyles()

        if (AppContainer.defaultSelectedTask.length === 0 &&
            Object.keys(this.props.taskList).length > 0) {
            AppContainer.defaultSelectedTask = this.props.taskList[0].id
            this.props.fetchTodoList(AppContainer.defaultSelectedTask)
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(BlueTheme)}>
                <main className={Styles.backgroundLayout}>
                    <aside className={Styles.listNav}>
                        <div>
                            <IconButton><NavigationMenu /></IconButton>
                            <TextField hintText={"Search"}/>
                            <IconButton>
                                {
                                    this.state.searchStatus ? <NavigationClose/> : <SearchIcon/>
                                }
                            </IconButton>
                        </div>
                        <nav>
                            <TaskView
                                open={this.state.open}
                                selectedTaskId={this.state.selectedTaskId}
                                defaultSelectedTask={AppContainer.defaultSelectedTask}
                                taskList={this.props.taskList}
                                selectedTaskHandle={this.selectedTaskHandle}
                            />
                        </nav>
                        <div onClick={this.openDialogHandle} >
                            <span><ContentAdd style={iconStyles.addIconStyle} /></span>
                            <span><text>Create list</text></span>
                            <CreateListDialog
                                open={this.state.createListDialogOpen}
                                createList={this.props.addTask}
                                closeHandle={this.closeDialogHandle}
                            />
                        </div>
                    </aside>
                    <TodoView
                        doingTodoList={this.props.doingItemList}
                        doneTodoList={this.props.doneItemList}
                        currentTask={this.getListValue()}
                        addTodo={this.props.addTodo}
                        updateTodoStatus={this.props.updateTodoStatus}
                    />
                </main>
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
