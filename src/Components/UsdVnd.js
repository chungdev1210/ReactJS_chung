import React from 'react'

export default function UsdVnd({ onDataVnd, usd }) {

    const changeValue = (e) => {
        let vnd = e.target.value * 23500
        vnd = parseFloat(vnd)
        onDataVnd(e.target.value, vnd)
    }

    return (
        <div>
            <label>USD</label>
            <input style={{ marginBottom: '8px' }} onChange={changeValue} value={usd} type={'text'} placeholder={'USD....'} ></input>
        </div>
    )
}
