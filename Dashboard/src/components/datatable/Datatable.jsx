import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc ,onSnapshot} from "firebase/firestore";
import { db } from "../../firebase";
import { userColumns,userRows } from "../../datatablesource";


const Datatable = ({columns}) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [data,setData] = useState([]);

  useEffect(()=>{
    // const fetchData = async () =>{
    //   let list = []
    //   try{
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({id: doc.id,...doc.data()})
    //     });
    //     setData(list);
    //   }
    //   catch(err){
    //     console.log(err)
    //   }

    // };
    // fetchData()

    //Listen REALTIME
    const unsub = onSnapshot(collection(db, path), (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc=>{
        list.push({id:doc.id, ...doc.data() });
      });
      setData(list)      
    },(error)=>{
      console.log(error)
    });

    return () => {
      unsub();
    }
  },[]);


  const handleDelete = async(id) =>{
    try{
      await deleteDoc(doc(db, path, id));
      setData(data.filter(item=>item.id!==id))
    }catch(err)
    {
      console.log(err)
    }
  }
  const actionColumn = [
    {
      field:"action",
      headerName:"Action",
      width:240, 
      renderCell:(params)=>{
        return(
          <div className="cellAction">
            <Link to={`/${path}/test`} style={{textDecoration:"none"}}>
            {/* <Link to="/users/test" style={{textDecoration:"none"}}> */}
            <div className="viewButton">View</div>
              </Link>
            <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
         </div>
        )
  }}
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable