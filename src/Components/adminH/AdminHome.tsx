import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../../../firebase/clientApp';
import { Toaster, toast } from "react-hot-toast";
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { MainContext } from '@/Context/MainContex';
import { Chart } from "react-google-charts";
import { useEffectOnce } from "usehooks-ts";

const AdminHome = () => {
  const [quote, setQuote] = useState<any>('');
  const [userName, setUserName] = useState<any>('')
  const [email, setEmail] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [userType, setUserType] = useState<any>('')
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [validationId, setValidationId] = useState<any>("");

  const [deviceChart, setDeviceChart] = useState<any>('')

  useEffect(() => {
    const getQuotes = async () => {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const change = () => {
        const quoting = data[Math.floor(Math.random() * data.length)];
        setQuote(quoting);
      };
      change();
      setInterval(change, 50000);
    };
    getQuotes();

  }, []);




  const login = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        toast.success(`New ${userType} created successful`,
          {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );


        return setDoc(doc(firestore, `${userType}`, `${user.uid}`), {
          user_name: userName,
          email: email,
          id: user.uid
        });
        // ...
      })
      .catch((error) => {
        const errorCode: any = error.code;
        const errorMessage: any = error.message;
        console.log(errorMessage, errorCode);

      });

    setShowAddForm(!showAddForm)
    setPassword('')
    setEmail('')
    setUserName('')
    setUserType('')

    console.log('input cleard');
  }

  const { adminName, updateAdminName, users } = useContext(MainContext)

  // this function gets the users information like the users name and email
  const userInfo = async () => {
    if (validationId) {
      const docRef = doc(firestore, "admin", `${validationId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:",);

        updateAdminName(docSnap.data().user_name)

      }
    }

  }
  userInfo();

  // toggles modal for creating users
  const showModal = (e: any) => {
    setUserType(e.currentTarget.value);
    setShowAddForm(!showAddForm);

  };

  // gets the id for geting admins name from local storage
  useEffect(() => {
    const adminId: any = localStorage.getItem('adminId');
    setValidationId(JSON.parse(adminId))
  }, [])

  // form for creating users
  const NewUserForm = (<>
    <div className={showAddForm ? " w-full h-[93vh] z-10 fixed flex justify-center  items-center" : ' hidden'} style={{
      backgroundColor: 'rgba(0, 0, 0, 0.178)'
    }} >

      <div className="flex flex-col w-96 rounded bg-white h-96 p-4 items-center mr-32 justify-center gap-8">

        <h1 className="text-2xl font-bold">New {userType}</h1>

        <input type="text"
          className="h-10 w-full outline-none px-2 "
          placeholder="Full name"
          onChange={e => { setUserName(e.currentTarget.value); }}
        />

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
        <div className="w-full flex flex-col gap-3">
          <button className="h-10 bg-red-500 text-white w-full " onClick={login}>Add</button>
          <button className="h-10 border text-black w-full " onClick={showModal}>Cancle</button>
        </div>

      </div>

    </div>
  </>)


  const { adminData } = useContext(MainContext)


  // check total work done by adding up total task
  let totalWork = adminData && adminData?.reduce((total: any, currentValue: any) => {
    return total + currentValue.works.total_device_repair;
  }, 0);


  // check total good device done by adding up all the good devices
  let totalGood = adminData && adminData?.reduce((total: any, currentValue: any) => {
    return total + currentValue.works.good_device;
  }, 0);


  // check total bad device done by adding up all the bad devices
  let totalBad = adminData && adminData?.reduce((total: any, currentValue: any) => {
    return total + currentValue.works.bad_device;
  }, 0);

  // chart data for device 
  const deviceData = [
    ["condition", "Amount of devices"],
    ["Bad Devices", totalBad],
    ["Good Devices", totalGood],
    ["Total Repaird Devices", totalWork],
  ];

  const device = {
    title: "Repaired Devices Chart",
    is3D: true,
  };


  const [userData, setUserData] = useState<any>([]);
  const [userD, setUserD] = useState<any>([]);
  const [userWorkData, setUserWorkData] = useState<any[]>([]);

// first logic
  useEffectOnce(() => {
    adminData &&  adminData.map((data: any) => {
      let colref = collection(firestore, "users", `${data.user?.id}`, "tasks");

      return onSnapshot(colref, (snapshot: any) => {
        let dataRec: any = [];
        snapshot.forEach((doc: any) => {
          dataRec.push({ ...doc.data() });
        });

        let totalBad = dataRec.reduce((total: any, currentValue: any) => {
          return total + currentValue.total_device_repair;
        }, 0);

        setUserD((prevData: any) => [...prevData, { userName: data.user.user_name, totalBad }]);
      });
    });
  });

// second logic
  useEffectOnce(() => {
    users && users.map((user: any) => {
      setUserData((prevData: any) => {
        const userIndex = prevData.findIndex((item: any) => item.userName === user.user_name);

        if (userIndex !== -1) {
          const updatedData = [...prevData];
          updatedData[userIndex].userWork = userD.filter((item: any) => item.userName === user.user_name);
          return updatedData;
        } else {
          return [...prevData, { userName: user.user_name, userWork: userD.filter((item: any) => item.userName === user.user_name) }];
        }
      });
    });



  });

// using final result
  const usersData = [
    ["condition", "Amount of devices"],
    ...userWorkData?.map((item: any) => [item.userName, item.totalWork])
  ];

  const userWork = {
    title: "Engineers Works Charts",
    is3D: true,
  };

  return (
    <>
      {NewUserForm}
      <div className='flex flex-col items-center'>
        {/* first components which is the welcome message and action button */}
        <div className='w-11/12 flex justify-between mt-20 p-2 '>
          <h2 className='text-4xl font-bold'>Welcome, {adminName}</h2>

          {/* Add button */}
          <select
            required
            value={userType}
            onChange={(e) => showModal(e)}
            className='bg-red-500 p-1 text-white px-4 flex items-center gap-3 rounded hover:bg-red-400'
          >
            <option value="" disabled>Add New User</option>
            <option value="admin" onClick={showModal} >Admin</option>
            <option value="users" onClick={showModal}>User</option>
          </select>

        </div>

        {/* seconf section whic display the total work, total bad, and total goods with some random wise quates */}
        <div className=' w-full  flex items-center justify-center mt-20'>
          <div className='w-10/12 flex gap-10 '>

            <div className='bg-white flex justify-between w-7/12 rounded h-32 overflow-hidden'>
              {/* count display box */}
              <div className='w-52 flex flex-col gap-2 p-5 items-center'>
                <p>Total Good</p>
                <h1 className='text-3xl font-bold'>{totalGood}</h1>
              </div>
              {/* //////////// */}
              {/* count display box */}
              <div className='w-52 flex flex-col gap-2 p-5 items-center'>
                <p>Total Bad</p>
                <h1 className='text-3xl font-bold'>{totalBad}</h1>
              </div>
              {/* //////////// */}
              {/* count display box */}
              <div className='w-52 flex flex-col gap-2 p-5 items-center'>
                <p>Total Repaired</p>
                <h1 className='text-3xl font-bold'>{totalWork}</h1>
              </div>
              {/* //////////// */}
            </div>

            <div className=' w-5/12 p-2'>
              <p className='text-3xl'>
                {quote == '' ? 'Quotes loading...' : `"${quote?.text}"`}

              </p>
              <p className="text-lg mt-3">{quote?.author}</p>
            </div>

          </div>

        </div>

        {/*///////// third section which will contain the table 
            that display the list of done added task,
            each row should have type of device, number of the bad and 
            the good ones,total and and current date.///////*/}
        <div className='w-11/12 gap-3 flex mb-10  justify-around  mt-28'>
          {/* chart for device in repair */}
          <div className='w-9/12'>
            <Chart
              chartType="PieChart"
              data={deviceData}
              options={device}
              width={"100%"}
              height={"400px"}
            />
          </div>
          {/* for users per work */}
          <div className='w-9/12 '>
            <Chart
              chartType="PieChart"
              data={usersData}
              options={userWork}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminHome