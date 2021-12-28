import React, { useEffect } from 'react';
import { useContext,useState } from 'react';
import { UserContext } from './Usercontext';
import axios from 'axios';
import PopUp from './PopUp';

const ShowProperty = () => {
    
    const { username, user, refresh, setRefresh }  = useContext(UserContext);
    const [properties,setProperties] = useState([]);

    //Popup edit
    const [selectedId,setSelectedId] = useState();
    const [selected,setSelected] = useState(false);

    //URL
    const propertiesURL = "http://localhost:8080/user-manager/users/" + username ;
    //const deleteURL = "http://localhost:8080/property-manager/users/" + userid + "/properties/" + propertyid ;
    //const updateURL = "http://localhost:8080/property-manager/users/" + userid + "/properties/" + propertyid ;

    let propertyid,userid;

    useEffect(() =>{
        getProperties();
        console.log(user);
    },[])

    useEffect(() =>{
        if(refresh){
            getProperties();
            setRefresh(false);
        }
    },[refresh])
    
    const getProperties = () => {
        axios.get(propertiesURL)
        .then(res => {
            setProperties(res.data.properties); 
            console.log(properties);
        })
        .catch(err => {
            console.error(err);
        }); 
    }

    const deleteProperty = () => {     
        axios.delete("http://localhost:8080/property-manager/users/" + userid + "/properties/" + propertyid)
        .then(res => {
            setRefresh(true);
            console.log(properties);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const editHandler = (id) => {
        if(id === selectedId){
            setSelected(!selected);
        }
        else{
            setSelectedId(id);
            setSelected(true);
        }
    } 

    return (
        <div className='showProperty'>
            <h3>Show property section</h3>
            {/* <button onClick={getProperties} className="btn btn-primary "> refresh</button> */}
            
            <div className=''>
                    
                {properties.map((property,index) => (

                    <div  key={index}>
                        <div className='card {property.id === selectedId && selected ? "active" : ""}' > 

                            <div className="card-header">
                                <h5 className='d-inline float-start m-2'>Property #{index+1}: </h5>
                                <button 
                                    onClick={() => {
                                        propertyid = property.id;
                                        userid = property.user;
                                        deleteProperty()
                                    }} 
                                    className='btn btn-sm btn-danger float-end m-2'>delete</button>
                                <button
                                    onClick={() => {
                                        userid = property.user;
                                        editHandler(property.id );
                                    }} 
                                    className='btn btn-sm btn-warning float-end m-2'>edit</button>
                            </div>

                            <div className="card-body">
                                {property.id === selectedId && selected ? <PopUp  property={property} selected={selected} setSelected={setSelected}/>     
                                    :<div>
                                        <p  className="id card-text">id: {property.id}</p>
                                        <p  className="price ">Price: {property.price}</p>
                                        <p  className="location">Location: {property.location}</p>
                                        <p  className="square_meter">Square meter: {property.square_meter}</p>
                                            <p  className="sale_rent">Sale/Rent: {property.sale_rent}</p>
                                        </div>
                                }
                            </div> 

                        </div>
                    </div>
                ))}
                
            </div>

        </div>
    );
};

export default ShowProperty;