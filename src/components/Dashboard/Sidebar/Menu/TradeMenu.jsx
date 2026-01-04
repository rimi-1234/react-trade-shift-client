import React from 'react';
import { BsBoxSeam, BsArrowDownLeftSquare, BsPlusCircle } from 'react-icons/bs';
import MenuItem from './MenuItem';

const TraderMenu = () => {
    return (
        <div className="mt-6">
            {/* Section Header */}
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
                Trade Management
            </p>
            
            {/* Export List */}
            <MenuItem
                icon={BsBoxSeam}
                label='My Exports'
                address='my-exports'
            />
            
            {/* Import List */}
            <MenuItem
                icon={BsArrowDownLeftSquare}
                label='My Imports'
                address='my-imports'
            />
            
            {/* Add New Product */}
            <MenuItem
                icon={BsPlusCircle}
                label='Add Export'
                address='add-export'
            />
        </div>
    );
};

export default TraderMenu;