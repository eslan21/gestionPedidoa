import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'

const AUTENTICAS_USUARIO = gql`
    mutation autenticarUsuario($input : AutenticarInput){
        autenticarUsuario(input: $input){
            token
  }
}
`

export default function login() {
    //instanciando useRouter

    const router = useRouter();

    //mutation para crear nuevo usuario

    const [autenticarUsuario] = useMutation(AUTENTICAS_USUARIO );
//useState de mensajes 
    const [mensaje, guardarMensaje] = useState(null);

//configurando formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('El usuario no puede estar vacio'),
            password: Yup.string().required("Password obligatorio")
        }),
        onSubmit: async valores =>{
            //console.log(valores)
            const   {email, password} = valores
            try {
                const {data} = await autenticarUsuario({ //hizo un distructurin de una vez en "data" que es lo que devuelve
                    variables: {
                        input: {
                             email: email ,
                            password: password
                        }
                    }
                }) 
                //*****guardar token en localStorage
                   
                    guardarMensaje('Autenticando..')

                    const {token} = await data.autenticarUsuario  //destructurando token

                     localStorage.setItem('token',token)  //guardando en Storage

                //****redireccionar hacia cliente
                 setTimeout(()=>{ //desaparece al 3 segundos
                    guardarMensaje(null)
                     router.push('/') //redireccionando usuario
                }, 3000)
                
            } catch (error) {
                console.log(error)
                 //mostrando mensaje de error al crear usuario
               guardarMensaje(error.message) //guardando mensaje
              
               setTimeout(()=>{ //desaparece al 3 segundos
                   guardarMensaje(null)
               }, 2000)
            }
        }
    })
//funcion para controlar mostrar mensaje
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
                <div className='text-white text-center  text-2xl font-light'>login</div>
                <div className='flex justify-center mt-5' >
                    <div className='w-full max-w-sm'>
                        <form
                            onSubmit={formik.handleSubmit}
                            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                            <div className='mb-4'>
                                <label
                                    htmlFor="email"
                                    className='block text-gray-700 text-sm font-bold mb-2'>Email
                                </label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                                    type="text"
                                    name=""
                                    id="email"
                                    placeholder='Email Usuario' 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
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
                                value='Iniciar Seccion'
                                className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                            />
                         
                        </form>

                    </div>
                </div>
            </Layout>
        </>
    )
}
