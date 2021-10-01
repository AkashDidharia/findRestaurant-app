import chai from 'chai';
import chaiHttp from 'chai-http';
import restaurantApp from '../server.js';

chai.should();
chai.use(chaiHttp);

describe('testing the /register route', () => {
    it('should return a status of 200', (done) => {
        let user = {
            firstName: 'qqq',
            lastName: 'qqq',
            email: 'test@test.com',
            password: 'test123'
        }
        chai.request(restaurantApp)
            .post('/register')
            .send(user)
            .end((_err, response) => {
                response.should.have.status(200);
            done();
            })
    });
});