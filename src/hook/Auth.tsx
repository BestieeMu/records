"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import Loading from "@/Components/custome-loader/Loading";

export const withAuth = (MyPages: any) => {

  return function WithAuth(props: any) {

    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    const admin = async () => {
      // getting the admin id from the admin collection in the database
      let adminRef = doc(firestore, "admin", `${user?.uid}`);

      const docSnap = await getDoc(adminRef);

    
      if ( !user) {
        return router.push("/login");
      }

      if (loading) {
        return (
          <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
            <Loading />
          </div>
        );
      }

      if (docSnap.exists()) {
        if (user?.uid === docSnap.data().id) {
          router.push("/admin");

          return (
            <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
            <Loading />
          </div>
          );
        }
      } else {
        if (user?.uid !== docSnap.data()?.id) {
          router.replace("/");
          return (
            <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
            <Loading />
          </div>
          );
        }
      }

      return (
        <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
            <Loading />
          </div>
      );
    };

    useEffect(() => {
      admin();
    }, [user]);

    return <MyPages {...props} />;
  };
};
