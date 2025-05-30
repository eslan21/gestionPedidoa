import Layout from "@/components/Layout"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { gql, useMutation} from '@apollo/client'
import { useRouter } from "next/router";


const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input: ClienteInput){
  nuevoCliente(input:$input){
    nombre
    apellido
    empresa
    email
    telefono
    
  }
}
`;
//Query que vamos a actualizar 
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
export default function nuevoCliente() {
    //Mensaje de error
    const [mensaje, guardarMensaje] = useState(null);

    //instanciando useROuter

    const router = useRouter()

    //configurando mutation para que actualice by cache

    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {    //Se le aplica distructuring
        update(cache, {data:{nuevoCliente}}){                     //updato (que hacemos) cache(donde lo hacemos) nuevoCliente(de donde viene la informacion)   
            //Obtenemos objeto cache que deseamso modificar
            const data = cache.readQuery({query: OBTENER_CLIENTES_USUARIO})
            const obtenerVendedorClientes = data?.obtenerVendedorClientes || [];  //Aseguramos no tener errores si el cache esta vacio
            //Reescribimos cache
                cache.writeQuery({
                    query: OBTENER_CLIENTES_USUARIO,
                    data: {
                        obtenerVendedorClientes: [...obtenerVendedorClientes, nuevoCliente]
                    }
                })

        }
    });
    //funcion de mostrar mensaje

    const mostrarMensaje = ()=>{
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }


    //Usando formik para formulario

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            empresa: Yup.string().required('La empresa es obligatorio'),
            email: Yup.string().required('El email es obligatorio').email('Email no valido'),
            telefono: Yup.string()
        }),
        onSubmit: async  valores =>  {
            
            //destructuramos valores 

            const {nombre, apellido, empresa, email, telefono} = valores;


            try {
                const {data} = await nuevoCliente({    //destructuramos "data" que es devuelta por la funcion "nuevoCliente"
                    variables: {
                        input: {        //input es un objetos cuyos valores tuenen el mismmo valor que las llaves. Es lo mismo que "nombre: nombre"
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                }) 



                //redirigiendo

                router.push('/')
             
            } catch (error) {
                console.log(error)
                guardarMensaje(error.message) //guardar mensaje de error
                setTimeout(()=>{ //desaparece al 3 segundos
                    guardarMensaje(null)
                }, 2000)
            }
        }
    })


    return (
        <Layout>

            <h1 className='text-2xl tezt-gray-800 font-light' >Nuevo Cliente</h1>

            {mensaje && mostrarMensaje()}


            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form action=""
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        />
                         {formik.errors.nombre && formik.touched.nombre ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.nombre}</p>
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
                             onChange={formik.handleChange}
                             onBlur={formik.handleBlur}
                             value={formik.values.apellido}
                        />
                         {formik.errors.apellido && formik.touched.apellido ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.apellido}</p>
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.empresa}
                        />
                         {formik.errors.empresa && formik.touched.empresa ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.empresa}</p>
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                         {formik.errors.email && formik.touched.email ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.email}</p>
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
                            onChange={formik.handleChange}
                            
                            value={formik.values.telefono}
                        />
                        
                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white font-bold  uppercase hover:bg-gray-900" 
                        />

                    </form>
                </div>
            </div>
        </Layout>
    )
}
