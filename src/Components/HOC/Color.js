import React, { Component } from 'react'

// Higher Order Component

function Color (ParentComponent) {

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    return class extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            const color = getRandomColor();
            return (
                <div className='color-box' style={{backgroundColor: color}}>
                    <ParentComponent {...this.props}/>
                </div>
            )
        }
    }
    
}

export default Color;