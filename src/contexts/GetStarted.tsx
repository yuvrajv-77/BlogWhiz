import React, { useState } from 'react'

interface GetStartedContextType {
  isGetStarted: boolean
  setIsGetStarted: React.Dispatch<React.SetStateAction<boolean>>
  showSignUp: boolean
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>
  showSignIn: boolean
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
  openGetStarted: boolean
  setOpenGetStarted: React.Dispatch<React.SetStateAction<boolean>>
}

export const GetStartedContext = React.createContext<GetStartedContextType>({} as GetStartedContextType)

const GetStartedProvider = ({children}: {children: React.ReactNode}) => {
    const [openGetStarted, setOpenGetStarted] = useState(false); // open GetStarted box
    const [isGetStarted, setIsGetStarted] = useState(true); // is getStarted to show login components(tru), or sign up components(false)
    const [showSignUp, setShowSignUp] = useState(false); // to show sign up form
    const [showSignIn, setShowSignIn] = useState(false); // to show sign in form
  return (
    <GetStartedContext.Provider value={{
        isGetStarted,
        setIsGetStarted,
        showSignUp,
        setShowSignUp,
        showSignIn,
        setShowSignIn,
        openGetStarted,
        setOpenGetStarted
    }}>
        {children}
    </GetStartedContext.Provider>
  )
}

export default GetStartedProvider