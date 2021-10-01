import chai from 'chai';
import chaiHttp from 'chai-http';
import restaurantApp from '../server.js';

chai.should();
chai.use(chaiHttp);

describe('testing the /login route', () => {
    it('should return a status of 200', (done) => {
        let loginPayload = {
            email: 'qqqqq@gmail.com',
            password: 'test123'
        }
        chai.request(restaurantApp)
            .post('/login')
            .send(loginPayload)
            .then((_err, response) => {
                response.should.have.status(200);
            done();
            })
    });
});