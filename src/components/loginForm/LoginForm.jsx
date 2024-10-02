import React from 'react';
import { useFormik } from 'formik'; // Import useFormik from Formik
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import * as Yup from 'yup'; // Import Yup for validation
import './LoginForm.scss';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/padlock.png';
import user_icon from '../../assets/user.png';

export default function LoginForm() {
  // Hardcoded valid credentials
  const VALID_EMAIL = "alaashaban2000@gmail.com";
  const VALID_PASSWORD = "alaa123@";

  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  const [action, setAction] = React.useState("Sign Up");

  // Formik 
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().when('action', {
        is: 'Sign Up',
        then: Yup.string().required('Name is required'),
      }),
      email: Yup.string()
        .required('Email is required')
        .email('Email address is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    }),
    onSubmit: (values) => {
      if (action === "Login") {
        // Only check credentials in "Login" mode
        if (values.email === VALID_EMAIL && values.password === VALID_PASSWORD) {
          // Successful login
          localStorage.setItem('isLoggedIn', 'true');
          console.log('Login successful');
          navigate('/home'); // Redirect to home page after login
        } else {
          formik.setErrors({ email: 'Invalid email or password' });
        }
      } else {
        // Handle Sign Up (assuming it's successful)
        console.log('Sign Up successful');
        navigate('/home'); // Redirect to home page after sign up
      }
    },
  });

  const toggleAction = () => {
    setAction(prevAction => (prevAction === "Sign Up" ? "Login" : "Sign Up"));
    // Reset form values
    formik.resetForm();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={formik.handleSubmit} className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="User icon" />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange} // Capture name input
              onBlur={formik.handleBlur} // Mark field as touched
            />
            {/* Display name validation error */}
            {formik.touched.name && formik.errors.name ? (
              <p className="error-message">{formik.errors.name}</p>
            ) : null}
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="Email icon" />
          <input
            type="email"
            placeholder="Email Id"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Mark field as touched
          />
          {/* Display email validation error */}
          {formik.touched.email && formik.errors.email ? (
            <p className="error-message">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="input">
          <img src={password_icon} alt="Password icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Mark field as touched
          />
          {/* Display password validation error */}
          {formik.touched.password && formik.errors.password ? (
            <p className="error-message">{formik.errors.password}</p>
          ) : null}
        </div>

        {action === "Sign Up" ? null : (
          <div className="forget-password">
            Lost Password? <span>Click Here!</span>
          </div>
        )}

        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={toggleAction}
          >
            {action === "Login" ? "Sign Up" : "Login"}
          </div>
          <button
            type="submit"
            className={action === "Sign Up" ? "submit gray" : "submit"}
          >
            {action === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
