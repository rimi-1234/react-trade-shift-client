import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import errorImg from '../../assets/App-Error.png';
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading/Loading";
import { 
  BsGlobe, BsBoxSeam, BsTruck, BsShieldCheck, 
  BsArrowLeft, BsStarFill, BsInfoCircle, BsArrowRight 
} from "react-icons/bs";

function ProductDetails() {
  useTitle("Product Details | TradeShift");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Fetch Single Product
    fetch(`https://react-trade-shift-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Fetch Related Items by category
        return fetch(`https://react-trade-shift-server.vercel.app/products?category=${data.category}`);
      })
      .then(res => res.json())
      .then(related => {
        setRelatedProducts(related.filter(p => p._id !== id).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <img src={errorImg} alt="Error" className="w-80 mb-6 opacity-80" />
      <h2 className="text-4xl font-black text-slate-800 italic">Listing Not Found</h2>
      <p className="text-slate-500 max-w-md mt-4">The product protocol you are looking for does not exist or has been decommissioned.</p>
      <button onClick={() => navigate(-1)} className="btn btn-primary mt-8 rounded-xl px-8">Return to Terminal</button>
    </div>
  );

  const isQuantityValid = quantity > 0 && quantity <= product.quantity;

  const handleImport = async () => {
    if (!isQuantityValid) return;
    setLoading(true);

    const payload = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      importedQuantity: quantity,
      importer_email: user.email,
      import_date: new Date().toISOString()
    };

    try {
      const res = await fetch(`https://react-trade-shift-server.vercel.app/imports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setProduct(prev => ({ ...prev, quantity: prev.quantity - quantity }));
        setModalOpen(false);
        Swal.fire({ icon: "success", title: "Import Authorized", text: "Transaction logged in trade history." });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Sync Failed", text: "Global trade server unreachable." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Product Card */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left: Media Gallery */}
            <div className="p-8 bg-slate-100/50 flex flex-col items-center justify-center border-r border-slate-100">
              <motion.img 
                layoutId={`img-${product._id}`}
                src={product.image} 
                className="max-h-[400px] object-contain drop-shadow-2xl"
              />
              <div className="flex gap-4 mt-8">
                {/* Thumbnails placeholder for "Multiple images" requirement */}
                <div className="w-16 h-16 rounded-xl border-2 border-primary bg-white p-1 overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-xl border border-slate-200 bg-white/50 grayscale opacity-50" />
              </div>
            </div>

            {/* Right: Essential Action Box */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="flex justify-between items-start">
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category || "General Export"}
                </span>
                <div className="flex text-amber-500 gap-1 text-sm font-bold">
                   <BsStarFill /> {product.rating}
                </div>
              </div>

              <h1 className="text-4xl font-black text-slate-900 mt-4 leading-tight italic">{product.name}</h1>
              
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-tighter">Market Price</p>
                  <h2 className="text-3xl font-black text-red-600 italic">৳{product.price}</h2>
                </div>
                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-tighter">Stock Availability</p>
                  <p className={`font-black ${product.quantity > 0 ? 'text-emerald-500' : 'text-red-400'}`}>
                    {product.quantity} Units Left
                  </p>
                </div>
                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-tighter">Country of Origin</p>
                  <p className="font-black text-slate-700 uppercase flex items-center gap-2">
                    <BsGlobe className="text-primary"/> {product.origin}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <button 
                  onClick={() => setModalOpen(true)}
                  disabled={product.quantity === 0}
                  className="btn btn-primary w-full h-16 rounded-2xl text-white font-black text-lg shadow-xl shadow-primary/20 gap-3"
                >
                  <BsTruck className="text-2xl" /> {product.quantity > 0 ? 'Initialize Import' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details Tabs */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Tab Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
             <section className="bg-white p-8 rounded-[2rem] border border-slate-200">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <BsInfoCircle className="text-primary" /> Product Description
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {product.long_description || product.short_description || "This high-quality export item adheres to international trade standards. Guaranteed quality and verified logistics through TradeShift protocol."}
                </p>
             </section>

             <section className="bg-white p-8 rounded-[2rem] border border-slate-200">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <BsShieldCheck className="text-emerald-500" /> Key Information & Specs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {product.specifications?.map((s, i) => (
                     <div key={i} className="flex justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.key}</span>
                        <span className="font-bold text-slate-700">{s.value}</span>
                     </div>
                   )) || (
                     <p className="text-slate-400 italic text-sm">Standard export specifications apply.</p>
                   )}
                </div>
             </section>
          </div>

          {/* Right Sidebar: Rules & Compliance */}
          <div className="space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
                <h4 className="font-black italic text-lg mb-4 text-primary">Trade Compliance</h4>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex gap-3"><BsBoxSeam className="text-primary flex-shrink-0" /> Verified Merchant Item</li>
                  <li className="flex gap-3"><BsTruck className="text-primary flex-shrink-0" /> Global Shipping Available</li>
                  <li className="flex gap-3"><BsShieldCheck className="text-primary flex-shrink-0" /> 14-Day Quality Guarantee</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Suggested Items Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex justify-between items-end mb-10">
               <div>
                <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">Suggested Trade Items</h3>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Based on Category: {product.category}</p>
               </div>
               <Link to="/all-products" className="text-primary font-black flex items-center gap-2 hover:underline">
                  Browse All <BsArrowRight />
               </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(item => (
                <Link key={item._id} to={`/product/${item._id}`} className="group">
                  <div className="bg-white p-4 rounded-3xl border border-slate-200 group-hover:shadow-xl transition-all duration-500">
                    <div className="h-40 rounded-2xl overflow-hidden bg-slate-100 mb-4">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h4 className="font-black text-slate-800 line-clamp-1">{item.name}</h4>
                    <p className="text-red-500 font-black mt-2 italic">৳{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal - Improved UI */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[999] p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl relative"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            >
              <h2 className="text-2xl font-black text-slate-900 mb-2 italic text-center">Import Authorization</h2>
              <p className="text-slate-500 text-center text-sm mb-8 font-medium">Verify the quantity you wish to import from {product.origin}.</p>
              
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label text-[10px] font-black uppercase text-slate-400">Order Quantity</label>
                  <input
                    type="number"
                    className="input input-bordered h-14 bg-slate-50 border-none font-black text-lg focus:ring-2 focus:ring-primary/20"
                    placeholder={`Max units: ${product.quantity}`}
                    min="1"
                    max={product.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  {!isQuantityValid && (
                    <p className="text-red-500 mt-2 text-[10px] font-bold uppercase text-center">
                      Limit: 1 to {product.quantity} units
                    </p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Estimated Total</p>
                   <p className="text-xl font-black text-slate-900 italic">৳{(product.price * quantity).toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button onClick={() => setModalOpen(false)} className="btn btn-ghost h-14 rounded-2xl font-black text-slate-400">Cancel</button>
                  <button
                    onClick={handleImport}
                    disabled={!isQuantityValid || loading}
                    className="btn btn-primary h-14 rounded-2xl text-white font-black shadow-lg shadow-primary/20"
                  >
                    {loading ? "Syncing..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductDetails;