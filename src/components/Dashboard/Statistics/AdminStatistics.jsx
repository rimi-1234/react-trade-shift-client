import { useEffect, useState } from 'react';
import { FaUserAlt, FaDollarSign } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loading from '../../Loading/Loading';

const AdminStatistics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://react-trade-shift-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // Safe data extraction
        const productsArray = data.result || (Array.isArray(data) ? data : []);
        setProducts(productsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // --- Logic Calculations ---
  const totalRevenue = products.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const totalProducts = products.length;
  
  // Avg Rating calculation with fallback to 0
  const avgRating = totalProducts > 0 
    ? (products.reduce((s, p) => s + (Number(p.rating) || 0), 0) / totalProducts).toFixed(1) 
    : 0;

  // Preparing Data for Bar Chart
  const categoryCounts = products.reduce((acc, item) => {
    const cat = item.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCounts).map(key => ({
    name: key,
    count: categoryCounts[key]
  }));

  if (loading) return <Loading />;

  return (
    <div className='p-4 bg-gray-50 min-h-screen'>
      <div className='mt-12 max-w-7xl mx-auto'>
        {/* Statistics Cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <StatCard 
            title="Total Revenue" 
            value={`৳${totalRevenue.toLocaleString()}`} 
            icon={<FaDollarSign />} 
            color="from-blue-600 to-blue-400" 
            shadow="shadow-blue-500/40" 
          />
          <StatCard 
            title="Total Items" 
            value={totalProducts} 
            icon={<BsFillCartPlusFill />} 
            color="from-blue-700 to-blue-500" 
            shadow="shadow-blue-600/40" 
          />
          <StatCard 
            title="Avg Rating" 
            value={avgRating} 
            icon={<BsFillHouseDoorFill />} 
            color="from-blue-800 to-blue-600" 
            shadow="shadow-blue-700/40" 
          />
          <StatCard 
            title="Total Users" 
            value="10" 
            icon={<FaUserAlt />} 
            color="from-slate-800 to-slate-600" 
            shadow="shadow-slate-500/40" 
          />
        </div>

        {/* Charts and Data Section */}
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Inventory Bar Chart */}
          <div className='relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl lg:col-span-2 p-6 border border-gray-100'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>Inventory by Category</h2>
            <div className='h-80 w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Products List */}
          <div className='relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-6 border border-gray-100'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>Latest Products</h2>
            <div className='space-y-4 overflow-y-auto max-h-80 pr-2'>
              {products.slice(0, 6).map((product) => (
                <div key={product._id} className='flex items-center justify-between border-b border-gray-50 pb-3 last:border-0'>
                  <div className='flex items-center gap-3'>
                    <img src={product.image} className='w-12 h-12 rounded-xl object-cover shadow-sm' alt={product.name} />
                    <div className='overflow-hidden'>
                      <p className='text-sm font-bold text-gray-800 truncate w-32'>{product.name}</p>
                      <p className='text-xs text-gray-500 italic'>{product.category}</p>
                    </div>
                  </div>
                  <p className='font-bold text-blue-600 text-sm'>৳{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, shadow }) => (
  <div className='relative flex flex-col bg-white text-gray-700 shadow-sm border border-gray-100 rounded-xl transition-transform hover:scale-[1.02]'>
    <div className={`bg-gradient-to-tr ${color} shadow-lg ${shadow} absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl text-white`}>
      <div className='text-2xl'>{icon}</div>
    </div>
    <div className='p-6 text-right'>
      <p className='text-xs font-bold uppercase tracking-wider text-gray-400'>{title}</p>
      <h4 className='text-2xl font-black text-gray-800 mt-1'>{value}</h4>
    </div>
  </div>
);

export default AdminStatistics;