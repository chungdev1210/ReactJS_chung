import React, { Component } from 'react'

export class Content extends Component {
    constructor(props) {
        super()
    }
    render() {

        const {title, detail} = this.props;
        return (
            <>
                <h1
                style={{
                    color: 'red'
                }}
                >{title}</h1>
                <p>{detail}</p>
            </>
        )
    }
}

export default Content