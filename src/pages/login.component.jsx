import React, {useState} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = ()=> {

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(' ');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(' ');

    const loginPayload ={
      email,
      password
  }
  
  try{
    const res = await axios.post('http://localhost:8000/login', loginPayload);
    console.log(res);
    localStorage.setItem("token",res.data.token);
    setLoggedIn(true);
    history.push('/');


  } catch (err) {
    setMessage(err.response.data.message);
  }
}


  return (
      <div className="Login row">
        <h2 className="text-center text-warning my-4">Login</h2>
        
        <form className="col-sm-6 border rounded p-4 offset-sm-3 my-2">
          <div className="form-group my-4">
            <input type="email" required className="form-control" placeholder="Email" value={email} autoComplete="off" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group mt-4">
            <input type="password" required minLength="6" className="form-control" placeholder="Password" value={password} autoComplete="off" onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="text-danger text-center" style={{height:"1rem", fontSize:".8rem"}}>{message}</div>
          <div className="form-group text-center mt-4">
            <button type="submit" className="btn btn-primary col-sm-6" onClick={handleLogin}> Login </button>
          </div>
        </form>
            
            {
              loggedIn ? (
                <>
                <Redirect to='/'/>
                <p className="mt-4 text-center">You have successfully logged in</p>
                <a href="/" className="btn btn-primary  col-12 col-sm-6 offset-3 text-center"> Start Discovering </a>
                </>
              ) : (
                <>
                <p className="mt-4 text-muted text-center">New User? <a href="/signup">Create Account</a></p>
                </>
              )
            }
      </div>
    );
};


export default Login;