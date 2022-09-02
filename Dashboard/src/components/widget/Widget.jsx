import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';

const Widget = ({type}) => {
    let data;
    
    //temporary amount
    const amount = 100;
    const diff = 20;


    switch (type) {
        case "user":
            data={
                title:"USERS",
                isItem:false,
                link:"See all users",
                icon:(
                    <PersonOutlinedIcon 
                    className="icon" 
                    style={{
                        color:"crimson",
                        backgroundColor:"rgba(255,0,0,0.2)"
                    }}/>
                )
            }
            break;
        case "order":
            data={
                title:"ORDERS",
                isItem:false,
                link:"View all orders",
                icon:(
                    <ArchiveOutlinedIcon 
                    className="icon" 
                    style={{
                        color:"goldenrod",
                        backgroundColor:"rgba(218,165,32,0.2)"
                    }}/>
                )
            }
            break;
        case "patient":
            data={
                title:"PATIENTS",
                isItem:false,
                link:"See all patients",
                icon:(
                    <HealingOutlinedIcon 
                    className="icon" 
                    style={{
                        color:"green",
                        backgroundColor:"rgba(0,128,0,0.2)"
                    }}/>
                )
            }
            break;
        case "medicine":
            data={
                title:"MEDICINE",
                isItem:true,
                link:"See available medicine",
                icon:(
                    <MedicationOutlinedIcon 
                    className="icon" 
                    style={{
                        color:"purple",
                        backgroundColor:"rgba(128,0,128,0.2)"
                    }}/>
                )
            }
            break;
    
        default:
            break;
    }





  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
                {amount}{data.isItem && " units"}
            </span>
            <span className="link">{data.link}</span>            
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpOutlinedIcon/>
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget