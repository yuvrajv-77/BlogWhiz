import React from 'react'

interface ButtonPrimaryProps {
    children: React.ReactNode;
    onClick?: () => Promise<void> | void;
    disabled?: boolean;
    className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` ${className || ''} bg-black cursor-pointer py-2 px-4 md:py-2 md:px-4 text-sm md:text- flex items-center gap-3 text-white rounded-full hover:bg-white hover:text-black focus:ring focus:ring-gray-300 border-black border transition duration-100 ease-in-out font-blog  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    )
}
export const ButtonSecondary: React.FC<ButtonPrimaryProps> = ({ children, onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` ${className || ''} bg-white cursor-pointer py-2 px-4 text-black rounded-full  hover:text-black focus:ring focus:ring-gray-300 border-black border transition duration-100 ease-in-out font-blog  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    )
}

export default ButtonPrimary