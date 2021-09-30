import React, {useState} from 'react';
import axios from 'axios';

const SignUp = ()=> {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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

      setMessage(res.data);
    } catch (err) {
      console.log(err);
    }
  }

    return (
      <div className="SignUp">
        <h2>Register:</h2>

        <form>

          <div className="row">
            <div className="form-group col">
              <input type="text" className="form-control" placeholder="FirstName" value={firstName} onChange={ e => setFirstName(e.target.value)}/>
            </div>
            <div className="form-group col">
              <input type="text" className="form-control" placeholder="LastName" value={lastName} onChange={ e => setLastName(e.target.value)}/>
            </div>
          </div>

          <div className="form-group col">
            <input type="email" className="form-control my-2" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group col">
            <input type="password" className="form-control my-2" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value)}/>
          </div>
          <div className="row">
            <div className="form-group offset-md-5 col-md-2">
            <button type="submit" className="btn btn-primary col-12" onClick={handleSubmit}>Register</button>
          </div>

          { message ? (<p className="text-danger mt-2">{message}</p>) : (null)}

          </div>
            
        </form>

      </div>
    );
};

export default SignUp;