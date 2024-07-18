import React, { useEffect } from 'react';
import ProductCard from '../Admin/ProductCard';
import { useAllProductsQuery } from "../../redux/api/productApiSlice";


const Product = () => {
  const {data:products, refetch, error, isLoading } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products.</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
  <>
    <div className='w-full '>
    <h1 className='uppercase text-center text-2xl font-semibold text-gray-400 my-4 w-screen border-b-2 border-gray-100'>Products</h1>
    <div className='w-screen min-h-[81vh] flex flex-wrap gap-6 px-10 justify-center items-center'>
      {products.map((product) => (
        <div  className='' key={product._id}>
          <ProductCard p={product} />
        </div>
      ))}
    </div>
    </div>
  </>
  );
};

export default Product;