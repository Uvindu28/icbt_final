import React, { useState } from 'react';
import logo from "../assets/newlogo.png";
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUp() {
  const [admin, setAdmin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Ensures 10 digits
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const data = {
      username,
      password,
      email,
      phoneNumber
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/admins", data);
      console.log(response.data);
      toast.success("Account created successfully!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-maroon via-maroon2 to-maroon3 animate-gradient dark:bg-[#1F2937] font-Poppins">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          className="w-56 h-56 mr-2 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          src={logo}
          alt="logo"
        />
        <div className="w-full bg-white bottom-11 relative rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#1F2937] dark:border-gray_black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#374151] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#374151] rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter Your Username"
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
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#374151] text-white rounded-lg block w-full p-2.5 dark:bg-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#374151] text-white rounded-lg block w-full p-2.5 dark:bg-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-[#374151] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter Your Phone Number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red hover:bg-maroon2 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-white">
                Already have an account?{' '}
                <a href="/" className="font-medium text-primary-600 hover:underline">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
