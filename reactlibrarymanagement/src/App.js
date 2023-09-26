import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, Link, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import RegistrationForm from "./Components/Register";
import Books from "./Components/Books";
import User from "./Components/User";
import ROUTES from "./Components/Routes";
import Logout from "./Components/Logout";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import PasswordSetting from "./Components/PasswordSetting";
import UserDetails from "./Components/UserDetails";
import AllOrders from './Components/AllOrders'
import OrderForm from "./Components/OrdersForm";
import MyOrder from "./Components/MyOrder";
import About from "./Components/About";
import Contact from "./Components/Contact";
import axios from 'axios';
import Myreadouts from "./Components/Myreadouts";

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const [isBlocked, setIsBlocked] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
    
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.unique_name;
      axios.get(`https://localhost:7247/api/User/${userId}`)
        .then(response => {
          setIsBlocked(response.data.blocked);
          setDecodedToken(decodedToken);
        })
        .catch(error => {
          console.error('Error fetching user status:', error);
        });
    }
  }, [isLoggedIn]);


  const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
      };
    
      const isAdmin = () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken.role === 'Admin';
        }
        return false;
      };
  return (
    <div>
       <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
         <div className="container">
           <Link className="nav-link" to={"/Dashboard"} style={{ fontSize: "24px", fontWeight: "", color: "#fff", fontStyle: "italic" }}>
             <i class="fas fa-book"></i> eLibrary
           </Link>
           <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
             <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={"/Dashboard"}>
                  Home
                </Link>

              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to={"/About"}>
                  About
                </Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Contact"}>
                  Contact
                </Link>

              </li>                 
              {isAdmin() && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Books"}>
                      <i class="fas fa-book"></i> Books
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/User"}>
                      <i class="fas fa-book"></i> UserList
                    </Link>
                  </li>
                  <li className="nav-item">
                <Link className="nav-link" to={"/AllOrders"}>
                <i class="fas fa-duotone fa-clipboard"></i>  Order Request
                </Link>
              </li>
                </>
              )}

              {isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to={"/MyOrder"}>
                <i class="fa-solid fa-cart-shopping"  style={{color: "#818b9c",}} />   MyOrder
                </Link>
                
              </li>}
              {isLoggedIn &&
              <li className="nav-item">
                <Link className="nav-link" to={"/Myreadouts"}>
                <i class="fa-solid fa-cart-shopping"  style={{color: "#818b9c",}} />   Myreadouts
                </Link>
                
              </li>}

              {isLoggedIn &&
              <li className="nav-item MyProfile-container">
                <Link className="nav-link" to={"/UserDetails"}>
                 <i class='fas fa-user-circle' style={{fontSize:'36px'}}></i>
                </Link>
              </li>}
<div>
      </div>
      </ul>
             <ul className="navbar-nav ml-auto">
               {!isLoggedIn ? (
                 <>
                   <li className="nav-item ">
                     <Link className="nav-link" to={"/Login"}>
                       <button className="btn btn-outline-primary">Login</button>
                     </Link>
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link" to={"/Register"}>
                       <button className="btn btn-outline-primary">Sign up</button>
                    </Link>
                   </li>
                 </>
               ) : (
                 <li className=" nav-item logout-container">
                   <Logout  onLogout={handleLogout} />
                 </li>
               )}
             </ul>
           </div>
         </div>
       </nav> 
      <div className="container">
        <Routes>
        {/* <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
           <Route path="/Register" element={<RegistrationForm />} /> */}
      
          {isLoggedIn && isBlocked ? (
            <Route
              path="/*"
              element={
                <div>
                  <h3>You are blocked By Admin and cannot access this page.</h3>
                </div>
              }
            />
          ) : (
            <>
            <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
           <Route path="/Register" element={<RegistrationForm />} />
           <Route path="/MyOrder" element={<MyOrder />} />
           {isAdmin() && (
             <>
               <Route path="/Books" element={<Books />} />
               <Route path={ROUTES.book.name} element={ROUTES.book.component} />
             </>
           )}s
           <Route path={ROUTES.dashboard.name} element={ROUTES.dashboard.component} />
           <Route path="/User" element={<User />} />
           <Route path="/PasswordSetting" element={<PasswordSetting />} />
          
           {isLoggedIn && <Route path="/UserDetails" element={<UserDetails />} />}
           <Route path="/AllOrders" element={<AllOrders />} />
          <Route path="/OrderForm" element={<OrderForm />} />
           {/* <Route path="/OrderForm/:bookId" element={<OrderForm />} /> */}
           <Route path="/OrderForm" element={<OrderForm/>} />
           <Route path="/About" element={<About />} />
           <Route path="/Contact" element={<Contact />} />
           <Route path="/Myreadouts" element={<Myreadouts />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
