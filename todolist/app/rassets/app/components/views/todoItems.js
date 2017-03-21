import React, { Component } from 'react'

import Styles from '../styles/core.css'

export default class TodoItems extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        onChangeHandle() {
        }
    }

    getCheckedValue = (item) => {
        if(item.status === 'doing') {
            return false
        } else if(item.status === 'done') {
            return true
        } else {
            return false
        }
    }

    render() {
        console.log('items', this.props.items)
        return (
            <div>
                {
                    this.props.items.map((item) => {
                        return <div key={item.id} className={Styles.todoItemWrapper}>
                            <div
                                className={Styles.checkboxContainer}
                                onClick={this.props.onChangeHandle.bind(this, item.id)}>
                                <input type="checkbox" checked={this.getCheckedValue(item)} />
                                <div></div>
                            </div>
                            <span>{item.todo}</span>
                        </div>
                    })
                }
            </div>
        )
    }
}