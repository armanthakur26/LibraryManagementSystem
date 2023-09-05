import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Basic form validation
    if (!email.trim() || !password.trim()) {
     // alert('Please enter both email and password.');
      return;
    }

    // Email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    const AuthService = {

      login: (user) => axios.post(`https://localhost:7247/api/User/authenticate`, user),
    };
    try {
      const response = await AuthService.login({ email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      console.log('User information:', decodedToken);
      if (decodedToken.role === 'Admin') {
        navigate('/Dashboard');
      } else {
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative', height: '90vh', width: '100%', backgroundImage: "url('https://centralaz.edu/wp-content/uploads/2019/10/Laptop-in-Library-1500x1000.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <h3>Sign In</h3>
        <div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ width: '50px', backgroundColor: '#FFC312', color: 'black', border: '0' }}>
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                style={{ outline: '0', boxShadow: '0 0 0 0' }}
              />
              {submitted && !email.trim() && <div style={{ color: 'red', marginTop: '5px' }}>Please enter an email address.</div>}
              {emailError && <div style={{ color: 'red', marginTop: '5px' }}>{emailError}</div>}
    
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ width: '50px', backgroundColor: '#FFC312', color: 'black', border: '0' }}>
                <i className="fas fa-key"></i>
              </div>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                style={{ outline: '0', boxShadow: '0 0 0 0' }}
              />
              {submitted && !password.trim() && <div style={{ color: 'red', marginTop: '5px' }}>Please enter a password.</div>}
            </div>
            <div style={{ marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" />
              <span style={{ marginLeft: '15px', marginRight: '5px' }}>Remember Me</span>
            </div>
            {loginError && <div style={{ color: 'red', marginBottom: '10px' }}>{loginError}</div>}
            <div className="form-group">
              <input
                type="submit"
                value="Login"
                className="btn float-right login_btn"
                style={{
                  color: 'black',
                  backgroundColor: '#FFC312',
                  width: '100px',
                  outline: '0',
                  border: 'none',
                  boxShadow: '0 0 0 0',
                }}
              />
            </div>
          </form>
        </div>
        <div style={{ color: 'white' }}>
          <div className="d-flex justify-content-center links">
            Don't have an account?<a href="/Register">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;