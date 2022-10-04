import React, { Component } from 'react'

export class Counter extends Component {

    constructor(props) {
        super(props)

        const { start } = props;

        this.state = {
            count: start
        }
    }

    handleUp = () => {
        this.setState(prevState => ({ count: prevState.count + this.props.step }));
    }

    handleDown = () => {
        this.setState({
            count: this.state.count - this.props.step
        })
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <h1>Count: {count}</h1>
                <button onClick={this.handleDown}>-</button>
                <button onClick={this.handleUp}>+</button>
            </div>
        )
    }
}

export default Counter