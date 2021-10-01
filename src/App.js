import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/navbar.component';
import HomePage from './pages/home-page.component';
import Login from './pages/login.component';
import SignUp from './pages/signup.component';
import DiscoveryList from './pages/discovery.component';
import Restaurant from './pages/restaurant.component';

function App() {
  return (
    <Router>

    <div title="App" className="container bg-dark text-light">
      <NavBar />
      <br/>
      <Route exact path="/" component={HomePage}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/discovery" component={DiscoveryList}/>
      <Route path="/restaurant/:name/:id" component={Restaurant}/>
    </div>
    </Router>

  );
}

export default App;
