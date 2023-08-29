"use client";
import NavBar from "@/Components/navbar";
import { useContext, useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import { auth, firestore } from "../../../firebase/clientApp";
import { ImExit } from "react-icons/im";
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
import { AiFillHome } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";
import { MdAdminPanelSettings, MdEngineering } from "react-icons/md";
import { signOut } from "firebase/auth";
import Loading from "@/Components/custome-loader/Loading";
// import { adminAuth } from "@/hooks/Auth";

const Admin = () => {
  const [navigator, setNavigator] = useState<any>("admin");
  const [user, loading, error] = useAuthState(auth);
  // const [isloading, setIsLoading] = useState(false);


  const logOutAdmin = (e: any) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        toast.success("log out user successful");
      })
      .catch((error) => {
        alert("error loging out user");
      });
  };
  return (
    <>
      {loading ? (
        <>
        <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
            <Loading />
          </div>
        </>
      ) : (
        user && (
          <>
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
                      <li
                        className="flex cursor-pointer items-center text-white gap-3 "
                        onClick={() => setNavigator("admin")}
                      >
                        <span className="text-white">
                          <AiFillHome />
                        </span>
                        Home
                      </li>

                      <li
                        className="flex cursor-pointer items-center text-white gap-3 "
                        onClick={() => setNavigator("admins")}
                      >
                        <span className="text-white">
                          <MdAdminPanelSettings />
                        </span>
                        Admins
                      </li>

                      <li
                        className="flex cursor-pointer items-center text-white gap-3 "
                        onClick={() => setNavigator("users")}
                      >
                        <span className="text-white">
                          <MdEngineering />
                        </span>
                        Engineers
                      </li>

                      <li
                        className="flex cursor-pointer items-center text-white gap-3 "
                        onClick={() => setNavigator("works")}
                      >
                        <span className="text-white">
                          <GiAutoRepair />
                        </span>
                        Works
                      </li>
                    </ul>
                  </div>
                  <button
                    className="absolute bottom-10 flex items-center gap-2 text-white"
                    onClick={logOutAdmin}
                  >
                    <ImExit />
                    Sign out
                  </button>
                </div>

                {/* main section */}
                <div className="w-full relative  overflow-y-auto ">
                  {navigator === "admins" && <Admins />}
                  {navigator === "admin" && <AdminHome />}
                  {navigator === "users" && <Users />}
                  {navigator === "works" && <Works />}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default withAuth(Admin);
