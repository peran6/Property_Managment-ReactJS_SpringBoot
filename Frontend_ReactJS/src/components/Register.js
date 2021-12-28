import React, {useContext, } from 'react';
import axios from 'axios';
import { UserContext } from './Usercontext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const  {username,setUsername, password, setPassword, email, setEmail, status, setStatus, user, setUser}  = useContext(UserContext);
    const createUserURL = "http://localhost:8080/user-manager/create";
    let  navigate = useNavigate();
    

    const register = () => {
        if(ValidateEmail(email)){
            console.log('valid email');
            createUser(); 
        }
  
    }

    const ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return (true)
        }else{
            alert("You have entered an invalid email address!")
            return (false)
        }
    }
    const clearInputs = () => {
        setUsername("");
        setPassword("");
        setEmail("");
    }
    const createUser = () => {
        axios
          .post(createUserURL, {
            username: username,
            password: password,
            email: email
          })
          .then((response) => {
              console.log(response.data)
            if(response.data===''){
                alert("User already exists");  
                clearInputs();
            }else{
                navigate('/dashboard');
                setStatus(true);
                setUser(response.data);
            }           
            console.log("user details : "+user);
          }).catch(err => {
            console.error(err);
        });;
    }

    return (
        <div>          
            <h1 className='m-5'>Welcome to property management app</h1><br/>
            <h1>Register Page</h1>
            <div className="register  input-group-lg container">
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

                    <label  className="form-label">email</label>
                    <input 
                        type="email" 
                        value={ email }
                        onChange={(e)=>setEmail(e.target.value)}
                        className="form-control" 
                        placeholder="email@gmail.com"
                    ></input>
                    <button onClick={register} className="btn btn-primary mt-2">Sign up</button>
                </form>       
            </div>
        </div>
    );
};

export default Register;