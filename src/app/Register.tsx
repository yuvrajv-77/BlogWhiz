'use client'
import React, { useEffect } from 'react'
// import { useAuth } from '../../../lib/context/AuthContext'
// import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
// import Link from 'next/link';

const Register = () => {

    const {  user, loading, error, name, setName, email, setEmail, password, setPassword, handleEmailAccountCreation, handlesignInWithGoogle, handlesignInWithGithub  } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    },[user, navigate]);
        
  
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEmailAccountCreation();
        
    }


    return (
        <div className='flex items-center justify-center h-screen border'>
            <div>
                <form className=' space-y-4' action="" onSubmit={handleFormSubmit}>
                    <div className=' space-y-3'>
                        <p>Name</p>
                        <input className='bg-gray-100 font-blog w-[30rem] p-3 text-md '
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" />
                    </div>
                    <div className=' space-y-3'>
                        <p>Email</p>
                        <input className='bg-gray-100 font-blog w-[30rem] p-3 text-md '
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" />
                    </div>
                    <div className=' space-y-3'>
                        <p>Password</p>
                        <input className='bg-gray-100  font-blog w-[30rem] p-3 text-md '
                            placeholder='Create a Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                    </div>
                    <div className='flex justify-between'>
                        <Link className='text-sm text-gray-600 hover:text-black' to={'/login'}>Already have an account? Sign In</Link>
                    </div>                   
                     <p className='text-center text-red-400'>{error?.message}</p>
                    <div>
                        <button
                            className='w-full  bg-black border-black hover:bg-white hover:text-black hover:shadow-2xl text-white inline-flex items-center justify-center gap-1 py-3 px-3 my-3 border focus:ring focus:ring-gray-300'>
                            {loading ? (
                                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : "Create Account"}
                        </button>
                    </div>
                    <p className='text-center'>Or</p>

                </form>
                <div className='space-y-2'>
                    <button
                        onClick={() => { handlesignInWithGoogle() }}
                        className='w-full  bg-black border-black hover:bg-white hover:text-black hover:shadow-2xl text-white inline-flex items-center justify-center gap-3 py-3 px-3 my-3 border focus:ring focus:ring-gray-300'>
                        <FcGoogle size={21} /> Sign in with Google
                    </button>
                    <button
                        onClick={() => { handlesignInWithGithub() }}
                        className='w-full  bg-black border-black hover:bg-white hover:text-black hover:shadow-2xl text-white inline-flex items-center justify-center gap-3 py-3 px-3 my-3 border focus:ring focus:ring-gray-300'>
                        <AiOutlineGithub size={21} />Sign in with Github
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register