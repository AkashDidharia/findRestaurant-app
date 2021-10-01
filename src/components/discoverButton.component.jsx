import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const DiscoverButton =({ onRequestPlaces })=>{

    return(
        <Link to="/discovery"  onClick={()=>{onRequestPlaces()}} className="btn btn-info col-sm mx-md-5 mx-2">Discover food joints</Link>
        )
    }
    
const mapDispatchToProps = (dispatch) => {
    return {
      onRequestPlaces: () => dispatch({ type: "API_CALL_REQUEST_PLACES" }),
    };
  };
  
  export default connect(null, mapDispatchToProps)(DiscoverButton);

// export default NavBar;