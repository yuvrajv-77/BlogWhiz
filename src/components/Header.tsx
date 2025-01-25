import { PiNotePencilLight } from "react-icons/pi";

import { useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import ButtonPrimary from "./ButtonPrimary";
import useModal from "../hooks/useModal";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "./Dropdown";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { RxPencil2 } from "react-icons/rx";

const Header = () => {
  const { user, userDetail, handleLogout } = useAuth();

  const { setOpenGetStarted, openGetStarted } = useModal();

  const navigate = useNavigate();

  const name = user?.displayName || userDetail?.displayName || "A Reader or Author";
 

  const dropdownItems = [
    {
      label: 'Profile',
      url: '/admin/dashboard',
      icon: <AiOutlineUser size={18} />
      
    },

    {
      label: 'Log Out',
      url: '/', 
      onClick: handleLogout,
      icon:<IoMdLogOut color="red" size={18}/>,
      color: 'red'
    },

  ];

  return (
    <header className="px-5 md:px-36 border-b border-gray-200  ">
      <div className="flex items-center justify-between py-2">
        <div>
          <Link to="/">
            <h1 className="text-2xl md:text-4xl font-logo font-bold cursor-pointer">
              BlogWhiz
            </h1>
          </Link>
        </div>
        <div>
          <div className="flex gap-9 items-center">
            <button
              className="text-gray-600 hidden  hover:text-black md:inline-flex items-center gap-2 p-1"
              onClick={() =>
                user ? navigate("/admin/form") : setOpenGetStarted(true)
              }
            >
              <RxPencil2 size={22}/>
              <p>Write</p>
            </button>
            <>
              {user ? (
                <Dropdown
                  items={dropdownItems}
                  buttonText={<>
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      className={`size-8 md:size-10 object-cover rounded-full cursor-pointer`}
                      alt="user profile" />
                    <p className="hidden lg:block font-brand">{name}</p>
                  </>}

                />

                // <div className="relative" ref={dropdownRef}>
                //   <button
                //     className="flex items-center gap-3"
                //     onClick={() => setIsOpen(!isOpen)}
                //   >
                //     <img
                //       src={profileImage}
                //       className={`size-8 md:size-10 object-cover rounded-full cursor-pointer`}
                //       alt="user profile"
                //     />
                //     <p className="hidden lg:block font-brand">{name}</p>
                //   </button>
                //   {isOpen && (
                //     <ul className="absolute border bg-white w-40 space-y-2 p-3 my-3 shadow-lg right-0">
                //       <li className=" flex" onClick={() => setIsOpen(false)}>
                //         <Link
                //           className="p-1 hover:bg-gray-100 w-full"
                //           to="/admin/dashboard"
                //         >
                //           My Blogs
                //         </Link>
                //       </li>
                //       <li
                //         className="p-1  text-red-500 hover:bg-gray-100 "
                //         onClick={handleLogout}
                //       >
                //         Log Out
                //       </li>
                //     </ul>
                //   )}
                // </div>
              ) : (
                <div
                  onClick={() => {
                    setOpenGetStarted(true);
                  }}
                >
                  <ButtonPrimary>Get Started</ButtonPrimary>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
      <Toaster />
    </header>
  );
};

export default Header;
