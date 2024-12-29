
import { useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { AiOutlineClose, AiOutlineLeft } from 'react-icons/ai';
import { GetStartedContext } from '../../contexts/GetStarted';

const SignUpForm = () => {
    const { loading, error, name, setName, email, setEmail, password, setPassword, handleEmailAccountCreation} = useAuth();
    const { setOpenGetStarted, showSignUp, setShowSignUp, } = useContext(GetStartedContext)

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEmailAccountCreation();
    }
    return (
        <div className='flex  flex-col gap-4 '>
            <span className='absolute right-8 hover:bg-gray-200 rounded-full top-8 cursor-pointer p-3' onClick={() => setOpenGetStarted(false)}><AiOutlineClose size={21}   /></span>
            {showSignUp && <span className='absolute left-8 top-8 hover:bg-gray-200 rounded-full  cursor-pointer p-3' onClick={() => setShowSignUp(false)}><AiOutlineLeft size={21}   /></span>}
            <h1 className='text-center text-4xl font-logo font-bold mb-14'>Sign up with email.</h1>
            <form className=' text-sm space-y-4' action="" onSubmit={handleFormSubmit} >
                <div className=' space-y-3'>
                    <p>Name</p>
                    <input className='bg-gray-100 font-blog rounded-md w-[20rem] p-3 text-md '
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" />
                </div>
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

                <p className='text-center text-red-400'>{error?.message}</p>
                <div>
                    <button
                        className='w-full  bg-black border-black hover:bg-white hover:text-black hover:shadow-2xl text-white inline-flex items-center justify-center gap-1 rounded-full py-3 px-2 my-3 border focus:ring focus:ring-gray-300'>
                        {loading ? (
                            <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "Create Account"}
                    </button>
                </div>
                

            </form>
        </div>
    )
}

export default SignUpForm