import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { FaX } from "react-icons/fa6";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useSelector } from "react-redux";
import profile from "../../assets/images/profile.avif";
import AdminMenu from "../Admin/AdminMenu"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const {cartItems} =useSelector((state)=>state.cart)
 
  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className=" w-screen  lg:px-6 py-2 px-1 bg-gray-200  shadow-md fixed top-0 left-0 "
      >
        <div className=" lg:flex lg:items-center w-full lg:justify-between text-xl font-semibold">
          <div className=" flex items-center ">
            <div className="text-2xl">
              <MdOutlineShoppingBag />
            </div>
            <h1>eStore</h1>
          </div>
          <div className="   ">
            <ul
              style={{ zIndex: 999 }}
              className={`flex flex-col lg:flex-row ${
                isOpen ? `block mt-12` : `left-[-10000px] absolute`
              } lg:relative  bg-gray-200 lg:top-auto lg:left-auto h-1/2 lg:h-auto lg:mt-0 w-full py-4 lg:py-0 gap-2 lg:gap-10 lg:pr-12 transition-all items-center shadow-2xl `}
            >
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className=""
              >
                <Link to="/">HOME</Link>
              </li>
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className=""
              >
                <Link to="/product">PRODUCT</Link>
              </li>
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={`${userInfo ? `hidden` : `block`}`}
              >
                <Link to="/signup">SIGNUP</Link>
              </li>
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={`${userInfo ? `hidden` : `block`}`}
              >
                <Link to="/signin">SIGNIN</Link>
              </li>
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={`${userInfo ? `block` : `hidden`} lg:hidden`}
              >
                <Link to="/cart">CART- {cartItems.reduce((a, c) => a + c.qty, 0) || 0}</Link>
              </li>
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={`${
                  userInfo ? `lg:block` : `lg:hidden`
                } hidden  relative`}
              >
                <Link to="/cart">
                  <p className="absolute text-xs bg-red-600 text-center rounded-full right-0 top-0 text-white w-4">
                  {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            ) ||0 }
                  </p>
                  <div className="text-3xl">
                    <FaShoppingCart />
                  </div>
                </Link>
              </li>

              {userInfo ? (
                <li className="cursor-pointer hidden lg:block">
                <Link to="/profile">
                  <img className="w-7 rounded-full" src={profile} />
                </Link>
              </li>
              ):<></>}

            </ul>
          </div>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="lg:hidden absolute right-4 text-3xl top-2 cursor-pointer"
          >
            {isOpen ? <FaX /> : <IoMenuSharp />}
          </div>

          {userInfo ? (
            <div className=" lg:hidden absolute top-2 right-12">
              <Link to="/profile">
                <img className="w-7 rounded-full" src={profile} />
              </Link>
          </div>
          ):<></>}

        </div>
      </div>
      
     
     {userInfo && userInfo.isAdmin ? (
      <div style={{ zIndex: 999 }} className=" w-40 h-40  text-white  fixed right-5 bottom-5 cursor-pointer hidden lg:block">
           <AdminMenu/>
      </div>
     ):(<></>)

     }


    </>
  );
};

export default Navigation;
