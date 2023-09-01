import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, firestore,  } from "../../../firebase/clientApp";
import { Toaster, toast } from "react-hot-toast";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { MainContext } from "@/Context/MainContex";
import { Chart } from "react-google-charts";
import { useEffectOnce } from "usehooks-ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { withAuth } from "@/hook/Auth";
import firebase from "firebase/app";


const AdminHome = () => {
  const [quote, setQuote] = useState<any>("");
  const [userName, setUserName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [userType, setUserType] = useState<any>("");
  const [user, loading, error] = useAuthState(auth);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [validationId, setValidationId] = useState<any>("");

  const [deviceChart, setDeviceChart] = useState<any>("");

  // useEffect(() => {
  //   const getQuotes = async () => {
  //     const response = await fetch("https://type.fit/api/quotes");
  //     const data = await response.json();
  //     const change = () => {
  //       const quoting = data[Math.floor(Math.random() * data.length)];
  //       setQuote(quoting);
  //     };
  //     change();
  //     setInterval(change, 50000);
  //   };
  //   getQuotes();

  // }, []);

  const login = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        toast.success(`New ${userType} created successful`, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        return setDoc(doc(firestore, `${userType}`, `${user.uid}`), {
          user_name: userName,
          email: email,
          id: user.uid,
        });
        // ...
      })
      .catch((error) => {
        const errorCode: any = error.code;
        const errorMessage: any = error.message;
        console.log(errorMessage, errorCode);
      });

    setShowAddForm(!showAddForm);
    setPassword("");
    setEmail("");
    setUserName("");
    setUserType("");

    console.log("input cleard");
  };


  // toggles modal for creating users
  const showModal = (e: any) => {
    setUserType(e.currentTarget.value);
    setShowAddForm(!showAddForm);
  };

  // gets the id for geting admins name from local storage
  useEffect(() => {
    const adminId: any = localStorage.getItem("adminId");
    setValidationId(JSON.parse(adminId));
  }, []);

  // form for creating users
  const NewUserForm = (
    <>
      <div
        className={
          showAddForm
            ? " w-full h-[93vh] z-10 fixed flex justify-center  items-center"
            : " hidden"
        }
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.178)",
        }}
      >
        <div className="flex flex-col w-96 rounded bg-white h-96 p-4 items-center mr-32 justify-center gap-8">
          <h1 className="text-2xl font-bold">New {userType}</h1>

          <input
            type="text"
            className="h-10 w-full outline-none px-2 "
            placeholder="Full name"
            onChange={(e) => {
              setUserName(e.currentTarget.value);
            }}
          />

          <input
            type="email"
            className="h-10 w-full outline-none px-2 "
            placeholder="email@gmail.com"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <input
            type="password"
            className="h-10 w-full outline-none px-2 "
            placeholder="password"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <div className="w-full flex flex-col gap-3">
            <button
              className="h-10 bg-red-500 text-white w-full "
              onClick={login}
            >
              Add
            </button>
            <button
              className="h-10 border text-black w-full "
              onClick={showModal}
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
    </>
  );




  const [userData, setUserData] = useState<any>([]);
  const [userD, setUserD] = useState([]);
  const [userWorkData, setUserWorkData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

const getUserData = () =>{
  let colref = collection(firestore, "users");

  onSnapshot(colref, (snaoshot: any) => {
    let datarec: any = [];
    snaoshot.forEach((doc: any) => {
      datarec.push({ ...doc.data(), id: doc.data().id });
      setUserD(datarec);
      setIsLoading(false)
    });
  });

}

  useEffectOnce(() =>{
    getUserData()

  })

  useEffect(() => {
    console.log("userD:", userD); 
    if (!isLoading && userD.length > 0) { // Check if userD has data and isLoading is false
      userD.forEach(({ id, email }) => {
        const unsub = onSnapshot(collection(firestore, "users", `${id}`, "tasks"), (doc) => {
          let taskData: any = [];
          doc.forEach((taskDoc: any) => {
            taskData.push({ ...taskDoc.data(), id: taskDoc.id }); // Use taskDoc.id instead of taskDoc.data().id
          });
          console.log("Task data for user", email, ":", taskData); 
          setIsLoading(false); // Consider whether this should be here
        });
      });
    }
  }, [isLoading, userD]); // Add isLoading and userD as dependencies
  


  return (
    <>
      {NewUserForm}
      <div className="flex flex-col items-center">
        {/* first components which is the welcome message and action button */}
        <div className="w-11/12 flex justify-between mt-20 p-2 ">
          <h2 className="text-4xl font-bold">Welcome, {'adminName'}</h2>

          {/* Add button */}
          <select
            required
            value={userType}
            onChange={(e) => showModal(e)}
            className="bg-red-500 p-1 text-white px-4 flex items-center gap-3 rounded hover:bg-red-400"
          >
            <option value="" disabled>
              Add New User
            </option>
            <option value="admin" onClick={showModal}>
              Admin
            </option>
            <option value="users" onClick={showModal}>
              User
            </option>
          </select>
        </div>

        {/* seconf section whic display the total work, total bad, and total goods with some random wise quates */}
        <div className=" w-full  flex items-center justify-center mt-20">
          <div className="w-10/12 flex gap-10 ">
            <div className="bg-white flex justify-between w-7/12 rounded h-32 overflow-hidden">
              {/* count display box */}
              <div className="w-52 flex flex-col gap-2 p-5 items-center">
                <p>Total Good</p>
                <h1 className="text-3xl font-bold">{'totalGood'}</h1>
              </div>
              {/* //////////// */}
              {/* count display box */}
              <div className="w-52 flex flex-col gap-2 p-5 items-center">
                <p>Total Bad</p>
                <h1 className="text-3xl font-bold">{'totalBad'}</h1>
              </div>
              {/* //////////// */}
              {/* count display box */}
              <div className="w-52 flex flex-col gap-2 p-5 items-center">
                <p>Total Device Recieved</p>
                <h1 className="text-3xl font-bold">{'totalWork'}</h1>
              </div>
              {/* //////////// */}
            </div>

            <div className=" w-5/12 p-2">
              <p className="text-3xl">
                {quote === "" ? "Quotes loading..." : `"${quote?.text}"`}
              </p>
              <p className="text-lg mt-3">{quote?.author}</p>
            </div>
          </div>
        </div>

        {/*///////// third section which will contain the table 
            that display the list of done added task,
            each row should have type of device, number of the bad and 
            the good ones,total and and current date.///////*/}
        <div className="w-11/12 gap-3 flex mb-10  justify-around  mt-28">
          {/* chart for device in repair */}
      {/* ////////////////////////// */}
        </div>
      </div>
    </>
  );
};

export default withAuth(AdminHome);
