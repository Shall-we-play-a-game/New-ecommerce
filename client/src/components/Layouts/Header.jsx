import React, { useState, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useCategory from "../../hooks/viewCategory";
import { useCart } from "../../context/cart";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleMenuCollapse = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join("");
  };
  return (
    <>
      <nav className='flex justify-between items-center bg-gray-900 text-sm px-8 sm:w-full'>
        <div className='flex px-4 py-4 items-center'>
          <Link title='home' to='/' className='pr-2'>
            <img
              src='https://www.pngmart.com/files/11/E-Commerce-PNG-Transparent.png'
              alt=''
              className='w-8 rounded-full'
            />
          </Link>
          <NavLink
            to='/'
            className='text-gray-200 hover:text-gray-100 font-mono text-lg'
          >
            ONLINE BAZAAR
          </NavLink>
        </div>
        <div className='flex px-4 py-4 justify-between'>
          <div
            className={`ml-2 px-3 mobile-menu ${
              isMobileMenuOpen ? "show" : ""
            } `}
            id='mobileMenu'
          >
            <NavLink to='/' className='px-2 text-gray-300 hover:text-gray-100'>
              Home
            </NavLink>
            <Menu as='div' className='menu relative inline-block text-left'>
              <div>
                <Menu.Button className='flex w-full justify-center  px-3 py-2 text-white'>
                  Categories
                  <ChevronDownIcon className='-mr-1 h-5 w-5 text-gray-400' />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='menu-items absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-900 text-white shadow-lg ring-2 ring-white ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item
                      key={categories._id}
                      as='li'
                      className='menu-item'
                    >
                      {" "}
                      <NavLink
                        to={`/categories`}
                        className={classNames(
                          "text-white block px-4 py-2 text-sm hover:bg-white hover:text-black"
                        )}
                      >
                        All Categories
                      </NavLink>
                      {categories.map((c) => (
                        <NavLink
                          key={c._id}
                          to={`/category/${c.slug}`}
                          className={classNames(
                            "text-white block px-4 py-2 text-sm hover:bg-white hover:text-black"
                          )}
                        >
                          {c.name}
                        </NavLink>
                      ))}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {!auth.user ? (
              <>
                <NavLink
                  to='/login'
                  className='px-2 text-gray-300 hover:text-gray-100'
                >
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className='px-2 text-gray-300 hover:text-gray-100'
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to='/cart'
                  className='px-2 text-gray-300 hover:text-gray-100'
                >
                  Cart{" "}
                  <span className='bg-red-500 p-1 rounded-full'>
                    {cart?.length}
                  </span>
                </NavLink>
                <Menu as='div' className='menu relative inline-block text-left'>
                  <div>
                    <Menu.Button className='flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-white'>
                      {auth?.user?.name}
                      <ChevronDownIcon className='-mr-1 h-5 w-5 text-gray-400' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='menu-items absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-900 text-white shadow-lg ring-2 ring-white ring-opacity-5 focus:outline-none'>
                      <div className='py-1'>
                        <Menu.Item className='menu-item'>
                          {({ active }) => (
                            <NavLink
                              to={`/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`}
                              className={classNames(
                                "text-white block px-4 py-2 text-sm hover:bg-white hover:text-black"
                              )}
                            >
                              Dashboard
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              onClick={handleLogout}
                              to='/login'
                              className={classNames(
                                "text-white block px-4 py-2 text-sm hover:bg-white hover:text-black"
                              )}
                            >
                              Logout
                            </NavLink>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            )}
          </div>
        </div>
        <div className='mobile-display'>
          <button
            title='button'
            className='text-gray-100'
            onClick={handleMenuCollapse}
          >
            <i className='fas fa-bars'></i>
          </button>
        </div>
        {/* <div className='flex mobile-collapse'>
          <input
            type='text'
            placeholder='Search Here'
            className='h-full py-4 bg-gray-800 px-3 text-white'
          />
        </div> */}
      </nav>
    </>
  );
};

export default Header;
