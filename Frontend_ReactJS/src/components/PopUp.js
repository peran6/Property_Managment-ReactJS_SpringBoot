import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './Usercontext';


const PopUp = ({property,selected,setSelected}) => {
    const { refresh, setRefresh }  = useContext(UserContext);
    
    const [newPrice,setNewPrice] = useState(property.price);
    const [newLocation,setNewLocation] = useState(property.location);
    const [newSale_rent,setNewSale_rent] = useState(property.sale_rent);
    const [newSquare_meter,setNewSquare_meter] = useState(property.square_meter);
    
    const submit = () => {
        updateProperty();
        setRefresh(!refresh);
        setSelected(!selected);
    }

    const updateProperty = () => {
        axios.put("http://localhost:8080/property-manager/users/" + property.user + "/properties/" + property.id,{
            price: newPrice,
            location: newLocation,
            sale_rent: newSale_rent,
            square_meter: newSquare_meter 
        })
        .catch(err => {
            console.error(err);
        });
    } 
    
    return (
        <div className='container px-5 '>
            <label  className="form-label ">Price</label>
            <input 
                className='form-control  '
                name="price"  
                placeholder="50-5.000.000"
                value={ newPrice }
                onChange={(e)=>setNewPrice(e.target.value)}
            />
            <label  className="form-label">Location</label>
            <select name="location" id="location" className="form-control" value={newLocation} onChange={(e)=>setNewLocation(e.target.value)} >
                <option value="" selected disabled hidden>Choose here</option>
                <option value="Athens">Athnes</option>
                <option value="Thesaloniki">Thesaloniki</option>
                <option value="Patra">Patra</option>
                <option value="Heraklion">Heraklion</option>
            </select>
        
            <label  className="form-label">Sale or Rent</label>
            <select name="sale_rent" id="sale_rent" className="form-control" value={newSale_rent} onChange={(e)=>setNewSale_rent(e.target.value)} >
                <option value="" selected disabled hidden>Choose here</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
            </select>
            
            <label  className="form-label">Square meter</label>
            <input 
                name="square_meter" 
                id="square_meter" 
                className="form-control" 
                placeholder="20-1.000"
                value={ newSquare_meter }
                onChange={(e)=>setNewSquare_meter(e.target.value)}
            />
            <button onClick={submit} name="Submit" className="submit-btn btn btn-success m-2" >update</button>
        </div>
    );
};

export default PopUp;