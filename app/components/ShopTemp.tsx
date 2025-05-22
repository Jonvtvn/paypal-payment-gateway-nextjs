import React from 'react'
import { Offers } from './Offers'

export const ShopTemp = () => {
    return (
        <>
            <main className='flex flex-col justify-center items-center max-w-7xl mx-auto my-10'>
                <h2 className='text-6xl font-bold mb-10'>PayPal Payment Gateway</h2>
                <Offers />
            </main>
        </>
    )
}