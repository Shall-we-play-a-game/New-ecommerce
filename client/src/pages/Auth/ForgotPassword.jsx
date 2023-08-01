import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, question }
      );
      if (response.data.success) {
        toast.success("Login Successfully");
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
    <Layout title={"Login - Online Bazaar"}>
      <div className='min-h-screen flex flex-col bg-gray-800'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-gray-700 px-6 py-8 rounded shadow-md text-white w-full'>
            <h1 className='mb-8 text-3xl text-center'>Change Password</h1>
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
                type='text'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='block w-full p-3 rounded mb-4 text-black'
                name='question'
                placeholder='Enter Answer to secret Question'
              />

              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='block  w-full p-3 rounded mb-4 text-black'
                name='password'
                placeholder='New Password'
              />
              <button
                type='submit'
                className='w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-500 focus:outline-none my-1'
              >
                Change Password
              </button>
            </form>
          </div>
          <NavLink
            className='underline text-blue-700 hover:text-blue-400'
            to='/login'
          >
            Back
          </NavLink>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
