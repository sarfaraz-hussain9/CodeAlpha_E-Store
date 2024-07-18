import {useParams} from "react-router-dom"
import {useGetProductByIdQuery} from "../../redux/api/productApiSlice"

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/api/cart";

import { toast } from "react-toastify";


const ProductDetails = () => {
  const params=useParams()
  const {data:product,refetch,isLoading,error}=useGetProductByIdQuery(params.id)


  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };


  useEffect(()=>{
    refetch()
  },[refetch])

  if(isLoading){
    return <div>Loading....</div>
  }
  if(error){
    return <div>{error.message}</div>
  }
  return (
   <>
    <div className='w-screen lg:min-h-[81vh] min-h-[83vh] px-3'>
      <div className="flex items-center lg:gap-9 gap-3 justify-center lg:flex-row flex-col">
        <div className='image overflow-hidden rounded-2xl shadow-lg'>
          <img  className="object-cover lg:h-[400px] " src={product.image} />
        </div>
        <div className='details '></div>
        <ul className="text-pink-500">
          <li className="text-xl text-gray-500">Name</li>
          <li>{product.name}</li>

          <li className="text-xl text-gray-500">Price</li>
          <li>₹ {product.price}</li>

          <li className="text-xl text-gray-500">Quantity</li>
          <li>{product.quantity}</li>

          <li className="text-xl text-gray-500">Description</li>
          <li>{product.description}</li>

          <button
            className="p-2 text-pink-500 bg-black px-10 flex items-center justify-center rounded mt-3"
            onClick={() => addToCartHandler(product, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </ul>
      </div>
    </div>
   </>
  )
}

export default ProductDetails