import React from 'react'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router'
import Header from './Header'



export default function Layout({ children }) {
  const router = useRouter();



  return (
  <>

   
    {router.pathname === "/login"|| router.pathname === "/nuevacuenta" ? (
      <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
        
        {children}
          
      </div>
      
    ) : (

      <div className='bg-gray-200 min-h-screen' >
        <div className='sm:flex sm:min-h-screen'>
          <Sidebar />
          <div className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
            <Header/>
            {children}
          </div>
        </div>
      </div>
    )
    }

  </>)
}
