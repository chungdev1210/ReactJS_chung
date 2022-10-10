import React, { Component } from 'react'
import ComponentB from './ComponentB'

export class ComponentA extends Component {
  render() {
    return (
      <>
        <div>ComponentA</div>
        <ComponentB />
      </>
    )
  }
}

export default ComponentA