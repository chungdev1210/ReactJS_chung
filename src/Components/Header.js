import React from 'react'
import Hotline from './Header/Hotline'
import Nav from './Header/Nav'

export default function Header(props) {
    const { title, nav } = props;
    return (
        <header>
            <div className='container'>
                <h1 className='text-center'>{title}</h1>
                <Hotline {...props} />
                <Nav nav={nav} />
            </div>
        </header>
    )
}
