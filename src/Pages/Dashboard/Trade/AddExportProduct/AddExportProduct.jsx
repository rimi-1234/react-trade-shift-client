import React, { use, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthContext";
import useTitle from "../../../../hooks/useTitle";
import { 
  BsPlusCircle, BsCloudUpload, BsGlobe, 
  BsTag, BsStar, BsBoxSeam, BsTextLeft, BsCardText 
} from "react-icons/bs";

const AddExportProduct = () => {
  useTitle("Add Export | TradeShift");
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    
    // THE UPDATED PRODUCT OBJECT
    const newProduct = {
      name: form.name.value,
      image: form.image.value,
      price: parseFloat(form.price.value),
      origin: form.origin.value,
      rating: parseFloat(form.rating.value),
      quantity: parseInt(form.quantity.value, 10),
      category: form.category.value,
      short_description: form.short_description.value,
      long_description: form.long_description.value,
      status: "Verified", // Default marketplace status
      created_by: user?.email || "anonymous",
      createdAt: new Date().toISOString(),
    };

    // Duplicate Check
    if (products.some((p) => p.name.toLowerCase() === newProduct.name.toLowerCase())) {
      Swal.fire({ 
        icon: "warning", 
        title: "Duplicate Product", 
        text: "This product already exists!", 
        customClass: { confirmButton: 'btn btn-primary' } 
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://react-trade-shift-server.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();

      if (data.insertedId) {
        setProducts([{ ...newProduct, _id: data.insertedId }, ...products]);
        form.reset();
        Swal.fire({ 
          icon: "success", 
          title: "Listing Published!", 
          text: "Your product is now live on the marketplace.",
          timer: 2000, 
          showConfirmButton: false 
        });
      }
    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Sync Error", 
        text: "Could not connect to the trade server." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50/50">
      {/* Header Section */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic">
          <BsPlusCircle className="text-primary" /> Onboard New Asset
        </h1>
        <p className="text-slate-500 text-sm ml-10">
          Global Trade Protocol: Ensuring transparency in international logistics.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form 
          ref={formRef} 
          onSubmit={handleProductSubmit} 
          className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden"
        >
          <div className="h-2 bg-primary w-full"></div>
          
          <div className="p-6 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Product Identity */}
              <div className="form-control">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><BsTag /> Official Name</span>
                </label>
                <input type="text" name="name" className="input input-bordered bg-slate-50 focus:bg-white border-slate-200 font-bold" placeholder="e.g. 5052 Aluminum Alloy" required />
              </div>

              {/* Sector/Category */}
              <div className="form-control">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><BsBoxSeam /> Industry Sector</span>
                </label>
                <select name="category" className="select select-bordered bg-slate-50 font-bold" required>
                  <option>Industrial Materials</option>
                  <option>Agricultural Commodities</option>
                  <option>Textiles & Apparel</option>
                  <option>Consumer Electronics</option>
                </select>
              </div>

              {/* Pricing & Logic */}
              <div className="form-control">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2">$ Unit Price (USD)</span>
                </label>
                <input type="number" name="price" className="input input-bordered bg-slate-50 border-slate-200 font-black text-red-600" placeholder="0.00" step="0.01" required />
              </div>

              <div className="form-control">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><BsGlobe /> Origin Port/Country</span>
                </label>
                <input type="text" name="origin" className="input input-bordered bg-slate-50 border-slate-200 font-bold uppercase" placeholder="e.g. Chittagong, BD" required />
              </div>

              {/* Media & Quality */}
              <div className="form-control">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><BsCloudUpload /> Global Image URL</span>
                </label>
                <input type="text" name="image" className="input input-bordered bg-slate-50 border-slate-200" placeholder="https://cloud-storage.com/image.jpg" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</label>
                  <select name="rating" className="select select-bordered bg-slate-50 font-bold" required>
                    <option value="5.0">5.0 - Premium</option>
                    <option value="4.0">4.0 - High</option>
                    <option value="3.0">3.0 - Standard</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity</label>
                  <input type="number" name="quantity" className="input input-bordered bg-slate-50 font-bold" placeholder="500" required />
                </div>
              </div>

              {/* DESCRIPTIONS (Full Width) */}
              <div className="form-control md:col-span-2">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><BsTextLeft /> Short Catchphrase</span>
                </label>
                <input type="text" name="short_description" className="input input-bordered bg-slate-50 font-medium italic" placeholder="One sentence summarizing the unique value proposition..." required />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><BsCardText /> Comprehensive Technical Overview</span>
                </label>
                <textarea 
                  name="long_description" 
                  className="textarea textarea-bordered bg-slate-50 h-32 leading-relaxed" 
                  placeholder="Detail the chemical composition, manufacturing standards, lead times, and shipping certifications..." 
                  required 
                />
              </div>

            </div>

            <div className="pt-6">
              <button 
                disabled={loading}
                type="submit" 
                className={`btn btn-primary w-full h-16 rounded-2xl text-white font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all ${loading ? 'loading' : ''}`}
              >
                {loading ? 'POSTING TO LEDGER...' : 'FINALIZE & PUBLISH LISTING'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExportProduct;