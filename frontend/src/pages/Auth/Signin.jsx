import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { useSigninMutation } from "../../redux/api/usersApiSlice";
import { signIn } from "../../redux/api/auth";

const Signin = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const [signin,{isLoading}]=useSigninMutation()
  const {userInfo}=useSelector(state=>state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }
  },[navigate,userInfo])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const submitHandler=async(e)=>{
    e.preventDefault()
    try {
      const res=await signin({email,password}).unwrap()
      dispatch(signIn({...res}))
      toast.success("Sign In successfully....")
      navigate("/")
    } catch (error) {
      toast.error("something went wrong")
    }
  }

  return (
    <>
      <div className="w-screen h-screen px-3 transition-all flex justify-center">
        <div className="relative bg-blue-800 w-full h-[80vh] lg:w-[50vw] rounded-lg flex flex-col items-center py-5 shadow-xl">
          <h1 className="text-2xl font-semibold text-white uppercase">Sign In</h1>
          <div className=" w-[90%] mt-10">
            <form className="flex flex-col gap-4 relative " onSubmit={submitHandler}>
              <input
                className=" focus:outline-none  text-xl px-2 py-1 rounded-lg"
                type="text"
                placeholder="Email address"
                id="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />

              {/* password */}
              <div className=" w-full relative">
                <input
                  className=" text-xl px-2 py-1 w-full focus:outline-none rounded-lg"
                  type={`${isOpen ? `text` : `password`}`}
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
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
                className="w-4 h-4 "
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
             <span className="pl-2 text-white">Remember me</span></label>

             <button disabled={isLoading}  type="submit"  className=" bg-gray-200 mt-10 text-2xl font-semibold py-2 rounded-xl uppercase" >Sign In</button>
            </form>

            <div className="w-full h-40 bg-white rounded-full absolute bottom-[-100px] left-0 flex justify-center">
              <div className="text-2xl font-semibold my-3 uppercase">
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
