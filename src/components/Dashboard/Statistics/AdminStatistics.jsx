import { useEffect, useState } from 'react';
import { FaUserAlt, FaDollarSign } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import Loading from '../../Loading/Loading';


const AdminStatistics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://react-trade-shift-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
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
  const totalRevenue = products.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalProducts = products.length;
  
  // Preparing Data for Bar Chart (Category wise count)
  const categoryCounts = products.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCounts).map(key => ({
    name: key,
    count: categoryCounts[key]
  }));

  if (loading) return <Loading />;

  return (
    <div className='p-4'>
      <div className='mt-12'>
        {/* Statistics Cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          
          <StatCard 
            title="Total Revenue" 
            value={`৳${totalRevenue}`} 
            icon={<FaDollarSign />} 
            color="from-orange-600 to-orange-400" 
            shadow="shadow-orange-500/40" 
          />
          
          <StatCard 
            title="Total Items" 
            value={totalProducts} 
            icon={<BsFillCartPlusFill />} 
            color="from-blue-600 to-blue-400" 
            shadow="shadow-blue-500/40" 
          />
          
          <StatCard 
            title="Avg Rating" 
            value={(products.reduce((s, p) => s + p.rating, 0) / totalProducts || 0).toFixed(1)} 
            icon={<BsFillHouseDoorFill />} 
            color="from-pink-600 to-pink-400" 
            shadow="shadow-pink-500/40" 
          />
          
          <StatCard 
            title="Total Users" 
            value="10" 
            icon={<FaUserAlt />} 
            color="from-green-600 to-green-400" 
            shadow="shadow-green-500/40" 
          />
        </div>

        {/* Charts and Data Section */}
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          
          {/* Inventory Bar Chart */}
          <div className='relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl xl:col-span-2 p-6'>
            <h2 className='text-xl font-bold mb-4'>Inventory by Category</h2>
            <div className='h-80'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Products List / Table */}
          <div className='relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl p-6'>
            <h2 className='text-xl font-bold mb-4'>Latest Products</h2>
            <div className='space-y-4'>
              {products.slice(0, 5).map((product) => (
                <div key={product._id} className='flex items-center justify-between border-b pb-2'>
                  <div className='flex items-center gap-3'>
                    <img src={product.image} className='w-10 h-10 rounded-lg object-cover' alt="" />
                    <div>
                      <p className='text-sm font-bold'>{product.name.slice(0, 20)}...</p>
                      <p className='text-xs text-gray-500'>{product.category}</p>
                    </div>
                  </div>
                  <p className='font-bold text-blue-600'>৳{product.price}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for clarity
const StatCard = ({ title, value, icon, color, shadow }) => (
  <div className='relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl'>
    <div className={`bg-linear-to-tr ${color} shadow-lg ${shadow} absolute -mt-4 mx-4 grid h-16 w-16 place-items-center rounded-xl text-white`}>
      {icon}
    </div>
    <div className='p-4 text-right'>
      <p className='text-sm font-normal text-blue-gray-600'>{title}</p>
      <h4 className='text-2xl font-semibold text-blue-gray-900'>{value}</h4>
    </div>
  </div>
);

export default AdminStatistics;