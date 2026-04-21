import React, { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CreateAProduct = () => {
  const [condition, setCondition] = useState("");
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);

  const axiosSecure = useAxiosSecure();

  const handleCreateAProduct = (e) => {
    e.preventDefault();

    const form = e.target;

    // ✅  Safe form access
    const title = form.title?.value;
    const minPrice = parseFloat(form.minPrice?.value);
    const maxPrice = form.maxPrice?.value
      ? parseFloat(form.maxPrice.value)
      : minPrice;

    const productImg = form.productImg?.value;
    const sellerName = form.sellerName?.value;
    const sellerEmail = form.sellerEmail?.value;
    const sellerContact = form.sellerContact?.value;
    const sellerImg = form.sellerImg?.value;
    const location = form.location?.value;
    const description = form.description?.value;
    const category = form.category?.value;
    const selectedCondition = form.condition?.value;

    // ✅  Usage logic
    let usageText = "";

    if (selectedCondition === "Brand New") {
      usageText = "Brand New";
    } else {
      const y = parseInt(years) || 0;
      const m = parseInt(months) || 0;

      usageText = `${y > 0 ? `${y} ${y === 1 ? "year" : "years"}` : ""} ${
        m > 0 ? `${m} ${m === 1 ? "month" : "months"}` : ""
      }`.trim();
    }

    // ✅  Final object
    const newProduct = {
      title,
      price_min: minPrice,
      price_max: maxPrice,
      usage: usageText,
      image: productImg,
      seller_name: sellerName,
      seller_image: sellerImg,
      seller_contact: sellerContact,
      email: sellerEmail,
      location,
      description,
      created_at: new Date().toISOString(),
      category,
      condition: selectedCondition,
      status: "pending",
    };

    // ✅ API CALL
    // axios
    //   .post("http://localhost:3000/products", newProduct)
    //   .then((res) => {
    //     if (res.data.insertedId) {
    //       toast.success("Product created successfully 🎉");

    //       form.reset();
    //       setCondition("");
    //       setYears(0);
    //       setMonths(0);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error("Failed to create product");
    //   });

    axiosSecure
      .post("/products", newProduct)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Product created successfully 🎉");

          form.reset();
          setCondition("");
          setYears(0);
          setMonths(0);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to create product");
      });
  };

  return (
    <div className="project-bg py-20">
      <Link className="flex items-center gap-2 justify-center">
        <RiArrowGoBackFill /> Back to products
      </Link>

      <h2 className="text-4xl font-bold text-center mb-6">
        Create <span className="text-gradient">A Product</span>
      </h2>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleCreateAProduct} className="space-y-5">
          {/* Title + Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Title"
              className="input input-bordered w-full"
            />

            <select name="category" className="select select-bordered w-full">
              <option value="">Select Category</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Vehicles</option>
            </select>
          </div>

          {/* Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="minPrice"
              type="number"
              placeholder="Min Price"
              className="input input-bordered"
            />
            <input
              name="maxPrice"
              type="number"
              placeholder="Max Price"
              className="input input-bordered"
            />
          </div>

          {/* Condition */}
          <div>
            <p className="mb-2">Condition</p>
            <label className="mr-4">
              <input
                type="radio"
                name="condition"
                value="Brand New"
                onChange={(e) => setCondition(e.target.value)}
              />{" "}
              Brand New
            </label>

            <label>
              <input
                type="radio"
                name="condition"
                value="Used"
                onChange={(e) => setCondition(e.target.value)}
              />{" "}
              Used
            </label>
          </div>

          {/* Usage */}
          <div className="">
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                disabled={condition === "Brand New"}
                className="input input-bordered w-full"
              />

              <input
                type="number"
                placeholder="Months"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                disabled={condition === "Brand New"}
                className="input input-bordered w-full"
              />
            </div>

            <p className="text-sm mt-2 px-3 py-1 inline-block bg-gray-100 rounded-md text-gray-600">
              Usage:{" "}
              {condition === "Brand New"
                ? "Brand New"
                : `${years > 0 ? `${years} ${years == 1 ? "year" : "years"}` : ""} ${
                    months > 0
                      ? `${months} ${months == 1 ? "month" : "months"}`
                      : ""
                  }`.trim() || "Not specified"}
            </p>
          </div>

          {/* Image */}
          <input
            name="productImg"
            placeholder="Product Image URL"
            className="input input-bordered w-full"
          />

          {/* Seller */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="sellerName"
              placeholder="Seller Name"
              className="input input-bordered"
            />
            <input
              name="sellerEmail"
              placeholder="Seller Email"
              className="input input-bordered"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="sellerContact"
              placeholder="Contact"
              className="input input-bordered"
            />
            <input
              name="sellerImg"
              placeholder="Seller Image"
              className="input input-bordered"
            />
          </div>

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
          />

          {/* Description */}
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
          ></textarea>

          {/* Submit */}
          <button className="w-full py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded cursor-pointer">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAProduct;
