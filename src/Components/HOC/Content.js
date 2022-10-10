import React, { Component, memo } from 'react'
import HigherCounter from './HigherCounter'

export class Content extends Component {

  render() {
    console.log('re-render');
    return (
      <h3>Content</h3>
    )
  }
}

export default memo(Content)