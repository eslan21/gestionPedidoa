import React from 'react'
import { gql, useQuery} from '@apollo/client'
import { useRouter } from 'next/router'

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
          nombre
          apellido
          id
  }
}
`
export default function Header() {

    const router = useRouter();
    const {data,loading , error } = useQuery(OBTENER_USUARIO)

    //Asegurando carga de datos
    if ( loading) return null
    //asegurando carga del header
    if(!data) return router.push('/login')

    const cerraSesion = ()=> {
        localStorage.removeItem('token');
        router.push('/login');
    };
    
  return (
    <div className='sm:flex justify-between mb-4'>

        <p className='mr-2'>Hola: {data.obtenerUsuario.nombre}</p>
        <button 
        onClick={ ()=> cerraSesion()}
        type="button"
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'>
            Cerrar Sesion 
        </button>
    </div>
  )
}
