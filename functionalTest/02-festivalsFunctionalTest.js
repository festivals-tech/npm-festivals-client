var chai = require('chai');
var should = chai.should();
var config = require('config');
var moment = require('moment');
var uuid = require('node-uuid');

var FestivalsDeferred = require('../lib/client/festivalsDeferred').FestivalsDeferred;
var Festivals = require('../lib/client/festivals').Festivals;
var FestivalsApi = require('../lib/api/festivalsApi').FestivalsApi;

describe('festivals functional test', function () {

  var options = {
    domain: config.client.host
  };

  var now = moment();
  var festivalId = '5bba1a77-d1c6-4f66-9884-04e2bf6c01dc';

  var client = new FestivalsApi(options);
  var festivalsApi = new Festivals(client);
  var festivalsApiDeferred = new FestivalsDeferred(client);
  var placeId = null;
  var categoryId = null;

  it('should create festival category deferred', function (done) {

    var data = {
      name: 'category-name'
    };

    festivalsApiDeferred.createCategory(festivalId, data)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(201);
        body.id.should.not.be.empty;
        body.name.should.be.equal('category-name');
        body.createdAt.should.not.be.empty;
        body.updatedAt.should.not.be.empty;

        categoryId = body.id;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);
        throw new Error(body.message);
        done();
      });
  });

  it('should create festival category', function (done) {

    var data = {
      name: 'category-name'
    };

    festivalsApi.createCategory(festivalId, data, function (err, response, body) {
      response.statusCode.should.be.equal(201);
      body.id.should.not.be.empty;
      body.name.should.be.equal('category-name');
      body.createdAt.should.not.be.empty;
      body.updatedAt.should.not.be.empty;

      done();
    });
  });

  it('should get festival categories deferred', function (done) {

    var query = {
      name: 'category-name'
    };

    festivalsApiDeferred.getCategories(festivalId, query)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(200);
        body.total.should.be.above(1);
        body.categories.should.not.be.empty;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);
        throw new Error(body.message);
        done();
      });
  });

  it('should get festival categories', function (done) {

    var query = {
      name: 'category-name'
    };

    festivalsApi.getCategories(festivalId, query, function (err, response, body) {
      //console.log('then', response.statusCode, body);

      response.statusCode.should.be.equal(200);
      body.total.should.be.above(1);
      body.categories.should.not.be.empty;

      done();
    });
  });


  it('should create festival place deferred', function (done) {

    var startAt = now.toISOString();
    var finishAt = moment(now).add(8, 'hours').toISOString();

    var data = {
      name: 'place-name',
      openingTimes: [
        {
          startAt: startAt,
          finishAt: finishAt
        }
      ]
    };

    festivalsApiDeferred.createPlace(festivalId, data)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(201);
        body.id.should.not.be.empty;
        body.openingTimes.should.be.empty;
        //body.parent.should.be.null;
        body.name.should.be.equal('place-name');
        body.createdAt.should.not.be.empty;
        body.updatedAt.should.not.be.empty;

        placeId = body.id;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);
        throw new Error(body.message);
        done();
      });
  });

  it('should create festival place', function (done) {

    var startAt = now.toISOString();
    var finishAt = moment(now).add(8, 'hours').toISOString();

    var data = {
      name: 'place-name',
      openingTimes: [
        {
          startAt: startAt,
          finishAt: finishAt
        }
      ]
    };

    festivalsApi.createPlace(festivalId, data, function (err, response, body) {

      response.statusCode.should.be.equal(201);
      body.id.should.not.be.empty;
      body.openingTimes.should.be.empty;
      //body.parent.should.be.empty;
      body.name.should.be.equal('place-name');
      body.createdAt.should.not.be.empty;
      body.updatedAt.should.not.be.empty;

      done();
    });
  });

  it('should get festival places deferred', function (done) {

    var query = {
      name: 'place-name'
    };

    festivalsApiDeferred.getPlaces(festivalId, query)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(200);
        body.total.should.be.above(1);
        body.places.should.not.be.empty;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);
        throw new Error(body.message);
        done();
      });
  });

  it('should get festival places', function (done) {

    var query = {
      name: 'place-name'
    };

    festivalsApi.getPlaces(festivalId, query, function (err, response, body) {
      //console.log('then', response.statusCode, body);

      response.statusCode.should.be.equal(200);
      body.total.should.be.above(1);
      body.places.should.not.be.empty;

      done();
    });
  });


  it('should create festival event deferred', function (done) {

    var id = uuid.v4();
    var data = {
      name: 'event-name' + id,
      description: 'event-description' + id,
      tags: ['event-tag1' + id, 'event-tag2' + id],
      duration: {
        startAt: now.toISOString(),
        finishAt: moment(now).add(2, 'hours').toISOString()
      },
      images: [
        {
          url: 'http://podgk.pl/wp-content/uploads/2011/06/dni_fantastyki_podgk.jpg?id=' + id,
          order: 0
        }
      ],
      place: placeId,
      category: categoryId
    };

    festivalsApiDeferred.createEvent(festivalId, data)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(201);
        body.id.should.not.be.empty;
        body.place.should.not.be.empty;
        body.category.should.not.be.empty;
        body.authors.should.be.empty;
        //body.duration.should.be.equal(data.duration);
        body.mainImage.should.not.be.empty;
        //body.tags.should.be.equal(data.tags);
        body.name.should.be.equal(data.name);
        body.description.should.be.equal(data.description);
        body.createdAt.should.not.be.empty;
        body.updatedAt.should.not.be.empty;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);

        throw new Error(body.message);

        done();
      });
  });

  it('should create festival event', function (done) {

    var id = uuid.v4();
    var data = {
      name: 'event-name' + id,
      description: 'event-description' + id,
      tags: ['event-tag1' + id, 'event-tag2' + id],
      duration: {
        startAt: now.toISOString(),
        finishAt: moment(now).add(2, 'hours').toISOString()
      },
      images: [
        {
          url: 'http://podgk.pl/wp-content/uploads/2011/06/dni_fantastyki_podgk.jpg?id=' + id,
          order: 0
        }
      ],
      place: placeId,
      category: categoryId
    };

    festivalsApi.createEvent(festivalId, data, function (err, response, body) {

      //console.log('then', response.statusCode, body);

      response.statusCode.should.be.equal(201);
      body.id.should.not.be.empty;
      body.place.should.not.be.empty;
      body.category.should.not.be.empty;
      body.authors.should.be.empty;
      //body.duration.should.be.equal(data.duration);
      body.mainImage.should.not.be.empty;
      //body.tags.should.be.equal(data.tags);
      body.name.should.be.equal(data.name);
      body.description.should.be.equal(data.description);
      body.createdAt.should.not.be.empty;
      body.updatedAt.should.not.be.empty;

      done();
    });
  });


  it('should get festival events deferred', function (done) {

    var query = {
      name: 'event-name'
    };

    festivalsApiDeferred.getEvents(festivalId, query)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(200);
        body.total.should.be.above(1);
        body.events.should.not.be.empty;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);
        throw new Error(body.message);
        done();
      });
  });

  it('should get festival events', function (done) {

    var query = {
      name: 'event-name'
    };

    festivalsApi.getEvents(festivalId, query, function (err, response, body) {
      //console.log('then', response.statusCode, body);

      response.statusCode.should.be.equal(200);
      body.total.should.be.above(1);
      body.events.should.not.be.empty;

      done();
    });
  });

  it('should create festival deferred', function (done) {

    var festival = {
      name: 'festival-name',
      description: 'festival-description',
      tags: ['festival-tag1', 'festival-tag2'],
      duration: {
        startAt: now.toISOString(),
        finishAt: moment(now).add(2, 'days').toISOString()
      },
      locations: [
        {
          name: 'Międzynarodowe targi Poznańskie',
          state: 'wielkopolskie',
          country: 'PL',
          street: 'street',
          zip: 'zip',
          openingTimes: [
            {
              startAt: now.toISOString(),
              finishAt: moment(now).add(2, 'hours').toISOString()
            }
          ]
        }
      ],
      images: [
        {
          url: 'http://podgk.pl/wp-content/uploads/2011/06/dni_fantastyki_podgk.jpg',
          order: 0
        }
      ]
    };

    festivalsApiDeferred.createFestival(festival)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(201);
        body.id.should.not.be.empty;
        body.mainImage.should.not.be.empty;
        body.locations.should.not.be.empty;
        //body.tags.should.be.equal(festival.tags);
        body.name.should.be.equal(festival.name);
        body.description.should.be.equal(festival.description);
        body.createdAt.should.not.be.empty;
        body.updatedAt.should.not.be.empty;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        console.log('fail', response.statusCode, body);

        throw new Error(body.message);

        done();
      });
  });

  it('should create festival', function (done) {

    var festival = {
      name: 'festival-name',
      description: 'festival-description',
      tags: ['festival-tag1', 'festival-tag2'],
      duration: {
        startAt: now.toISOString(),
        finishAt: moment(now).add(2, 'days').toISOString()
      },
      locations: [
        {
          name: 'Międzynarodowe targi Poznańskie',
          state: 'wielkopolskie',
          country: 'PL',
          street: 'street',
          zip: 'zip',
          openingTimes: [
            {
              startAt: now.toISOString(),
              finishAt: moment(now).add(2, 'hours').toISOString()
            }
          ]
        }
      ],
      images: [
        {
          url: 'http://podgk.pl/wp-content/uploads/2011/06/dni_fantastyki_podgk.jpg',
          order: 0
        }
      ]
    };

    festivalsApi.createFestival(festival, function (err, response, body) {

      response.statusCode.should.be.equal(201);
      body.id.should.not.be.empty;
      body.mainImage.should.not.be.empty;
      body.locations.should.not.be.empty;
      //body.tags.should.be.equal(festival.tags);
      body.name.should.be.equal(festival.name);
      body.description.should.be.equal(festival.description);
      body.createdAt.should.not.be.empty;
      body.updatedAt.should.not.be.empty;

      done();
    });
  });

  it('should get festivals deferred', function (done) {

    var query = {
      name: 'festival-name'
    };

    festivalsApiDeferred.getFestivals(query)
      .then(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('then', response.statusCode, body);

        response.statusCode.should.be.equal(200);
        body.total.should.be.above(1);
        body.festivals.should.not.be.empty;

        done();
      })
      .fail(function (value) {
        var response = value.response;
        var body = value.body;

        //console.log('fail', response.statusCode, body);
        throw new Error(body.message);
        done();
      });
  });

  it('should get festivals', function (done) {

    var query = {
      name: 'festival-name'
    };

    festivalsApi.getFestivals(query, function (err, response, body) {
      //console.log('then', response.statusCode, body);

      response.statusCode.should.be.equal(200);
      body.total.should.be.above(1);
      body.festivals.should.not.be.empty;

      done();
    });
  });


});