import React, { Component } from 'react'
import Button from './Button'

export class Ref02 extends Component {

    constructor() {
        super()
        this.btnRef = React.createRef();
    }
  render() {
    return (
      <div style={{margin: '3%'}}>
        <Button ref={this.btnRef} />
      </div>
    )
  }
}

export default Ref02