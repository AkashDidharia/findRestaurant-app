import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
var server = supertest.agent("http://localhost:3000");


//Asserstion style
import assert, { doesNotReject } from 'assert';
import expect from 'expect';

chai.should();

//describe (description of the test case in quotes, callback function)
describe('Unit testing the /getListOfPlaces route', ()=>{ //function of integrated isolated unit test

    it('It should return ok status when triggered', ()=>{
        server
            .get('/getListOfPlaces')
            .end( (err, res) => {
                res.body.length.should.be.eq(4);
                done();
        })
    }); //one isolated test case

    // it();
})