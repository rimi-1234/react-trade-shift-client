import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router' // Ensure you use NavLink for active states
import { AuthContext } from '../../../Context/AuthContext'

// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp, BsBoxSeam, BsArrowDownLeftSquare, BsPlusCircle } from 'react-icons/bs'

import MenuItem from './Menu/MenuItem'
import useRole from '../../../hooks/useRole';
import TraderMenu from './Menu/TradeMenu'

const Sidebar = () => {
  const { signoutUserFunc, user } = useContext(AuthContext);
  const [isActive, setActive] = useState(false)
  console.log(user);
  
  const [role] = useRole();
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* 1. Mobile Navbar (Visible only on small screens) */}
      <div className='bg-slate-900 text-white flex justify-between md:hidden p-4 shadow-lg'>
        <div className='font-black tracking-tighter text-xl text-blue-500'>
          TRADESHIFT
        </div>
        <button
          onClick={handleToggle}
          className='mobile-menu-button p-2 focus:outline-none hover:bg-slate-800 rounded-lg transition-colors'
        >
          <AiOutlineBars className='h-6 w-6' />
        </button>
      </div>

      {/* 2. Main Sidebar Container */}
      <div
        className={`z-20 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#050b1a] border-r border-white/5 w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out shadow-2xl`}
      >
        <div className='flex flex-col h-full'>
          {/* TOP: Brand Identity */}
          <div className='px-4 mb-10'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white'>T</div>
              <span className='text-white font-black tracking-tighter text-xl uppercase italic'>TradeShift</span>
            </div>
            <div className='h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-4' />
          </div>

          {/* MIDDLE: Navigation Menu */}
          <div className='flex flex-col justify-between flex-1'>
            <nav className="space-y-2">
              {/* Core Stats */}
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
          

                {/* 2. Trader Management Menu */}
                {role === 'trader' && <TraderMenu />}

              
     
            </nav>
          </div>

          {/* BOTTOM: User Controls */}
          <div className='mt-auto pt-6 border-t border-white/5'>
            <MenuItem
              icon={FcSettings}
              label='Profile Settings'
              address='/dashboard/profile'
            />
            
            <button
              onClick={signoutUserFunc}
              className='flex cursor-pointer w-full items-center px-4 py-3 mt-4 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-200 group'
            >
              <GrLogout className='w-5 h-5 group-hover:rotate-12 transition-transform' />
              <span className='mx-4 font-bold uppercase text-xs tracking-widest'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar