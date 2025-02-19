import React, { useContext, useState, useEffect} from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'



export default function ProductoResumen({ producto }) {

    //state de cantidad 

    const [cantidad, setCantidad] = useState(0) 
    // context
    const {cantlidadProducto, actualizarTotal} = useContext(PedidoContext) //extrayendo context

    //useEffect para cambiar cantidad

    useEffect(()=>{
        actualizarCantidad()  
        actualizarTotal()
    },[cantidad])

    const {nombre, precio} = producto


    //funcion que actualizas cantidad

    const actualizarCantidad = (e)=>{
        const nuevoProducto = {...producto, cantidad: Number(cantidad) }
        cantlidadProducto(nuevoProducto)
       
    }


    return (
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:w-2/4 mb-2 md:mb-0'>
                <p className='text-sm'>{nombre}</p>
                <p>{precio}</p>
            </div>
            <input 
            className='shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4' 
            type="number" 
            placeholder='Cantidad'
            onChange={(e)=>{setCantidad(e.target.value)}}
            value={cantidad}
            
            />

        </div>

    )
}
