import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Route, RouterProvider,createRoutesFromElements} from 'react-router'
import {createBrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"
import store from './redux/features/store.js'

// components
import App from './App.jsx'
import Signup from './pages/Auth/Signup.jsx'
import Signin from './pages/Auth/Signin.jsx'
import Cart from './pages/user/Cart.jsx'
import Product from './pages/user/Product.jsx'
import Profile from './pages/user/Profile.jsx'
import UpdateProfile from './pages/user/UpdateProfile.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Home from './pages/user/Home.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CreateProduct from './pages/Admin/CreateProduct.jsx'
import Productlist from './pages/Admin/Productlist.jsx'
import ProductDetails from './pages/user/ProductDetails.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
      </Route>

      
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='userlists' element={<UserList/>}/>
        <Route path='createProduct' element={<CreateProduct/>}/>
        <Route path='productlists' element={<Productlist/>}/>
        <Route path='update/:id' element={<ProductUpdate/>}/>
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
