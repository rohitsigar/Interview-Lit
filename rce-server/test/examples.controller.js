import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Examples', () => {
  it('should get all examples', () =>
    request(Server)
      .get('//examples')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an.an('array').of.length(2);
      }));

  it('should add a new example', () =>
    request(Server)
      .post('//examples')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should get an example by id', () =>
    request(Server)
      .get('//examples/2')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));
});
