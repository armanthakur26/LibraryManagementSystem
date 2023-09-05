import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordSetting = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [uppercaseError, setUppercaseError] = useState('');
  const [lowercaseError, setLowercaseError] = useState('');
  const [specialSymbolError, setSpecialSymbolError] = useState('');
  const [numericValueError, setNumericValueError] = useState('');
  const { id } = useParams();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const delay = 1000;

  useEffect(() => {
    // Validate password match when 'confirmPassword' changes after a delay
    const timer = setTimeout(passwordMatchValidator, delay);
    return () => clearTimeout(timer);
  }, [confirmPassword]); // Only include 'confirmPassword' as a dependency

  const passwordMatchValidator = () => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatchError('Password does not match');
    } else {
      setPasswordMatchError('');
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setLengthError(password.length < 8 ? 'Password must be at least 8 characters long.' : '');
      setUppercaseError(password.search(/[A-Z]/) === -1 ? 'Password must contain at least one uppercase letter.' : '');
      setLowercaseError(password.search(/[a-z]/) === -1 ? 'Password must contain at least one lowercase letter.' : '');
      setSpecialSymbolError(password.search(/[@$!%*?&]/) === -1 ? 'Password must contain at least one special symbol.' : '');
      setNumericValueError(password.search(/\d/) === -1 ? 'Password must contain at least one numeric value.' : '');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError("Your Password doesn't match with confirm password");
    } else {
      try {
        const getIdFromUrl = () => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');
          return id;
        };

        // Get the ID from the URL
        const idFromUrl = getIdFromUrl();
        console.log('ID from URL:', idFromUrl);

        await axios.put(`https://localhost:7247/api/User/update?id=${id}`,{
          id: idFromUrl,
          password: password,
        });
        setShowSuccessPopup(true);
  
      } catch (error) {
        console.error('Error setting password:', error.message);
    
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Set Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
          {lengthError && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{lengthError}</span>}
          {uppercaseError && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{uppercaseError}</span>}
          {lowercaseError && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{lowercaseError}</span>}
          {specialSymbolError && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{specialSymbolError}</span>}
          {numericValueError && <span style={{ color: 'red', fontSize: '14px', marginBottom: '5px' }}>{numericValueError}</span>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMatchError('');
            }}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
          {passwordMatchError && (
            <span style={{ color: 'red', fontSize: '14px', marginBottom: '10px', display: 'block' }}>
              {passwordMatchError}
            </span>
          )}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: 'teal',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Set Password
        </button>
      </form>
      {showSuccessPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
          }}
        >
          <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            Password set successfully!
          </p>
          <button
            onClick={handleClosePopup}
            style={{
              display: 'block',
              margin: '0 auto',
              background: 'teal',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordSetting;
