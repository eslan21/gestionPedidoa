import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client' //modificacmos  Httplink por createHttpLink
import fetch from "node-fetch"
import { setContext } from 'apollo-link-context';  //importamos 

const httpLink= createHttpLink({   //Decimosa donde se conecta
  uri: 'http://localhost:4000/', // URI de tu API GraphQL
  fetch, // Aquí usamos node-fetch solo en el servidor
})
//Agregando header nuevo
const authLink = setContext((_,{headers})=>{   
  
  //leer el storage almacenado
  const token = localStorage.getItem('token');
  
  
  return {
    headers:{
      ...headers,       //pasamos los header por defecto 
      authorization : token ? `Bearer ${token}`: ''    //pasamos nuestro propio header
    }
  }
})
//Conectando a apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(), /*manejar caches */


  link: authLink.concat(httpLink), 




})

export default client;