import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import DiscoverButton from './discoverButton.component'

const ButtonHolder =()=>{

    const [loggedUser, setLoggedUser] = useState(undefined);

    //run useEffect on everyRender
    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if(jwt){

            const currentUser = jwt_decode(jwt);
            if(currentUser){
                setLoggedUser(currentUser);
            }
        }
    } ,[]);

    const handleLogout =()=> {
        localStorage.removeItem('token');
        setLoggedUser(undefined);

      }

    return (
        <div className="bg-secondary py-3 row rounded g-0 my-2">
          
          
            {   loggedUser ? (
            <>
                  <DiscoverButton/>
                <a href="/" className="btn btn-info col-sm mx-md-5 mx-2" onClick={handleLogout}>
                  Log Out
                </a>
            </>
          ) : (
                <>
                  <Link to="/login" className="btn btn-info col-sm m-2 mx-md-5">Login</Link>
                  <Link to="/signup" className="btn btn-info col-sm m-2 mx-md-5">Signup</Link>
                </>
            )}

        </div>
    );

};

export default ButtonHolder;

