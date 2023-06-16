'use client'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import exp from 'constants';

export const withAuth = (MyPages: any) => {

    return function WithAuth(props: any) {

        const [user, loading, error] = useAuthState(auth);
        const router = useRouter();
    

        const admin = async () => {

            // getting the admin id from the admin collection in the database
            let adminRef = doc(firestore, "admin", `${user?.uid}`);

            const docSnap = await getDoc(adminRef);

            if (loading) {

                return <div><h1>Loading...</h1></div>;

            } else {

                if (!user) {  
                    return router.push('/login');
                } else {
                    if (docSnap.exists()) {

                            if (user?.uid === docSnap.data().id) {
                                router.push('/admin');

                                return <div><h1>Loading...</h1></div>;
                            }
                      

                    } else {

                        if (user?.uid !== docSnap.data()?.id) {

                            router.replace('/');
                            return <div><h1>Loading...</h1></div>;
                        }
                        console.log('no admin record found');
                    }
                }
            }

            return <div><h1>Loading..</h1></div>
        };


        admin();


        return <MyPages {...props} />;
    };


}



