'use strict';

require('dotenv').config({path:'../../../.env'});
const mongoose = require('mongoose');
const supertest = require('supertest');
const {app} = require('../../../src/app.js');

const request = supertest(app);

describe('/upload', () => {

  beforeAll( () => {
    mongoose.connect(process.env.MONGODB_URI);
  });
  afterAll( () => {
    mongoose.connection.close();
  });

  it('POST /upload  200', () => {
    return request.get('/signin')
      .auth('john','john')
      .then(response => {
        return supertest.post('/upload')
          .set('Authorization', `Bearer ${response.text}`)
          .field('title', 'my image')
          .attach('img', '/auth-server/src/assets/mario-sell.gif')
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body.url).toBeTruthy();
          });
      });
  });
});

