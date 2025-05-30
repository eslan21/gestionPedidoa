import React from 'react'
import Layout from '@/components/Layout'
import { gql, useQuery } from '@apollo/client'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { info } from 'autoprefixer';

const MEJORES_CLIENTES = gql`
query mejoresClientes{
  mejoresClientes{
    cliente{
      nombre
      empresa
    }
    total
  }
}
`;

export default function mejoresclientes() {
    //-------------------consulta  ---------------
    const { data, loading, error } = useQuery(MEJORES_CLIENTES);



    if (loading) return <p>Cargando..</p>;
    const { mejoresClientes } = data;   //destructudrando 


    const infochart = mejoresClientes.map((each) => {

        return {
            nombre: each.cliente[0].nombre,
            total: each.total,

        }
    });

    
    return (
        <>
            <Layout>

                <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
                <div className='h-1/2 mt-5'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={infochart}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#3182CE" activeBar={<Rectangle fill="pink" stroke="blue" />} />

                        </BarChart>
                    </ResponsiveContainer>

                </div>

            </Layout>

        </>
    )
}
