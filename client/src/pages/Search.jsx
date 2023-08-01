import React from "react";
import Layout from "../components/Layouts/Layout";
import { useSearch } from "../context/Serach";
import { Link } from "react-router-dom";
const Search = () => {
  const [values] = useSearch();
  return (
    <Layout>
      <h1 className='text-center font-bold text-3xl'>Search Results</h1>
      <h6 className=' text-center '>
        {values?.results.length < 1
          ? "Try Searching with different Keywords"
          : `Found ${values?.results.length}`}
      </h6>
      <div className='flex items-center justify-center flex-wrap'>
        {values?.results.map((product) => (
          <div
            key={product._id}
            className='w-72 mt-6 border-2 me-6 p-2 flex flex-col items-center justify-center'
          >
            <img
              className='w-48 h-72 object-cover hover:object-scale-down'
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt='Sunset in the mountains'
            />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{product.name}</div>
              <p className='text-gray-700 text-base'>
                {product.description.substring(0, 60)}...
              </p>
            </div>
            <div className='ps-2 pt-4 pb-2'>
              <Link
                to={`/dashboard/admin/product/${product.slug}`}
                className='text-blue-500 hover:text-blue-800 font-bold underline me-3 px-4'
              >
                More Details
              </Link>
              <Link
                to={`/dashboard/admin/product/${product.slug}`}
                className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded'
              >
                Add To Cart
              </Link>
              <span className='inline-block bg-gray-600 rounded-full px-3 py-1 text-md font-semibold text-white mr-2 my-2'>
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Search;
