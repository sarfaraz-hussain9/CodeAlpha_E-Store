import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
    useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";


const ProductUpdate = () => {
    const params = useParams();
    const { data:productData} = useGetProductByIdQuery(params.id);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(
      productData?.description || ""
    );
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [stock, setStock] = useState(productData?.stock || 0);

  
    // hook
    const navigate = useNavigate();
  
  
    const [uploadProductImage] = useUploadProductImageMutation();
  
    // Define the update product mutation
    const [updateProduct] = useUpdateProductMutation();
  
    const [deleteProduct]=useDeleteProductMutation()

    useEffect(() => {
      if (productData && productData._id) {
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setCategory(productData.category);
        setQuantity(productData.quantity);
        setImage(productData.image);
        setStock(productData.stock);
      }
    }, [productData]);
  
    const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success("Item added successfully", {
        });
        setImage(res.image);
      } catch (err) {
        toast.success("Item added successfully", {
        });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("stock", stock);
  
        // Update product using the RTK Query mutation
        const data = await updateProduct({ productId: params.id, formData });

        console.log(data)
  
        if (data?.error) {
          toast.error(data.error, {
          });
        } else {
          toast.success(`Product successfully updated`, {
          });
          navigate("/admin/productlists");
        }
      } catch (err) {
        console.log(err);
        toast.error("Product update failed. Try again.", {
        });
      }
    };

    const deleteHandle = async () => {
      try {
        let answer = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (!answer) return;
  
        const { data } = await deleteProduct(params.id);
        toast.success(`"${data.name}" is deleted`, {
        });
        navigate("/admin/productlists");
      } catch (err) {
        console.log(err);
        toast.error("Delete failed. Try again.", {
        });
      }
    };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two  ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
             
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Category</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-500"
            >
              Update
            </button>

            <button
              onClick={deleteHandle}
              className=" mx-4 py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;