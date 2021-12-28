import React from 'react';
import { useContext } from 'react';
import { UserContext } from './Usercontext';
import AddProperty from './AddProperty'; 
import ShowProperty from './ShowProperty';

const Dashboard = () => {
    const  { username,status }  = useContext(UserContext);
    return (
        
        <div >
            {status
                ?   <span className='dashboard'>
                        <h1 className='header m-4'>Managment System of Agency(Welcome "{username}" )</h1>
                        <AddProperty className="addProperty"/>
                        <ShowProperty className="showProperty"/>
                        <div className='footer'><p>All rıghts reserved</p></div>
                    </span>
                :   <h1 className='notAllowed m-4'>You are not Logged In</h1>
                    
            }
            
        </div>
    );
};



export default Dashboard;