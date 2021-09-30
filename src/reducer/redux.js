//import actions
import API_CALL_REQUEST_PLACES from '../actions/placesAction/apiCallRequestPlaces';
import API_CALL_RECIEVE_PLACES from '../actions/placesAction/apiCallRecievePlaces';

const initialState ={
    places:[],
    placesfetching:false,
    errors:null,
    loggedIn:false,
    user:null
}


//reducer
export const reducer = (state=initialState, action)=> {
    switch(action.type) {
        case API_CALL_REQUEST_PLACES:
            return {...state, placesfetching: true, error: null};
        case API_CALL_RECIEVE_PLACES:
            return {...state, placesfetching: false, places: action.places };
        default:
            return state;
    }
}
