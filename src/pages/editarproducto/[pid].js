import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';   //importamos el componente Formik
import * as Yup from 'yup';
import Swal from 'sweetalert2'


//consulta datos cliente
const OBTENER_PRODUCTO = gql`
query obtenerProducto($id:ID!){
  obtenerProducto(id:$id){
    nombre
    existencia
    precio
  }
}
`;
//Mutetion actualizar clientes
const ACTUALIZAR_PRODUCTO = gql`
   mutation actualizarProducto($id:ID!, $input:ProductoInput){
        actualizarProducto(id:$id,input: $input){
            nombre
            precio
            existencia
  }
}
`


export default function EditarCliente() {

    //intanciando mutation 
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

    const router = useRouter() //instanciando
    
    // obteniendo id ("pid" es el "id")
    const { query: { pid } } = router;
    

    //Consultando cliente

    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id: pid
        }
    })
    
    //Creando Schema de validacion 

    const validationSchema = Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        existencia: Yup.number().positive('No puede ser negativo').integer().required('No puede estas vacio'),
        precio: Yup.number().positive('No puede ser negativo').required('No puede estas vacio'),
       
    })

    //Pantalla de carga
    if (loading) return <h1>Cargando..</h1>
    if (!data) return <h1>Algo ha salido mal..</h1>


    //Funcion que actualiza cliente

    const actualizarInfoProducto = async (valores) => {
        const { nombre, existencia, precio } = valores;
        console.log(valores)
        
        try {
            //Actualizando valores en BD
            const { data } = await actualizarProducto({
                variables: {
                    id: pid,
                    input: {
                        nombre,
                        existencia,
                        precio,
                        
                    }
                }
            })

            //redireccionando
            router.push('/productos')
            //alerta
            Swal.fire({
                title: "Cliente actializado!",
                text: 'El cliente fue actualizado',
                icon: "success"
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <h1 className='text-2xl tezt-gray-800 font-light' >Edite el Producto</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={data.obtenerProducto}
                        onSubmit={(valores) => {
                            //Funcion que actualiza el cliente
                            actualizarInfoProducto(valores)
                        }}
                    >

                        {props => {
                            //colocamos formulario dentro de return
                            return (

                                <form action=""
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <label
                                        htmlFor="nombre"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Nombre
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="text"
                                        name=""
                                        id="nombre"
                                        placeholder='Nombre Cliente'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.nombre}
                                    />
                                    {props.errors.nombre && props.touched.nombre ? /*formik.touched es para validar al salir quitar el blur */
                                        (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.nombre}</p>
                                            </div>
                                        ) : null}

                                    <label
                                        htmlFor="precio"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Precio
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="number"
                                        name=""
                                        id="precio"
                                        placeholder='precio del producto'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.precio}
                                    />
                                    {props.errors.precio && props.touched.precio ? /*formik.touched es para validar al salir quitar el blur */
                                        (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.precio}</p>
                                            </div>
                                        ) : null}
                                    <label
                                        htmlFor="existencia"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Cantidad
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="number"
                                        name=""
                                        id="existencia"
                                        placeholder='existencia Cliente'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.existencia}
                                    />
                                    {props.errors.existencia && props.touched.existencia ? /*formik.touched es para validar al salir quitar el blur */
                                        (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.existencia}</p>
                                            </div>
                                        ) : null}


                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white font-bold  uppercase hover:bg-gray-900"
                                    />

                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}
