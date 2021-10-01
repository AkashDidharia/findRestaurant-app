import { Link } from 'react-router-dom';

const NavBar =()=>{

    return (
        <nav className="navbar navbar-light bg-light navbar-expand">
            <Link to="/" className="navbar-brand px-1 px-sm-3">GoodFood</Link>
        </nav>
    );

};

export default NavBar;

