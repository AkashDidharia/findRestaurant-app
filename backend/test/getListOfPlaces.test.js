import assert from 'assert';
import expect from 'expect';
import request from 'supertest';
import restaurantApp from '../server.js';


describe('testing the /getListOfPlaces route', () => {
    it('should return status 200', () => {
        return request(restaurantApp)
            .get('/getListOfPlaces')
            .then(response => {
                assert.equal(response.status, 200)
            })
            .catch(err => {console.error(err)});
    });
});