import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom'; 
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To handle redirection
  const handleLogin = async(e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate email format and domain
    const syrEmailRegex = /^[a-zA-Z0-9._%+-]+@syr\.edu$/;
    if (!syrEmailRegex.test(email)) {
      setError('Please enter a valid @syr.edu email address.');
      return;
    }
    
    // Proceed with login logic
    console.log('Email:', email);
    console.log('Password:', password);
    try {
    const formData = new FormData() 
    formData.append("email", email)
    formData.append("password", password)
    const response = await axios.post('/login', formData, { headers: {'Content-Type': 'application/json'}});
    const data = response.data;

      if (response.status === 200) {
        // Assuming the token is returned upon successful authentication
        localStorage.setItem('token', data.token); // Save the token in local storage
        navigate('/home'); // Redirect to the home page
      } else {
        setError(data.message || 'An error occurred'); // Set an error message from the response
      }
    } catch (error) {
      console.log(error);
      console.error('Login request failed', error);
      setError('Failed to log in');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                // pattern="[a-z0-9._%+\\-]+@syr\.edu"
                title="Please enter a valid Syracuse University email address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {error && (
              <div className="mt-1 text-red-600 text-sm">{error}</div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form>
        <NavLink to="/register">
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register here
            </span>
          </p>
        </NavLink>
        <div className="flex justify-center mt-6">
          <Link to="/" className="flex items-center text-sm text-gray-500 hover:text-indigo-600">
            <FaArrowLeft className="mr-1" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
