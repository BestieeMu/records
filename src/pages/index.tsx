'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  useEffect,
  useState
} from "react";
import {
  doc,
  collection,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import NavBar from "../Components/navbar";

import { withAuth } from "@/hook/Auth";



const Home = () => {
  const [quote, setQuote] = useState<any>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [device, setDevice] = useState("");
  const [goodDevice, setGoodDevice] = useState<any>("");
  const [badDevice, setBadDevice] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<any>("");
  const [adminId, setAdminId] = useState<any>("");
  const [user, loading, error] = useAuthState(auth);
  const [user_name, setUser_name] = useState<any>("");


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


  const clearForm = () => {
    setBadDevice("");
    setDevice("");
    setGoodDevice("");
  };


  const sendToDatabase = async (e: any) => {

    e.preventDefault();
    setShowAddForm(!showAddForm);
    clearForm();

    if (device === "" || goodDevice === 0 || badDevice === 0) {

      alert("error");

    } else {

      if (user) {
        let good: number = +goodDevice;
        let bad: number = +badDevice;
        const totalWork: number = good + bad;

        const now = new Date();
        const randomId = Math.random();


        // sending the input value from the modal to the DB
        await setDoc(
          doc(firestore, "users", `${user.uid}`, "tasks", `${randomId}`),
          {
            device_type: device,
            good_device: good,
            bad_device: bad,
            total_device_repair: totalWork,
            date_doc_add: now.toLocaleString(),
            id: randomId.toString(),
          }
        );
      }
    }
  };


  // get data
  useEffect(() => {

    // collection ref
    let colref = collection(firestore, "users", `${user?.uid}`, "tasks");


    // this function gets the users information like the users name and email
    const userInfo = async () => {

      const docRef = doc(firestore, "users", `${user?.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {

        setUser_name(docSnap.data().user_name)
      }
    }
    userInfo();


    const getTableData = () => {
      // get data using the colref which is the collection ref
      onSnapshot(colref, (snaoshot: any) => {
        let datarec: any = [];
        snaoshot.forEach((doc: any) => {
          datarec.push({ ...doc.data() });
        });
        setData(datarec);
      });
      // check if is loading...
      if (data) {
        setIsLoading(false);
      }
    };


    // run the get data finction after 2seconds
    setTimeout(() => {
      getTableData();
    }, 2000);

    setUserId(user?.uid);



  }, [user]); ////////


  // delete document/////////////
  const deleteDocument = (idDoc: any) => {
    deleteDoc(doc(firestore, "users", `${user?.uid}`, "tasks", `${idDoc}`));
  }; ///////


  // check total work done by adding up total task
  let totalWork = data.reduce((total: any, currentValue: any) => {
    return total + currentValue.total_device_repair;
  }, 0);


  // check total good device done by adding up all the good devices
  let totalGood = data.reduce((total: any, currentValue: any) => {
    return total + currentValue.good_device;
  }, 0);


  // check total bad device done by adding up all the bad devices
  let totalBad = data.reduce((total: any, currentValue: any) => {
    return total + currentValue.bad_device;
  }, 0);


  const showModal = () => {
    setShowAddForm(!showAddForm);
  };




  //       // storing the admin id to local storage to use it and verify if the loged in user is admin or not
  // if (typeof window !== 'undefined') {
  //   if(adminId){
  //     if (adminId === userId ) {
  //       localStorage.setItem("adminId", JSON.stringify(adminId));

  //       let LocalId: any = localStorage.getItem('adminId');
  //       setValidationId(JSON.parse(LocalId));
  //       console.log(validationId,`admin id from db : ${adminId}` ,`current user id: ${userId}` );
  //     }
  //    }
  // }

  //  console.log(adminId, 'hello is now here');



  const FormGroup = (
    <>
      <div
        className={
          showAddForm
            ? " absolute flex justify-center items-center w-full h-screen"
            : " hidden "
        }
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.178)",
        }}
      >
        <div className="bg-white rounded w-5/12 h-96 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl font-medium text-red-500">
            Add new work
          </h1>

          <div className="w-full flex justify-center">
            <form className="h-60 w-11/12 grid grid-cols-2 place-items-center h-10 px-2 rounded ">
              <select
                required
                value={device}
                onChange={(e) => {
                  setDevice(e.currentTarget.value);
                }}
                className="w-10/12 h-10 px-2 rounded border outline-none"
              >
                <option value="Device type">Device type</option>
                <option value="Android">Android</option>
                <option value="Windows">Windows</option>
              </select>

              <input
                type="number"
                required
                value={goodDevice}
                onChange={(e) => {
                  setGoodDevice(e.currentTarget.value);
                }}
                className="w-10/12 h-10 px-2 rounded border outline-none"
                placeholder="Good devices"
              />

              <input
                type="number"
                required
                value={badDevice}
                onChange={(e) => {
                  setBadDevice(e.currentTarget.value);
                }}
                className="w-11/12 col-span-2  h-10 px-2 rounded border outline-none"
                placeholder="Bad devices"
              />
            </form>
          </div>
          {/* button group */}
          <div className="w-full pr-5 flex justify-end gap-10">
            <button className="p-1 border rounded w-32" onClick={showModal}>
              Cancel
            </button>

            <button
              className="p-1 border rounded bg-red-500 hover:bg-red-400 text-white w-32"
              onClick={sendToDatabase}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );



  return (
    <>

      {loading ? (<>
        <div className="w-full h-screen text-3xl font-medium flex items-center justify-center">
        <div className="custom-loader"></div>
        </div>
      </>)
        :
        user &&
        (
          <>
            <div className={user ? "block relative" : "hidden"}>
              {FormGroup}
              <div className={user ? "block" : "hidden"}>
                <NavBar />
              </div>
              <div className="w-full flex mt-12 pb-20 ">
              
                {/* the main section for the content */}
                <div className=" over-flow-scroll w-full px-5 ml-14 py-3">
                  {/* first components which is the welcome message and action button */}
                  <div className="w-full flex justify-between mt-20 p-2 ">
                    <h2 className="text-4xl font-bold">Welcome, {user_name}</h2>
                    {/* Add button */}
                    <button
                      className="bg-red-500 p-1 text-white px-2 flex items-center gap-3 rounded hover:bg-red-400"
                      onClick={showModal}
                    >
                      <span>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ fontSize: 20, color: "white" }}
                        />
                      </span>
                      Add New Work
                    </button>
                  </div>

                  {/* seconf section whic display the total work, total bad, and total goods with some random wise quates */}
                  <div className=" w-full  flex items-center justify-center mt-20">
                    <div className="w-10/12 flex gap-10 ">
                      <div className="bg-white flex justify-between w-7/12 rounded h-32 overflow-hidden">
                        {/* count display box */}
                        <div className="w-52 flex flex-col gap-2 p-5 items-center">
                          <p>Total Good</p>
                          <h1 className="text-3xl font-bold">{totalGood}</h1>
                        </div>
                        {/* //////////// */}
                        {/* count display box */}
                        <div className="w-52 flex flex-col gap-2 p-5 items-center">
                          <p>Total Bad</p>
                          <h1 className="text-3xl font-bold">{totalBad}</h1>
                        </div>
                        {/* //////////// */}
                        {/* count display box */}
                        <div className="w-52 flex flex-col gap-2 p-5 items-center">
                          <p>Total Repaired</p>
                          <h1 className="text-3xl font-bold">{totalWork}</h1>
                        </div>
                        {/* //////////// */}
                      </div>

                      <div className=" w-5/12 p-2">
                        <p className="text-3xl">
                          {quote == ""
                            ? "Quotes loading..."
                            : `"${quote?.text}"`}
                        </p>
                        <p className="text-lg mt-3">{quote?.author}</p>
                      </div>
                    </div>
                  </div>

                  {/*///////// third section which will contain the table 
            that display the list of done added task,
            each row should have type of device, number of the bad and 
            the good ones,total and and current date.///////*/}
                  <div className="w-full flex justify-center  mt-28">
                    <div className="w-10/12">
                      <table className="table-auto w-full px-4 css-serial">
                        <thead>
                          <tr className="h-12 ">
                            <th className="w-20">S/N</th>
                            <th className="text-start">Device type</th>
                            <th className="text-start">Good Ones</th>
                            <th className="text-start">Bad Ones</th>
                            <th className="text-start">Total Repair</th>
                            <th className="text-start">Date</th>
                          </tr>
                        </thead>
                        <tbody className=" w-full body ">
                          {data &&
                            data?.map((tableData: any) => (
                              <>
                                <tr className="h-12 " key={tableData.id}>
                                  <td className="relative">&nbsp;</td>
                                  <td className="text-start">
                                    {tableData.device_type}
                                  </td>
                                  <td className="text-start">
                                    {tableData.good_device}
                                  </td>
                                  <td className="text-start">
                                    {tableData.bad_device}
                                  </td>
                                  <td className="text-start">
                                    {tableData.total_device_repair}
                                  </td>
                                  <td className="text-start">
                                    {tableData.date_doc_add}
                                  </td>
                                  <td className="text-start cursor-pointer">
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      style={{ fontSize: 20, color: "gray" }}
                                      onClick={() =>
                                        deleteDocument(tableData.id)
                                      }
                                    />
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                      {isloading ? (
                        <div className="w-full h-52  flex justify-center items-center">
                          <span className="flex items-center gap-4">
                            <h1 className="text-4xl font-bold">
                              loading records...
                            </h1>
                          </span>
                        </div>
                      ) : (
                        data.length === 0 && (
                          <div className="w-full h-52  flex justify-center items-center">
                            <span className="flex items-center gap-4">
                              <h1 className="text-4xl font-bold">
                                Add new records
                              </h1>
                              <FontAwesomeIcon
                                icon={faClipboard}
                                style={{ fontSize: 70, color: "gray" }}
                                bounce
                              />
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) ////
      }
    </>
  );
};

export default Home;
