
import Image from "next/image";
import LogoIcon from '../assets/logo.png'
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { ImExit } from 'react-icons/im'
const NavBar = () => {

  const logOut = (e: any) =>{
e.preventDefault()
signOut(auth).then(() => {
  toast.success('log out user successful')

}).catch((error) => {
   alert('error loging out user')
});

  }

  return (
   <>
    <div className="bg-white h-12 flex items-center z-10 justify-between w-full fixed top-0">
      {/* logo */}
      <div className="flex items-center gap-5">
      <div className="bg-white h-12 line-nav w-14 flex items-center justify-center">
      <div className='w-12 h-12 bg-white flex items-center justify-center' >
      <Image
        src={LogoIcon}
        alt={'alt'}
        
      />
</div>
      </div>
<div className="w-72 font-bold flex items-center rounded">
<h1><span className="text-red-500">Device</span> Records</h1>
</div>
      </div>

{/* profile */}
      <div className="flex items-center gap-3 bg-white h-12 mr-14">
<div className='w-10 h-10 bg-white flex items-center h-12 justify-center'>
</div>
<div className=" rounded text-red-500 text-3xl cursor-pointer" onClick={logOut}><ImExit /></div>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
   </>
  )
}

export default NavBar