import React from 'react'

const ButtonPrimary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <button
            className='bg-black py-2 px-4 text-white rounded-full hover:bg-white hover:text-black focus:ring focus:ring-gray-300 border-black border transition duration-100 ease-in-out'
            >
            {children}
        </button>
        )
}

export default ButtonPrimary