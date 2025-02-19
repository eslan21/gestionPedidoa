import React, {  useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '@/types/types'

const PedidoState = ({children})=>{
    //valores iniciales de reducer
    const iniciaState = {
        cliente:{},
        producto: [],
        total: 0
    }
    

    //usando useReducer. Similar a un useState
    const [state, dispatch] = useReducer(PedidoReducer,iniciaState ) //recibe dos valores , El reducer al que esta ligado y los valores iniciales
    
    //recibiendo cliente desde el componente AsignarCliente
    
    const agregarCliente = (cliente)=>{
        dispatch({
            type: SELECCIONAR_CLIENTE,    //la accion a realizar en el reducer
            payload: cliente            //datos enviados al reducer
        })
    }
    // recibiendo productos de AsignarProdcuto

    const agregarProductos = (productosSeleccionados)=>{
        
        //Tomando del state una copia para asignarlo al nuevo arreglo (problemas con biblioteca  Select)
        let nuevoState 
        
        if (state.producto.length > 0 ) {
            nuevoState =  productosSeleccionados.map(prod =>{
                const nuevoObjeto = state.producto.find(a =>prod.id === a.id)
                return {...prod, ...nuevoObjeto}
            })
            
        } else {
            nuevoState = productosSeleccionados;
        }
         
       
        dispatch({
            type: SELECCIONAR_PRODUCTO,    //la accion a realizar en el reducer
            payload: nuevoState            //datos enviados al reducer
        })
      
    }

    //modificar cantidad productos

    const cantlidadProducto = (nuevoProducto) => {
        
       
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto,
        })
    }

    // funcion para actualizar el total

    const actualizarTotal = ()=>{
        dispatch({
            type: ACTUALIZAR_TOTAL,
        })
     
    }
    return (
        <PedidoContext.Provider 
            value={{
                cliente: state.cliente,
                productoSeleccion: state.producto,
                agregarCliente,
                agregarProductos,
                cantlidadProducto,
                actualizarTotal,
                total: state.total
            }}
        >
        {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;