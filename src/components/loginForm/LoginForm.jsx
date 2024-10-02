import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginForm.scss';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/padlock.png';
import user_icon from '../../assets/user.png';

export default function LoginForm() {
  // Hardcoded valid credentials
  const VALID_EMAIL = "alaashaban2000@gmail.com";
  const VALID_PASSWORD = "alaa123@";

  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  const toggleAction = () => {
    setAction(prevAction => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
    // Clear errors when toggling between login/signup
    setErrors({
      name: '',
      email: '',
      password: ''
    });
  };

  // Basic validation function
  const validate = () => {
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    // Name validation (for Sign Up only)
    if (action === "Sign Up" && !name.trim()) {
      nameError = 'Name is required';
    }

    // Email validation
    if (!email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = 'Email address is invalid';
    }

    // Password validation
    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters long';
    }

    if (nameError || emailError || passwordError) {
      setErrors({ name: nameError, email: emailError, password: passwordError });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (action === "Login") {
        // Only check credentials in "Login" mode
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
          // Successful login
          localStorage.setItem('isLoggedIn', 'true');
          console.log('Login successful');
          navigate('/home'); // Redirect to home page after login
        } else {
          setErrors({ ...errors, email: 'Invalid email or password' });
        }
      } else {
        // Handle Sign Up (assuming it's successful)
        console.log('Sign Up successful');
        navigate('/home'); // Redirect to home page after sign up
      }
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="User icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Capture name input
            />
            {/* Display name validation error */}
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="Email icon" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Display email validation error */}
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="input">
          <img src={password_icon} alt="Password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Display password validation error */}
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      {action === "Sign Up" ? null : (
        <div className="forget-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        {/* Sign Up button should be gray when in Login state */}
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={toggleAction}
        >
          {action === "Login" ? "Sign Up" : "Login"}
        </div>
        {/* Login button should be violet when in Login state */}
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={handleSubmit} // Trigger form validation and submission
        >
          {action === "Sign Up" ? "Sign Up" : "Login"}
        </div>
      </div>
    </div>
  );
}
