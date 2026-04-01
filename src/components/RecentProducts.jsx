import React, { use } from "react";
import ProductCard from "./ProductCard";

const RecentProducts = ({ recentProductsPromise }) => {
  const recentProducts = use(recentProductsPromise);

  console.log(recentProducts);

  return (
    <div className="project-bg py-14 md:px-14 px-3">
      <h2 className="md:text-4xl text-3xl font-bold text-center mb-7">
        Recent <span className="text-primary">Products</span>
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {recentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-11">
        <button className="btn bg-gradient px-7 ">Show All</button>
      </div>
    </div>
  );
};

export default RecentProducts;
