import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewPatient from "./pages/newPatient/NewPatient";
import NewDelivery from "./pages/newDelivery/NewDelivery";

import {BrowserRouter, Routes, Route, Navigate,} from "react-router-dom";
import {userInputs } from "./formSource";

import "./style/dark.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { deliveryColumns, patientColumns, userColumns } from "./datatablesource";

function App() {

  const {darkMode}= useContext(DarkModeContext)

  const {currentUser} = useContext(AuthContext)


  const RequireAuth = ({children})=>{
    return currentUser? (children): <Navigate to="/login"/>
  }


  return (
    <div className={darkMode?"app dark":"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login/>}/>
            <Route index element={
            <RequireAuth>
              <Home/>
            </RequireAuth>}
            />
            <Route path="users">
              <Route index element={<RequireAuth><List columns={userColumns}/></RequireAuth>}/>
              <Route path=":userId" element={<RequireAuth><Single/></RequireAuth>}/>
              <Route path="new" element={<RequireAuth><New inputs={userInputs} title="Add New User"/></RequireAuth>}/>
            </Route>
            <Route path="patients">
              <Route index element={<RequireAuth><List columns={patientColumns}/></RequireAuth>}/>
              <Route path=":patientId" element={<RequireAuth><Single/></RequireAuth>}/>
              <Route path="new" element={<RequireAuth><NewPatient/></RequireAuth>}/>
            </Route>
            <Route path="delivery">
              <Route index element={<RequireAuth><List columns={deliveryColumns}/></RequireAuth>}/>
              <Route path=":deliveryId" element={<RequireAuth><Single/></RequireAuth>}/>
              <Route path="new" element={<RequireAuth><NewDelivery/></RequireAuth>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
