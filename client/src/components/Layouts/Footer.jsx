import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className='max-w-full mx-auto'>
        <footer className='p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023{" "}
            <NavLink
              to='/'
              className='hover:underline'
              target='blank'
              rel='noreferrer'
            >
              Online Bazaar
            </NavLink>
            . All Rights Reserved.
          </span>
          <ul className='flex flex-wrap items-center mt-3 sm:mt-0'>
            <li>
              <NavLink
                to='/about'
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/privacypolicy'
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/license'
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'
              >
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/contact'
                className='text-sm text-gray-500 hover:underline dark:text-gray-400'
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Footer;
