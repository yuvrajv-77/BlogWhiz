import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import ButtonPrimary from '../../components/ButtonPrimary';
import toast from 'react-hot-toast';

const NewPassword = () => {
    const { error, resetPassword } = useAuth();
    const [newPassword, setNewPassword ] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    // Extracting search parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    const oobCode = queryParams.get('oobCode');

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (oobCode) {
            toast.promise(resetPassword(oobCode, newPassword), {
                loading: 'Setting New Password',
                success: 'Done',
                error: 'Error in Changing Password',
            }, {
                success: {
                    duration: 5000,
                    icon: '✅',
                },
                error: {
                    duration: 5000,
                    icon: '❌',
                }
            })
            // navigate('/');
        }
    };

    return (
        <div className='flex my-56 justify-center'>
            <form className='flex flex-col gap-6  p-10' onSubmit={handleFormSubmit}>
                <h1 className='text-center text-2xl font-semibold font-blog'>New Password</h1>
                <div className=' space-y-3 font-brand font-semibold'>

                    <input className='bg-gray-100 font-logo w-[25rem] rounded-lg p-3 text-base'
                        placeholder='Enter a new Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password" />
                </div>
                <ButtonPrimary>
                    Reset Password
                </ButtonPrimary>

                <p className='text-center text-red-400'>{error?.message}</p>
            </form>
        </div>
    )
}

export default NewPassword;