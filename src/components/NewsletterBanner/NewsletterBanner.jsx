import React from 'react';
// We'll use an icon from react-icons.
// Run: npm install react-icons
import { HiOutlineMail } from 'react-icons/hi';
import { CouponIcon } from '../CouponIcon/CouponIcon';
// We will create this SVG icon below

function NewsletterBanner() {
    return (
        <div className="relative w-full bg-indigo-700 overflow-hidden">
            {/* Background decorative patterns (optional) */}
            <div className="absolute -top-10 -right-10 text-indigo-600 opacity-10">
                <svg width="400" height="400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* A simple placeholder for the background patterns in the image */}
                    <path d="M100 0 L200 100 L100 200 L0 100 Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M300 200 L400 300 L300 400 L200 300 Z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* == Left Column: Text & Form == */}
                    <div className="flex flex-col justify-center">
                        <span className="text-indigo-200 font-medium">
                            20% discount for your first order
                        </span>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                            Join our newsletter and get...
                        </h2>
                        <p className="mt-4 text-lg text-indigo-100">
                            Join our email subscription now to get updates on promotions and coupons.
                        </p>

                        {/* Subscription Form */}
                        <form className="mt-8 flex w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex-1">
                                {/* Mail Icon */}
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineMail className="h-5 w-5 text-gray-400" />
                                </div>

                                {/* Email Input */}
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="
    w-full py-3 pl-12 pr-4
    border-0
    bg-white  /* <-- This class ensures a white background */
    rounded-l-md
    text-gray-900
    placeholder-gray-500
    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none
  "
                                />
                            </div>

                            {/* Subscribe Button */}
                            <button
                                type="submit"
                                className="
                  px-6 py-3
                  rounded-r-md
                  bg-indigo-900
                  text-white font-semibold
                  hover:bg-indigo-800
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* == Right Column: Coupon Image == */}
                    <div className="hidden lg:flex items-center justify-center">
                        {/* We use a custom SVG component here for a clean, code-only solution */}
                        <CouponIcon className="w-full max-w-md text-white" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NewsletterBanner;