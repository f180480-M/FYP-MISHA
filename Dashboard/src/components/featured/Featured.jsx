import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';



const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Total Orders</h1>
            <MoreVertIcon fontSize="medium"/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={4}/>
            </div>
            <p className="title">Total orders made today</p>
            <p className="amount">420</p>
            <p className="desc">
                The total orders includes all medicine types.
            </p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDownIcon fontSize="small"/>
                        <div className="resultAmount">130</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                        <div className="resultAmount">130</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Year</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDownIcon fontSize="small"/>
                        <div className="resultAmount">130</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured