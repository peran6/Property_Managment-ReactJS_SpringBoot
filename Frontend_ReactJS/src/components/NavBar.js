import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Usercontext';

const NavBar = () => {

    const  {setUsername, setPassword, status, setStatus, setUserDetails}  = useContext(UserContext);

    const logout = () => {
        setStatus(false);
        setUsername("");
        setPassword("");
        setUserDetails("");
        console.log(status);
      }

    return (
        <div className='navbar'>
            <nav className="nav">
                <Link to="/" className="nav-link " style={status ? {pointerEvents: "none", color: "transparent", position: "absolute"} : null}>Login</Link>     
                <Link to="/register" className="nav-link" style={status ? {pointerEvents: "none", color: "transparent", position: "absolute"} : null}>Register</Link>      
                <Link to="/dashboard" className="nav-link" style={!status ? {pointerEvents: "none", color: "transparent", position: "absolute"} : {pointerEvents: "none"}}  >Dashboard</Link>
                <Link to="/" className='nav-link position-absolute top-50 end-0 translate-middle'  onClick={logout} style={!status ? {pointerEvents: "none", color: "transparent", position: "absolute"} : {color:"red",}}>Log out</Link>         
            </nav>
        </div>
    );
};

export default NavBar;