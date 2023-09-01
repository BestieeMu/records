import { createContext, useState } from "react";

interface MainContextProps {
	// Define type annotations here
  adminData: any,
  engineerChart: any[],
  adminName: string,
  users: any,
  color: string,
  goodDevice: number,
  badDevice: number,
  totalRepair: number,
  updateData: (data: any)=> void,
  getAllColor: (color: string)=> void,
  updateAdminName: (name: string)=> void,
  getUserDate: (user: any)=> void,
  getEngineerChartDate: (ChartData: any)=> void,
  getDeviceChartDate: (good: any, bad: any, total: any)=> void
}

interface MainContextProviderProps {
  children: React.ReactNode;
}

export const MainContext = createContext<MainContextProps>({
	// Add your default values here
  adminData:  [],
  engineerChart: [],
  adminName: '',
  users: '',
  color: '',
  goodDevice: 0,
  badDevice: 0,
  totalRepair: 0,
  updateData: () => {},
  getAllColor: () => {},
  updateAdminName: () => {},
  getUserDate: () => {},
  getEngineerChartDate: () => {},
  getDeviceChartDate: () => {},
});

export default function MainContextProvider({
  children,
}: MainContextProviderProps) {

// Add your states here
const [adminData, setAdminData] = useState('')
const [adminName, setAdminName] = useState('')
const [users, setUsers] = useState<any>('')
const [goodDevice, setGoodDevice] = useState<any>(0)
const [badDevice, setBadDevice] = useState<any>(0)
const [totalRepair, setTotalRepair] = useState<any>(0)
const [engineerChart, setEngineerChart] = useState<any>([])
const [color, setColor] = useState<string>('red')

//Add functions to update your state
const updateData = (data: any) =>{
  setAdminData(data)
}

const getAllColor = (color: string) =>{
  setColor(color)
}


const updateAdminName = (name: string) =>{
  setAdminName(name)
}

const getUserDate = (user: any) =>{
  setUsers(user)
}

const getDeviceChartDate = (good: any, bad: any, total: any) =>{
  setGoodDevice(good);
  setBadDevice(bad);
  setTotalRepair(total);
}

const getEngineerChartDate = (ChartData: any) =>{
  setEngineerChart(ChartData)
}





return (
    <MainContext.Provider
      value={{
        adminData,
        adminName,
        users,
        goodDevice,
        badDevice,
        color,
        totalRepair,
        engineerChart,
        getUserDate,
        updateData,
        getAllColor,
        updateAdminName,
        getDeviceChartDate,
        getEngineerChartDate
      }}
    >
      {children}
    </MainContext.Provider>
  );
}