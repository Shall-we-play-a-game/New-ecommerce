import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layouts/Layout";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center mt-8'>
        <h4 className='text-center font-bold text-3xl'>
          Category - {category?.name}
        </h4>
        <h5 className='text-center font-semibold'>
          {products?.length} Results found in {category?.name}
        </h5>
      </div>
      <div className='flex items-center justify-center flex-wrap'>
        {products?.map((product) => (
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
              <button
                onClick={() => navigate(`/product/${product.slug}`)}
                className='text-blue-500 hover:text-blue-800 font-bold underline me-3 px-4'
              >
                More Details
              </button>
              <Link
                to={`/dashboard/admin/product/${product.slug}`}
                className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded'
              >
                Add To Cart
              </Link>
              <span className='inline-block bg-gray-600 rounded-full px-3 py-1 text-md font-semibold text-white mr-2 my-2'>
                Price:{" "}
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

export default CategoryProduct;
