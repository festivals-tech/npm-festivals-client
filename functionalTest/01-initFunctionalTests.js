process.env.NODE_ENV = 'test';

var config = require('config');

before(function (done) {
  console.log('Starting functional tests on host: "%s" using token: "%s"', config.client.host, config.client.token);
  done();
});