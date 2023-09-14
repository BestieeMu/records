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
    <main className="w-full h-screen" style={{
          backgroundImage: `url('https://res.cloudinary.com/dmbsct2bo/image/upload/v1693573091/samples/afrifarm/pattern_waves-4_0.5_2_0-0_40_1__e00b0b_cfcfcf_vtnadh.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
    {pageLoading ? (<>
        <div className="w-full h-screen text-3xl font-medium flex items-center justify-center" >
        <Loading />
        </div>
      </>) : 
      <div className="flex justify-center items-center w-full h-screen">

        <div className="flex flex-col w-96  h-96 p-4 items-center justify-center gap-8">

          <h1 className="text-4xl text-white font-bold">Login</h1>

          <input type="email"
            className="h-10 w-full bg-transparent placeholder-white placeholder-opacity-75 border-white border-b-2 text-white outline-none px-2 "
            placeholder="email@gmail.com"
            value={email}
            onChange={e => { setEmail(e.currentTarget.value); }}
          />
          <input type="password"
            className="h-10 w-full bg-transparent placeholder-white placeholder-opacity-75  border-white border-b-2 text-white outline-none px-2 "
            placeholder="password"
            value={password}
            onChange={e => { setPassword(e.currentTarget.value); }}
          />

          <button className="h-10 bg-white text-black w-full " onClick={login}>{isLoading ? 'Loging...' : 'Login'}</button>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

      </div>
      }
    </main>


    </>
  )
}

export default withAuth(Login);