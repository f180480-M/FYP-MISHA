export const userColumns=[
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'user',headerName:'User',width:220, renderCell:(params)=>{
        return (
           <div className="cellWithImg">
           <img className="cellImg" src={params.row.img ||"https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar"/>
           {params.row.fName} {params.row.lName}
           </div> 
        )
    } 
    },
    { field:'email', headerName:'Email',width:230},
    { field:'age', headerName:'Age',width:100},
    { field:'phone', headerName:'Phone',width:150},
    // { field:'status', headerName:'Status',width:150,
    //   renderCell:(params)=>{
    //       return(
    //           <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
    //       )
    //   }
    // }
];

export const patientColumns=[
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'user',headerName:'User',width:220, renderCell:(params)=>{
        return (
           <div className="cellWithImg">
           <img className="cellImg" src={params.row.img ||"https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar"/>
           {params.row.fName} {params.row.lName}
           </div> 
        )
    } 
    },
    { field:'email', headerName:'Email',width:230},
    { field:'age', headerName:'Age',width:100},
    { field:'phone', headerName:'Phone',width:150},
    { field:'date', headerName:'Admission Date',width:150},
    { field:'symptoms', headerName:'Symptoms',width:150},
    
];


export const deliveryColumns=[
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'doctor',headerName:'User',width:220},
    { field:'patient', headerName:'Patient',width:230},
    { field:'bed', headerName:'Bed No.',width:100},
    { field:'medicine', headerName:'Medicine',width:150},
    { field:'status', headerName:'Status',width:150,
      renderCell:(params)=>{
          return(
              <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
          )
      }
    }
];














// //temp data
// export const userRows = [
//     { 
//         id: 1, 
//         lastName: 'Snow', 
//         firstName: 'Jon',
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: 35 
//     },
//     { 
//         id: 2, 
//         lastName: 'Lannister', 
//         firstName: 'Cersei', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"passive",
//         email:"f180480@nu.edu.pk",
//         age: 42 
//     },
//     { 
//         id: 3, 
//         lastName: 'Lannister', 
//         firstName: 'Jaime', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"pending",
//         email:"f180480@nu.edu.pk",
//         age: 45 
//     },
//     { 
//         id: 4, 
//         lastName: 'Stark', 
//         firstName: 'Arya', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: 16 
//     },
//     { 
//         id: 5, 
//         lastName: 'Targaryen', 
//         firstName: 'Daenerys', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: null 
//     },
//     { 
//         id: 6, 
//         lastName: 'Melisandre', 
//         firstName: null, 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: 150 
//     },
//     { 
//         id: 7, 
//         lastName: 'Clifford', 
//         firstName: 'Ferrara', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: 44 
//     },
//     { 
//         id: 8, 
//         lastName: 'Frances', 
//         firstName: 'Rossini', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: 36 
//     },
//     { 
//         id: 9, 
//         lastName: 'Roxie', 
//         firstName: 'Harvey', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"active",
//         email:"f180480@nu.edu.pk",
//         age: 65 
//     },
//     { 
//         id: 10, 
//         lastName: 'John', 
//         firstName: 'Doe', 
//         img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//         status:"passive",
//         email:"f180480@nu.edu.pk",
//         age: 65 
//     }
// ];
  