import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBids = () => {
  const { customer } = use(AuthContext);

  const [bids, setBids] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/bids?email=${customer?.email}`)
      .then((data) => setBids(data.data));
  }, [axiosSecure, customer]);

  // useEffect(() => {
  //   if (customer?.email) {
  //     fetch(`http://localhost:3000/bids?email=${customer?.email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [customer?.email]);

  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bids/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Bid has been deleted.",
              icon: "success",
            });

            const remainingBids = bids.filter((bid) => bid._id !== _id);
            setBids(remainingBids);
          }
        });
      }
    });
  };

  return (
    <>
      <div className="px-14 project-bg">
        <h2 className="text-4xl font-semibold">
          My Bids : <span className="text-gradient">{bids.length}</span>
        </h2>

        {/* Desktop View */}

        <div className="hidden md:block overflow-x-auto">
          {bids.length === 0 ? (
            ""
          ) : (
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-[#F9FAFB] ">
                  <th>SL</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white ">
                {bids.map((bid, index) => (
                  <tr key={bid._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={bid?.buyer_image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid?.buyer_name}</div>
                          <div className="text-sm opacity-50">Brazil</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bid?.buyer_email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Community Outreach Specialist
                      </span>
                    </td>
                    <td>{bid?.bid_price}</td>
                    <td>
                      {bid.status === "Pending" ? (
                        <div className="badge badge-warning">{bid?.status}</div>
                      ) : (
                        <div className="badge badge-success">{bid?.status}</div>
                      )}
                    </td>
                    <th>
                      <button
                        className="btn btn-outline text-red-500 border-red-500 btn-xs"
                        onClick={() => handleRemoveBid(bid?._id)}
                      >
                        Remove Bid
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 mt-5">
          {bids.map((bid) => (
            <div key={bid._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3">
                <img
                  src={bid?.buyer_image}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">{bid?.buyer_name}</p>
                  <p className="text-sm text-gray-500">{bid?.buyer_email}</p>
                </div>
              </div>

              <div className="mt-3 text-sm">
                <p>
                  <strong>Bid:</strong> ${bid?.bid_price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${bid.status === "Pending" ? "badge-warning" : "badge-success"}`}
                  >
                    {bid.status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handleRemoveBid(bid._id)}
                className="btn btn-outline text-red-500 border-red-500 btn-sm mt-3 w-full"
              >
                Remove Bid
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBids;
