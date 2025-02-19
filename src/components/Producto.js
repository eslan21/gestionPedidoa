import React from 'react'
import Swal from 'sweetalert2';
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';

const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!){
  eliminarProducto(id:$id)
}
  `
  const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
      obtenerProductos {
          id
          nombre
          existencia
          precio
    }
}
`

export default function Producto({ producto }) {

    /*instanciando useRouter*/

    const router = useRouter()

    // consulta 

const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
     //que vamos a hacer (actulizar)
     update(cache) {
        //obtener una copia del objeto cache
        const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })

        //Escribir cache 

        cache.writeQuery({
            query: OBTENER_PRODUCTOS ,   //donde sacamos los datos
            data: {
                obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
            }
        })
    }
});

    const { nombre, existencia, precio, id } = producto  //props 

    //eliminacion de productio
    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: "Estas Seguro?",
            text: "No puedes deshacer esta accion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const{data} = eliminarProducto({
                        variables:{
                            id
                        }
                    });

                    Swal.fire({
                        title: "Eliminado!",
                        text: eliminar.data.eliminarCliente,
                        icon: "success"
                    });
                    
                } catch (error) {
                    console.log(error)
                }


            }
        });
    }

    //Edicion de producto

    const editarCliente = () => {
        //redirigimos enviando parametros a traves de la URL (crear carpeta "pid")
         router.push({
             pathname: "/editarproducto/[id]",   //Direccion a redireccionar
             query: {id} //Informacion a enviar 
         })
        
    }
    return (
        <>
            <tr >
                <td className='border px-4 py-2'>
                    {nombre}
                </td>
                <td className='border px-4 py-2'>
                    {existencia}
                </td>
                <td className='border px-4 py-2'>
                    {precio}
                </td>
                <td className='border px-4 py-2 '>
                    <button
                        className='bg-red-300 w-full flex justify-center rounded-md hover:bg-red-500 transition-colors'
                        type='button'
                        onClick={() => confirmarEliminarProducto()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 my-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                    </button>
                </td>
                <td className='border px-4 py-2 '>
                    <button
                        className='bg-green-300 w-full flex justify-center rounded-md hover:bg-green-500 transition-colors'
                        type='button'
                        onClick={() => editarCliente()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 my-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>


                    </button>
                </td>
            </tr>

        </>
    )
}
