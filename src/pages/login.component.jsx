import React, {useState} from 'react';
import axios from 'axios';

const Login = ()=> {

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    const loginPayload ={
      email,
      password
  }
  
  try{
    const res = await axios.post('http://localhost:8000/login', loginPayload);
    console.log(res);
    localStorage.setItem("token",res.data.token);
    setLoggedIn(true);

  } catch (err) {
    // setMessage(err);
    console.error(`Error : ${err}`);
  }
}


  return (
      <div className="Login">
        <h2>Login:</h2>
        
        <form>
          <div className="form-group my-2">
            <input type="email" required className="form-control" placeholder="Email" value={email} autoComplete="off" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-group my-2">
            <input type="password" required minLength="6" className="form-control" placeholder="Password" value={password} autoComplete="off" onChange={e => setPassword(e.target.value)}/>
          </div>
            <button type="submit" className="btn btn-primary" onClick={handleLogin}> Login </button>
        </form>
            
            {
              loggedIn ? (
                <>
                <p className="mt-4 text-center">You have successfully logged in</p>
                <a href="/" className="btn btn-primary  col-12 col-sm-6 offset-3 text-center"> Start Discovering </a>
                </>
              ) : (
                <>
                <p className="text-danger">{message}</p>
                <p className="mt-4 text-muted ">New User? <a href="/signup">Create Account</a></p>
                </>
              )
            }
      </div>
    );
};


export default Login;