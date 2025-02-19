import {useContext} from 'react'
import Layout from '@/components/Layout'
import AsignarCliente from '@/components/pedido/AsignarCliente'
import AsignarProducto from '@/components/pedido/AsignarProducto'
import ResumePedido from '@/components/pedido/ResumenPedido'
import Total from '@/components/pedido/Total'
import PedidoContext from '@/context/pedidos/PedidoContext'


export default function nuevopedido() {
    //context
    const context = useContext(PedidoContext)
    const {cliente, total, productoSeleccion} = context
    console.log(cliente,total,productoSeleccion)

    const validarPedido = ()=> {
        return !productoSeleccion.every((each)=> each.cantidad >0 ) || total === 0 || cliente.length === 0 ? 'opacity-50 cursor-not-allowed': '';
    }

    return (
        <>
            <Layout>

                <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
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
                         type='button'>
                            Registrar pedido
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    )
}
