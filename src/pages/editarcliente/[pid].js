import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';   //importamos el componente Formik
import * as Yup from 'yup';
import Swal from 'sweetalert2'


//consulta datos cliente
const OBTENER_CLIENTE = gql`
    query obtenercliente($id: ID!){
        obtenercliente(id:$id){
            nombre
            apellido
            email
            telefono
            empresa
            id
  }
}
`
//Mutetion actualizar clientes
const ACTUALIZAR_CLIENTES = gql`
    mutation actualizarCliente($id:ID!, $input:ClienteInput){
        actualizarCliente(id:$id, input: $input){
             nombre
             email
  }
}
`


export default function EditarCliente() {

    //intanciando mutation 
     const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTES);

    const router = useRouter() //instanciando
    // obteniendo id ("pid" es el "id")
    const { query: { pid } } = router;
    

    //Consultando cliente

    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id: pid
        }
    })
    //Creando Schema de validacion 
    
    const validationSchema = Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            empresa: Yup.string().required('La empresa es obligatorio'),
            email: Yup.string().required('El email es obligatorio').email('Email no valido'),
            telefono: Yup.string()
        })
    
    //Pantalla de carga
    if (loading) return <h1>Cargando..</h1>
    

    //Funcion que actualiza cliente

    const actualizarInfoCliente = async (valores)=>{
        const {nombre, apellido, empresa, email, telefono} = valores;
        try {
            //Actualizando valores en BD
            const {data} = await  actualizarCliente({
                variables: {
                    id: pid,
                    input: {
                        nombre, 
                        apellido, 
                        empresa, 
                        email, 
                        telefono}
                }
            })
            
            //redireccionando
            router.push('/')
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
            <h1 className='text-2xl tezt-gray-800 font-light' >Nuevo Cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={data.obtenercliente}
                        onSubmit= {(valores, funciones)=>{
                            //Funcion que actualiza el cliente
                            actualizarInfoCliente(valores)
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
                                        htmlFor="apellido"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Apellido
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="text"
                                        name=""
                                        id="apellido"
                                        placeholder='Apellido Cliente'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                      value={props.values.apellido}
                                    />
                                    {props.errors.apellido && props.touched.apellido ? /*formik.touched es para validar al salir quitar el blur */
                                    (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.apellido}</p>
                                        </div>
                                    ) : null}
                                    <label
                                        htmlFor="empresa"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Empresa
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="text"
                                        name=""
                                        id="empresa"
                                        placeholder='Empresa Cliente'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                     value={props.values.empresa}
                                    />
                                    {props.errors.empresa && props.touched.empresa ? /*formik.touched es para validar al salir quitar el blur */
                                    (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.empresa}</p>
                                        </div>
                                    ) : null}
                                    <label
                                        htmlFor="email"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Email
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="text"
                                        name=""
                                        id="email"
                                        placeholder='Email Cliente'
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                       value={props.values.email}
                                    />
                                    {props.errors.email && props.touched.email ? /*formik.touched es para validar al salir quitar el blur */
                                    (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    ) : null}
                                    <label
                                        htmlFor="telefono"
                                        className='block text-gray-700 text-sm font-bold mb-2'>Telefono
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                        type="tel"
                                        name=""
                                        id="telefono"
                                        placeholder='Telefono Cliente'
                                        onChange={props.handleChange}

                                      value={props.values.telefono}
                                    />

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
