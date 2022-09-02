import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = () => {
    const rows=[
        {
            id:1000,
            patient: "Pat1",
            img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            doctor:"Muaz",
            date:"1 March",
            medicine:"Panadol",
            amount: 2,
            status:"Pending"
        },
        {
            id:1001,
            patient: "Pat2",
            img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            doctor:"Muaz",
            date:"1 March",
            medicine:"Panadol",
            amount: 2,
            status:"Pending"
        },
        {
            id:1002,
            patient: "Pat3",
            img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            doctor:"Muaz",
            date:"1 March",
            medicine:"Panadol",
            amount: 2,
            status:"Approved"
        },
        {
            id:1000,
            patient: "Pat4",
            img: "https://images.pexels.com/photos/4463934/pexels-photo-4463934.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            doctor:"Muaz",
            date:"1 March",
            medicine:"Panadol",
            amount: 2,
            status:"Pending"
        }                        
    ]
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order Id</TableCell>
            <TableCell className="tableCell">Patient</TableCell>
            <TableCell className="tableCell">Doctor</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Medicine</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
            >
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                    <div className="cellWrapper">
                        <img src={row.img} alt="" className="image" />
                        {row.product}
                    </div>            
                </TableCell>
                <TableCell className="tableCell">{row.doctor}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.medicine}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  )
}

export default List