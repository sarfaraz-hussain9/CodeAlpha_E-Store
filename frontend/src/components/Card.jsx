import shoe from "../assets/images/shoe.png"
import { FaShoppingCart } from "react-icons/fa";

const Card = () => {
  return (
    <>
       
       <div className='w-[300px] h-[500px] ml-4 container bg-white rounded shadow-md p-[10px]'>
            <div className="image w-full h-[70%] bg-black">
            {/* image */}
                <img className="w-full h-full overflow-hidden" src={shoe} alt="" />
            </div>
            <div className="details w-full h-[30%]  flex flex-col justify-between">
                <div >
                    <h1 className="text-xl font-semibold">Name</h1>
                </div>

                <div className="py-2">
                <p className="text-xs text-gray-500">Shipped in 3-4 days</p>
                <h1 className="font-semibold ">₹ Price</h1>
                    <div className="w-full flex justify-center">
                    <button className="flex items-center gap-2 text-xl bg-blue-600 w-full rounded justify-center text-white py-1 border-none"><FaShoppingCart/> Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
      
    </>
  )
}

export default Card