import React from "react";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FaCartArrowDown, FaProductHunt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoIosCreate } from "react-icons/io";
const AdminDashborad = () => {
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
              Admin Information
            </h4>
            <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800'>
              Admin Name: {auth?.user?.name}
            </h5>
            <p className='mb-2 text-base text-neutral-600 '>
              Admin Email: {auth?.user?.email}
            </p>
            <p className='mb-4 text-base text-neutral-600'>
              Admin Contact: {auth?.user?.phone}
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
            to='/dashboard/admin/create-category'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <FaCartArrowDown size={25} className='me-2' />
            Create Category
          </NavLink>
          <NavLink
            to='/dashboard/admin/create-product'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <IoIosCreate size={25} className='me-2' />
            Create Products
          </NavLink>
          <NavLink
            to='/dashboard/admin/view-users'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <FiUsers size={25} className='me-2' />
            All Users
          </NavLink>
          <NavLink
            to='/dashboard/admin/products'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <FaProductHunt size={25} className='me-2' />
            All Products
          </NavLink>
          <NavLink
            to='/dashboard/admin/orders'
            className='mb-3 w-56 flex rounded-full bg-gradient-to-r from-cyan-300 to-cyan-500 justify-center align-middle p-3 text-white hover:text-black'
          >
            <FaProductHunt size={25} className='me-2' />
            All Orders
          </NavLink>
        </div>
        <div className='p-14 hidden md:block'>
          <img
            src='https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1689352701~exp=1689353301~hmac=7ce8a482deef1ab18c60dff53ec09665a78692fe2188111a770e0ad756bab3e9'
            alt='Artwork'
            srcset=''
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashborad;
