import React, { Component } from 'react'
import ComponentC from './ComponentC';

export class ComponentB extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div>ComponentB</div>
    )
  }
}

export default ComponentB