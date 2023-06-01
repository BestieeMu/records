import { MainContext } from '@/Context/MainContex';
import React, { useContext } from 'react'


const Works = () => {
  const { adminData } = useContext(MainContext)


  // check total work done by adding up total task
  let totalWork = adminData && adminData.reduce((total: any, currentValue: any) => {
    return total + currentValue.works.total_device_repair;
  }, 0);


  // check total good device done by adding up all the good devices
  let totalGood = adminData && adminData.reduce((total: any, currentValue: any) => {
    return total + currentValue.works.good_device;
  }, 0);


  // check total bad device done by adding up all the bad devices
  let totalBad = adminData && adminData.reduce((total: any, currentValue: any) => {
    return total + currentValue.works.bad_device;
  }, 0);

  return (
    <>
      <div className='flex flex-col items-center'>

        {/* board section */}
        <div className='bg-white mt-20 flex justify-between w-7/12 rounded h-32 overflow-hidden'>
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


        {/* table section */}
        <div className="w-full flex justify-center mb-10 mt-28">
          <div className="w-10/12">
            <table className="table-auto w-full px-4 css-serial">
              <thead>
                <tr className="h-12 ">
                  <th className="w-20">S/N</th>
                  <th className="text-start">Name</th>
                  <th className="text-start">Device type</th>
                  <th className="text-start">Good Ones</th>
                  <th className="text-start">Bad Ones</th>
                  <th className="text-start">Total Repair</th>
                  <th className="text-start">Date</th>
                </tr>
              </thead>
              <tbody className=" w-full body ">
                {adminData &&
                  adminData.map((tableData: any) => (
                    
                    <>
                      <tr className="h-12 " key={tableData.user.id}>
                        <td className="relative">&nbsp;</td>
        
                          <td  className="text-start">
                          {tableData.user.user_name}
                        </td>
                
                        <td className="text-start">
                          {tableData.works.device_type}
                        </td>
                        <td className="text-start">
                          {tableData.works.good_device}
                        </td>
                        <td className="text-start">
                          {tableData.works.bad_device}
                        </td>
                        <td className="text-start">
                          {tableData.works.total_device_repair}
                        </td>
                        <td className="text-start">
                          {tableData.works.date_doc_add}
                        </td>

                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
   
          </div>
        </div>


      </div>
    </>


  )
}

export default Works