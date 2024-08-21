import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const result = await response.json();
        console.log('Login successful:', result);

        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userName', username);

        toast.success("Login successful!", {
          position: "top-center"
        });

        navigate("/home");

      } catch (error) {
        console.error('Error during login:', error);
        toast.error("Invalid username or password", {
          position: "top-center"
        });
      }
    } else {
      toast.error("Please enter both username and password", {
        position: "top-center"
      });
    }
  };

  return (
    <div className="LoginPage">
      <div className="Content">
        <h1 className="Welcomeback">Welcome to Login Page!</h1>
        <p className="Happy">Please login to continue.</p>
        <p className={`InputTitle ${usernameError ? "ErrorTitle" : ""}`}>Username</p>
        <input
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          className={usernameError ? "ErrorInput" : ""}
        />
        {usernameError && <p className="ErrorMessage">{usernameError}</p>}
        <p className="InputTitle">Password</p>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="Button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
