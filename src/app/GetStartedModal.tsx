import { useContext, useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlineX,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import SignUpForm from "../components/forms/SignUpForm";
import SignInForm from "../components/forms/SignInForm";
import { GetStartedContext } from "../contexts/GetStarted";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../config/firebaseConfig";


const GetStartedModal = () => {
  const { user, handlesignInWithGoogle, handlesignInWithGithub } = useAuth();
  const {
    setOpenGetStarted,
    isGetStarted,
    setIsGetStarted,
    showSignUp,
    setShowSignUp,
    showSignIn,
    setShowSignIn,
  } = useContext(GetStartedContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOpenGetStarted(false);
      navigate("/feed");
    }
  }, [user, navigate]);
  
  return (
    <div className="flex justify-center size-full  md:size-[678px] py-20 items-center bg-white border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 fixed">
      {/* for sign up */}
      {isGetStarted ? (
        showSignUp ? (
          <SignUpForm />
        ) : (
          <div className="flex  flex-col gap-4 ">
            <span className="absolute right-8 hover:bg-gray-200 rounded-full top-8 cursor-pointer p-3" onClick={() => setOpenGetStarted(false)}>
              <AiOutlineClose
                size={21}
                
              />
            </span>
            <h1 className="text-center text-4xl font-logo font-bold mb-14">
              Join BlogWhiz.
            </h1>

            <button
              onClick={() => {
                handlesignInWithGoogle();
              }}
              className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
            >
              <FcGoogle size={21} /> Sign up with Google{" "}
              <span className="size-5 "></span>
            </button>
            <button
              onClick={() => {
                handlesignInWithGithub();
              }}
              className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
            >
              <AiOutlineGithub size={21} />
              Sign up with Github<span className="size-5 "></span>
            </button>
            <button
              // onClick={() => { handlesignInWithGithub() }}
              className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
            >
              <AiOutlineX size={21} />
              Sign up with X<span className="size-5 "></span>
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
            >
              <AiOutlineMail size={21} />
              Sign up with Email<span className="size-5 "></span>
            </button>
            <div className=" text-center font-blog mt-6">
              <p>
                Already have an account?
                <span
                  className="font-bold hover:underline cursor-pointer"
                  onClick={() => setIsGetStarted(!isGetStarted)}
                >
                  {" "}
                  Sign In
                </span>
              </p>
            </div>
          </div>
        )
      ) : showSignIn ? (
        <SignInForm />
      ) : (
        <div className="flex flex-col gap-4">
          <span className="absolute right-8 hover:bg-gray-200 rounded-full top-8 cursor-pointer p-1">
            <AiOutlineClose
              size={21}
              onClick={() => setOpenGetStarted(false)}
            />
          </span>

          <h1 className="text-center text-4xl font-logo font-bold mb-16">
            Welcome Back.
          </h1>
          <button
            onClick={() => {
              handlesignInWithGoogle();
            }}
            className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
          >
            <FcGoogle size={21} /> Sign in with Google{" "}
            <span className="size-5 "></span>
          </button>
          <button
            onClick={() => {
              handlesignInWithGithub();
            }}
            className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
          >
            <AiOutlineGithub size={21} />
            Sign in with Github<span className="size-5 "></span>
          </button>
          <button
            // onClick={() => { handlesignInWithGithub() }}
            className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
          >
            <AiOutlineX size={21} />
            Sign in with X<span className="size-5 "></span>
          </button>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-white w-80 px-4 font-blog py-3 text-black rounded-full inline-flex items-center justify-between gap-3 hover:text-gray-700   border-black border"
          >
            <AiOutlineMail size={21} />
            Sign in with Email<span className="size-5 "></span>
          </button>
          <div className=" text-center font-blog mt-6">
            <p>
              No Account?
              <span
                className="font-bold hover:underline cursor-pointer"
                onClick={() => setIsGetStarted(!isGetStarted)}
              >
                {" "}
                Create One
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStartedModal;
