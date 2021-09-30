import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import DiscoverButton from './discoverButton.component'

const NavBar =()=>{

    const [loggedUser, setLoggedUser] = useState(undefined);

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if(jwt){

            const currentUser = jwt_decode(jwt);
            if(currentUser){
                setLoggedUser(currentUser);
            }
        }
    }, []);

    const handleLogout =()=> {
        localStorage.removeItem('token');
        setLoggedUser(undefined);
        return (
            <alert> You are logged out! </alert>
        )
      }

    return (
        <nav className="navbar navbar-light bg-light navbar-expand">
            <Link to="/" className="navbar-brand px-1 px-sm-3">GoodFood</Link>
          
          
            {   loggedUser ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item border">
                  <DiscoverButton/>
                {/* <Link to={"/discovery"} className="nav-link mx-sm-5"> Discover Food Joints </Link> */}
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link mx-1 mx-md-5 border" onClick={handleLogout}>
                  Log Out
                </a>
              </li>
            </ul>
          ) : (
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link mx-md-5">Login</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/signup" className="nav-link mx-md-5">Signup</Link>
                    </li>
                </ul>
            )}

        </nav>
    );

};

  export default NavBar;

