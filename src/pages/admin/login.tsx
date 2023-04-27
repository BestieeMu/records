// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from 'react';
// import { auth, firestore } from '../../../firebase/clientApp'
// import { doc, setDoc } from "firebase/firestore";
// // import functions from 'firebase-functions'

     

// const Login = () => {

//     const [email, setEmail] = useState<any>('')
//     const [password, setPassword] = useState<any>('')


//     const login = () =>{

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         alert('loged in')
//         return true;
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });

//     }


//   return (
//     <>
//     <div className="flex justify-center items-center w-full h-screen">

// <div className="flex flex-col w-96  h-96 p-4 items-center justify-center gap-8">

//     <h1 className="text-2xl font-bold">Login</h1>

//     <input type="email" 
//     className="h-10 w-full outline-none px-2 "
//      placeholder="email@gmail.com"
//      onChange={e => { setEmail(e.currentTarget.value); }}
//      />
//     <input type="password"
//      className="h-10 w-full outline-none px-2 "
//      placeholder="password"
//      onChange={e => { setPassword(e.currentTarget.value); }}
//      />

//     <button className="h-10 bg-red-500 text-white w-full " onClick={login}>Login</button>
// </div>

//     </div>
    
//     </>
//   )
// }

// export default Login