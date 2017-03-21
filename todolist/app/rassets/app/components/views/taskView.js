import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { green500 } from 'material-ui/styles/colors'
import Drawer from 'material-ui/Drawer'

import Styles from '../styles/core.css'

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

	static defaultProps = {
		open: true,
	}

	static styles = {
		underlineStyle: {
			borderColor: green500,
		},
	}

	taskList = () => {
		return Object.values(this.props.taskList).map((task) => {
			return <ListItem
				key={task.id}
				value={task.id}
				primaryText={task.title}
				rightIcon={<ActionInfo />}
			/>
		})
	}

	addTaskHandle = (event) => {
		let value = this.refs.taskInput.getValue()
		if (value.length > 0) {
			this.props.addTask({ title: value })
		} else {
			this.setState({ errorText: "Don't create a empty task." })
		}
	}

	render() {
		let SelectableList = makeSelectable(List)
		let taskList = this.taskList()
		return (
			<Drawer
				containerClassName={Styles.taskWrapper}
				className={Styles.drawerWrapper}
				open={this.props.open}
			>
				<div className={Styles.taskInputWrapper}>
					<TextField
						hintText={"Create a Task"}
						underlineStyle={TaskView.styles.underlineStyle}
						errorText={this.state.errorText}
						ref="taskInput"
					/>
					<RaisedButton
						label="+"
						className={Styles.taskInputButtonField}
						onTouchTap={this.addTaskHandle}
					/>
				</div>
				<SelectableList
					value={this.props.selectedTaskId.length > 0 ?
						this.props.selectedTaskId : this.props.defaultSelectedTask}
					onChange={this.props.selectedTaskHandle}

					ref="taskList"
				>
					{taskList}
				</SelectableList>
			</Drawer>
		)
	}
}