'use client'
import NavBar from "@/Components/navbar"
import { useContext, useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import { auth, firestore } from "../../../firebase/clientApp";
import { ImExit } from 'react-icons/im'
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
// import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { withAuth } from "@/hook/Auth";
import Link from "next/link";
import AdminHome from "@/Components/adminH/AdminHome";
import { useRouter } from "next/router";
import Admins from "@/Components/admins";
import Users from "@/Components/users";
import Works from "@/Components/works";
import { MainContext } from "@/Context/MainContex";
import { AiFillHome } from 'react-icons/ai'
import { GiAutoRepair } from 'react-icons/gi'
import { MdAdminPanelSettings, MdEngineering } from 'react-icons/md'
import { signOut } from "firebase/auth";
// import { adminAuth } from "@/hooks/Auth";



const Admin = () => {

  const [user, loading, error] = useAuthState(auth);

  const router = useRouter()

  const { updateData } = useContext(MainContext)

  const { users, getUserDate } = useContext(MainContext)


  const { paramsName = [] } = router.query

  useEffect(() => {
    const fetchData = async () => {
 
      
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        let datarec: any = [];
        querySnapshot.forEach((doc: any) => {
          datarec.push({ ...doc.data() });
       
        });
        getUserDate(datarec)

        const userData: any = [];
        updateData(userData)
        users?.map(async (user: any) => {
         
          const subCollectionSnapshot = await getDocs(
            collection(firestore, 'users', `${user.id}`, 'tasks')
          );
          subCollectionSnapshot.forEach((subDoc) => {
  // console.log(subDoc.data());
  
            userData.push({
              user: user,
              works: subDoc.data(),
            });
  
          });

        })
  
        // console.log(subDoc.id, ' => ', subDoc.data());

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

      
  },[])

  

  const logOutAdmin = (e: any) =>{
    e.preventDefault()
    signOut(auth).then(() => {
      toast.success('log out user successful')
    
    }).catch((error) => {
       alert('error loging out user')
    });
    
      }
  return (
    <>
      {loading ? (<>
        <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
          <h1>Loading...</h1>
        </div>
      </>)
        :
        user && (<>
          <div>
            <NavBar />
          </div>
          <div className="w-full  flex h-screen  justify-center">
            <div className="w-full flex justify-center  mt-12  ">
              {/* side bar */}
              <div className="w-52 bg-red-500 flex flex-col relative items-center ">
                <h1 className="text-2xl font-medium mt-20">Admin Panel</h1>
                <div className="mt-20">
                  <ul className="flex flex-col gap-7 text-xl">
                    <Link href='/admin'><li className="flex items-center text-white gap-3 "><span className="text-white"><AiFillHome /></span>Home</li></Link>
                    <Link href='/admins'><li className="flex items-center text-white gap-3 "><span className="text-white"><MdAdminPanelSettings /></span>Admins</li></Link>
                    <Link href='/users'><li className="flex items-center text-white gap-3 "><span className="text-white"><MdEngineering /></span>Engineers</li></Link>
                    <Link href='/works'><li className="flex items-center text-white gap-3 "><span className="text-white"><GiAutoRepair /></span>Works</li></Link>
                  </ul>
                </div>
                <button className="absolute bottom-10 flex items-center gap-2 text-white" onClick={logOutAdmin}><ImExit />Sign out</button>
              </div>


              {/* main section */}
              <div className='w-full relative  overflow-y-auto '>

                {paramsName === 'admins' && <Admins />}
                {paramsName === 'admin' && <AdminHome />}
                {paramsName === 'users' && <Users />}
                {paramsName === 'works' && <Works />}

              </div>

            </div>

          </div>
        </>)}
    </>
  )
}

export default Admin;