import Layout from "@/components/Layout"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"

const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input:ProductoInput){
  nuevoProducto(input:$input){
    id
    nombre
    existencia
    precio
  }
}
`;
const OBTENER_PRODUCTOS = gql`
query obtenerProductos {
    obtenerProductos {
        id
        nombre
        existencia
        precio
  }
}
`;

export default function nuevoproducto() {
//mutation
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, {data: {nuevoProducto}}){
            const data = cache.readQuery({query: OBTENER_PRODUCTOS});
            const obtenerProductos = data.obtenerProductos || [];

             //Reescribimos cache
             cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            })
        }
    });
//useRouter

const router = useRouter()

    //validacion
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Campo Obligatorio'),
            existencia: Yup.number('Debe ser un numero').required('Campo Obligatorio').positive('Solo acepta positivos').integer('Deben ser enteros'),
            precio: Yup.number('Debe ser un numero').required('Campo Obligatorio').positive('Solo numeros negativos')
        }),
        onSubmit: async (valores) => {
            
            const { nombre, precio, existencia } = valores
            try {
                
                const {data} = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia,
                            precio
                        }
                    }
                });
                //redirigiendo 

                router.push('/productos')

            } catch (error) {
                console.log(error)
            }

        }
    })



    return (
        <Layout>
            <h2 className='text-2xl tezt-gray-800 font-light ' >Nuevo producto</h2>
            <div className='flex justify-center mt-5' >
                <div className='w-full max-w-sm'>
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
                            placeholder='Nombre del Producto'
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
                            htmlFor="existencia"
                            className='block text-gray-700 text-sm font-bold mb-2'>Existencia
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline'
                            type="number"
                            name=""
                            id="existencia"
                            placeholder='Cantidad disponible '
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.existencia}
                        />
                        {formik.errors.existencia && formik.touched.existencia ? /*formik.touched es para validar al salir quitar el blur */
                            (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.existencia}</p>
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
                            placeholder='Precio '
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.precio}
                        />
                        {formik.errors.precio && formik.touched.precio ? /*formik.touched es para validar al salir quitar el blur */
                            (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.precio}</p>
                                </div>
                            ) : null}


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
