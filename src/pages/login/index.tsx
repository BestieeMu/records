'use client'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';


import { auth } from '../../../firebase/clientApp'
import { withAuth } from "@/hook/Auth";



const Login: React.FC = () => {
  const [email, setEmail] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)



  const login = () => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       
        toast.success('Successfully toasted!')
        setIsLoading(false)
        setEmail('')
        setPassword('')
        return user;
        // ...
      })
      .catch((error) => {
        toast.error("wrong crediential ")
        setIsLoading(false)
        setEmail('')
        setPassword('')
      });
      

  }

  

    
  return (
    <>
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

    </>
  )
}

export default withAuth(Login);