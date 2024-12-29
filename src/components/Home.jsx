import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <div className='w-full h-12 items-center px-6 flex gap-3 bg-slate-400'>
        <h2 className='text-xl font-medium'>Ecommerce</h2>
        <ul className='flex gap-4'>
            <li>Home</li>
            <Link to="/products">
            <li>Products</li>
            </Link>
        </ul>
    </div>
    </>
  )
}
