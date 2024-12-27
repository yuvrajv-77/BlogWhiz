
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { AiOutlineClose, AiOutlineLeft } from 'react-icons/ai';
import { GetStartedContext } from '../contexts/GetStarted';
import { useContext } from 'react';

const SignInForm = () => {
    const { loading, error, email, setEmail, password, setPassword, handleEmailAccountLogin} = useAuth();
    const { setOpenGetStarted, showSignIn, setShowSignIn} = useContext(GetStartedContext)

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEmailAccountLogin();
    }
    return (
        <div className='flex  flex-col gap-4 '>
            <span className='absolute right-8 hover:bg-gray-200 rounded-full top-8 cursor-pointer p-3' onClick={() => setOpenGetStarted(false)}><AiOutlineClose size={21}   /></span>
            {showSignIn && <span className='absolute left-8 top-8 hover:bg-gray-200 rounded-full  cursor-pointer p-3 'onClick={() => setShowSignIn(false)} ><AiOutlineLeft size={21}  /></span>}
            <h1 className='text-center text-4xl font-logo font-bold mb-14'>Sign In with email.</h1>
            <form className=' text-sm flex flex-col gap-y-2' action="" onSubmit={handleFormSubmit} >
               
                <div className=' space-y-3'>
                    <p>Email</p>
                    <input className='bg-gray-100 font-blog rounded-md w-[20rem] p-3 text-md '
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" />
                </div>
                <div className=' space-y-3'>
                    <p>Password</p>
                    <input className='bg-gray-100  font-blog rounded-md w-[20rem] p-3 text-md '
                        placeholder='Create a Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" />
                </div>
                <Link className='text-xs text-gray-600 hover:text-black text-right ' onClick={() => setOpenGetStarted(false)} to='/forgotPassword'>Forgot Password ?</Link>

                <p className='text-center text-red-400'>{error?.message}</p>
                <div>
                    <button
                        className='w-full  bg-black border-black hover:bg-white hover:text-black hover:shadow-2xl text-white inline-flex items-center justify-center gap-1 rounded-full py-3 px-2 my-3 border focus:ring focus:ring-gray-300'>
                        {loading ? (
                            <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "Sign In"}
                    </button>
                </div>
                

            </form>
        </div>
    )
}

export default SignInForm