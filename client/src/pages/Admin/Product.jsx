import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className='bg-gray-800 min-h-screen'>
        <div className=' text-center text-white font-bold text-3xl p-5 mb-3'>
          All Products
        </div>
        <div className='flex items-center justify-center flex-wrap'>
          {products?.map((product) => (
            <div className='bg-slate-300 w-72  rounded me-6 p-3 shadow-lg shadow-slate-600 flex flex-col items-center justify-center'>
              <img
                className='w-48 h-72 object-cover hover:object-scale-down'
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                alt='Sunset in the mountains'
              />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{product.name}</div>
                <p className='text-gray-700 text-base'>{product.description}</p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <Link
                  to={`/dashboard/admin/product/${product.slug}`}
                  className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 me-5 px-4 rounded'
                >
                  View
                </Link>
                <span className='inline-block bg-gray-600 rounded-full px-3 py-1 text-md font-semibold text-white mr-2 mb-2'>
                  Price ₹{product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
