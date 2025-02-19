import { useEffect, useState, useContext } from 'react'
import Select from "react-select"
import {gql, useQuery} from '@apollo/client'
import PedidoContext from '@/context/pedidos/PedidoContext'

//consulta de clientes
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

export default function AsignarCliente() {
//Cliente seleccionado 
  const [cliente, setCliente] = useState([]);
   
  //llamando al context
  const pedidocContext = useContext(PedidoContext);
  const {agregarCliente} = pedidocContext;

    //configurando useEffect para leer oipcion de cliente seleccionadoi
    useEffect(() => {
      agregarCliente(cliente)
    }, [cliente])

 //consultando clientes
  const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO);

  if(loading) return <p>Cargando..</p>

  const {obtenerVendedorClientes} = data  //destructurando




    //muestra cliente seleccionado en consola
  const seleccionarCliente = (opciones) => {
    setCliente(opciones)
  }

  return (
    <>
      <Select
        className='mt-3'
        options={obtenerVendedorClientes}
       
        onChange={opcion => seleccionarCliente(opcion)}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => opciones.nombre}
        placeholder='Seleccione el Cliente'
        noOptionsMessage = {()=>'no hay resultado'}
      />


    </>
  )
}
