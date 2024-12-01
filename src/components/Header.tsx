import { PiNotePencilLight } from 'react-icons/pi'

import { useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import ButtonPrimary from './ButtonPrimary';

import useModal from '../hooks/useModal';

const Header = () => {

    const { user, userDetail, handleLogout } = useAuth();

  const {setOpenGetStarted, openGetStarted} = useModal()
    
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
    const profileImage = user?.photoURL || "/avatar.jpg";

    return (
        <header className='px-2 md:px-36 border-b shadow-xs '>
            <div className='flex items-center justify-between py-4'>
                <div>
                    <h1 className='text-2xl md:text-4xl font-logo font-bold'>Blog One</h1>
                </div>
                <div>
                    <div className='flex gap-9 items-center'>
                        <button className='text-gray-600 hover:text-black inline-flex items-center gap-1 p-1'
                            onClick={() => user ? navigate('/admin/form') : setOpenGetStarted(true)}>
                            <PiNotePencilLight size={28} />
                            <p>Write</p>
                        </button>
                        <>
                            {user ? (
                                <div className='relative' ref={dropdownRef}>
                                    <button className='flex items-center gap-3' onClick={() => setIsOpen(!isOpen)}>
                                        <img src={profileImage} className={`size-6 md:size-10 object-cover rounded-full cursor-pointer`} alt="" />
                                        <p className='hidden lg:block font-brand'>{name}</p>
                                    </button>
                                    {isOpen && <ul className='absolute border bg-white w-40 space-y-2 p-3 my-3 shadow-lg right-0'>
                                        <li className=' flex' onClick={() => setIsOpen(false)}><Link className='p-1 hover:bg-gray-100 w-full' to='/admin/dashboard' >My Blogs</Link></li>
                                        <li className='p-1  text-red-500 hover:bg-gray-100 ' onClick={handleLogout}>Log Out</li>
                                    </ul>
                                    }
                                </div>
                            ) : (
                                <div  onClick={() => {setOpenGetStarted(true); console.log(openGetStarted);
                                }}>
                                    <ButtonPrimary >Get Started</ButtonPrimary>
                                </div>    
                            )
                            }
                        </>

                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header