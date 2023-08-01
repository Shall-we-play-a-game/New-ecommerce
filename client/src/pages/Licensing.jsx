import React from "react";
import Layout from "../components/Layouts/Layout";

const Licensing = () => {
  return (
    <Layout title={"Licensing - Online Bazaar"}>
      <div className='bg-[#1A2238] lg:h-screen lg:items-center lg:flex'>
        <div className='container mx-auto px-4 py-12'>
          <h1 className='text-3xl text-white font-bold mb-6'>Licensing</h1>

          <p className='text-white mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
            ultricies ex. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia Curae; Phasellus vel dapibus massa. In
            sed justo a arcu ullamcorper mollis. Mauris a tristique nisl. Ut ut
            ex vitae orci dictum accumsan. In bibendum tellus eget libero
            lacinia, vitae consequat urna pellentesque.
          </p>

          <div className='flex flex-wrap -mx-4'>
            <div className='w-full md:w-1/2 px-4 mb-6'>
              <div className='bg-[#1b243e] rounded-lg shadow-md p-6'>
                <h2 className='text-lg text-white font-bold mb-4'>
                  Standard License
                </h2>
                <p className='text-white mb-4'>
                  The Standard License allows you to use the purchased items for
                  personal or commercial projects with a single end product.
                </p>
                <ul className='list-disc list-inside text-white mb-4'>
                  <li>Use the items in a single end product</li>
                  <li>Non-exclusive, non-transferable rights</li>
                  <li>Up to 5,000 physical or digital copies</li>
                  <li>For personal or commercial use</li>
                  <li>Not for resale or distribution</li>
                </ul>
                <p className='text-white'>Price: $49</p>
                <button className='mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                  Purchase Standard License
                </button>
              </div>
            </div>

            <div className='w-full md:w-1/2 px-4 mb-6'>
              <div className='bg-[#1b243e] rounded-lg shadow-md p-6'>
                <h2 className='text-lg text-white font-bold mb-4'>
                  Extended License
                </h2>
                <p className='text-white mb-4'>
                  The Extended License allows you to use the purchased items for
                  personal or commercial projects with unlimited end products.
                </p>
                <ul className='list-disc list-inside text-white mb-4'>
                  <li>Use the items in unlimited end products</li>
                  <li>Non-exclusive, non-transferable rights</li>
                  <li>Unlimited physical or digital copies</li>
                  <li>For personal or commercial use</li>
                  <li>Not for resale or distribution</li>
                </ul>
                <p className='text-white'>Price: $99</p>
                <button className='mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                  Purchase Extended License
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Licensing;
