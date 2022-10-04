import React from 'react'
import Post from './Post';

export default function MemberInfo({...props}) {
    const {images, info} = props

    const { name, email, phone } = info;
    const imagesJSX = images.map(({ link, width, height, alt }, index) => {

        return (
            <p key={index}>
                <img src={link} width={width} height={height} alt={alt}></img>
            </p>
        )
    })
    return (
        <div style={{ margin: '3px' }}>
            <h2>Thông tin cá nhân</h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>

            <h2>Hình ảnh</h2>
            {imagesJSX}

            <Post {...props} />

        </div>
    )
}
