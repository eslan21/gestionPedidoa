import React from 'react'
import Sidebar from './Sidebar'


export default function Layout({children}) {
  return (
        <>
        <div className='bg-gray-200 min-h-screen' >
            <div className='flex min-h-screen'>
                <Sidebar/>
              <div className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>

                {children}
              </div>
            </div>
        </div>
        </>
  )
}
