import React from 'react'
import ButtonPrimary, { ButtonSecondary } from '../components/ButtonPrimary'
import useModal from '../hooks/useModal';
import { Navigate, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const LandingPage = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to='/feed' />
    }
    const { setOpenGetStarted, openGetStarted } = useModal();

    return (
        <>
            <div className="min-h-[calc(100vh-64px)] flex items-center bg-white ">
                <div className="container mx-auto px-4 mt-42 md:mt-0 gap-10 md:gap-0  sm:px-10 flex flex-col md:flex-row items-center ">

                    {/* Left Column */}
                    <div className="w-full  md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ">
                        <h1 className="text-4xl  sm:text-6xl lg:text-7xl font-logo font-extrabold leading-tight mb-4 text-gray-900 animate-[fadeIn_0.6s_ease-out]">
                            Share Your Stories
                            <br />
                            With The World
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 font-blog max-w-lg animate-[fadeIn_0.5s_ease-in]">
                            Create and share meaningful content with our simple blogging platform
                        </p>
                        <div className="flex  gap-4 animate-[fadeIn_0.6s_ease-in]">
                            <ButtonPrimary onClick={() => setOpenGetStarted(true)}>Get Started</ButtonPrimary>
                            
                            <ButtonSecondary onClick={ ()=> navigate('/feed')}>Read Blogs</ButtonSecondary>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 mt-12 md:ml-10 md:mt-0 ">
                        <img
                            src="/hero2.png"
                            alt="Blog Hero Image"
                            className="object-cover w- rounded-2xl animate-[fadeIn_0.7s_ease-in] hover:scale-105 shadow-lg hover:shadow-2xl transition-all duration-500   h-auto"
                        />
                    </div>

                </div>

            </div>


            <footer className="bg-white shadow-sm border-t border-gray-200">
                <div className="w-full mx-auto max-w-screen-xl p-4 sm:flex sm:items-center sm:justify-between ">
                    <h1 className="text-xl md:text-2xl font-logo font-bold text-gray-700 cursor-pointer">
                        BlogWhiz
                    </h1>
                    <ul className="flex flex-wrap items-center mt-3 text-sm  text-gray-600 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </footer>

        </>
    )
}

export default LandingPage