import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import OrderConfirmation from './pages/order/OrderConfirmation';
import OrderDetail from './pages/order/OrderDetail';
import MyAccount from './pages/profile/MyAccount';
import SearchPage from './pages/search/SearchPage';
import ListTenant from './pages/search/ListTenant';
import DetailTenant from './pages/tenant/DetailTenant';
import ListCart from './pages/cart/ListCart';
import History from './pages/transaction/History';
import Home from './pages/Home';
import RequestResetPassword from './pages/account/RequestResetPassword';
import EmailConfirmation from './pages/account/EmailConfirmation';
import ResetPassword from './pages/account/ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import CustomerLayout from './layout/CustomerLayout';
import { setLogout } from './store/Auth';
import AdminLayout from './layout/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import RegisterTenantPage from './pages/admin/RegisterTenantPage';
import TenantPage from './pages/admin/Tenant/TenantPage';
import TenantDetailPage from './pages/admin/Tenant/TenantDetailPage';
import axios from 'axios';
import CustomerDetailPage from './pages/admin/Customer/CustomerDetailPage';
import CustomerPage from './pages/admin/Customer/CustomerPage';
import OrderPage from './pages/admin/Order/OrderPage';
import MenuPage from './pages/admin/Menu/MenuPage';

function App() {

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        dispatch(setLogout())
      }
      return Promise.reject(error);
    }
  );

  const { isLoggedin, accountData } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const checkRole = () => {
    if (isLoggedin) {
      if (!accountData.hasOwnProperty('access_token') || !accountData.hasOwnProperty('role')) {
        dispatch(setLogout())
      }
      switch (accountData?.role) {
        case "customer":
          return <Navigate to={"/customer"} />
        case "tenant":
          return <Navigate to={"/tenant"} />
        case "admin":
          return <Navigate to={"/admin"} />
        default:
          dispatch(setLogout())
      }
    } else {
      return <Navigate to={"/account/login"} />
    }
  }

  return (
    <Box className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={checkRole()} />
          <Route path='/account' element={!isLoggedin ? <Outlet /> : checkRole()}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='request-reset-password' element={<RequestResetPassword />} />
            <Route path='email-confirmation' element={<EmailConfirmation />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>
          <Route path='/customer' element={accountData?.role === "customer" ? <CustomerLayout /> : <Navigate to={"/account/login"} />}>
            <Route index element={<Home />} />
            <Route path='cart'>
              <Route path='listcart' element={<ListCart />} />
            </Route>
            <Route path='order'>
              <Route path='orderconfirmation' element={<OrderConfirmation />} />
              <Route path='orderdetail' element={<OrderDetail />} />
            </Route>
            <Route path='profile'>
              <Route path='myaccount' element={<MyAccount />} />
            </Route>
            <Route path='search'>
              <Route path='searchpage' element={<SearchPage />} />
              <Route path='listtenant' element={<ListTenant />} />
            </Route>
            <Route path='tenant'>
              <Route path='detailtenant/:id' element={<DetailTenant />} />
            </Route>
            <Route path='transaction'>
              <Route path='history' element={<History />} />
            </Route>
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={accountData?.role === "admin" ? <AdminLayout /> : <Navigate to={"/account/login"} />}>
            <Route index element={<DashboardPage />} />
            <Route path='tenant'>
              <Route index element={<TenantPage />} />
              <Route path=':id' element={<TenantDetailPage />} />
            </Route>
            <Route path='customer'>
              <Route index element={<CustomerPage />} />
              <Route path=':id' element={<CustomerDetailPage />} />
            </Route>
            <Route path='order'>
              <Route index element={<OrderPage />} />
            </Route>
            <Route path='menu'>
              <Route index element={<MenuPage />} />
            </Route>
            <Route path='register-tenant' element={<RegisterTenantPage />} />
          </Route>
          {/* END OF ADMIN ROUTES */}
          \
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
