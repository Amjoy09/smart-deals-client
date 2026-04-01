import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-sm">
        <figure className="p-4">
          <img
            src={product?.image}
            alt="Products"
            className="rounded-xl h-70 w-full"
          />
        </figure>
        <div className=" items-center px-4 pb-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gradient font-semibold mt-1 mb-5">
            $ {product.price_min}-{product.price_max}
          </p>
          <div className="card-actions">
            <Link
              to={`/product-details/${product._id}`}
              className="btn border w-full border-secondary text-gradient"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
