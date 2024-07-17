import bnrM from "../../assets/images/bnrM.jpg"
import bnr from "../../assets/images/bnr.jpg"

import { useGetNewProductsQuery } from "../../redux/api/productApiSlice"
import ProductCard from "../Admin/ProductCard"
import { useEffect } from "react"



const Home = () => {
  const {data:newProduct,refetch,error,isLoading}=useGetNewProductsQuery()
  const {data:topProduct}=useGetNewProductsQuery()

 

  useEffect(()=>{
    refetch()
  },[refetch])

  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>{error.message}</div>
  }
  return (
    <>
      <div className=" w-screen px-2 lg:px-10">

        <div className="flex flex-col items-center">
        <div className="banner w-full lg:hidden px-6">
          <img src={bnrM} alt="" />
        </div>
        <div className="banner w-full hidden lg:block px-10 ">
          <img className="rounded-2xl shadow-lg" src={bnr} alt="" />
        </div>

        <div className="product flex flex-col items-center py-10 gap-3 font-semibold text-gray-600">
          <h1 className="text-2xl uppercase">Top Products</h1>
         {topProduct ? 
         topProduct.map((product)=>(
          <div key={product._id}>
            <ProductCard p={product}/>
          </div>
         ))
         :(
          <div>no product...</div>
         )}
        </div>
        
        <div className="product flex flex-col items-center py-10 gap-3 font-semibold text-gray-600">
          <h1 className="text-2xl uppercase">New Products</h1>
         {newProduct ? 
         newProduct.map((product)=>(
          <div key={product._id}>
            <ProductCard p={product}/>
          </div>
         ))
         :(
          <div>no product...</div>
         )}
        </div>
        </div>
      </div>
    </>
  )
}

export default Home