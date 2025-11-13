import React, { use, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading/Loading";

const AddExportProduct = () => {
  useTitle("AddExportProduct | TradeShift");
  const { user } = use(AuthContext)
  const [products, setProducts] = useState([]);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);


  const handleProductSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const price = parseFloat(e.target.price.value);
    const origin = e.target.origin.value;
    const rating = parseFloat(e.target.rating.value);
    const quantity = parseInt(e.target.quantity.value, 10);
    const created_by = user.email;
    const createdAt = new Date().toISOString();

    const newProduct = { name, image, price, origin, rating, quantity, createdAt, created_by };

    const exists = products.some(
      (product) => product.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Product",
        text: "This product already exists!",
      });
      return;
    }
    setLoading(true);

    fetch("https://react-trade-shift-server.vercel.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ important
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          newProduct._id = data.insertedId;
          setProducts([newProduct, ...products]);
          e.target.reset(); // reset form
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product has been added!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add product",
        });
      });
    setLoading(false);
  };
  if (loading)
    return (
      <p className="text-center mt-10">
        <Loading></Loading>
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 sm:pt-52 md:pt-52 lg:pt-40  bg-gray-50">
      {/* Centering wrapper */}
      <div className="w-full max-w-3xl p-6 bg-base-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
          Add Export
        </h2>

        <form ref={formRef} onSubmit={handleProductSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="label">Product Name</label>
              <input type="text" name="name" className="input" placeholder="Product Name" required />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="label">Product Image URL</label>
              <input type="text" name="image" className="input" placeholder="Image URL" required />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="label">Price</label>
              <input type="number" name="price" className="input" placeholder="Price" required />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="label">Origin Country</label>
              <input type="text" name="origin" className="input" placeholder="Origin Country" required />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="label">Rating</label>
              <input type="number" name="rating" className="input" placeholder="Rating (1-5)" min="1" max="5" required />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="label">Available Quantity</label>
              <input type="number" name="quantity" className="input" placeholder="Quantity" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2 sm:mt-4">
            Add Export
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExportProduct;
