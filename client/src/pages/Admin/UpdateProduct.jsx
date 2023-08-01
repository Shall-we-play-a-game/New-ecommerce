import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpadte = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product This action cannot be Undone!! \nEnter 'YES' OR 'NO' "
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-prodcuct/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className='flex justify-center items-center mt-10 flex-col'>
        <h1 className='block text-gray-700 text-2xl underline font-bold mb-2'>
          Update Product
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
                {photo ? photo.name : "Upload New Photo"}
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
              {photo ? (
                <div className='text-center'>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt='Product'
                    className='h-auto max-w-full'
                  />
                </div>
              ) : (
                <div className='text-center'>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                    alt='Product-photons'
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
              value={name}
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
              value={description}
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
              value={price}
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
              value={quantity}
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
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 uppercase rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={handleUpadte}
              >
                Update Product
              </button>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 ms-3 px-4 uppercase rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={handleDelete}
              >
                Delete Product
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

export default UpdateProduct;
