import { Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";

function App() {
  return (
    <div className="App">
        <Topbar />

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<Registration/>}></Route>
          <Route path="/database" element={<h1>Database</h1>}></Route>
        </Routes>
    </div>
  );
}

export default App;
