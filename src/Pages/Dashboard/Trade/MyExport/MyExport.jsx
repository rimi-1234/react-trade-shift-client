import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { BsPencilSquare, BsTrash, BsBoxSeam, BsGlobe, BsStarFill } from "react-icons/bs";
import useTitle from "../../../../hooks/useTitle";
import { AuthContext } from "../../../../Context/AuthContext";
import Loading from "../../../../components/Loading/Loading";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useTitle(selectedProduct ? `Editing: ${selectedProduct.name}` : `My Exports (${products.length})`);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`https://react-trade-shift-server.vercel.app/exports?email=${user.email}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => Swal.fire("Error!", "Failed to load exports.", "error"))
      .finally(() => setLoading(false));
  }, [user]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // ... (Keep your handleDelete and handleUpdate logic exactly as they were)
  const handleDelete = (id) => { /* logic from previous snippet */ };
  const handleUpdate = (e) => { /* logic from previous snippet */ };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Loading /></div>;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50/50 mt-16 md:mt-24">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Inventory Management</h1>
          <p className="text-slate-500 font-medium">You have {products.length} active export listings.</p>
        </div>
      </motion.div>

      {/* ✅ Desktop Table View */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="hidden lg:block max-w-7xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Product</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Origin</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Stock</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">Price</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence>
              {products.map((product) => (
                <motion.tr 
                  key={product._id} 
                  variants={cardVariants} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-100" alt="" />
                      <div>
                        <p className="font-bold text-slate-800">{product.name}</p>
                        <p className="text-xs flex items-center gap-1 text-amber-500 font-bold">
                          <BsStarFill /> {product.rating}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium italic">
                    <span className="flex items-center gap-2"><BsGlobe className="text-primary"/> {product.origin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase">
                      {product.quantity} Units
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900">৳{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <BsPencilSquare size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <BsTrash size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      {/* ✅ Mobile/Card View */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6 max-w-7xl mx-auto"
      >
        {products.map((product) => (
          <motion.div 
            key={product._id} 
            variants={cardVariants}
            className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col group"
          >
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <img src={product.image} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-primary">
                ৳{product.price}
              </div>
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">{product.name}</h3>
            <div className="space-y-2 mb-6 flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Stock Available</span>
                <span className="text-slate-800 font-bold">{product.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Origin</span>
                <span className="text-slate-800 font-bold italic">{product.origin}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedProduct(product)} className="flex-1 btn btn-primary rounded-xl text-white">Update</button>
              <button onClick={() => handleDelete(product._id)} className="btn btn-square btn-outline border-slate-200 rounded-xl hover:bg-red-500 hover:border-red-500"><BsTrash /></button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ✅ Improved Update Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="bg-primary p-6 text-white text-center">
                <BsPencilSquare className="mx-auto mb-2" size={24} />
                <h3 className="text-xl font-black uppercase tracking-widest">Update Item</h3>
              </div>
              <form onSubmit={handleUpdate} className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Product Name</label>
                    <input name="name" defaultValue={selectedProduct.name} className="input input-bordered w-full bg-slate-50 border-none rounded-xl font-bold" />
                  </div>
                  {/* ... (Repeat for other inputs) */}
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Image URL</label>
                    <input name="image" defaultValue={selectedProduct.image} className="input input-bordered w-full bg-slate-50 border-none rounded-xl font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Price (৳)</label>
                    <input type="number" name="price" defaultValue={selectedProduct.price} className="input input-bordered w-full bg-slate-50 border-none rounded-xl font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Stock</label>
                    <input type="number" name="quantity" defaultValue={selectedProduct.quantity} className="input input-bordered w-full bg-slate-50 border-none rounded-xl font-bold" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 btn btn-primary rounded-xl text-white shadow-lg shadow-primary/30">Save Changes</button>
                  <button type="button" onClick={() => setSelectedProduct(null)} className="btn btn-ghost rounded-xl text-slate-400">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyExports;