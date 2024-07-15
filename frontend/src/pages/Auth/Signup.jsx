import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {toast} from "react-toastify"

import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


import { signIn } from "../../redux/api/auth.js";
import {useSignupMutation} from "../../redux/api/usersApiSlice.js"

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [username,SetUsername]=useState("")
  const [email,SetEmail]=useState("")
  const [password,SetPassword]=useState("")

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [signup,{isLoading}]=useSignupMutation()

    const {userInfo}=useSelector(state=>state.auth);
    useEffect(()=>{
        if(userInfo){
            navigate("/")
        }
    },[navigate,userInfo])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const res=await signup({username,email,password}).unwrap();
        dispatch(signIn({...res}));
        toast.success("User Signup successfully")
        navigate("/")
    } catch (error) {
        toast.error("something went wrong")
    }
  }

  return (
    <>
      <div className="w-screen h-screen px-3  flex justify-center transition-all">
        <div className="relative bg-blue-800 w-full h-[80vh] lg:w-[50vw] rounded-lg flex flex-col items-center py-5 shadow-xl">
          <h1 className="text-2xl font-semibold text-white uppercase">Sign Up</h1>
          <div className=" w-[90%] mt-10">
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
              <input
                className="focus:outline-none text-xl px-2 py-1 rounded-lg"
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={e=>SetUsername(e.target.value)}
              />
              <input
                className=" focus:outline-none  text-xl px-2 py-1 rounded-lg"
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={e=>SetEmail(e.target.value)}
              />

              {/* password */}
              <div className=" w-full relative">
                <input
                    id="password"
                  className=" text-xl px-2 py-1 w-full focus:outline-none rounded-lg "
                  type={`${isOpen ? `text` : `password`}`}
                  placeholder="Password"
                  value={password}
                  onChange={e=>SetPassword(e.target.value)}
                />
                <div
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="absolute  text-2xl right-2 top-2 cursor-pointer transition-all"
                >
                  {isOpen ? <FaEye /> : <FaRegEyeSlash />}
                </div>
              </div>

              <label className="flex items-center" htmlFor="">
                <input
                id="check"
                  className="w-4 h-4 "
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="pl-2 text-white">I accept all terms & conditions</span>
              </label>

              <button disabled={!isChecked} type="submit"  className={`bg-gray-200 uppercase mt-10 text-2xl font-semibold py-2 rounded-xl ${isChecked ? `text-gray-900` : `text-gray-400`}`} >Sign Up</button>
            </form>

            <div className="w-full h-40 bg-white rounded-full absolute bottom-[-100px] left-0 flex justify-center">
              <div className="text-2xl font-semibold my-3 uppercase">
                <Link to="/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
