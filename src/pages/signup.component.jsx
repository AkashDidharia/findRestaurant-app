import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';


const SignUp = ()=> {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    let signUpPayload ={
      firstName,
      lastName,
      email,
      password
    }
    
    try{
      const res = await axios.post('http://localhost:8000/register', signUpPayload);

      localStorage.setItem("token",res.data.token);
      setLoggedIn(true);
      history.push('/');
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

    return (
      <div className="SignUp container">
        

        <form className="row col-md-6 col-sm-10 m-auto border rounded p-4">
        <h2 className="text-center border-bottom p-4">Register</h2>

          <div className="form-group row g-0 my-2">
            <div className="form-group col-12 col-sm ">
              <input type="text" className="form-control" placeholder="FirstName" value={firstName} onChange={ e =>{setMessage(' '); setFirstName(e.target.value)}}/>
            </div>
            <div className="form-group col-12 col-sm mt-3 mt-sm-0 ms-sm-4">
              <input type="text" className="form-control" placeholder="LastName" value={lastName} onChange={ e => {setMessage(' '); setLastName(e.target.value)}}/>
            </div>
          </div>

          <div className="form-group row g-0">
            <input type="email" className="form-control my-2" placeholder="Email" value={email} onChange={ e => {setMessage(' '); setEmail(e.target.value)}}/>
          </div>

          <div className="form-group row g-0">
            <input type="password" className="form-control my-2" placeholder="Password" value={password} onChange={ e => {setMessage(' '); setPassword(e.target.value)}}/>
          </div>

          <div className="text-danger text-center" style={{height:"1rem", 'font-size':".8rem"}}>{message}</div>

          <div className="row g-0">
            <div className="form-group offset-md-4 col-md-4 mt-3">
              <button type="submit" className="btn btn-primary col-12" onClick={handleSubmit}>Register</button>
            </div>

          </div>
            
        </form>
        { loggedIn ? (<Redirect to='/' />) : null }

      </div>
    );
};

export default SignUp;