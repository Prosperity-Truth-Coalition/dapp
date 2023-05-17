import React from 'react'
import { Diamonds } from "iconsax-react";
export default function PreLoader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className='text-pink-100 text-center'>
                <img src='/brandassets/logo.png' className="h-[100px] w-[100px] animate-pulse" />
                {/* <Diamonds className="h-[100px] w-[100px] animate-pulse" /> */}
                
            </div>



        </div>

    )
}
