import React from 'react'

export default function VndUsd({onDataUsd, vnd}) {

    const changeValue = (e) => {
        let usd = e.target.value / 23500
        usd = usd.toFixed(2)
        usd = parseFloat(usd)
        onDataUsd(e.target.value, usd)
    }
    return (
        <div>
            <label>VND</label>
            <input type={'text'} onChange={changeValue} value={vnd} placeholder={'VND....'}></input>
        </div>
    )
}
