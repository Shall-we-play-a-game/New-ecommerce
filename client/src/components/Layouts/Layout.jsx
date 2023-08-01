import React, { Children } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
function Layout({ children, title, descripton, keywords, author }) {
  return (
    <div>
      <Header />
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={descripton} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title data-rh='true'>{title}</title>
      </Helmet>
      <div className='min-h-screen'>
        {Children.map(children, (child) => (
          <main className='main'>
            <Toaster />
            {child}
          </main>
        ))}
      </div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Online Bazaar - Online Shopping",
  descripton: "E-Commerce Website",
  keywords: "mern,react,node,mongodb",
  author: "Ibrahim Khan",
};

export default Layout;
