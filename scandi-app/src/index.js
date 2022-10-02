import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
// import App from './App';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { client } from './allAcross/client';
import { ApolloProvider } from '@apollo/client';
import CategoryPage from './pages/categoryPage'
import  Navbar  from './components/Navbar';
import { ErrorPage } from './pages/Error404';
import { Provider } from 'react-redux';
import { store } from './app/store';
import DescriptionPage from './pages/descriptionPage';
import CartPage from './pages/cartPage';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<CategoryPage mode = {'all'}/>} />
            <Route path='/all' element={<CategoryPage mode = {'all'}/>} />
            <Route path='/clothes' element={<CategoryPage mode = {'clothes'}/>} />
            <Route path='/tech' element={<CategoryPage mode = {'tech'}/>} />
            <Route path='/description/:id' element={<DescriptionPage />} />
            <Route path='/cartPage' element={<CartPage />} />
            <Route path='*' element={<ErrorPage />} />

          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);


