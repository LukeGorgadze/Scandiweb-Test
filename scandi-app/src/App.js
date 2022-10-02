import React from 'react'
import { useApolloClient, gql } from '@apollo/client'
import { client } from './allAcross/client'
import { BrowserRouter as Router,Routes , Route, Link } from 'react-router-dom';
import { CategoryPage } from './pages/categoryPage'
import { Navbar } from './components/Navbar';
import { ApolloProvider } from '@apollo/client';
// export default class App extends React.Component {

//   fetchData = async () => {
//     const response = await client.query({
//       query: gql`
//       query{
//         categories{
//           products{
//             id
//             name
//             inStock
//             gallery
//             description
//             category
//           }
//         }
//       }
//       `,
//     }).then(resp => console.log(resp))
//   }
//   render() {
//     this.fetchData()
    
//     return (
//       <div>App</div>
//     )
//   }

// }

// export default class App extends React.Component{
//   render(){
//     return(
//       <React.StrictMode>
//       <ApolloProvider client={client}>
//         <Router>
//           <Routes>
//             <Route path='/' component={<CategoryPage/>} />
//           </Routes>
//         </Router>
//       </ApolloProvider>
//     </React.StrictMode>
//     )
//   }
// }