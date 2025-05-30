import Layout from '../components/Layout'
import Cliente from '@/components/Cliente';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerVendedorClientes{
    obtenerVendedorClientes{
      nombre
      apellido
      empresa
      email
      id
      
  }

}
`
export default function Home() {
  //instanciando useRouter

  const router = useRouter();

  //consulta apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);


  if (loading) { return <p>Loading..</p> }

  if (error) {
    console.log(error)
    return <p>Ocurrio un error</p>
  }

  if (!data.obtenerVendedorClientes) {
    router.push('/login')
    return null
  }

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Desde index</h1>

        <Link
          href='/nuevoCliente'
          className='bg-blue-800 py-2 px-5 mt-3 flex justify-center sm:inline-block text-white rounded text-sm font-bold  hover:bg-gray-800 uppercase mb-3'>
          Nuevo Cliente
        </Link>
        <div className='overflow-scroll'>
          <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>
                  Nombre
                </th>
                <th className='w-1/5 py-2'>
                  Empresa
                </th>
                <th className='w-1/5 py-2'>
                  Email
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

              {data?.obtenerVendedorClientes?.length > 0 ? (data?.obtenerVendedorClientes.map(cliente => {

                return (
                  <Cliente
                    key={cliente.id}
                    cliente={cliente}
                  />)

              })) : (
                <tr>
                  <td colSpan='3' className='border px-4 py-2 text-center'>
                    No hay clientes disponibles.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </Layout>
    </div>
  );
}
