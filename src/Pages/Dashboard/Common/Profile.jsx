import React, { useContext, useState } from 'react';
import coverImg from '../../../assets/images/cover.jpg';
import { AuthContext } from '../../../Context/AuthContext';
import useTitle from '../../../hooks/useTitle';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
  useTitle("My Profile | TradeShift");
  const { user, setLoading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    try {
      setLoading(true);
      // 1. Update in Firebase
      await updateProfile(user, {
        displayName: name,
        photoURL: photo
      });

      // 2. Update in Backend Database
      await fetch(`https://react-trade-shift-server.vercel.app/users/${user.email}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, image: photo })
      });

      toast.success("Profile updated! Please refresh to see changes.");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-50 px-4 py-10'>
      <div className='bg-white shadow-2xl rounded-3xl w-full md:w-4/5 lg:w-3/5 overflow-hidden border border-slate-100'>
        {/* Cover Photo */}
        <div className='relative h-48 sm:h-64 w-full bg-blue-100'>
          <img alt='cover' src={coverImg} className='w-full h-full object-cover opacity-90' />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Content */}
        <div className='flex flex-col items-center justify-center p-8 -mt-20 relative z-10'>
          <div className='relative group'>
            <img
              alt='profile'
              src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
              className='mx-auto object-cover rounded-full h-40 w-40 border-8 border-white shadow-xl bg-white'
            />
            <div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <p className='mt-5 p-1 px-5 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-full shadow-lg shadow-blue-200'>
            {user?.role || 'Trader'}
          </p>

          <h2 className='mt-4 text-3xl font-extrabold text-slate-800 tracking-tight'>
            {user?.displayName || "Anonymous"}
          </h2>
          <p className='text-slate-500 font-medium'>{user?.email}</p>

          {/* Details & Actions */}
          <div className='w-full mt-10 border-t border-slate-100 pt-8'>
            <div className='flex flex-col md:flex-row gap-8 items-center justify-between'>
              <div className='text-center md:text-left space-y-1'>
                <p className='text-[10px] text-slate-400 uppercase font-black tracking-widest'>Verification ID</p>
                <p className='font-mono text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-md border border-slate-100'>
                  {user?.uid}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className='bg-blue-600 px-10 py-3 rounded-2xl text-white font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 flex-1 md:flex-none'
                >
                  Edit Profile
                </button>
                <button className='bg-slate-800 px-10 py-3 rounded-2xl text-white font-bold hover:bg-slate-900 transition-all active:scale-95 flex-1 md:flex-none'>
                  Security
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Update Profile Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md px-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300 border border-white/20">
            <h3 className="text-2xl font-black text-slate-800 mb-2 text-center">Profile Settings</h3>
            <p className="text-center text-slate-500 text-sm mb-8">Update your public identity on TradeShift</p>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={user?.displayName}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-hidden transition-all text-slate-700 font-semibold" 
                  placeholder="Enter your name"
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Profile Photo URL</label>
                <input 
                  type="url" 
                  name="photo"
                  defaultValue={user?.photoURL}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-hidden transition-all text-slate-700 font-semibold" 
                  placeholder="https://example.com/photo.jpg"
                  required 
                />
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;