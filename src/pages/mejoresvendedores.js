import {use, useEffect}from 'react'
import Layout from '@/components/Layout'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';


const MEJORES_VENDEDORES = gql`
query mejoresVendedores{
  mejoresVendedores{
    vendedor {
      nombre
      email
    }
    total
  }
}
`;

export default function mejoresvendedores() {

   
    // consulta
    const {data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES);
    

    //***************use effect************** */

    useEffect(() => {
      startPolling(1000);
        return ()=>{
            stopPolling();
        }
     
    }, [startPolling, stopPolling]);
    
   

    if(loading) return <p>Cargando..</p>;
    const {mejoresVendedores} = data;
    const infochart = mejoresVendedores.map((each)=>{
       
        return {
            nombre: each.vendedor[0].nombre,
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
