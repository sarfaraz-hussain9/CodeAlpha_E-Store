import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"

import profile from "../../assets/images/profile.avif"

import { signOut } from "../../redux/api/auth";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { clearCartItems } from "../../redux/api/cart";


const Profile = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const {userInfo}=useSelector(state=>state.auth)
  const [logout,{isLoading}]=useLogoutMutation();

  const logoutHandle=async(e)=>{
    try {
      await logout().unwrap()
      dispatch(signOut())
      dispatch(clearCartItems())
      toast.success("user logOut successfully")
      navigate("/signin")
    } catch (error) {
      toast.error("somthing went wrong")
    }
  }
  return (
      <>
        {userInfo ? (
          <>
      <div className="w-screen h-screen px-3  flex justify-center transition-all">
        <div className="relative bg-blue-800 w-full h-[80vh] lg:w-[50vw] rounded-lg flex flex-col items-center py-5 shadow-xl px-5">
            <h1 className="text-2xl text-white font-semibold pb-4 uppercase">Profile</h1>

            <div className="w-full h-full bg-gray-200 rounded-xl p-8 flex flex-col justify-between">
             <div className="details flex flex-col items-center">
                <img className="w-20 rounded-full" src={profile} alt="" />
                <div className="text-center py-5 flex flex-col gap-3">
                 <div>
                 <h1 className="uppercase text-2xl">{userInfo.username}</h1>
                 
                 </div>
                 <div>
                 <h1 className="text-xl text-blue-400">{userInfo.email}</h1>
                 </div>
                 <div>
                 <h1 className="text-xl text-green-600">{`${userInfo.isAdmin ? "ADMIN":""}`}</h1>
                 </div>
                </div>
             </div>

              <div className=" flex items-center flex-col text-center gap-3">
             <Link className="bg-green-500 w-32 text-xl py-1 text-white rounded uppercase" to="/updateprofile">Update</Link>
             <button onClick={logoutHandle} className="uppercase bg-red-500 w-32 text-xl py-1 text-white rounded">Logout</button>
              </div>

            </div>
        </div>
      </div>
    </>
      
        ):<></>}
      </>
  );
};

export default Profile;
