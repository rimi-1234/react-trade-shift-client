/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-3 my-2 transition-all duration-300 transform rounded-xl group ${
          isActive
            ? 'bg-blue-600/10 text-blue-500 border-l-4 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.1)]'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      {/* Icon with hover scaling */}
      <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />

      {/* Label with improved typography */}
      <span className='mx-4 font-bold uppercase text-[11px] tracking-[0.15em]'>
        {label}
      </span>
    </NavLink>
  )
}

export default MenuItem