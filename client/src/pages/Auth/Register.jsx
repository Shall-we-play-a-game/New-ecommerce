import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, question }
      );
      if (response.data.success) {
        toast.success("User Created Succesfully");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title={"Register - Online Bazaar"}>
      <div className='min-h-screen flex flex-col bg-gray-800'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-gray-700 px-6 py-8 rounded shadow-md text-white w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-full p-3 rounded mb-4 text-black'
                name='fullname'
                placeholder='Full Name'
                required
              />

              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block w-full p-3 rounded mb-4 text-black'
                name='email'
                placeholder='Email'
                required
              />

              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block  w-full p-3 rounded mb-4 text-black'
                name='password'
                placeholder='Password'
                required
              />
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='block  w-full p-3 rounded mb-4 text-black'
                name='confirm_password'
                placeholder='Address'
                required
              />
              <input
                type='text'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='block  w-full p-3 rounded mb-4 text-black'
                name='What is your First School Name'
                placeholder='What is your First School Name? (for Security)'
                required
              />
              <input
                type='number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='block  w-full p-3 rounded mb-4 text-black'
                name='confirm_password'
                placeholder='Phone Number'
                required
              />

              <button
                type='submit'
                className='w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-500 focus:outline-none my-1'
              >
                Create Account
              </button>
            </form>
            <div className='text-center text-sm text-grey-dark mt-4'>
              By signing up, you agree to the{" "}
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
            Already have an account?{" "}
            <NavLink
              className='font-bold text-blue-700 hover:underline'
              to='/login'
            >
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
