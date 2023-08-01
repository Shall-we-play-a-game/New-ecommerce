import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layouts/Layout";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      // eslint-disable-next-line array-callback-return
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const totalPriceWithDeiveryCharges = () => {
    try {
      let deliveryCharge = 50;
      // eslint-disable-next-line array-callback-return
      cart?.map((item) => {
        deliveryCharge = deliveryCharge + item.price;
      });
      return deliveryCharge.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className='flex flex-col md:flex-row w-screen h-full px-14 py-7'>
        <div className='w-full flex flex-col h-fit gap-4 p-4'>
          <h1 className='text-gray-900 text-xl font-bold'>
            {!auth?.user
              ? "Hello Guest"
              : `Welcome Back ${auth?.token && auth?.user?.name}`}
            <p className='text-gray-700 text-xl font-semibold'>
              {cart?.length
                ? `You Have ${cart?.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout !"
                  }`
                : " Your Cart Is Empty"}
            </p>
          </h1>
          <p className='text-blue-900 text-xl font-extrabold'>My cart</p>
          <div className='flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm'>
            {cart.map((product) => (
              <>
                <div
                  key={product?._id}
                  className='flex my-4 flex-col md:flex-row gap-3 justify-between'
                >
                  <div className='flex flex-row gap-6 items-center'>
                    <div className='w-28 h-28'>
                      <img
                        className='w-full h-full'
                        alt=''
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-lg text-gray-800 font-semibold'>
                        {product.name}
                      </p>
                      <p className='text-xs text-gray-600 font-semibold'>
                        Description: {product.description.substring(0, 20)}
                      </p>
                    </div>
                  </div>
                  <div className='self-center text-center'>
                    <p className='text-gray-600 font-normal text-sm line-through'>
                      ₹{product.price}
                    </p>
                    <p className='text-gray-800 font-normal text-xl'>
                      Final Price: ₹{product.price}
                    </p>
                  </div>
                  <div className='self-center'>
                    <AiFillDelete
                      className=' cursor-pointer'
                      onClick={() => removeCartItem(product._id)}
                      size={25}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className='flex flex-col w-full md:w-2/3 h-fit gap-4 p-4'>
          <p className='text-blue-900 text-xl font-extrabold'>Cart Summary</p>
          <p className='text-blue-700 text-xl font-semibold'>
            Total | Checkout | Payment
          </p>
          <div className='flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm'>
            <div className='flex flex-row justify-between'>
              <p className='text-gray-600'>SubTotal </p>
              <p className='text-end font-bold'>{totalPrice()}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p className='text-gray-600'>GST + Delivery</p>
              <div>
                <p className='text-end font-bold'>₹50</p>
                <p className='text-gray-600 text-sm font-normal'>
                  Arrives in minimum 5 days
                </p>
              </div>
            </div>
            <hr className='bg-gray-200 h-0.5' />
            <div className='flex flex-row justify-between'>
              <p className='text-gray-600'>Total</p>
              <div>
                <p className='text-end font-bold'>
                  {totalPriceWithDeiveryCharges()}
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm'>
            <p className='text-blue-900 text-xl font-extrabold'>User Details</p>
            {auth?.user?.address ? (
              <>
                <div className='flex flex-row justify-between'>
                  <p className='text-gray-600'>Current Addess</p>
                  <div>
                    <p className='text-end font-bold'>{auth?.user?.address}</p>
                    <button
                      onClick={() => navigate("/dashboard/user/profile")}
                      className='text-white bg-gray-600 p-0.5 rounded text-sm font-normal'
                    >
                      Update Address
                    </button>
                  </div>
                </div>
                <div className='flex flex-row justify-between'>
                  <p className='text-gray-600'>Shipping Addess</p>
                  <div>
                    <p className='text-end font-bold'>{auth?.user?.address}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                {auth?.token ? (
                  <button
                    className='text-white bg-gray-600 p-0.5 rounded text-sm font-normal'
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className='text-white bg-gray-600 p-0.5 rounded text-sm font-normal'
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    You Must Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='mt-2'>
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                    currency: "INR",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
            )}
            <div className='flex gap-2'>
              <button
                onClick={handlePayment}
                className='transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md'
                disabled={loading || !instance || !auth?.user?.address}
              >
                FINISH
              </button>
              <button
                onClick={() => navigate("/")}
                className='transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md'
              >
                ADD MORE PRODUCTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
