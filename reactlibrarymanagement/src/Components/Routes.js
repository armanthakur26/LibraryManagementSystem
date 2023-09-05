import React from 'react'
import Book from './Books';
import Dashboard from './Dashboard';
import Login from './Login'
import Logout from './Logout';
import Register from './Register'
import OrderForm from './OrdersForm';
import MyOrder from './MyOrder';

const ROUTES = {
    book: {
      name: "/book",
      component: <Book/>,
    },
    dashboard:{
      name:"/Dashboard",
      component:<Dashboard/>
    },
    login:{
      name:"/login",
      component:<Login/>
    },
    Logout:{
      name:"/Logout",
      component:<Logout/>
    },
    Register:{
      name:"/Register",
      component:<Register/>
    },
    OrderForm:{
      name:"/OrderForm",
      component:<OrderForm/>
    },
    MyOrder:{
      name:"/MyOrder",
      component:<MyOrder/>
    }
   

  };
  export default ROUTES;
  
