var logger = require('../logger/logger').logger;
var FestivalsDeferred = function FestivalsDeferred(client) {

  var createCategory = function createCategory(festivalId, data) {
    logger.args('FestivalsDeferred.createCategory:', arguments);

    var parameters = {
      id: festivalId,
      body: {
        name: getParameterValue(data, 'name'),
        parent: getParameterValue(data, 'parent')
      }
    };

    return client.createFestivalCategory(parameters);
  };

  var getCategories = function getCategories(festivalId, query) {
    logger.args('FestivalsDeferred.getCategories:', arguments);

    var parameters = {
      id: festivalId
    };

    ['parent.id', 'updatedAt', 'name', 'limit', 'offset'].map(function (paramName) {
      parameters[paramName] = getParameterValue(query, paramName);
    });

    return client.getFestivalCategories(parameters);
  };

  var createPlace = function createPlace(festivalId, data) {
    logger.args('FestivalsDeferred.createPlace:', arguments);

    var parameters = {
      id: festivalId,
      body: {
        name: getParameterValue(data, 'name'),
        parent: getParameterValue(data, 'parent'),
        openingTimes: []
      }
    };

    if (data.hasOwnProperty('openingTimes')) {

      parameters.body.openingTimes = data.openingTimes.map(function (placeOpening) {
        return {
          startAt: getParameterValue(placeOpening, 'startAt'),
          finishAt: getParameterValue(placeOpening, 'finishAt')
        };
      });
    }

    return client.createFestivalPlace(parameters);
  };

  var getPlaces = function getPlaces(festivalId, query) {
    logger.args('FestivalsDeferred.getPlaces:', arguments);

    var parameters = {
      id: festivalId
    };

    ['parent.id', 'updatedAt', 'name', 'limit', 'offset'].map(
      function (paramName) {
        parameters[paramName] = getParameterValue(query, paramName);
      });

    return client.getFestivalPlaces(parameters);
  };

  var createEvent = function createEvent(festivalId, data) {
    logger.args('FestivalsDeferred.createEvent:', arguments);

    var parameters = {
      id: festivalId,
      body: {
        name: getParameterValue(data, 'name'),
        description: getParameterValue(data, 'description'),
        tags: getParameterValue(data, 'tags'),
        duration: {},
        images: [],
        place: getParameterValue(data, 'place'),
        category: getParameterValue(data, 'category')
      }
    };

    if (data.hasOwnProperty('duration')) {
      parameters.body.duration = {
        startAt: getParameterValue(data.duration, 'startAt'),
        finishAt: getParameterValue(data.duration, 'finishAt')
      };
    }

    if (data.hasOwnProperty('images')) {
      parameters.body.images = data.images.map(function (festivalImage) {
        return {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };
      });
    }

    return client.createFestivalEvent(parameters);
  };

  var getEvents = function getEvents(festivalId, query) {
    logger.args('FestivalsDeferred.getEvents:', arguments);

    var parameters = {
      id: festivalId
    };

    ['startAt', 'finishAt', 'updatedAt', 'place', 'category', 'name', 'limit', 'offset'].map(
      function (paramName) {
        parameters[paramName] = getParameterValue(query, paramName);
      });

    return client.getFestivalEvents(parameters);
  };

  var createFestival = function createFestival(festival) {
    logger.args('FestivalsDeferred.createFestival:', arguments);

    var parameters = {
      body: {
        name: getParameterValue(festival, 'name'),
        description: getParameterValue(festival, 'description'),
        tags: getParameterValue(festival, 'tags'),
        duration: {},
        locations: [],
        images: []
      }
    };

    if (festival.hasOwnProperty('duration')) {
      parameters.body.duration = {
        startAt: getParameterValue(festival.duration, 'startAt'),
        finishAt: getParameterValue(festival.duration, 'finishAt')
      };
    }

    if (festival.hasOwnProperty('locations')) {

      parameters.body.locations = festival.locations.map(function (festivalLocation) {

        var location = {
          name: getParameterValue(festivalLocation, 'name'),
          state: getParameterValue(festivalLocation, 'state'),
          country: getParameterValue(festivalLocation, 'country'),
          street: getParameterValue(festivalLocation, 'street'),
          zip: getParameterValue(festivalLocation, 'zip'),
          openingTimes: []
        };


        if (festivalLocation.hasOwnProperty('openingTimes')) {

          location.openingTimes = festivalLocation.openingTimes.map(function (locationOpening) {
            return {
              startAt: getParameterValue(locationOpening, 'startAt'),
              finishAt: getParameterValue(locationOpening, 'finishAt')
            };
          });
        }

        return location;
      });
    }

    if (festival.hasOwnProperty('images')) {

      parameters.body.images = festival.images.map(function (festivalImage) {
        return {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };
      });
    }

    return client.createFestival(parameters);
  };


  var getFestivals = function getFestivals(query) {
    logger.args('FestivalsDeferred.getFestivals:', arguments);

    var parameters = {};

    ['startAt', 'updatedAt', 'country', 'name', 'limit', 'offset'].map(function (paramName) {
      parameters[paramName] = getParameterValue(query, paramName);
    });

    return client.getFestivals(parameters);
  };

  var getParameterValue = function getParameterValue(query, paramName) {
    if (query && query.hasOwnProperty(paramName) && query[paramName] !== undefined) {
      return query[paramName];
    }

    return undefined;
  };

  return {
    createCategory: createCategory,
    getCategories: getCategories,
    createPlace: createPlace,
    getPlaces: getPlaces,
    createEvent: createEvent,
    getEvents: getEvents,
    createFestival: createFestival,
    getFestivals: getFestivals
  };

};

module.exports = {
  FestivalsDeferred: FestivalsDeferred
};

