import "./newDelivery.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"
import { deliveryInputs } from "../../formSource"


const NewDelivery = () => {
  const [file,setFile]= useState("");
  const [data,setData]=useState({});
  const [users,setUsers]=useState([]);
  const [patients,setPatients]=useState([]);
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()


  const userCollectionRef = collection(db, "users")
  const patientCollectionRef = collection(db, "patients")

  useEffect(()=>{

    const getUsers = async()=>{

      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      // console.log(data);
    }

    const getPatients = async()=>{

      const data = await getDocs(patientCollectionRef);
      setPatients(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      // console.log(data);
    }

    getUsers()
    getPatients()
  },[])

  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;
    
    
  //   setData({...data,[id]:value})
  // }

  // const querySnapshot = await getDocs(collection(db, "cities"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  const handleSelect = (e)=>{
    const id = e.target.id;
    const value = e.target.value;
        
    setData({...data,[id]:value})

    console.log(data)

  }

  const addParam =()=>{
    setData({...data,["status"]:"pending",["isRecognized"]:"0"})
  }
  

  const handleAdd = async (e) => {
    e.preventDefault()

    try{

      const pId= Date.now()
      

      await setDoc(doc(db, "delivery",pId.toString()), {
       ...data,["status"]:"pending",["isRecognized"]:"0",
        timeStamp: serverTimestamp()
      });
      navigate(-1)
    }
    catch(err){
      console.log(err)
    }

  }

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Delivery</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>

              {/* <div className="formInput">
              </div> */}
              
              {/* {deliveryInputs.map((input)=>(
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}  
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={handleInput}
                  />
                </div>
              ))} */}

              <div className="formInput">
                  <label>Doctor</label>
                  <select id="doctor" onChange={handleSelect}  defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Select</option>
                    {users.map(user=>
                    <option key={user.id} value={user.fName +' '+ user.lName}>{user.fName} {user.lName}</option>) }
                  </select>
              </div>
              <div className="formInput">
                  <label>Patient</label>
                  <select id="patient" onChange={handleSelect} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Select</option>
                    {patients.map(patient=>
                    <option key={patient.id} value={patient.fName +' '+ patient.lName}>{patient.fName} {patient.lName}</option>) }
                  </select>
              </div>
              <div className="formInput">
                  <label>Bed</label>
                  <select id="bed" onChange={handleSelect} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Select</option>
                    <option key="1" value="1">1</option>
                    <option key="2" value="2">2</option>
                    <option key="3" value="3">3</option>
                  </select>
              </div>
              <div className="formInput">
                  <label>Medicine</label>
                  <select id="medicine" onChange={handleSelect} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Select</option>
                    <option key="Panadol" value="Panadol">Panadol</option>
                    <option key="Aspirin" value="Aspirin">Aspirin</option>
                  </select>
              </div>
              <div className="btnDiv">
              <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewDelivery