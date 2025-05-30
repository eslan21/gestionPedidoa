
import Layout from "@/components/Layout";
import Pedido from "@/components/Pedido";
import Link from "next/link";
import {gql, useQuery} from '@apollo/client'

const OBTENER_PEDIDOS = gql`
query obtenerPedidoVendedor{
  obtenerPedidoVendedor{
     id
    pedido {
        id
        cantidad
        nombre
    }
    total
    cliente {
        id
        nombre
        apellido
        email
        telefono
    
    }
    vendedor
    fecha
    estado
  }
}
`

export default function pedidos() {

    const {data, loading, error} = useQuery(OBTENER_PEDIDOS);

    if (loading) {
        return <p>Cargando...</p>
    };

   const {obtenerPedidoVendedor} = data;

    return (
        <div>

            <Layout>

                <h2 className="text-2xl tezt-gray-800 font-light">Pedidos</h2>
                <Link 
                href='/nuevopedido' 
                className='bg-blue-800 py-2 px-5 mt-3 flex justify-center sm:inline-block text-white rounded text-sm font-bold  hover:bg-gray-800 uppercase mb-3'
                >Nuevo Pedido
                </Link>

                {obtenerPedidoVendedor.length === 0 ?
                 ( <p className="text-center mt-5 text-2xl">No hay pedidos </p>)
                :
                (
                    obtenerPedidoVendedor.map(pedido =>(
                            <Pedido
                                key={pedido.id}
                                pedido={pedido}
                            />
                        )

                    )
                )
                }
               
                
            </Layout>
        </div>
    )
}
