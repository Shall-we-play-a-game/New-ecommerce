import React from "react";
import Layout from "../components/Layouts/Layout";

const About = () => {
  return (
    <Layout title={"About Us - Online Bazaar"}>
      <div className='bg-[#1A2238] text-white'>
        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row'>
              <div className='md:w-1/2'>
                <h1 className='text-4xl font-bold mb-6'>About Us</h1>
                <p className='text-white mb-6'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris quis erat eget nulla vulputate luctus. Sed imperdiet
                  erat ut lectus elementum, vel tincidunt enim auctor. Nulla
                  eleifend lorem id elit convallis, eget lacinia quam facilisis.
                </p>
                <p className='text-white mb-6'>
                  In hac habitasse platea dictumst. Curabitur ac felis eu mi
                  scelerisque ullamcorper ac vel turpis. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia
                  Curae; Donec placerat ligula eget sem rutrum, sit amet iaculis
                  orci cursus.
                </p>
                <p className='text-white mb-6'>
                  Sed nec orci tortor. Nam blandit rhoncus tortor, eget
                  fringilla nulla mattis in. Sed lacinia elementum aliquet. Nam
                  consectetur laoreet mauris, vel tincidunt neque cursus ac.
                </p>
              </div>
              <div className='md:w-1/2'>
                <img
                  src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlJTIwYXQlMjB3b3JrfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='w-full h-auto'
                />
              </div>
            </div>
          </div>
        </section>
        <section className='bg-[#1b243e] py-12'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row'>
              <div className='md:w-1/2 order-2 md:order-1 px-3'>
                <img
                  src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlb3BsZSUyMGF0JTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='w-full h-auto'
                />
              </div>
              <div className='md:w-1/2 order-1 md:order-2'>
                <h2 className='text-3xl font-bold mb-6'>Our Mission</h2>
                <p className='text-white mb-6'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris quis erat eget nulla vulputate luctus. Sed imperdiet
                  erat ut lectus elementum, vel tincidunt enim auctor. Nulla
                  eleifend lorem id elit convallis, eget lacinia quam facilisis.
                </p>
                <p className='text-white mb-6'>
                  In hac habitasse platea dictumst. Curabitur ac felis eu mi
                  scelerisque ullamcorper ac vel turpis. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia
                  Curae; Donec placerat ligula eget sem rutrum, sit amet iaculis
                  orci cursus.
                </p>
                <p className='text-white mb-6'>
                  Sed nec orci tortor. Nam blandit rhoncus tortor, eget
                  fringilla nulla mattis in. Sed lacinia elementum aliquet. Nam
                  consectetur laoreet mauris, vel tincidunt neque cursus ac.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
