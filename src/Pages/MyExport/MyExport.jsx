import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user’s exports
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/exports?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  // ✅ Delete product with SweetAlert2
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E53935",
      cancelButtonColor: "#6B6B84",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setProducts(products.filter((p) => p._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              Swal.fire("Failed!", "Unable to delete product.", "error");
            }
          })
          .catch(() =>
            Swal.fire("Error!", "Something went wrong while deleting.", "error")
          );
      }
    });
  };

  // ✅ Update product with SweetAlert2
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      image: form.image.value,
      price: Number(form.price.value),      // convert to number
      origin: form.origin.value,
      rating: Number(form.rating.value),    // convert to number
      quantity: Number(form.quantity.value) // convert to number
    };

    console.log(selectedProduct._id);

    console.log(updated);

    fetch(`http://localhost:3000/products/${selectedProduct._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setProducts(
            products.map((p) =>
              p._id === selectedProduct._id ? { ...p, ...updated } : p
            )
          );
          setSelectedProduct(null);
          Swal.fire({
            title: "Updated!",
            text: "Product information has been successfully updated.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "No Changes",
            text: "No updates were made.",
            icon: "info",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch(() =>
        Swal.fire("Error!", "Something went wrong while updating.", "error")
      );
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mt-16 sm:mt-52 md:mt-44 lg:mt-32 xl:24 mx-auto p-5">
      <h2 className="font-bold mb-6 text-center text-2xl text-gray-500">
        My Exports
      </h2>

      {/* ✅ Table for larger devices */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg border border-base-200">
        <table className="min-w-full divide-y divide-base-200">
          <thead className="bg-base-200">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price(৳)</th>
              <th className="px-4 py-3">Origin</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-base-100 transition-colors"
              >
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-base-200"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{product.name}</td>
                <td className="px-4 py-3  font-medium text-gray-700">
                  ৳{product.price}
                </td>
                <td className="px-4 text-center  py-3">{product.origin}</td>
                <td className="px-4 text-center py-3">{product.rating}</td>
                  <td className="px-4 py-3">
                                    <span className="bg-blue-100 flex justify-center text-blue-700 px-3 py-3 rounded-full text-sm font-medium">
                                        {product.quantity}
                                    </span>
                                </td>
                <td className="px-4 py-6 flex flex-col sm:flex-row justify-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-primary text-white px-3 py-2 rounded hover:opacity-90"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-error text-white px-3 py-2 rounded hover:opacity-90"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No export products found.
          </p>
        )}
      </div>

      {/* ✅ Mobile Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-base-100 border border-base-200 rounded-xl p-4 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">
              Price: <span className="font-medium">৳{product.price}</span>
            </p>
            <p className="text-gray-600">Origin: {product.origin}</p>
            <p className="text-gray-600">Rating: {product.rating}</p>
            <p className="text-gray-600">
              Quantity:{" "}
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {product.quantity}
              </span>
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="bg-primary text-white px-3 py-2 rounded hover:opacity-90 flex-1 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-error text-white px-3 py-2 rounded hover:opacity-90 flex-1 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Update Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">
              Update Product
            </h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              {["name", "image", "price", "origin", "rating", "quantity"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field === "price" || field === "rating" || field === "quantity"
                        ? "number"
                        : "text"
                    }
                    name={field}
                    defaultValue={selectedProduct[field]}
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-primary outline-none"
                    required
                  />
                )
              )}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-success text-white px-4 py-2 rounded hover:opacity-90"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyExports;
