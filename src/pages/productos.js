
import Layout from "@/components/Layout";
import Producto from "@/components/Producto";
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link';


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


export default function pedidos() {

    // instanciando query
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)
   

    if (loading) return <p>Cargando..</p>

    
    return (
        <div>

            <Layout>
                <h2 className="text-2xl tezt-gray-800 font-light">Lista de Productos </h2>
                <Link
                    href='/nuevoproducto'
                    className='bg-blue-800 py-2 px-5 mt-3 flex justify-center sm:inline-block text-white rounded text-sm font-bold  hover:bg-gray-800 uppercase mb-3'>
                    Nuevo Producto
                </Link>
                <div className="overflow-scroll">
                    <table className='table-auto shadow-md mt-10 w-full w-lg'>
                        <thead className='bg-gray-800'>
                            <tr className='text-white'>
                                <th className='w-1/5 py-2'>
                                    Nombre
                                </th>
                                <th className='w-1/5 py-2'>
                                    Cantidad
                                </th>
                                <th className='w-1/5 py-2'>
                                    Precio
                                </th>
                                <th className='w-1/5 py-2'>
                                    Eliminar
                                </th>
                                <th className='w-1/5 py-2'>
                                    Editar
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>

                            {data?.obtenerProductos?.length > 0 ? (data?.obtenerProductos.map(producto => {

                                return (
                                    <Producto
                                        key={producto.id}
                                        producto={producto}
                                    />)

                            })) : (
                                <tr>
                                    <td colSpan='3' className='border px-4 py-2 text-center'>
                                        No hay productos disponibles.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>
            </Layout>
        </div>
    )
}