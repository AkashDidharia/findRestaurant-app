import React from 'react';
import { Link } from 'react-router-dom';
import './home-page.component.css';


const HomePage = ({onRequestPlaces})=> {

    return (
      <div className="home-page row g-0">
        <div className=" quoteBox bg-info col text-dark my-auto">
            <div className="quoteBox col h1">
              "One cannot Think well, Love well, Sleep well,
            </div>          
            <div className=" quoteBox h1 offset-sm-5 col">
              if one has not <strong>dined WELL"</strong>
            </div>
        </div>

        <div className="imageBox">
        </div>

        <div className="row">
          <div className="bg-dark text-warning display-3 pt-5 pb-3">
            WHY Us?
          </div>
          <div className="row">
            <div className="col-12 h3 border-bottom p-1">
              Because we bring to you: 
            </div>
            <div className="col-md mx-1 border-bottom p-1">
              <span className="h5 text-info">
                <span className="text-primary">&#8680;</span>
                 Only the choosiest Restaurants
              </span>
            </div>
            <div className="col-md mx-1 border-bottom p-1">
              <span className="h5 text-primary">
                <span className="text-info">&#8680;</span>
                Critically reviewed by our experts
              </span>
            </div>
            <div className="col-md mx-1 border-bottom p-1">
              <span className="h5 text-info">
                <span className="text-primary">&#8680;</span>
                 Tested on metrics from Taste and Location to Hygiene and Service 
              </span>
            </div>
            <div className="col-md mx-1 border-bottom p-1">
              <span className="h5 text-info">
                <span className="text-primary">&#8680;</span>
                Restaurant Lists that are personalized for your Needs and your Palate 
              </span>
            </div>
          </div>
        </div>


      </div>
    );
};

export default HomePage;
