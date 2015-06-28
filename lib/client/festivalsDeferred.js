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
      for (var j in data.openingTimes) {
        var placeOpening = data.openingTimes[j];

        var opening = {
          startAt: getParameterValue(placeOpening, 'startAt'),
          finishAt: getParameterValue(placeOpening, 'finishAt')
        };

        parameters.body.openingTimes.push(opening);
      }
    }


    return client.createFestivalPlace(parameters);
  };

  var getPlaces = function getPlaces(festivalId, query) {
    logger.args('FestivalsDeferred.getPlaces:', arguments);

    var parameters = {
      id: festivalId
    };

    ['parent.id', 'updatedAt', 'name', 'limit', 'offset'].map(function (paramName) {
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
      for (var i in data.images) {
        var festivalImage = data.images[i];

        var image = {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };

        parameters.body.images.push(image);
      }
    }

    return client.createFestivalEvent(parameters);
  };

  var getFestivalEvents = function getFestivalEvents(festivalId, query) {
    logger.args('FestivalsDeferred.getFestivalEvents:', arguments);

    var parameters = {
      id: festivalId
    };

    ['startAt', 'finishAt', 'updatedAt', 'place', 'category', 'name', 'limit', 'offset'].map(function (paramName) {
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
      for (var i in festival.locations) {
        var festivalLocation = festival.locations[i];

        var location = {
          name: getParameterValue(festivalLocation, 'name'),
          state: getParameterValue(festivalLocation, 'state'),
          country: getParameterValue(festivalLocation, 'country'),
          street: getParameterValue(festivalLocation, 'street'),
          zip: getParameterValue(festivalLocation, 'zip'),
          openingTimes: []
        };


        if (festivalLocation.hasOwnProperty('openingTimes')) {
          for (var j in festivalLocation.openingTimes) {
            var locationOpening = festivalLocation.openingTimes[j];

            var opening = {
              startAt: getParameterValue(locationOpening, 'startAt'),
              finishAt: getParameterValue(locationOpening, 'finishAt')
            };

            location.openingTimes.push(opening);
          }
        }

        parameters.body.locations.push(location);
      }
    }

    if (festival.hasOwnProperty('images')) {
      for (var i in festival.images) {
        var festivalImage = festival.images[i];

        var image = {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };

        parameters.body.images.push(image);
      }
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
    getFestivalEvents: getFestivalEvents,
    createFestival: createFestival,
    getFestivals: getFestivals
  }

};

module.exports = {
  FestivalsDeferred: FestivalsDeferred
};

