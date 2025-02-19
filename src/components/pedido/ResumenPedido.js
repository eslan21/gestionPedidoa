import React, { useContext} from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'
import ProductoResumen from './ProductoResumen';


export default function ResumenPedido() {
    const pedidoContext = useContext(PedidoContext);
    const { productoSeleccion} = pedidoContext; //destructuramos
   // console.log(productoSeleccion)
  return (
    <>
        {productoSeleccion.length>0 ? (
           productoSeleccion.map((prod)=>(
            <ProductoResumen
                key={prod.id}
                producto={prod}
            />
           ))

            
        ) : (
            <p>No hay productos</p>
        )}
    </>
  )
}
