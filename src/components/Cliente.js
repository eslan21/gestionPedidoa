import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
//CONSULTA PARA ELIMINAR CLIENTE
const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id:ID!){
  eliminarCliente(id:$id)
}
`
// consulta para actualizar cache
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


export default function Cliente({ cliente }) {

    const { id, nombre, apellido, empresa, email } = cliente

    //Instanciando rutas

    const router = useRouter();

    //instanciando mutation
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        //que vamos a hacer (actulizar)
        update(cache) {
            //obtener una copia del objeto cache
            const { obtenerVendedorClientes } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })

            //Escribir cache 

            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,   //donde sacamos los datos
                data: {
                    obtenerVendedorClientes: obtenerVendedorClientes.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
    });


    //alerta para eliminar cliente
    const confirmarEliminarCliente = () => {
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
                    //Eliminando cliente
                    const eliminar = await eliminarCliente({
                        variables: {
                            id
                        }
                    })
                    console.log(eliminar.data.eliminarCliente)
                    //mostrando mensaje
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
    //funcion de editar 
    const editarCliente = () => {
       //redirigimos enviando parametros a traves de la URL (crear carpeta "pid")
        router.push({
            pathname: "/editarcliente/[id]",   //Direccion a redireccionar
            query: {id} //Informacion a enviar 
        })
    }
    return (
        <>

            <tr key={id}>
                <td className='border px-4 py-2'>
                    {nombre} {apellido}
                </td>
                <td className='border px-4 py-2'>
                    {empresa}
                </td>
                <td className='border px-4 py-2'>
                    {email}
                </td>
                <td className='border px-4 py-2 '>
                    <button
                        className='bg-red-300 w-full flex justify-center rounded-md hover:bg-red-500 transition-colors'
                        type='button'
                        onClick={() => confirmarEliminarCliente()}>
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
