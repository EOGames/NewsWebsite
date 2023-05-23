import { Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import PrivateComponent from "./components/PrivateComponent";
import PrivateLoginSignUp from "./components/PrivateLoginSignUp";
import Database from "./Pages/Database";
import AddNews from "./Pages/AddNews";
import EditNews from "./Pages/EditNews";

function App() {
  return (
    <div className="App">
      <Topbar />

      <Routes>
        <Route path="/home" element=
          {
            <PrivateComponent> <Home /> </PrivateComponent>
          }>

        </Route>
        <Route path="/database" element={
          <PrivateComponent>
            <Database />
          </PrivateComponent>
        }>
        </Route>
        <Route path="/editNews/:id" element={
          <PrivateComponent>
            <EditNews/>
          </PrivateComponent>
        }>

        </Route>

        <Route path="/signup" element={
          <PrivateLoginSignUp>
            <Registration />
          </PrivateLoginSignUp>
        }></Route>

        <Route path="/" element={
          <PrivateLoginSignUp>
            <Login />
          </PrivateLoginSignUp>
        }></Route>
      
        <Route path="/addNews" element={<AddNews />}></Route>
      
      </Routes>

      
    </div>
  );
}

export default App;
