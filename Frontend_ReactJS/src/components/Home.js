import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './Usercontext';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
    const  {username,setUsername, password, setPassword, user, setUser, status, setStatus}  = useContext(UserContext);
    const [exist,setExist] = useState(false);
    let  navigate = useNavigate();
    const existUserURL = 'http://localhost:8080/user-manager/userName/'+ username;
    const getUserURL = 'http://localhost:8080/user-manager/users/' + username;
    let userProfile;
    
    const login = (e) => {
        e.preventDefault();
        if(exist){
            navigate('/dashboard');
            setStatus(true);
            //getUser();
            console.log(user);
        }else{
            console.log("user not found with name: " + username);
        }
    }

    useEffect(() => {
        axios.get(existUserURL,{})
        .then(res => {
            setExist(res.data); 
        })
        .catch(err => {
            console.error(err);
        });
    },[login]);

    const getUser = () => {
        axios.get(getUserURL)
        .then(res => {    
            setUser(res.data)     
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    return (
        <div >    
            <h1 className='m-5'>Welcome to property management app</h1><br/>
            <h1>Login Page </h1>
            <div className="login container input-group-lg">    
                <form>
                    <label  className="form-label">Username</label>
                    <input 
                        type="username"

                        value={ username }
                        onChange={(e)=>setUsername(e.target.value)}
                        className="form-control"  
                        placeholder="username"
                    ></input>
                    <label  className="form-label">Pasword</label>
                    <input 
                        type="password" 
                        value={ password }
                        onChange={(e)=>setPassword(e.target.value)}
                        className="form-control" 
                        placeholder="password"
                    ></input>
                    <button  onClick={login} className="btn btn-primary mt-2">Log In</button>
                </form>   
            </div>
        </div>
    );
};

export default Home;