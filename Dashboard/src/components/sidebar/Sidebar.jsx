import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from "react-router-dom";
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
// import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="top">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">MISHA</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration:"none"}}>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{textDecoration:"none"}}>
          <li>
            <PersonOutlineOutlinedIcon className="icon"/>
            <span>Users</span>
          </li>
          </Link>
          <Link to="/patients" style={{textDecoration:"none"}}>
          <li>
            <AccessibleOutlinedIcon className="icon"/>
            <span>Patients</span>
          </li>
          </Link>
          {/* <li>
            <ArchiveOutlinedIcon className="icon"/>
            <span>Orders</span>
          </li> */}
          <Link to="/delivery" style={{textDecoration:"none"}}>          
          <li>
            <LocalShippingIcon className="icon"/>
            <span>Delivery</span>
          </li>
          </Link>
          {/* <p className="title">USEFUL</p> */}
          {/* <li>
            <AssessmentIcon className="icon"/>
            <span>Stats</span>
          </li> */}
          <li>
            <NotificationsIcon className="icon"/>
            <span>Notifications</span>
          </li>


          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon"/>
            <span>System Health</span>
          </li>
          <li>
            <AssignmentOutlinedIcon className="icon"/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon"/>
            <span>Settings</span>
          </li> */}


          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon"/>
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppOutlinedIcon className="icon"/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
      &copy; 2021-2022 E2 Armada 
      </div>

    </div>
  )
}

export default Sidebar