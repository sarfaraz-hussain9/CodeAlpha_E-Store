import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

import {useUpdateProfileMutation} from "../../redux/api/usersApiSlice"
import {signIn} from "../../redux/api/auth"

const UpdateProfile = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile]=useUpdateProfileMutation()

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

  const submitHandler = async (e) => {
    e.preventDefault();
       if(password!==confirmPassword){
        toast.error("password not match")
       }else{
        try {
            const res=await updateProfile({
                username,
                email,
                password,
            }).unwrap();
            dispatch(signIn({...res}));
            toast.success("profile updated successfully");
            navigate("/profile")
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
       }
  };

  useEffect(()=>{
    // eslint-disable-next-line
   setUsername(userInfo.username);
   setEmail(userInfo.email)
  },[userInfo.setUsername,userInfo.setEmail]);

  return (
    <>
      {userInfo ? (
        <>
          <div className="w-screen h-screen px-3  flex justify-center transition-all">
            <div className="relative bg-blue-800 w-full h-[80vh] lg:w-[50vw] rounded-lg flex flex-col items-center py-5 shadow-xl px-5">
              <h1 className="text-2xl text-white font-semibold pb-4 uppercase">
                Update Profile
              </h1>

              <div className="w-full h-full bg-gray-200 rounded-xl p-8 flex flex-col justify-between">
                <form
                  onSubmit={submitHandler}
                  className="flex flex-col gap-3"
                  action=""
                >
                  <div className=" flex flex-col">
                    <label className="text-xl uppercase text-gray-500">
                      username
                    </label>
                    <input
                      className="text-xl focus:outline-none px-3 py-1 rounded-lg"
                      type="text"
                      id="username"

                      onChange={e=>setUsername(e.target.value)}
                    />
                  </div>

                  <div className=" flex flex-col">
                    <label className="text-xl uppercase text-gray-500">
                      email
                    </label>
                    <input
                      className="text-xl focus:outline-none px-3 py-1 rounded-lg"
                      type="email"
                      id="email"
                      onChange={e=>setEmail(e.target.value)}
                    />
                  </div>

                  <div className=" flex flex-col">
                    <label className="text-xl uppercase text-gray-500">
                      password
                    </label>
                    <input
                      className="text-xl focus:outline-none px-3 py-1 rounded-lg"
                      type="password"
                      id="password"
                      onChange={e=>setPassword(e.target.value)}
                    />
                  </div>

                  <div className=" flex flex-col">
                    <label className="text-xl uppercase text-gray-500">
                      confirm Password
                    </label>
                    <input
                      className="text-xl focus:outline-none px-3 py-1 rounded-lg"
                      type="password"
                      id="confirmPassword"               
                      onChange={e=>setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full uppercase bg-green-500 text-xl py-1 text-white rounded mt-8"
                  >
                    update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateProfile;
