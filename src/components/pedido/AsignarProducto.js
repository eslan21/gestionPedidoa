import React, {useState, useContext, useEffect} from 'react'
import { gql, useQuery } from '@apollo/client'
import Select from "react-select"
import PedidoContext from '@/context/pedidos/PedidoContext'


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


export default function AsugnarProducto() {

    const [pedido, setPedido] = useState([]);
    //context de pedido
    const pedidoContext = useContext(PedidoContext);
    const { agregarProductos} = pedidoContext; //destructuramos
    //useEffect para pasar productos al state del reducer

    useEffect(()=>{ 
        agregarProductos(pedido)
       
    },[pedido])

    //consultando Productos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    if (loading) return <p>Cargando..</p>

    const { obtenerProductos } = data;

    //asignando seleccion al state
        const seleccionarProducto = (seleccion)=>{
            setPedido(
              
                seleccion
            )
            
        }

    return (
        <Select
            className='mt-3'
            options={obtenerProductos}
            onChange={opcion => seleccionarProducto(opcion)}
            isMulti={true}
            getOptionValue={opciones => opciones.id}
            getOptionLabel={opciones =>`${opciones.nombre} - ${opciones.existencia} Disponible` }
            placeholder='Seleccione el Producto/s'
            noOptionsMessage={() => 'no hay resultado'}
        />
    )
}
