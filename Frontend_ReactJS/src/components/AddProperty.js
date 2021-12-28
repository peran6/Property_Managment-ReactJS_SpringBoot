import React from 'react';
import { useContext,useState } from 'react';
import { UserContext } from './Usercontext';
import axios from 'axios';
import Alert from './Alert';

const AddProperty = () => {
    const  { username,price,setPrice,location,setLocation,sale_rent,setSale_rent,square_meter,setSquare_meter,refresh,setRefresh }  = useContext(UserContext);

    const[addAlert,setAddAlert]  =  useState(false);
    const[alert,setAlert]  =  useState(false);
    const createPropertyURL = "http://localhost:8080/property-manager/users/" + username + "/properties";

    const submit = () => {
        createProperty();
        clearInputs();
        setRefresh(true);
    }

    const clearInputs = () => {
        setPrice("");
        setLocation("");
        setSale_rent("");
        setSquare_meter("");
    }

    const createProperty = () =>{
        console.log(location + price + sale_rent + square_meter);
        axios
          .post(createPropertyURL, {
            price: price,
            location: location,
            sale_rent: sale_rent,
            square_meter: square_meter
          })
          .then((response) => {
            console.log(response.data);
            setAddAlert(true);
            setAlert(true); 
            setTimeout(() => {  setAlert(false); }, 2000);
          })
          .catch((err) => {  
            console.error(err);
            console.log("WRONG INPUTS "); 
            setAddAlert(false);
            setAlert(true); 
            setTimeout(() => {  setAlert(false); }, 2000);
          });
    }

    return (
        <div className='addProperty  '>
            <h3 >Add property section</h3>
                {alert?<Alert addAlert={addAlert} />:""}
                
            <label  className="form-label ">Price </label>         
            <input 
                name="price" 
                id="price"
                className="form-control " 
                placeholder="50-5.000.000"
                value={ price }
                onChange={(e)=>setPrice(e.target.value)}
            />
            <label  className="form-label">Location</label>
            <select name="location"  className="form-control" value={location} onChange={(e)=>setLocation(e.target.value)} >
                <option value="" selected disabled hidden>Choose here</option>
                <option value="Athens" >Athnes</option>
                <option value="Thesaloniki">Thesaloniki</option>
                <option value="Patra">Patra</option>
                <option value="Heraklion">Heraklion</option>
            </select>     
            <label  className="form-label">Sale or Rent</label>
            <select name="sale_rent"  className="form-control" value={sale_rent} onChange={(e)=>setSale_rent(e.target.value)} >
                <option value="" selected disabled hidden>Choose here</option>
                <option value="sale" >Sale</option>
                <option value="rent">Rent</option>
            </select>
            <label  className="form-label">Square meter</label>
            <input 
                name="square_meter" 
                id="square_meter" 
                className="form-control" 
                placeholder="20-1.000"
                value={ square_meter }
                onChange={(e)=>setSquare_meter(e.target.value)}
            />  
            <button onClick={submit} name="Submit" className="submit-btn btn btn-success mt-2" id="submit-btn" >Submit</button>
        </div>
    );
};

export default AddProperty;