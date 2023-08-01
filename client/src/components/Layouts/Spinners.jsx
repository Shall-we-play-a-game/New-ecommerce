import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Spinners = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div
      className='flex bg-gray-900'
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h3 className='text-white text-lg'>You must Login First</h3>
      <h3 className='text-white'>
        Redirecting in <span className='text-red-500'>{count}</span> seconds
      </h3>
      <div className='w-12 h-12 border-4 border-blue-600 mt-3 rounded-full loader'></div>
    </div>
  );
};

export default Spinners;
