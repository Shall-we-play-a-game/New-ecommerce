import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (response.data.success) {
        toast.success("Login Successfully");
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Login - Online Bazaar"}>
      <div className='min-h-screen flex flex-col bg-gray-800'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-gray-700 px-6 py-8 rounded shadow-md text-white w-full'>
            <h1 className='mb-8 text-3xl text-center'>Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block w-full p-3 rounded mb-4 text-black'
                name='email'
                placeholder='Email'
              />

              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block  w-full p-3 rounded mb-4 text-black'
                name='password'
                placeholder='Password'
              />
              <button
                type='submit'
                className='w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-500 focus:outline-none my-1'
              >
                Login
              </button>
            </form>
            <div className='text-center text-sm text-grey-dark mt-4'>
              By Logging In, you agree to the{" "}
              <NavLink className='underline hover:text-gray-300' to='/*'>
                Terms of Service
              </NavLink>{" "}
              and{" "}
              <NavLink
                className='underline hover:text-gray-300'
                to='/privacypolicy'
              >
                Privacy Policy
              </NavLink>
            </div>
          </div>

          <div className='text-white mt-6'>
            Don't have an account?{" "}
            <NavLink
              className='font-bold text-blue-700 hover:underline'
              to='/register'
            >
              Register
            </NavLink>
          </div>
          <NavLink
            className='ps-3 underline text-blue-700 hover:text-blue-400'
            to='/forgot-password'
          >
            Forgot password?
          </NavLink>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
