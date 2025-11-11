import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

function ProductDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  // Validate quantity input
  const isQuantityValid = quantity > 0 && quantity <= product.quantity;

  // Handle import
  const handleImport = () => {
    console.log("handleImport called", quantity, product.quantity, isQuantityValid);

    if (!isQuantityValid) return;

    setLoading(true);
    fetch(`http://localhost:3000/imports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({
        productId: product._id,
        importedQuantity:quantity,
        created_by: user.email,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Import failed");
        return res.json();
      })
      .then(() => {
        // Update quantity locally
        setProduct((prev) => ({
          ...prev,
          quantity: prev.quantity - quantity,
        }));

        setQuantity(0);
        setModalOpen(false);

        Swal.fire({
          icon: "success",
          title: "Import Successful!",
          text: `${quantity} items imported successfully.`,
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: err.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#d33",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-6xl mt-40 mx-auto p-6 flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md">
      {/* Left: Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow-lg max-h-96 object-contain"
        />
      </div>

      {/* Right: Details */}
      <div className="md:w-1/2 flex flex-col justify-between p-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-600 mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Price:</span>{" "}
            <span className="text-red-600 font-bold">৳{product.price}</span>
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Available Quantity:</span> {product.quantity}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Origin:</span> {product.origin}
          </p>
          <p className="flex items-center text-yellow-400 mt-2">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
            <span className="ml-2 text-gray-700 font-semibold">{product.rating}</span>
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Import Now
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Enter Quantity</h2>
            <input
              type="number"
              className="border p-2 w-full mb-2 rounded"
              placeholder={`Max: ${product.quantity}`}
              min="0"
              max={product.quantity}
              defaultValue={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            {!isQuantityValid && (
              <p className="text-red-500 mb-2 text-sm text-center">
                Enter a value between 1 and {product.quantity}.
              </p>
            )}
            <button
              onClick={handleImport}
              disabled={!isQuantityValid || loading}
              className={`w-full py-2 rounded-lg ${
                !isQuantityValid || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
            <button
              onClick={() => {
                setModalOpen(false);
                setQuantity(0);
              }}
              className="mt-2 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
