import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Home from './components/Home';
import { UserContext } from './components/Usercontext';
import NavBar from './components/NavBar';


function App() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [userId,setUserId] = useState();
  const [user,setUser] = useState();

  const [price,setPrice] = useState("");
  const [location,setLocation] = useState("");
  const [sale_rent,setSale_rent] = useState("");
  const [square_meter,setSquare_meter] = useState("");

  //true=loged_in, false=loged_out
  const [status,setStatus] = useState(false);
  const [refresh,setRefresh] = useState(false);

  const value = useMemo(
    () => ({ username, setUsername, password, setPassword, userId, setUserId, user, setUser, status, setStatus,
      price, setPrice, location, setLocation, sale_rent, setSale_rent, square_meter, setSquare_meter, refresh, setRefresh, email, setEmail }),
    [username,password,user,status,price,location,sale_rent,square_meter,refresh,email]
  );
  

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />     
          <Route path="/dashboard" element={<Dashboard />} />     
        </Routes>
      </div>
    </UserContext.Provider>   
  );
}

export default App;
