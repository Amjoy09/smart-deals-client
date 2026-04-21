import React, { use, useEffect, useRef, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetails = () => {
  const { customer } = use(AuthContext);
  const [bids, setBids] = useState([]);

  const products = useLoaderData();

  const {
    image,
    condition,
    usage,
    description,
    title,
    category,
    price_min,
    price_max,
    _id: productId,
    created_at,
    seller_name,
    email,
    location,
    seller_contact,
  } = products;

  console.log(customer);

  const modalRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/bids/${productId}`)
      .then((data) => {
        console.log("After axios get", data.data);
        setBids(data.data);
      });
  }, [productId]);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/bids/${productId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Bids for this Product", data);
  //       setBids(data);
  //     });
  // }, [productId]);

  const handleModalOpen = () => {
    modalRef.current.showModal();
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();

    const form = e.target;

    const bidData = {
      name: form.name.value,
      buyerEmail: form.email.value,
      price: parseFloat(form.price.value),
      buyerImg: form.image.value,
      buyerContact: form.contact.value,
    };

    console.log(bidData);
    const { name, buyerEmail, price, buyerImg, buyerContact } = bidData;

    const newBid = {
      product: productId,
      buyer_image: buyerImg,
      buyer_name: name,
      buyer_contact: buyerContact,
      buyer_email: buyerEmail,
      bid_price: price,
      status: "Pending",
    };

    // console.log(newBid);

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Placing Bid", data);
        if (data.insertedId) {
          toast.success("Bid Submitted Successfully🎉");
          modalRef.current.close();
          form.reset();
        }
        newBid._id = data.insertedId;
        const newBids = [...bids, newBid];
        newBids.sort((a, b) => b.bid_price - a.bid_price);
        setBids(newBids);
      })

      .catch((err) => {
        console.log(err);
        toast.error("Failed to Submit Bid");
      });
  };

  return (
    <div className="project-bg">
      {/* Product Details----------->>> */}
      <div className="w-11/12 mx-auto gap-7 grid md:grid-cols-12 grid-cols-1 md:py-18 py-10">
        {" "}
        <div className="md:col-span-5 col-span-1 py-0 space-y-6">
          <figure>
            <img className="w-full rounded-lg" src={image} alt="" />
          </figure>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Product Description</h3>
            <div className="flex flex-col md:flex-row md:gap-20 gap-10 mt-8">
              <div className="font-medium">
                <span className="text-primary">Condition</span>: {condition}
              </div>
              <div className="font-medium">
                <span className="text-primary">Usage Time</span>: {usage}
              </div>
            </div>
            <div className="h-px bg-gray-400 w-full mt-2 mb-5"></div>
            <div className="text-justify text-[#969A9D]">
              {description} Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Labore exercitationem placeat adipisci. Aut inventore velit,
              doloribus sint quod provident! Ad itaque explicabo nemo iusto
              quibusdam ullam inventore consectetur error placeat, sed,
              veritatis ex doloribus, quae beatae! Consequatur maxime voluptatem
              nesciunt.
            </div>
          </div>
        </div>
        <div className="md:col-span-7 col-span-1 font-semibold flex items-center">
          <div className="w-full">
            <Link className="flex items-center gap-2">
              <RiArrowGoBackFill /> Back to products
            </Link>
            <h2 className="text-5xl font-bold mt-5">{title}</h2>
            <button className="text-primary font-normal bg-purple-200 py-1.5 text-center px-4 rounded-3xl my-5">
              {category}
            </button>
            <div className="bg-white p-4 space-y-1 rounded-lg">
              <div className="text-2xl font-bold text-[#4CAF50]">
                ${price_min}-{price_max}
              </div>
              <p className="font-normal">Price Starts From</p>
            </div>
            <div className="bg-white p-4 space-y-1 my-5 rounded-lg">
              <h3 className="text-2xl">Product Details</h3>
              <div>
                ProductId:{" "}
                <span className="font-normal text-gray-600">{productId}</span>
              </div>
              <div>
                Posted:{" "}
                <span className="font-normal text-gray-600">{created_at}</span>
              </div>
            </div>
            <div className="bg-white p-4 space-y-1 rounded-lg">
              <h2 className="text-2xl mb-4">Seller Information</h2>
              <div className="flex items-center gap-2">
                <img
                  className="md:w-14 md:h-14 w-12 h-12 rounded-full border-2 p-0.5"
                  src={
                    //   productDetails?.seller_image ||
                    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                  }
                  alt="Seller"
                />
                <div className="">
                  <p>{seller_name}</p>
                  <p className="font-normal">Crafts By: {email}</p>
                </div>
              </div>
              <div className="">
                <p>
                  Location: <span className="font-normal">{location}</span>
                </p>
              </div>
              <div className="">
                <p>
                  Contact: <span className="font-normal">{seller_contact}</span>
                </p>
              </div>
              <div className="">
                <p>
                  Status:{" "}
                  <span className="font-normal ">
                    <button className="bg-warning px-3 py-0.5 rounded-2xl">
                      On Sale
                    </button>
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-5">
              <button
                className="bg-gradient w-full rounded-sm font-normal py-2 cursor-pointer hover:scale-101"
                onClick={handleModalOpen}
              >
                I Want to Buy This Product
              </button>

              {/* Modal */}

              <dialog
                ref={modalRef}
                onClick={(e) => {
                  if (e.target === modalRef.current) {
                    modalRef.current.close();
                  }
                }}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <div className="modal-action">
                    <div className="max-w-2xl mx-auto  p-6 rounded-lg">
                      {/* Title */}
                      <h2 className="text-2xl font-bold text-center mb-6 py-2">
                        Give Seller Your Offered Price
                      </h2>

                      <form onSubmit={handleSubmitBid} className="space-y-4">
                        {/* Name + Email */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm">Buyer Name</label>
                            <input
                              name="name"
                              type="text"
                              className="input input-bordered w-full mt-1"
                              defaultValue={customer?.displayName}
                              readOnly
                            />
                          </div>

                          <div>
                            <label className="text-sm">Buyer Email</label>
                            <input
                              name="email"
                              type="email"
                              placeholder="Your Email"
                              className="input input-bordered w-full mt-1"
                              defaultValue={customer?.email}
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Image URL */}
                        <div>
                          <label className="text-sm">Buyer Image URL</label>
                          <input
                            name="image"
                            type="text"
                            defaultValue={customer?.photoURL}
                            readOnly
                            className="input input-bordered w-full mt-1"
                          />
                        </div>

                        {/* Price */}
                        <div>
                          <label className="text-sm">Place your Price</label>
                          <input
                            required
                            name="price"
                            type="number"
                            placeholder="e.g. 100"
                            className="input input-bordered w-full mt-1"
                          />
                        </div>

                        {/* Contact */}
                        <div>
                          <label className="text-sm">Contact Info</label>
                          <input
                            name="contact"
                            type="text"
                            className="input input-bordered w-full mt-1"
                            placeholder="e.g. 0175xxxxxxx"
                          />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              modalRef.current.close();
                            }}
                            className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50 cursor-pointer"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="px-5 py-2 cursor-pointer rounded-md text-white bg-linear-to-r from-[#632EE3] to-[#9F62F2]"
                          >
                            Submit Bid
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Bid List for this particular Product */}

      <div className="px-14">
        <h2 className="text-4xl mt-10 font-semibold">
          Bids For this Product:{" "}
          <span className="text-gradient">{bids.length}</span>
        </h2>

        {/* Table ---------->>>>> */}

        <div className="overflow-x-auto">
          {bids.length === 0 ? (
            ""
          ) : (
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th>SL</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {bids.map((bid, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={bid.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bid.buyer_email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
