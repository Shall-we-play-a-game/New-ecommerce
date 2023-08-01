import React from "react";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <Layout>
      <div className='flex h-full flex-wrap justify-center items-center'>
        <div className='p-7'>
          <div className='block w-72 rounded-lg bg-cyan-500 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] '>
            <h4 className='mb-2 text-2xl font-medium leading-tight text-neutral-800'>
              User Information
            </h4>
            <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800'>
              User's Name: {auth?.user?.name}
            </h5>
            <p className='mb-2 text-base text-neutral-600 '>
              User's Email: {auth?.user?.email}
            </p>
            <p className='mb-4 text-base text-neutral-600'>
              User's Contact: {auth?.user?.phone}
            </p>
            <NavLink
              type='button'
              onClick={handleLogout}
              className='inline-block rounded bg-blue-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
              data-te-ripple-init
              data-te-ripple-color='light'
            >
              Logout
            </NavLink>
          </div>
        </div>
        <div className='p-7'>
          <NavLink
            to='/dashboard/user/profile'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <FaUserAlt size={25} className='me-2' />
            User Profile
          </NavLink>
          <NavLink
            to='/dashboard/user/orders'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <FaShoppingCart size={25} className='me-2' />
            My Orders
          </NavLink>
        </div>
        <div className='p-14 hidden md:block'>
          <img
            src='https://img.freepik.com/free-vector/site-stats-concept-illustration_114360-1509.jpg?w=740&t=st=1689432862~exp=1689433462~hmac=4bd67ef3539028d1c21910118c55051c4678f866d6a70a23d56e7977d64ead22'
            alt='Artwork'
            srcset=''
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
