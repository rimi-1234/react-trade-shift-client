import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const MyImports = () => {
  const [imports, setImports] = useState([]);
 ;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch user's imports
  useEffect(() => {
    console.log(user.email);
    
    fetch(`http://localhost:3000/imports?email=${user.email}`,{
         headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
    })
      .then(res => res.json())
      .then(data => setImports(data))
      .catch(err => console.error(err));
  }, [user.email]);

  // Delete import
  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/imports/${id}`, { method: "DELETE" });
        setImports(imports.filter(item => item._id !== id));
        Swal.fire("Deleted!", "Your import has been removed.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete import.", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mt-16 sm:mt-52 md:mt-44 lg:mt-32 xl:24 mx-auto p-5">
      <h2 className="font-bold mb-6 text-center text-2xl text-gray-500">
        My Imports
      </h2>

      {/* Table view for desktop */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg border border-base-200">
        <table className="min-w-full divide-y divide-base-200">
          <thead className="bg-base-200">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price(৳)</th>
              <th className="px-4 py-3">Origin</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Imported Quantity</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {imports.map((product) => (
              <tr key={product._id} className="hover:bg-base-100 transition-colors">
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-base-200"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{product.name}</td>
                <td className="px-4 py-3 font-medium text-gray-700">৳{product.price}</td>
                <td className="px-4 py-3">{product.origin}</td>
                <td className="px-4 py-3">{product.rating}</td>
                <td className="px-4 py-3">{product.importedQuantity}</td>
                <td className="px-4 py-3 flex flex-col sm:flex-row justify-center gap-2">
                  <button
                    onClick={() => navigate(`/products-details/${product.productId}`)}
                    className="bg-primary text-white px-3 py-2 rounded hover:opacity-90"
                  >
                    See Details
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-error text-white px-3 py-2 rounded hover:opacity-90"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {imports.length === 0 && (
          <p className="text-center p-6 text-gray-500">No imported products found.</p>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {imports.map((product) => (
          <div key={product._id} className="bg-base-100 border border-base-200 rounded-xl p-4 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: <span className="font-medium">৳{product.price}</span></p>
            <p className="text-gray-600">Origin: {product.origin}</p>
            <p className="text-gray-600">Rating: {product.rating}</p>
            <p className="text-gray-600">Quantity: {product.importedQuantity}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigate(`/products-details/${product.productId}`)}
                className="bg-primary text-white px-3 py-2 rounded hover:opacity-90 flex-1 mr-2"
              >
                See Details
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-error text-white px-3 py-2 rounded hover:opacity-90 flex-1 ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyImports;
