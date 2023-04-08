import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchIcon from './assets/icons8-search-32.png';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Account/Login';
import Register from './pages/Account/Register';
import OrderConfirmation from './pages/order/OrderConfirmation';
import OrderDetail from './pages/order/OrderDetail';
import MyAccount from './pages/profile/MyAccount';
import SearchPage from './pages/search/SearchPage';
import ListTenant from './pages/search/ListTenant';
import DetailTenant from './pages/tenant/DetailTenant';
import ListCart from './pages/cart/ListCart';


function App() {

  return (
    <Box className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/account'>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/cart'>
            <Route path='listcart' element={<ListCart />} />
          </Route>
          <Route path='/order'>
            <Route path='orderconfirmation' element={<OrderConfirmation />} />
            <Route path='orderdetail' element={<OrderDetail />} />
          </Route>
          <Route path='/profile'>
            <Route path='myaccount' element={<MyAccount />} />
          </Route>
          <Route path='/search'>
            <Route path='searchpage' element={<SearchPage />} />
            <Route path='listtenant' element={<ListTenant />} />
          </Route>
          <Route path='/tenant'>
            <Route path='detailtenant' element={<DetailTenant />} />
          </Route>
          <Route path='/transaction'>
            <Route path='history' element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
