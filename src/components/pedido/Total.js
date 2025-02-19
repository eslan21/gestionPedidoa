import {useContext} from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'

export default function Total() {
  //context 
    const context  = useContext(PedidoContext)
  const {total} = context

  return (
    <div className='flex items-center mt-5 justify-between bg-gray-300 p-3 '>
        <h2 className='text-gray-800 text-lg'>Total la pagar</h2>
        <p className='text-gray-800 mt-0'>$ {total|| 0}</p>
    </div>
  )
}
