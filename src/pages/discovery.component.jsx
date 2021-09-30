import React from 'react'
import { connect } from "react-redux";


const DiscoveryList = ({places, error, placesfetching}) => {

    const results = places.length > 0 ? places : [];
    
    const list=()=>{
      if(placesfetching){    
        return(
          <tr>
          <td>Fetching Your Data...</td>
          <td>Fetching Your Data...</td>
          <td>Fetching Your Data...</td>
          <td>Fetching Your Data...</td>
          <td>Fetching Your Data...</td>
          </tr>
        )
       }    
       else{    
         return results.map((element)=>{
           return (
            <tr>
              
              <td>
                <a href={`/restaurant/${element.name}/${element._id}`}>
                  {element.name}
                </a>
              </td>

              <td>{element.location}</td>
              <td>{element.rating}</td>
              <td>{element.priceForTwo}</td>
              <td>{element['veg-nonveg']}</td>
            </tr>
            )
           }
         )
       }    
    }


    return (
      <div>
        <h3 className="text-center bg-danger">List of the best Food Joints, You can hit now!</h3>
        <table className="table text-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Price For Two</th>
              <th>Veg/NonVeg</th>
            </tr>
          </thead>

          <tbody>

            {list()}
 
          </tbody>
         
        </table>

      </div>
    );
};


const mapStateToProps = (state) => {
  return {
    placesfetching: state.placesfetching,
    places: state.places,
    error: state.error,
  };
};

export default connect(mapStateToProps)(DiscoveryList);
