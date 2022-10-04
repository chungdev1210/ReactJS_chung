import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Toggle.css';

export class Toggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
    }
    handleText = () => {
        this.setState({
            toggle: this.state.toggle ? false : true
        })
    }

  render() {
    return (
      <>
        <button type='button' onClick={this.handleText} className='btn btn-primary'>{this.state.toggle ? 'Ẩn' : 'Hiện'}</button>
        <div className='content' style={{display: this.state.toggle ? 'block' : 'none'}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </>
    )
  }
}

export default Toggle