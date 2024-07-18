
import { Link } from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { useState } from 'react';

const AdminMenu = () => {
    const [isOpen,setIsOpen]=useState(false)
  return (
    <div className=' flex flex-col justify-center items-center'>
        <div className='w-36 relative h-20 flex py-2 px-1'>
            <ul className={`bg-black text-white w-32 absolute top-0 flex
            flex-col items-center px-1 ${isOpen ? `right-0` : `right-[-500px]`} transition-all`}>
                <li className=''>
                    <Link onClick={()=>setIsOpen(!isOpen)} to="/admin/userlists">Users</Link>
                </li>
                <li>
                    <Link onClick={()=>setIsOpen(!isOpen)} to="/admin/createProduct">AddProduct</Link>
                </li>
                <li>
                    <Link onClick={()=>setIsOpen(!isOpen)} to="/admin/productlists">AllProduct</Link>
                </li>
            </ul>
        </div>
        <div onClick={()=>setIsOpen(!isOpen)} className='w-10 h-10 bg-black text-white rounded-full cursor-pointer'>
            <RiAdminFill className='w-full h-full'/>
        </div>
    </div>
  )
}

export default AdminMenu