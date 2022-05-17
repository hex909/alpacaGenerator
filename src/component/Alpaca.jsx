import React from 'react'

function Alpaca({ img, alpacaRef }) {
    return (
        <div
            className='alpaca'
            ref={alpacaRef}
            style={{ backgroundColor: `${img.backgrounds}` }}>
            <img className='ears' src={img.ears} alt='ear' />
            <img className='neck' src={img.neck} alt='neck' />
            <img className='nose' src={img.nose} alt='nose' />
            <img className='mouth' src={img.mouth} alt='mouth' />
            <img className='leg' src={img.leg} alt='leg' />
            <img className='eyes' src={img.eyes} alt='eyes' />
            <img className='hair' src={img.hair} alt='hair' />
            <img className='accessories' src={img.accessories} alt='accessories' />
        </div>
    )
}

export default Alpaca