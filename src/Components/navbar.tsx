
import Image from "next/image";
import LogoIcon from '../assets/logo.png'
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
import { ImExit } from 'react-icons/im'
import { AiFillCaretDown } from 'react-icons/ai'
import { MainContext } from "@/Context/MainContex";
import { useContext, useEffect, useState } from "react";

const colors = [
  {
    color: 'blue',
    text: 'blue'
  },
  {
    color: 'red',
    text: 'red'
  },
  {
    color: 'indianred',
    text: 'indianred'
  },
  {
    color: 'purple',
    text: 'purple'
  },
  {
    color: 'olive',
    text: 'olive'
  },
  {
    color: 'navy',
    text: 'navy'
  },
  {
    color: 'hotpink',
    text: 'hotpink'
  },
  {
    color: 'indigo',
    text: 'indigo'
  },
]

const NavBar = () => {
const [dropDown, setDropDown] = useState(false)
  const { getAllColor, color } = useContext(MainContext)

  const logOut = (e: any) =>{
e.preventDefault()
signOut(auth).then(() => {
  toast.success('log out user successful')

}).catch((error) => {
   alert('error loging out user')
});

  }

  const setColor = (color: string) =>{
    getAllColor(color)
    setDropDown(!dropDown)
  }
  const openDropDown = () =>{
    setDropDown(!dropDown)
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
      <div className="flex items-center relative gap-7 bg-white h-12 mr-14">
<div className="flex items-center cursor-pointer gap-1" onClick={openDropDown}>
  {/* select color */}
<div className={`w-8 h-8 rounded-full flex items-center h-12 justify-center`}
style={{
  backgroundColor: `${color}`
}}
>
</div>
<span><AiFillCaretDown /></span>
</div>

{/* drop down colors */}
{
dropDown &&
  <div className="bg-white drop-shadow-md flex items-center justify-center py-2 px-2 flex-col absolute top-[100%] right-0 w-[200px] rounded">

  {
    colors.map(({color, text}) =>(
      <>
      <div className="flex items-center hover:bg-red-400 w-10/12 px-4 cursor-pointer py-1 gap-3 justify-start" onClick={() => setColor(color)}>
    {/* select color */}
  <div className={`w-5 h-5 rounded-full flex items-center h-12 justify-center`}
  style={{
    backgroundColor: `${color}`
  }}
  >
  </div>
  <span className="text-center">{text}</span>
  </div>
      </>
    ))
  }
  
  </div>
}

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