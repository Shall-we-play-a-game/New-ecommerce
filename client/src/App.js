import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PageNotFound from "./pages/PageNotFound";
import Licensing from "./pages/Licensing";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Layouts/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Admin from "./components/Layouts/Routes/AdminRoute";
import AdminDashborad from "./pages/Admin/AdminDashborad";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import ViewUsers from "./pages/Admin/ViewUsers";
import UserProfile from "./pages/user/UserProfile";
import Orders from "./pages/user/Orders";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/Admin/AdminOrders";
// import Layout from "./components/Layouts/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<Private />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<UserProfile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<Admin />}>
          <Route path='admin' element={<AdminDashborad />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/view-users' element={<ViewUsers />} />
          <Route path='admin/products' element={<Product />} />
          <Route path='admin/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/license' element={<Licensing />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
