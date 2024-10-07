import React, { useState } from 'react';
import logo from "../assets/images/newlogo.png";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {  useAuth } from '../utility/AuthContext';


function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const { totalPrice, seats = [], foodItems = [], selectedMovieDate } = location.state || {};
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

     const data = {

      username: username,
      password: password
     }

     axios.post("http://localhost:8080/auth/login",data)
      .then(function (response) {
        navigate(`/paypage/${id}`, {
          state: {
            totalPrice,
            seats,
            selectedMovieDate,
            foodItems
          }
        });
        login(response.data);
        toast.success("Login successfully!");
      }).catch(function (error) {
        console.log( error);
        toast.error("Login Failed!");
      });
  }



  return (
    <section className="bg-gradient-to-r from-maroon via-maroon2 to-maroon3 animate-gradient dark:bg-[#1F2937] font-Poppins">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          className="w-56 h-56 mr-2 flex items-center mb-6 text-2xl font-semibold text-white"
          src={logo}
          alt="logo"
        />
        <div className="w-full bg-white bottom-11 relative rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1F2937] dark:border-gray_black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#374151]  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:text-white "
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#374151]   text-white rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-2xl leading-5 cursor-pointer mt-6"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red hover:bg-maroon2  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-medium text-white">
                Don’t have an account yet?{' '}
                <a href="/signup" className="font-medium hover:underline text-white">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
