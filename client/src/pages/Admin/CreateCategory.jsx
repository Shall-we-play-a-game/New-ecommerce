import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layouts/Layout";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`Added ${name} Successfully`);
        getAllCategory();
      } else {
        toast.error("Unable to add Try after sometime");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input");
    }
  };
  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data?.success) {
        toast.success(`Name has been updated to ${updateName}`);
        setSelected(null);
        setUpdateName("");
        setIsModalOpen(false);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success("Category Deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className='bg-slate-700 text-white h-screen'>
        <div className='flex'>
          <div className='p-7'>Manage Category</div>
        </div>
        <div>
          <NavLink
            to='/dashboard/admin'
            className='p-5 inline-flex items-center'
          >
            <AiFillCaretLeft size={23} />
            Dashboard
          </NavLink>
        </div>
        <div className='flex items-center justify-center'>
          <CategoryForm
            key={""}
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block w-screen py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      <th scope='col' className='px-6 py-4'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((category) => (
                      <>
                        <tr className='border-b dark:border-neutral-500'>
                          <td
                            className='whitespace-nowrap px-6 py-4 uppercase'
                            key={category._id}
                          >
                            {category.name}
                          </td>
                          <td>
                            <button
                              type='button'
                              className='inline-block bg-primary rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs
                              font-medium uppercase leading-normal'
                              onClick={() => {
                                setIsModalOpen(true);
                                setUpdateName(category.name);
                                setSelected(category);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className='m-3 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white'
                              onClick={() => {
                                handleDelete(category._id);
                              }}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                title='Update Category'
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                open={isModalOpen}
                onOk={handleOk}
              >
                <CategoryForm
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
