var logger = require('../logger/logger').logger;
var FestivalsDeferred = require('./festivalsDeferred').FestivalsDeferred;

var Festivals = function Festivals(client) {

  var festivalsDeferred = new FestivalsDeferred(client);

  var deferred = function (callback) {
    this
      .then(function (value) {
        //console.log('then');
        //console.log(value);
        return callback(null, value.response, value.body);
      })
      .fail(function (error) {
        //console.log('fail', error);
        //console.log(error);
        if (error.hasOwnProperty('response') && error.hasOwnProperty('body')) {
          return callback(null, error.response, error.body);
        }

        return callback(error);
      });
  };

  var createCategory = function createCategory(festivalId, data, callback) {
    logger.args('Festivals.createCategory:', arguments);
    var promise = festivalsDeferred.createCategory(festivalId, data);
    deferred.call(promise, callback);
  };

  var getCategories = function getCategories(festivalId, query, callback) {
    logger.args('Festivals.getCategories:', arguments);

    var promise = festivalsDeferred.getCategories(festivalId, query);
    deferred.call(promise, callback);
  };

  var createPlace = function createPlace(festivalId, data, callback) {
    logger.args('Festivals.createPlace:', arguments);

    var promise = festivalsDeferred.createPlace(festivalId, data);
    deferred.call(promise, callback);
  };

  var getPlaces = function getPlaces(festivalId, query, callback) {
    logger.args('Festivals.getPlaces:', arguments);

    var promise = festivalsDeferred.getPlaces(festivalId, query);
    deferred.call(promise, callback);
  };

  var createEvent = function createEvent(festivalId, data, callback) {
    logger.args('Festivals.createEvent:', arguments);

    var promise = festivalsDeferred.createEvent(festivalId, data);
    deferred.call(promise, callback);
  };

  var updateEvent = function updateEvent(festivalId, eventId, data, callback) {
    logger.args('Festivals.updateEvent:', arguments);

    var promise = festivalsDeferred.updateEvent(festivalId, eventId, data);
    deferred.call(promise, callback);
  };

  var getEvents = function getEvents(festivalId, query, callback) {
    logger.args('Festivals.getEvents:', arguments);

    var promise = festivalsDeferred.getEvents(festivalId, query);
    deferred.call(promise, callback);
  };

  var createFestival = function createFestival(festival, callback) {
    logger.args('Festivals.createFestival:', arguments);

    var promise = festivalsDeferred.createFestival(festival);
    deferred.call(promise, callback);
  };

  var getFestivals = function getFestivals(query, callback) {
    logger.args('Festivals.getFestivals:', arguments);

    var promise = festivalsDeferred.getFestivals(query);
    deferred.call(promise, callback);
  };

  var createNews = function createNews(festivalId, data, callback) {
    logger.args('Festivals.createNews:', arguments);

    var promise = festivalsDeferred.createNews(festivalId, data);
    deferred.call(promise, callback);
  };

  var getFestivalNewsCollection = function getFestivalNewsCollection(festivalId, query, callback) {
    logger.args('Festivals.getFestivalNewsCollectionCollection:', arguments);

    var promise = festivalsDeferred.getFestivalNewsCollection(festivalId, query);
    deferred.call(promise, callback);
  };

  return {
    createCategory: createCategory,
    getCategories: getCategories,
    createPlace: createPlace,
    getPlaces: getPlaces,
    createEvent: createEvent,
    updateEvent: updateEvent,
    getEvents: getEvents,
    createFestival: createFestival,
    getFestivals: getFestivals,
    createNews: createNews,
    getFestivalNewsCollection: getFestivalNewsCollection
  };

};

module.exports = {
  Festivals: Festivals
};

