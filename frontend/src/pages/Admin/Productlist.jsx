import { Link} from "react-router-dom"
import { useAllProductsQuery} from "../../redux/api/productApiSlice"
import { useEffect } from "react"
import { FaRegEdit } from "react-icons/fa";





const Productlist = () => {


  const {data:products,refetch,isLoading,error}= useAllProductsQuery()
 

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
    <div className="w-screen">
      <h1 className="uppercase text-2xl font-semibold text-gray-500 text-center w-full border-b-2 border-gray-100">products-{products.length}</h1>
    <div className="w-screen min-h-[81vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 mt-4">
      {products.map((product)=>(
        <div className="w-full flex flex-row lg:gap-20 gap-6 items-center">
        <div className="w-32 h-32 overflow-hidden">
        <img src={product.image} className="w-32"/>
      </div>
      
      <div className="flex gap-2 items-center">
      <div>{product.name}</div>
        <Link to={`/admin/update/${product._id}`}><FaRegEdit/></Link>
      </div>
        </div>
      ))}
      </div>
    </div>
    </div>
    </>
  )
}

export default Productlist