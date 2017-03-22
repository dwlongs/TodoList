import React, {Component} from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import Styles from '../styles/todolist.css'

export default class CreateListDialog extends Component {

    static defaultProps = {
        open: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            createDisabled: false,
            errorText: ""
        }
    }

    closeHandle = () => {
        this.props.closeHandle()
        this.setState({
            createDisabled: false
        })
    }

    createHandle = () => {
        let value = this.refs.newList.getValue()
        if (value.length > 0) {
            this.setState({
                createDisabled: true
            })
            this.props.createList({title: value}).then(() => {
                this.closeHandle()
            })
        } else {
            this.setState({errorText: "Can't create a empty content task."})
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.closeHandle}
            />,
            <FlatButton
                label="Create"
                primary={true}
                onTouchTap={this.createHandle}
                disabled={this.state.createDisabled}
            />,
        ]

        return (
            <Dialog
                contentClassName={Styles.createListDialog}
                titleClassName={Styles.dialogTitle}
                title="Create New List"
                open={this.props.open}
                modal={false}
                actions={actions}
            >
                <TextField
                    hintText={"List Name"}
                    fullWidth={true}
                    ref="newList"
                    errorText={this.state.errorText}
                />
            </Dialog>

        )
    }
}