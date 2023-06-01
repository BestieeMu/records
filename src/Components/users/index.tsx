import { MainContext } from '@/Context/MainContex'
import React, { useContext } from 'react'
import { FiClipboard } from 'react-icons/fi'

const Users = () => {
  const { adminData, users } = useContext(MainContext)


  return (


    <>
      <div className='w-full  flex flex-col items-center  '>
        <div className='w-11/12 mt-10'>
          <h1 className='text-2xl font-medium'>List of all users </h1>
        </div>
        <div className='w-11/12 mt-28 flex gap-5  flex-col items-center '>
          {
           users && users?.map((user: any) => (
              <>
                   <div className='w-11/12 flex items-center drop-shadow-md justify-around bg-white h-24 rounded'>
            <span className='text-3xl'><FiClipboard /></span>
            <h1 className='text-xl font-medium'>{user.user_name}</h1>
            <h1 className='text-xl font-medium'>{user.email}</h1>
            <button className='w-32 h-12 hover:bg-red-500 hover:text-white hover:border-0 rounded-tr-lg rounded-br-lg rounded-bl-lg border-2 text-center'>View Work</button>
          </div>
              </>
            ))}
      



        </div>
      </div>

    </>
  );
}

export default Users