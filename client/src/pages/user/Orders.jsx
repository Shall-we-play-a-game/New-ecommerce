import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className='flex flex-col w-full'>
        <h1 className='text-center font-bold text-3xl'>All Orders</h1>
        {orders?.map((o, i) => {
          return (
            <div className='flex flex-col md:flex-row w-screen h-full px-14 py-7'>
              <div className='shadow overflow-hidden rounded border-b border-gray-200 w-full flex flex-col h-fit gap-4 p-4'>
                <table className='min-w-full bg-white'>
                  <thead className='bg-gray-800 text-white '>
                    <tr>
                      <th className='w-1/3 text-center py-3  p-4 uppercase font-semibold text-md'>
                        #
                      </th>
                      <th className='w-1/3 text-center py-3 p-4 uppercase font-semibold text-md'>
                        Status
                      </th>
                      <th className='w-1/3 text-center py-3 p-4 uppercase font-semibold text-md'>
                        Buyer
                      </th>
                      <th className='w-1/3 text-center py-3 p-4 uppercase font-semibold text-md'>
                        date
                      </th>
                      <th className='w-1/3 text-center py-3 p-4 uppercase font-semibold text-md'>
                        Payment
                      </th>
                      <th className='w-1/3 text-center py-3 px-4 uppercase font-semibold text-md'>
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-gray-700'>
                    <tr>
                      <td className='w-1/3 text-center py-3  px-4'>{i + 1}</td>
                      <td className='w-1/3 text-center py-3 px-4'>
                        {o?.status}
                      </td>
                      <td className='w-1/3 text-center py-3 px-4'>
                        {o?.buyer?.name}
                      </td>
                      <td className='w-1/3 text-center py-3 px-4'>
                        {moment(o?.createAt).fromNow()}
                      </td>
                      <td className='w-1/3 text-center  px-4'>
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className='w-1/3 text-center  px-4'>
                        {o?.products?.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='flex flex-col justify-center w-full md:w-2/3 h-fit ms-5 gap-4 p-4 shadow overflow-hidden rounded border-b border-gray-200'>
                <div className='font-bold text-xl uppercase'>Items</div>
                {o?.products?.map((p, i) => (
                  <div className='flex flex-row border-2 p-3' key={p._id}>
                    <div className=''>
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className='mt-8'
                        alt={p.name}
                        width='100px'
                        height={"100px"}
                      />
                    </div>
                    <div className='mt-8 ms-5'>
                      <p className='font-bold'>{p.name}</p>
                      <p className=''>{p.description.substring(0, 30)}</p>
                      <p>Price : {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Orders;
