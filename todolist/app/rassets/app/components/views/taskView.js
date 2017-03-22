import React, {Component, PropTypes} from 'react'
import {List, ListItem, makeSelectable} from 'material-ui/List'


export default class TaskView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorText: "",
        }
    }

    static propTypes = {
        defaultSelectedTask: PropTypes.string.isRequired,
    }

    taskList = () => {
        return Object.values(this.props.taskList).map((task) => {
            return <ListItem
                key={task.id}
                value={task.id}
                primaryText={task.title}
            />
        })
    }

    render() {
        let SelectableList = makeSelectable(List)
        let taskList = this.taskList()
        return (
            <SelectableList
                value={this.props.selectedTaskId.length > 0 ?
                    this.props.selectedTaskId : this.props.defaultSelectedTask}
                onChange={this.props.selectedTaskHandle}

                ref="taskList"
            >
                {taskList}
            </SelectableList>
        )
    }
}