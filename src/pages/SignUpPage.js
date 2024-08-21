import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/SignUpPage.css";

export default function SignUpPage() {
  const navigate = useNavigate(); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      valid = false;
      newErrors.firstName = "First name should contain only letters.";
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      valid = false;
      newErrors.lastName = "Last name should contain only letters.";
    }

    if (!/^\d{10}$/.test(phone)) {
      valid = false;
      newErrors.phone = "Phone number should be a 10 digit number.";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = "Email is not valid.";
    }

    if (password !== repeatPassword) {
      valid = false;
      newErrors.repeatPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const userData = {
        email,
        username: email.split('@')[0], 
        password,
        name: {
          firstname: firstName,
          lastname: lastName
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496'
          }
        },
        phone
      };

      try {
        const response = await fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('User created (simulated):', result);

        localStorage.setItem('user', JSON.stringify(result));

        // alert('User created successfully!');

        navigate('/home');

      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  };

  return (
    <div className="SignUpPage">
      <div className="SignUpInnerBox">
        <h1>Sign Up</h1>
        <hr />
        
        <div className="form-group first-name-group">
          <h3 style={{ color: errors.firstName ? 'red' : 'black' }}>First Name</h3>
          <input 
            className={focusedInput === 'firstName' ? (errors.firstName ? 'error' : 'focused') : (errors.firstName ? 'error' : '')}
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={() => setFocusedInput('firstName')}
            onBlur={() => setFocusedInput(null)}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>
        
        <div className="form-group last-name-group">
          <h3 style={{ color: errors.lastName ? 'red' : 'black' }}>Last Name</h3>
          <input 
            className={focusedInput === 'lastName' ? (errors.lastName ? 'error' : 'focused') : (errors.lastName ? 'error' : '')}
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            onFocus={() => setFocusedInput('lastName')}
            onBlur={() => setFocusedInput(null)}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
        
        <div className="form-group phone-group">
          <h3 style={{ color: errors.phone ? 'red' : 'black' }}>Phone</h3>
          <input 
            className={focusedInput === 'phone' ? (errors.phone ? 'error' : 'focused') : (errors.phone ? 'error' : '')}
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            onFocus={() => setFocusedInput('phone')}
            onBlur={() => setFocusedInput(null)}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        
        <div className="form-group email-group">
          <h3 style={{ color: errors.email ? 'red' : 'black' }}>Email</h3>
          <input 
            className={focusedInput === 'email' ? (errors.email ? 'error' : 'focused') : (errors.email ? 'error' : '')}
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-group password-group">
          <h3 style={{ color: errors.password ? 'red' : 'black' }}>Password</h3>
          <input 
            type="password" 
            className={focusedInput === 'password' ? (errors.password ? 'error' : 'focused') : (errors.password ? 'error' : '')}
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />
        </div>
        
        <div className="form-group repeat-password-group">
          <h3 style={{ color: errors.repeatPassword ? 'red' : 'black' }}>Repeat Password</h3>
          <input 
            type="password" 
            className={focusedInput === 'repeatPassword' ? (errors.repeatPassword ? 'error' : 'focused') : (errors.repeatPassword ? 'error' : '')}
            value={repeatPassword} 
            onChange={(e) => setRepeatPassword(e.target.value)}
            onFocus={() => setFocusedInput('repeatPassword')}
            onBlur={() => setFocusedInput(null)}
          />
          {errors.repeatPassword && <p className="error-message">{errors.repeatPassword}</p>}
        </div>
        
        <button className="form-save-button" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
