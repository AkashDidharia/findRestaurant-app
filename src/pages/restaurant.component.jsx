import React, {useState} from 'react';
import axios from 'axios';


const Restaurant = (props)=> {

  const resId = props.match.params.id
  const resName = props.match.params.name
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    let queryPayload ={
      "restaurantId": resId,
      "userName": userName,
      "phoneNumber":phoneNumber,
      "userQuery":userQuery,
      "token": localStorage.getItem('token')
    }

    try{
      
      const res = await axios.post('http://localhost:8000/postQuery', queryPayload);
         
      setUserName('');
      setPhoneNumber('');
      setUserQuery('');

      setMessage(res.data);
    } catch (err) {
      console.error(err);
      return 'Query not posted! Sorry, please try again'
    }

  }

    return (
      <div>
        <h2 className="text-warning text-center">Welcome to {resName}!</h2>
      

        <h5 className="text-danger mt-5 text-center">Have a Question for us?</h5>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label  >Your Name :</label>
            <input id="userName" name="userName" type="text" className="form-control" value={userName} required onChange={ e => setUserName(e.target.value)}/>
          </div>
          <div className="form-group my-2">
            <label >Contact Number :</label>
            <input id="phoneNumber" name="phoneNumber" type="number" className=" form-control" minLength="10" maxLength="10" value={phoneNumber} required onChange={ e => setPhoneNumber(e.target.value)}/>
          </div>
          <div className="form-group my-2">
            <label >Your Query:</label>
            <textarea id="userQuery" name="userQuery" type="text" className="col-sm-8 form-control" row="5" col="20" value={userQuery} onChange={ e => setUserQuery(e.target.value)}/>
          </div>
          <div className="form-group my-2">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>

        { message ? (<p className="text-danger mt-3">{message}</p>) : (null)}

      </div>
    );
};

export default Restaurant;