
import Layout from "@/components/Layout";
 
import Link from "next/link";

import AsignarCliente from "@/components/pedido/AsignarCliente";

export default function pedidos() {

  
    return (
        <div>

            <Layout>

                <h2 className="text-2xl tezt-gray-800 font-light">Desde pedidos</h2>
                <Link 
                href='/nuevopedido' 
                className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm font-bold  hover:bg-gray-800 uppercase mb-3'
                >Nuevo Pedido</Link>
               
                
            </Layout>
        </div>
    )
}
