import React from "react";
import Layout from "../components/Layouts/Layout";
import useCategory from "../hooks/viewCategory";
import { Link } from "react-router-dom";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='font-bold text-3xl mb-3'>All Categories</div>
        {categories.map((c) => (
          <button
            className='mb-3 bg-gray-700 p-3 rounded-lg w-fit text-white font-bold text-2xl'
            key={c._id}
          >
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
