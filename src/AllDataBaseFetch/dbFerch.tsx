import { useEffectOnce } from "usehooks-ts";
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from "@/Context/MainContex";
import { firestore } from "../../firebase/clientApp";
import { collection, onSnapshot } from "firebase/firestore";



const DbFerch = () => {
    const [userData, setUserData] = useState<any>([]);
    const [userD, setUserD] = useState<any>([]);
   
    
    const { adminData, users, getEngineerChartDate, getDeviceChartDate } = useContext(MainContext)




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
  getDeviceChartDate(totalGood, totalBad, totalWork )







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
    
    const arr: any = [
      ...userData
    ];
    

    useEffectOnce(() => {
      const mappedData = arr.map((item: any) => {
        return {
          userName: item.userName,
          totalWork: item.userWork.reduce((total: number, workItem: any) => total + workItem.totalBad, 0)
        };
      });
    
      getEngineerChartDate(mappedData)

    },);
    
  
}

export default DbFerch