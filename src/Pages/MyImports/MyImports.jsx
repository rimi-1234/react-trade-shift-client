import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../components/Loading/Loading";
import useTitle from "../../hooks/useTitle";

const MyImports = () => {
    useTitle("My Imports | TradeShift");
    const [imports, setImports] = useState([]);
    ;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    // Fetch user's imports
    useEffect(() => {
        console.log(user.email);
        setLoading(true)

        fetch(`https://react-trade-shift-server.vercel.app/


imports?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setImports(data)

                setLoading(false);
            })
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
                await fetch(`https://react-trade-shift-server.vercel.app/


imports/${id}`, { method: "DELETE" });
                setImports(imports.filter(item => item._id !== id));
                Swal.fire("Deleted!", "Your import has been removed.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete import.", "error");
            }
        }
    };
    // ✅ Loading state display
    if (loading)
        return (
            <p className="text-center mt-10">
                <Loading></Loading>
            </p>
        );


    return (
        <div className="max-w-7xl mt-20 sm:mt-24 md:mt-52 lg:mt-32 mx-auto p-5">
            <h2 className="font-bold mb-6 text-center text-2xl dark:text-gray-200 text-gray-700">
                My Imports({imports?.length})
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
                            <th className="px-5 py-3">
                                <div className="flex justify-center gap-1">
                                    <span>Imported</span>
                                    <span>Quantity</span>
                                </div>
                            </th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">

                        {Array.isArray(imports) && imports?.map((product) => (
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
                                <td className="px-4 text-center  py-3">{product.origin}</td>
                                <td className="px-4 text-center  py-3">{product.rating}</td>
                                <td className="px-4  py-3">
                                    <span className="bg-blue-100 flex justify-center h-full text-blue-700 px-3 py-3 rounded-full text-sm font-medium">
                                        {product.importedQuantity}
                                    </span>
                                </td>

                                <td className="px-4 py-6 flex flex-col sm:flex-row justify-center items-center gap-2">
                                    <button
                                        onClick={() => navigate(`/products-details/${product.productId}`)}
                                        className="flex-1 w-full sm:w-auto justify-center bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 flex transition-all duration-200"
                                    >
                                        <span className="flex gap-2 items-center text-center">    <span>See</span>
                                            <span>Details</span></span>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="flex-1 w-full sm:w-auto justify-center bg-error text-white px-4 py-2 rounded-lg hover:opacity-90 flex transition-all duration-200"
                                    >
                                        <span className="flex-1 text-center">Remove</span>
                                    </button>




                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {Array.isArray(imports) && imports?.length === 0 && (
                    <p className="text-center p-6 text-gray-500">No imported products found.</p>
                )}
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {Array.isArray(imports) && imports?.map((product) => (
                    <div
                        key={product._id}
                        className="bg-base-100 border border-base-200 rounded-xl p-4 shadow-sm flex flex-col h-full"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-3 flex-shrink-0"
                        />
                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                        <p className="text-gray-600 mb-1">
                            Price: <span className="font-medium">৳{product.price}</span>
                        </p>
                        <p className="text-gray-600 mb-1">Origin: {product.origin}</p>
                        <p className="text-gray-600 mb-1">Rating: {product.rating}</p>
                        <p className="text-gray-600 mb-3">
                            Quantity:{" "}
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {product.importedQuantity}
                            </span>
                        </p>

                        {/* Buttons pushed to bottom */}
                        <div className="flex gap-2 mt-auto">
                            <button
                                onClick={() => navigate(`/products-details/${product.productId}`)}
                                className="flex-1 bg-primary text-white px-3 py-2 rounded hover:opacity-90"
                            >
                                See Details
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="flex-1 bg-error text-white px-3 py-2 rounded hover:opacity-90"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    );
};

export default MyImports;