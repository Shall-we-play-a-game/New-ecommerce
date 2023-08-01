import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { AiOutlineReload } from "react-icons/ai";
import { Radio, Checkbox } from "antd";
import { Prices } from "../components/Prices";
import SearchInput from "../components/Form/SearchInput";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const HomePage = (props) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [open, setOpen] = useState(false);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    // getTotal();
  }, []);

  // Get Products
  const getAllProducts = async () => {
    try {
      // setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      // setIsLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setIsLoading(false);
      console.log(error);
    }
  };

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/product-count`
  //     );
  //     setTotal(data?.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (page === 1) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // const loadMore = async () => {
  //   try {
  //     setIsLoading(true);
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
  //     );
  //     setIsLoading(false);
  //     setProducts([...products, ...data?.products]);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".relative")) {
      setOpen(false);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <div className='flex flex-row '>
        <div className='md:flex flex-col md:flex-row md:min-h-screen'>
          <div
            onClick={handleClickOutside}
            className='hidden md:flex flex-col w-full md:w-64 bg-gray-800 text-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0'
          >
            <div className='flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between'>
              <button
                className='rounded-lg md:hidden focus:outline-none focus:shadow-outline'
                onClick={() => setOpen(!open)}
              >
                <svg
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  className='w-6 h-6'
                >
                  <path
                    style={{ display: open ? "none" : "block" }}
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  ></path>
                  <path
                    style={{ display: open ? "block" : "none" }}
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <nav
              className={`flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ${
                open ? "block" : "hidden"
              }`}
            >
              <div>
                <h3 className='text-center font-bold'>Filter By Category</h3>
              </div>
              <div className='flex flex-col mt-2 mb-8 text-sm font-semibold'>
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className='py-1 text-white'
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <div>
                <h3 className='text-center font-bold'>Filter By Price</h3>
              </div>
              <div className='mt-2 mb-8 text-sm font-semibold' href='#'>
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio className='py-1 text-white' value={p.array}>
                        {p.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <button
                  className='bg-red-500 hover:bg-red-800 px-2 py-2 rounded-lg text-white font-bold'
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className='mt-12'>
          <div className='flex flex-row justify-end me-5 mb-4'>
            <SearchInput />
          </div>
          <h1 className='text-center font-bold text-3xl'>All Products</h1>
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
          <div className='my-10 text-center text-gray-600 text-xl'>
            Load More is Not working currently try using Filters
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
