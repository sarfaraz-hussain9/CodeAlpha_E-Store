import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/api/cart";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/product/${p._id}`} className="flex justify-center">
        <img
          className="cursor-pointer w-full h-48 object-cover"
          src={p.image}
          alt={p.name}
        />
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-lg font-medium dark:text-white">{p?.name}</h5>
          <p className="font-semibold text-pink-500">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {p?.description?.substring(0, 10)} ...
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
          </Link>

          <button
            className="p-2 rounded-full text-pink-600"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;