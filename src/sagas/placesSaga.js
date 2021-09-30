import {takeLatest, call, put} from 'redux-saga/effects';
import axios from "axios";

//this saga/generator function watches for the trigger of the action mentioned 
export default function* placesSaga(){
    yield takeLatest("API_CALL_REQUEST_PLACES", placesWorkerSaga);
}

//api call
function fetchPlaces(){
    return axios({
        method: "get",
        url: "http://localhost:8000/getListOfPlaces"
    });
}


//once the above trigger happens this below gen function gets triggered
function* placesWorkerSaga(){
    try{
        const response = yield(call(fetchPlaces));
        const places = response.data;

        //dispatch an event that says we got a success response

        yield put({type: "API_CALL_RECIEVE_PLACES", places})
    }

    catch(error){yield put({type: "API_CALL_FAILURE", error})}
    
}