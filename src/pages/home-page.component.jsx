import React from 'react';
import ButtonHolder from '../components/buttonHolder.component'

const HomePage = ()=> {

    return (
      <div className="home-page row g-0">
        <div className=" quoteBox bg-info col-12 rounded text-dark my-auto p-2">
            <div className="quoteBox col h3">
              "One cannot Think well, Love well, Sleep well,
            </div>          
            <div className=" quoteBox h2 offset-sm-3 col">
              if one has not <strong>dined WELL"</strong>
            </div>
        </div>


        <div className="col-md-6 offset-md-3">
          <div className="text-center text-warning h3 pt-5 pb-3">
            Welcome To The Foodie Hub
          </div>

          <div className="row bg-secondary rounded g-0">
            <div className="text-center text-info col-12 h3 pt-4 border-bottom">
              We bring to You
            </div>
            <div className="col mx-1 text-center my-2 p-1">
              <span className="text-warning ">
                 <strong>The choosiest Restaurants</strong>
              </span>
            </div>
            <div className="col mx-1 my-2 text-center p-1">
              <span className="text-warning text-center">
                <strong>Critically reviewed by our experts</strong>
              </span>
            </div>
          </div>

        </div>
        <div className="filler" style={{height:"80px"}}></div>
        <ButtonHolder/>
      </div>
    );
};

export default HomePage;
