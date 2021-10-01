import chai from 'chai';
import chaiHttp from 'chai-http';
import restaurantApp from '../server.js';

chai.should();
chai.use(chaiHttp);

describe('Test GET route /getListOfPlaces', () => {

    it('should return status 200', (done) => {
        chai.request(restaurantApp)
            .get('/getListOfPlaces')
            .end((err, response) => {
                response.should.have.status(200);
            done();
            })
    });

});