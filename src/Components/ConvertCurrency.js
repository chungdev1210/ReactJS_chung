
import React, { Component } from 'react'
import UsdVnd from './UsdVnd'
import VndUsd from './VndUsd'

export class ConvertCurrency extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {
            usd: 0,
            vnd: 0
        }
    }

    handleDataVnd = (usd, vnd ) => {
        this.setState({vnd: vnd, usd : usd})     
    }

    handleDataUsd = (vnd, usd) => {
        this.setState({usd: usd, vnd: vnd})
    }

  render() {
    const {usd, vnd} = this.state;
    return (
        <div style={{ margin: '3%' }}>
            <UsdVnd onDataVnd={this.handleDataVnd} usd={usd} />
            <VndUsd onDataUsd={this.handleDataUsd} vnd={vnd} />
        </div>
    )
  }
}

export default ConvertCurrency
