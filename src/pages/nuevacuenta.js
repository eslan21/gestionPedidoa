import React , {useState}from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQuery, gql, useMutation } from '@apollo/client' //para los Querys

const NUEVA_CUENTA = gql`
   mutation nuevoUsuario($input:InputUsuario){
     nuevoUsuario(input:$input){
       id
       nombre
       apellido
       email
     }
   }
`;
export default function NuevaCuenta() {
//state para el mensaje 
    const [mensaje, guardarMensaje] = useState(null)

    //Mutation creando usuario
    const [ nuevoUsuario] = useMutation(NUEVA_CUENTA)
    //instanciando useRouter
    const router = useRouter()

    //Validacion de formulario
    const formik = useFormik({
        initialValues: {     //valores iniviales del formulario. 
            nombre: '',
            apellido: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({   //validando informacion
            nombre: Yup.string().required('El nombre es obligatorio'),  //require no da un mensaje que se pasa si la informacion no es la esperada
            email: Yup.string().email().required("El email es obligatorio"), //email verifica que sea un email
            apellido: Yup.string().required("El apellido es obligatorio"),
            password: Yup.string().required('Debes colocar password').min(6, 'Debe tener minimo 6 caracteres')
        }),
        onSubmit: async valores => {
           
            const {nombre, apellido, email, password} = valores
           try {
               const {data} = await nuevoUsuario({  //data es lo que devuelve la peticion
                    variables:{
                        input:{
                            nombre: nombre,
                            apellido: apellido,
                            email: email,
                            password: password
                        }
                    }
                }) 
            console.log(data)
                // Usuario creado exitosamente
                guardarMensaje(`Usuario creado correctamente ${data.nuevoUsuario.nombre}`)
                setTimeout(() => {
                    guardarMensaje(null)
                    router.push('/login')  //lleva al usuario a la URL especificada
                }, 3000);

                //Redirigir Usuario

            } catch (error) {
                //mostrando mensaje de error al crear usuario
               guardarMensaje(error.message) //guardando mensaje
                console.log(error)
                setTimeout(()=>{ //desaparece al 3 segundos
                    guardarMensaje(null)
                }, 3000)
            }
        }
    })

    //mensaje cuando esta cargando

    const mostrarMensaje = ()=>{
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (

        <>
            <Layout>
                    {mensaje && mostrarMensaje()} 
                <div className='text-white text-center  text-2xl font-light'>Crear Nueva Cuenta</div>
                <div className='flex justify-center mt-5' >
                    <div className='w-full max-w-sm'>
                        <form
                            onSubmit={formik.handleSubmit}
                            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                            <div className='mb-4'>
                                <label
                                    htmlFor="nombre"
                                    className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                    type="text"
                                    name=""
                                    id="nombre"
                                    placeholder='Nombre Usuario'
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.errors.nombre && formik.touched.nombre ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.nombre}</p>
                                    </div>
                                ) : null}
                            <div className='mb-4'>
                                <label
                                    htmlFor="apellido"
                                    className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                    type="text"
                                    name=""
                                    id="apellido"
                                    placeholder='Apellido Usuario'
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}

                                />
                            </div>
                            {formik.errors.apellido && formik.touched.apellido ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.apellido}</p>
                                    </div>
                                ) : null}
                            <div className='mb-4'>
                                <label
                                    htmlFor="email"
                                    className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                    type="text"
                                    name=""
                                    id="email"
                                    placeholder='Email Usuario'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}


                                />
                            </div>
                            {formik.errors.email && formik.touched.email ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null}
                            <div className='mb-4'>
                                <label
                                    htmlFor="password"
                                    className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                    type="password"
                                    name=""
                                    id="password"
                                    placeholder='Password Usuario'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}

                                />
                            </div>
                            {formik.errors.password && formik.touched.password ? /*formik.touched es para validar al salir quitar el blur */
                                (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null}
                            <input
                                type="submit"
                                value='Crear Cuenta'
                                className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                            />
                        </form>

                    </div>
                </div>
            </Layout>
        </>
    )
}
