import React, { useEffect } from 'react';
import ProductCard from '../Admin/ProductCard';
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

const Product = () => {
  const {data:products, refetch, error, isLoading } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log({...products});

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
    <div className='w-screen min-h-[81vh]'>
      {products.map((product) => (
        <div className='inline-block mx-3' key={product._id}>
          <ProductCard p={product} />
        </div>
      ))}
    </div>
  );
};

export default Product;