import { Link } from "react-router-dom"
import { IoMenuSharp } from "react-icons/io5";
import { FaX } from "react-icons/fa6";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";


const Navigation = () => {
    const [isOpen,setIsOpen]=useState(false);
  return (
    <>
       <nav className=" w-screen  lg:px-6 py-2 px-1 bg-gray-200">
       <div className=" lg:flex  lg:items-center lg:justify-between text-xl font-semibold">

       <div className=" flex items-center ">
            <div className="text-2xl"><MdOutlineShoppingBag/></div>
            <h1>eStore</h1>
       </div>
       <div className="  ">
        <ul className={`flex flex-col lg:flex-row absolute top-12 ${isOpen ? `left-0` : `left-[-900px]`} lg:relative pl-6 lg:pl-0 bg-gray-200 w-full lg:top-auto lg:left-auto h-1/2 lg:h-auto py-4 lg:py-0 gap-2 lg:gap-10 lg:pr-12 transition-all `}>
            <li onClick={()=>{setIsOpen(!isOpen)}} className="">
                <Link to="/">HOME</Link>
            </li>
            <li onClick={()=>{setIsOpen(!isOpen)}} className="">
                <Link to="/product">PRODUCT</Link>
            </li>
            <li onClick={()=>{setIsOpen(!isOpen)}} className="">
                <Link to="/signup">SIGNUP</Link>
            </li>
            <li onClick={()=>{setIsOpen(!isOpen)}} className="">
                <Link to="/signin">SIGNIN</Link>
            </li>
        </ul>
       </div>
      <div onClick={()=>{setIsOpen(!isOpen)}} className="lg:hidden absolute right-8 text-3xl top-2">
       {isOpen ? <FaX/> :<IoMenuSharp/>}
      </div>
       </div>

       </nav>
    </>
  )
}

export default Navigation