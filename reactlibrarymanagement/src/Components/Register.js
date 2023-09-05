import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await axios.post('https://localhost:7247/api/User/register', {
        firstName,
        lastName,
        email,
        mobile
      });

      console.log(response.data);
    
      registeruser()
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || 'Unknown error');
      emailAlert();
    

    }
  };
 
  const emailAlert = () => {
    Swal.fire({  
        title: 'Email Already Exist',  
        text: 'Please Change the email id.',
        icon: 'error'
      }); 
}
const registeruser = () => {
  Swal.fire({  
      title: 'User Register sussesfully',  
      text: 'Please check your email to set password',
      icon: 'success'
    }); 
}

  return (
    <form onSubmit={handleSubmit}>
      <section
        className="vh-80 m-2 d-flex justify-content-center align-items-center"
        style={{
          background: 'linear-gradient(rgba(3, 3, 3, 0.5), rgba(0, 10, 0, 0.5)), url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp) center/cover no-repeat',
          borderRadius: '10px'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5">
              <div className="card text-black" style={{ borderRadius: '10px', background: 'rgba(290, 290, 255, 0.8)' }}>
                <div className="card-body">
                  <div className="text-center">
                    <p className="h1 fw-bold mb-5 mt-4">Sign up</p>
                  </div>

                  <div className="mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                      placeholder="Enter your FirstName"
                    />
                  </div>

                  <div className="mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Enter your LastName"
                    />
                  </div>

                  <div className="mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="Email"
                    />
                  </div>

                  <div className="mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <input
                      type="number"
                      className="form-control"
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      placeholder="Enter your Mobile no."
                    />
                  </div>

                  <button  type="submit" className="btn btn-outline-primary m-1">
                    Register
                  </button>

                  <p>
                    Already registered?
                    <br />
                    <span className="line">
                      <a href="/Login">Sign In</a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {showSuccessPopup && (
        <div
          className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="card text-black p-4"
            style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <p className="h4 fw-bold mb-3 text-center">Email sent to your id</p>
            <button
              type="button"
              className="btn btn-outline-primary mx-auto d-block"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
  
      </section>
    </form>
  );
};

export default RegistrationForm;
