import React from "react";
import Layout from "../components/Layouts/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy - Online Bazaar"}>
      <div className='bg-[#1A2238]'>
        <div className=' container mx-auto px-4 py-12'>
          <h1 className='text-3xl font-bold text-white mb-4'>Privacy Policy</h1>

          <p className='text-white mb-6'>
            This Privacy Policy describes how we collect, use, and share your
            information when you visit or make a purchase from{" "}
            <strong>Online Bazzar</strong>.
          </p>

          <h2
            id='information-we-collect'
            className='text-white text-lg font-bold mt-8 mb-4'
          >
            Information We Collect
          </h2>

          <p className='text-white mb-4'>
            When you visit the Site, we collect certain information about your
            device, including your IP address, browser type, operating system,
            and some of the pages you visit.
          </p>

          <p className='text-white mb-4'>
            We also collect information that your browser sends whenever you
            visit a website, such as cookies, flash cookies, and other similar
            technologies.
          </p>

          <p className='text-white mb-4'>
            For more information about cookies, please see the section below
            titled "Cookies."
          </p>

          <p className='text-white mb-6'>
            We use the information we collect to:
          </p>
          <ul className='list-disc list-inside text-white mb-6'>
            <li>
              Process your orders and fulfill any other requests you make
              through the Site
            </li>
            <li>Communicate with you</li>
            <li>Screen for potential risk and fraud</li>
            <li>
              When in line with the preferences you have shared with us, provide
              you with information or advertising relating to our products or
              services
            </li>
          </ul>

          <h2 id='cookies' className='text-white text-lg font-bold mt-8 mb-4'>
            Cookies
          </h2>

          <p className='text-white mb-4'>
            A cookie is a small file that a website saves on your computer or
            mobile device when you visit the site. It enables the website to
            remember your actions and preferences (such as login, language, font
            size, and other display preferences) over a period of time, so you
            don’t have to keep re-entering them whenever you come back to the
            site or browse from one page to another.
          </p>

          <p className='text-white mb-4'>We use cookies to:</p>
          <ul className='list-disc list-inside text-white mb-6'>
            <li>Keep track of items in your shopping cart</li>
            <li>
              Understand and save your preferences for future visits, such as
              your preferred language
            </li>
            <li>Provide you with more relevant advertising</li>
            <li>
              Track the aggregate number of visitors to the Site and the pages
              they visit
            </li>
          </ul>

          <p className='text-white mb-4'>
            We use both session cookies and persistent cookies. Session cookies
            are deleted from your computer when you close your browser.
            Persistent cookies remain on your computer until they expire or you
            delete them.
          </p>

          <p className='text-white mb-4'>
            You can choose to have your computer warn you each time a cookie is
            being sent, or you can choose to turn off all cookies. You do this
            through your browser settings. Each browser is a little different,
            so look at your browser’s Help Menu to learn the correct way to
            modify your cookies.
          </p>

          <p className='text-white mb-6'>
            If you disable cookies, some features of the Site may not work
            properly.
          </p>

          <h2
            id='sharing-your-information'
            className='text-white text-lg font-bold mt-8 mb-4'
          >
            Sharing Your Information
          </h2>

          <p className='text-white mb-4'>
            We share your information with third-party companies who help us
            provide our services to you, such as:
          </p>
          <ul className='list-disc list-inside text-white mb-6'>
            <li>Shipping companies</li>
            <li>Payment processors</li>
            <li>Analytics companies</li>
          </ul>

          <p className='text-white mb-4'>
            We also share your information with third parties who help us market
            our products and services to you, such as:
          </p>
          <ul className='list-disc list-inside text-white mb-6'>
            <li>Advertising networks</li>
            <li>Social media platforms</li>
          </ul>

          <p className='text-white mb-4'>
            We may also share your information if we are required to do so by
            law or if you violate our Terms of Service.
          </p>

          <h2
            id='your-rights'
            className='text-white text-lg font-bold mt-8 mb-4'
          >
            Your Rights
          </h2>

          <p className='text-white mb-6'>
            You have the right to access the personal information we collect
            about you. You also have the right to correct, delete, or restrict
            the processing of your personal information. You also have the right
            to object to the processing of your personal information.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
