import React, { Component } from 'react'
import Content from './Content';

export class Counter extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    handleIncremant = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <Content count={1}/>
                <h1>Count: {count}</h1>
                <button type='button' onClick={this.handleIncremant}> + </button>
            </div>
        )
    }
}

export default Counter
