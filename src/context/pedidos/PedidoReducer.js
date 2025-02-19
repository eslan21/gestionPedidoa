import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '@/types/types'
import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage-instance';

export default (state , action ) => {
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {        
                ...state,                       //se hace copia del state
                cliente: action.payload       //se modifica lo que se desea
            };
        case SELECCIONAR_PRODUCTO:
            return{
                ...state,
                producto: action.payload
            };
        case CANTIDAD_PRODUCTOS:
            return{
                ...state,
                producto: state.producto.map(prod => //revisa la propiedad cantidad al state ya agregado
                    prod.id===action.payload.id ? 
                    prod = action.payload : 
                    prod)
            }
        case ACTUALIZAR_TOTAL:
            return{
                ...state,
                total: state.producto.reduce((nuevoTotal, articulo)=> nuevoTotal += articulo.precio * articulo.cantidad, 0)
            }
        default:
            return state
    }
}