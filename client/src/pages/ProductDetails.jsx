import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <div>Loading....</div>;
  }
  //get similar product
  const getSimilarProduct = async (validPid, validCid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${validPid}/${validCid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <main className=' bg-slate-100'>
        <div className='container mx-auto px-6'>
          <div className='md:flex md:items-center border p-4 shadow'>
            <div className='w-full mt-7 h-64 md:w-1/2 lg:h-96'>
              <img
                className='h-full w-full rounded-md object-cover max-w-sm mx-auto hover:object-scale-down'
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
            <div className='w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2'>
              <h3 className='text-gray-700 uppercase text-lg'>
                {product.name}
              </h3>
              <span className='text-gray-500 mt-3'>
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              <hr className='my-3' />
              <div className='mt-2'>
                <p>{product.description}</p>
              </div>
              <div className='text-gray-500 mt-3'>
                <p>Category: {product?.category?.name}</p>
              </div>
              <div className='flex items-center mt-6'>
                <button
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to Cart");
                  }}
                  className='px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className='mt-16'>
            <h3 className='text-gray-600 text-2xl font-medium'>
              Related Products
            </h3>
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
              {relatedProducts?.map((product) => (
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
                    <button
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to Cart");
                      }}
                      className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded'
                    >
                      Add To Cart
                    </button>
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
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProductDetails;
