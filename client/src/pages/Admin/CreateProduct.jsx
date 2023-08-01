import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
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
      // toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
      } else {
        toast.error(data?.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className='flex justify-center items-center mt-10 flex-col'>
        <h1 className='block text-gray-700 text-2xl underline font-bold mb-2'>
          Create A Product
        </h1>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Category
              </label>
              <Select
                bordered={false}
                className='shadow appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Select a Category'
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='photo'
              >
                Select A Photo
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
                type='file'
                id='photo'
                accept='image/*'
                onChange={(e) => setPhoto(e.target.files[0])}
                placeholder='Size must be less than 1MB'
                required
              />
            </div>
            <div className='mb-5 flex justify-center'>
              {photo && (
                <div className='text-center'>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt='Product'
                    className='h-auto max-w-full'
                  />
                </div>
              )}
            </div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='Name'
            >
              Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              id='Name'
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter The Name of your Product'
              required
            />
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='desc'
            >
              Description
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              id='desc'
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Short product Description'
              required
            />
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='price'
            >
              Price
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
              type='Number'
              id='price'
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Enter The Price of your Product'
              required
            />
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='quantity'
            >
              Quantity
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
              type='Number'
              id='quantity'
              onChange={(e) => setQuantity(e.target.value)}
              placeholder='Enter Quantity'
              required
            />
            <Select
              bordered={false}
              placeholder='Do you want To ship?'
              showSearch
              className='shadow appearance-none border rounded w-full py-2  text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value='0'>No</Option>
              <Option value='1'>Yes</Option>
            </Select>
            <div className='flex items-center justify-center mt-4'>
              <button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </form>
          <p className='text-center py-3 text-gray-500 text-xs'>
            &copy;2023 Online Bazzar. All rights reserved.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
