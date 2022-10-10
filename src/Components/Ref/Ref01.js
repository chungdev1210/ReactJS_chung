import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

export class Ref01 extends Component {
    constructor() {
        super()
        this.inputRef = React.createRef();
    }

    componentDidMount = () => {
        this.inputRef.current.focus();
        this.inputRef.current.style.border = '1px solid red'
    }

    handleUp = () => {
        this.inputRef.current.style.fontSize = "1.5rem"
    }

    handleDown = () => {
        this.inputRef.current.style.fontSize = "0.7rem"
    }

    handleReset = () => {
        this.inputRef.current.style.fontSize = "1rem"
    }
    render() {
        return (
            <div className='container'>
                <input
                    type="search"
                    className='form-control'
                    placeholder='Nhập từ khoá tìm kiếm...'
                    ref={this.inputRef}></input>
                <button onClick={this.handleUp} className='mt-2 me-2'> + </button>
                <button onClick={this.handleReset} className='me-2'> Reset </button>
                <button onClick={this.handleDown}> - </button>
            </div>
        )
    }
}

export default Ref01