import NavBar from "@/Components/navbar"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { auth, firestore } from "../../firebase/clientApp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
 import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";



const Admin = () => {
  const [quote, setQuote] = useState<any>('');
   const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState<any>('')
    const [email, setEmail] = useState<any>('')
    const [password, setPassword] = useState<any>('')
    const [userType, setUserType] = useState<any>('')
    const [collectionChange, setCollectionChange] = useState<any>('')
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [adminId, setAdminId] = useState<any>('');

      const router = useRouter()

    useEffect(() => {
    const getQuotes = async ()  => {
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

    // validatin if the user is admin or 
  let adminRef = doc(firestore, 'admin', `${user?.uid}`)

//     const admin = async () =>{
    
//     const docRef = adminRef;
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
      
//       setAdminId(docSnap.data().id)
//       // console.log(docSnap.data().id);
//       // console.log(userId);
//       if (docSnap.data().id === user?.uid ) {
//         console.log('admin user log in');
//          router.push('/')
        
//       }else{
//         console.log('none admin log in');
//         router.push('/admin')
        
//       }
      
//     } else {
//       // docSnap.data() will be undefined in this case
      
//     }
    
//   }
//   useEffect(() => {
// admin()
//   }, [])
  

// const clearForm = () =>{
//         setPassword('')
//         setEmail('')
//         setUserName('')
//         setUserType('')
       
        
// }
  
  const showModal = (e: any) => {
     setUserType(e.currentTarget.value);
    setShowAddForm(!showAddForm);

  };

    const login = () =>{


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

        return setDoc(doc(firestore, `${userType}`, `${user.uid}`),{
          user_name: userName,
          email: email,
          id: user.uid
        });
        // ...
      })
      .catch((error) => {
        const errorCode: any = error.code;
        const errorMessage: any  = error.message;
        console.log(errorMessage, errorCode);
        
      });

        setShowAddForm(!showAddForm)
        setPassword('')
        setEmail('')
        setUserName('')
        setUserType('')
       
 console.log('input cleard');
    }


  const NewUserForm = (<>
  <div className={showAddForm ? " w-full h-screen   absolute flex justify-center  items-center" : ' hidden'} style={{
      backgroundColor: 'rgba(0, 0, 0, 0.178)'
  }}>

<div className="flex flex-col w-96 rounded bg-white h-96 p-4 items-center justify-center gap-8">

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

  return (
    <>
    {!user && <Login />}
{user && (<>
       <div>
<NavBar />
    </div>
   <div className="w-full h-screen mt-12 flex relative justify-center">

{NewUserForm}

    <div className="w-11/12 flex justify-center ">
        <div className=' over-flow-scroll w-full px-5  py-3 mt-20'>
{/* first components which is the welcome message and action button */}
        <div className='w-full flex justify-between mt-20 p-2 '>
    <h2 className='text-4xl font-bold'>Welcome, Admin</h2>
    {/* Add button */}
    {/* <button className='bg-red-500 p-1 text-white px-2 flex items-center gap-3 rounded hover:bg-red-400' onClick={showModal} >
      <span>
      <FontAwesomeIcon
        icon={faPlus}
        style={{ fontSize: 20, color: "white" }}
      />
      </span>
        Add New User
    </button> */}
<select 
  required
    value={userType}
    onChange={(e) => showModal(e)}
    className='bg-red-500 p-1 text-white px-4 flex items-center gap-3 rounded hover:bg-red-400' 
>
 <option value="" disabled>Add New User</option>
            <option value="admin"  onClick={showModal } >Admin</option>
            <option value="users"  onClick={showModal}>User</option>
</select>

        </div>

        {/* seconf section whic display the total work, total bad, and total goods with some random wise quates */}
        <div className=' w-full  flex items-center justify-center mt-20'>
            <div className='w-10/12 flex gap-10 '>

            <div className='bg-white flex justify-between w-7/12 rounded h-32 overflow-hidden'>
                {/* count display box */}
                <div className='w-52 flex flex-col gap-2 p-5 items-center'>
                    <p>Total Good</p>
                    <h1 className='text-3xl font-bold'>8</h1>
                </div>
                {/* //////////// */}
                {/* count display box */}
                <div className='w-52 flex flex-col gap-2 p-5 items-center'>
                    <p>Total Bad</p>
                    <h1 className='text-3xl font-bold'>789</h1>
                </div>
                {/* //////////// */}
                {/* count display box */}
                <div className='w-52 flex flex-col gap-2 p-5 items-center'>
                    <p>Total Repaired</p>
                    <h1 className='text-3xl font-bold'>89</h1>
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
<div className='w-full flex justify-center  mt-28'>

</div>

    </div>
    </div>
    
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
   </div>
   </>) }
    </>
  )
}

export default Admin