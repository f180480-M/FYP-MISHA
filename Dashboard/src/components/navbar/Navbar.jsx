import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';




const Navbar = () => {

  const {dispatch}= useContext(DarkModeContext)

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon 
            className="icon" 
            onClick={()=>dispatch({type:"TOGGLE"})}
            />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon"/>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <Link to="/" style={{textDecoration:"none"}}>
              <VideocamOutlinedIcon className="icon2"/>
            </Link>
          </div>
          <div className="item">
            <img 
            src="https://images.pexels.com/photos/831476/pexels-photo-831476.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
            alt="" 
            className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar