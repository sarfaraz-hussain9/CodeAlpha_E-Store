import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className=" overflow-hidden z-10">
        <nav className="w-screen h-14 bg-black text-white flex items-center justify-between px-5">
          <div className="  text-3xl flex items-center gap-1 text-green-500">
            <FaShop />
            <h1 className="">
              <span className="text-white">e</span>Store
            </h1>
          </div>
          <div className="flex items-center  gap-3">
            {/* webnav */}
            <div className="hidden lg:block">
              <ul className="flex text-xl gap-6">
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/product">PRODUCT</Link>
                </li>
                <button className="bg-blue-500 rounded-lg px-5">
                  <Link to="/product">SIGNIN</Link>
                </button>
                <button className="bg-blue-500 rounded-lg px-5">
                  <Link to="/product">SIGNUP</Link>
                </button>
              </ul>
            </div>
            {/* mobnav */}
            <div
              className={`z-[-1] absolute ${
                isOpen ? `top-14` : `top-[-700px]`
              } left-0 w-[100vw] h-[88vh] bg-black flex justify-center items-center lg:hidden transition-all ease-in-out`}
            >
              <ul className="flex text-xl flex-col gap-3 text-center">
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/product">PRODUCT</Link>
                </li>
                <button className="bg-blue-500 rounded-lg px-5">
                  <Link to="/product">SIGNIN</Link>
                </button>
                <button className="bg-blue-500 rounded-lg px-5">
                  <Link to="/product">SIGNUP</Link>
                </button>
              </ul>
            </div>

            <div className="text-3xl flex items-center gap-3">
              <ul>
                {/* cart */}
                <li className="relative">
                  <Link className="text-3xl" to="/cart">
                    <FaShoppingCart />
                  </Link>
                  <h3 className=" bg-red-600 w-5 h-5 rounded-full font-bold absolute top-[-3px] right-[-8px] text-center text-xs">
                    0
                  </h3>
                </li>
              </ul>

              <div onClick={togle} className="cursor-pointer lg:hidden">
                {isOpen ? <FaX /> : <FaBars />}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
