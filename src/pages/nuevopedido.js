import {useContext, useState} from 'react'
import Layout from '@/components/Layout'
import AsignarCliente from '@/components/pedido/AsignarCliente'
import AsignarProducto from '@/components/pedido/AsignarProducto'
import ResumePedido from '@/components/pedido/ResumenPedido'
import Total from '@/components/pedido/Total'
import PedidoContext from '@/context/pedidos/PedidoContext'
import {gql, useMutation} from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input){
            id
           
  }
}
`
// consulta para actualizar pedido 
const OBTENER_PEDIDOS = gql`
query obtenerPedidoVendedor{
  obtenerPedidoVendedor{
     id
  
  }
}
`

export default function nuevopedido() {
    //useState local

    const [mensaje, setMensaje] = useState(null)

    const router = useRouter()

    //context
    const context = useContext(PedidoContext)
    const {cliente, total, productoSeleccion} = context
    console.log(cliente)
    //creando mutatation
    
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
        refetchQueries: [
            { query: OBTENER_PEDIDOS }, // Consulta que deseas actualizar
          ],
    });
    
    const validarPedido = ()=> {
        return !productoSeleccion.every((each)=> each.cantidad >0 ) || total === 0 || cliente.length === 0 ? 'opacity-50 cursor-not-allowed': '';
    }
    
    const creadonNuevoPedido = async()=>{
        const {id} = cliente;
        console.log(id)
        const pedido = productoSeleccion.map(({__typename,existencia,  ...producto})=> producto)
       

        try {
            const {data} = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })

            //redireccionar 
            router.push('pedidos')

            //alerta

            Swal.fire(
                'Correcto',
                'El pedido se registro correctamente',
                'success'
            )

        } catch (error) {
            setMensaje(error.message)

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }

    const mostrarMensaje =()=>{
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <>
            <Layout>

                <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

                {mensaje && mostrarMensaje()}

                <div className='flex justify-center mt-5 '>
                    <div className='w-full max-w-lg'>
                        <p className='mt-10 by-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1- Selecciones un Cliente</p>
                        <AsignarCliente />
                        <p className='mt-10 by-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2 Selecciones un Producto</p>
                        <AsignarProducto />
                        <p className='mt-10 by-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3 Seleccionar Cantidad</p>
                        <ResumePedido/>
                        <Total />
                        <button
                         className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                         type='button'
                         onClick={()=>creadonNuevoPedido()}
                         >
                            Registrar pedido
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    )
}
