'use client'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';


import { auth } from '../../../firebase/clientApp'
import { withAuth } from "@/hook/Auth";
import Loading from "@/Components/custome-loader/Loading";



const Login: React.FC = () => {
  const [email, setEmail] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useState<boolean>(false)



  const login = () => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setEmail("")
        setPassword('')
        toast.success('Successfully toasted!')
        setPageLoading(true)
        setIsLoading(false)
      
        return user;
        // ...
      })
      .catch((error) => {
        setEmail('')
        setPassword('')
        toast.error("wrong crediential ")
        setIsLoading(false)
        
      });
      

  }

  

    
  return (
    <>
{pageLoading ? (<>
        <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
        <Loading />
        </div>
      </>) : 
      <div className="flex justify-center items-center w-full h-screen">

        <div className="flex flex-col w-96  h-96 p-4 items-center justify-center gap-8">

          <h1 className="text-2xl font-bold">Login</h1>

          <input type="email"
            className="h-10 w-full outline-none px-2 "
            placeholder="email@gmail.com"
            onChange={e => { setEmail(e.currentTarget.value); }}
          />
          <input type="password"
            className="h-10 w-full outline-none px-2 "
            placeholder="password"
            onChange={e => { setPassword(e.currentTarget.value); }}
          />

          <button className="h-10 bg-red-500 text-white w-full " onClick={login}>{isLoading ? 'Loging...' : 'Login'}</button>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

      </div>
      }

    </>
  )
}

export default withAuth(Login);