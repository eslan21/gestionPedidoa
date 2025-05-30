import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2';

const ACTUALIZAR_ESTADO = gql`
mutation actualizarPedido($id:ID!, $input:PedidoInput){
  actualizarPedido(id:$id, input:$input){
    estado
    
  }
}
`;

const ELIMINAR_PEDIDO = gql`
mutation eliminarPedido($id:ID!){
    eliminarPedido(id:$id)
}
`;
//Actualizar pedido
const OBTENER_PEDIDOS = gql`
query obtenerPedidoVendedor{
  obtenerPedidoVendedor{
     id
   
  }
}
`

export default function Pedido({ pedido }) {
    const { id, total, cliente: { nombre, apellido, telefono, email }, estado } = pedido;

    const [estadoPedido, setStadoPedido] = useState(estado);
    const [clases, setClases] = useState('');      //controla clases para el estado 
    //Mutation 
    const [actualizarPedido] = useMutation(ACTUALIZAR_ESTADO);
    const[eliminarPedido] = useMutation(ELIMINAR_PEDIDO,{
        refetchQueries: [
            { query: OBTENER_PEDIDOS }, // Consulta que deseas actualizar
          ],
    });

    // useeffect
    useEffect(() => {
        if (estadoPedido) {
            setStadoPedido(estadoPedido)

        }
        clasePedido()
    }, [estadoPedido])

    // Funcion que cambia color segun el estado

    const clasePedido = () => {
        if (estadoPedido === 'PENDIENTE') {
            setClases('border-yellow-500')
        } else if (estadoPedido === 'COMPLETADO') {
            setClases('border-green-500')

        } else {
            setClases('border-red-800')

        };
    };

    // Funcion que cambia estado de pedido
    const cambiarEstadoPedido = async (estadoSelected) => {
        try {
            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: estadoSelected,
                        cliente: pedido.cliente.id
                    }
                }
            });
            setStadoPedido(data.actualizarPedido.estado)
        } catch (error) {
            console.log(error)
        }

    };

    const confirmarEliminarPedido = () => {
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
                            const {data} = await eliminarPedido({
                                variables:{
                                    id,
                                }
                            });
                            Swal.fire({
                                title: "Eliminado!",
                                text: data.eliminarPedido,
                                icon: "success"
                            });
                        } catch (error) {
                            console.log(error)
                        }
        
        
                    }
                });
    }

    return (
        <>
            <div className={` ${clases} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 shadow-lg`}>
                <div>
                    <p className='font-bold text-gray-800'> Cliente: {nombre} {apellido}</p>
                    {email && <p className='flex gap-1 my-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        {email}
                    </p>
                    }
                    {
                        telefono && <p className='flex gap-1 my-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>

                            {telefono}
                        </p>
                    }
                    <h2 className='text-gray-800 font-bold mt-10'>Estado Pedido: </h2>
                    <select
                        className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 
                            text-center rounded leading-tight focus:outline-none focus:bg-blue-600
                             focus:border-blue-500 uppercase text-xs font-bold' name="" id=""
                        value={estadoPedido}
                        onChange={e => { cambiarEstadoPedido(e.target.value) }}
                    >
                        <option value="COMPLETADO">COMPLETADO</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="CANCELADO">CANCELADO</option>
                    </select>
                </div>
                <div>
                    <h2 className='text-gray-800 font-bold mt-2'>Resumen del Pedido</h2>
                    {pedido.pedido.map(each => (
                        <div className='mt-4' key={each.id}>
                            <p className='text-sm text-gray-600'>Producto:{each.nombre}</p>
                            <p className='text-sm text-gray-600'>Cantidad: {each.cantidad} </p>
                        </div>
                    ))}
                    <p className='text-gray-800 mt-3 font-bold'>Total a pagar:
                        <span className='font-light  '>$ {total}</span>
                    </p>
                    <button
                        className='flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight uppercase text-xs font-bold'
                        onClick={() => confirmarEliminarPedido()}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    )
}
