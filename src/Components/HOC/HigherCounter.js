// import React, { Component } from 'react'

// function HigherCounter (ParentComponent) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//         }

//         shouldComponentUpdate(nextProps, nextState) {
//             if (this.props.content !== nextProps.content) {
//             return true;
//             }
//             return false;
//         }

//         render() {
//             return (
//                 <ParentComponent {...this.props}/>
//             )
//         }
//     }

// }

// export default HigherCounter;