import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, email, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <div className='grid min-h-screen place-items-center'>
        <div className='w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12'>
          <h1 className='text-xl font-semibold'>
            Hello there {auth?.user?.name + " "}
            <span className='font-normal'>Update Your Information</span>
          </h1>
          <form onSubmit={handleSubmit} className='mt-6'>
            <label
              htmlFor='firstname'
              className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
            >
              Name
            </label>
            <input
              id='firstname'
              type='text'
              name='firstname'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='John'
              autoComplete='given-name'
              className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
              required
            />

            <label
              htmlFor='email'
              className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
            >
              E-mail
            </label>
            <input
              id='email'
              type='email'
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              placeholder='john.doe@company.com'
              autoComplete='email'
              className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
              required
            />
            <label
              htmlFor='password-confirm'
              className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
            >
              Address
            </label>
            <input
              id='password-confirm'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name='password-confirm'
              placeholder='Address'
              autoComplete='new-address'
              className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
              required
            />
            <label
              htmlFor='Phone'
              className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
            >
              Phone Number
            </label>
            <input
              id='password-confirm'
              type='number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name='Phone'
              placeholder='Phone Number'
              autoComplete='new-phone'
              className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
              required
            />
            <button
              type='submit'
              className='w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none'
            >
              Update
            </button>
            {/* <p className='flex justify-between md:inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black'>
              Already registered?
            </p> */}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
