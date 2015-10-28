var logger = require('../logger/logger').logger;
var FestivalsDeferred = function FestivalsDeferred(client) {

  var createCategory = function createCategory(festivalId, data) {
    logger.args('FestivalsDeferred.createCategory:', arguments);

    var parameters = {
      id: festivalId,
      festivalCategoryRequest: {
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

    ['parent.id', 'updatedAt', 'name', 'limit', 'offset', 'sort'].map(function (paramName) {
      parameters[paramName] = getParameterValue(query, paramName);
    });

    return client.getFestivalCategories(parameters);
  };

  var createPlace = function createPlace(festivalId, data) {
    logger.args('FestivalsDeferred.createPlace:', arguments);

    var parameters = {
      id: festivalId,
      festivalPlaceRequest: {
        name: getParameterValue(data, 'name'),
        parent: getParameterValue(data, 'parent'),
        openingTimes: []
      }
    };

    if (data.hasOwnProperty('openingTimes')) {

      parameters.festivalPlaceRequest.openingTimes = data.openingTimes.map(function (placeOpening) {
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

    ['parent.id', 'updatedAt', 'name', 'limit', 'offset', 'sort'].map(
      function (paramName) {
        parameters[paramName] = getParameterValue(query, paramName);
      });

    return client.getFestivalPlaces(parameters);
  };

  var createEvent = function createEvent(festivalId, data) {
    logger.args('FestivalsDeferred.createEvent:', arguments);

    var parameters = {
      id: festivalId,
      festivalEventRequest: {
        name: getParameterValue(data, 'name'),
        description: getParameterValue(data, 'description'),
        status: getParameterValue(data, 'status'),
        tags: getParameterValue(data, 'tags'),
        duration: {},
        images: [],
        place: getParameterValue(data, 'place'),
        category: getParameterValue(data, 'category'),
        authors: [],
        metadata: getParameterValue(data, 'metadata')
      }
    };

    if (data.hasOwnProperty('duration')) {
      parameters.festivalEventRequest.duration = {
        startAt: getParameterValue(data.duration, 'startAt'),
        finishAt: getParameterValue(data.duration, 'finishAt')
      };
    }

    if (data.hasOwnProperty('images')) {
      parameters.festivalEventRequest.images = data.images.map(function (festivalImage) {
        return {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };
      });
    }

    if (data.hasOwnProperty('authors')) {
      parameters.festivalEventRequest.authors = data.authors.map(function (author) {
        return {
          name: getParameterValue(author, 'name'),
          organization: getParameterValue(author, 'organization')
        };
      });
    }

    return client.createFestivalEvent(parameters);
  };

  var updateEvent = function updateEvent(festivalId, eventId, data) {
    logger.args('FestivalsDeferred.updateEvent:', arguments);

    var parameters = {
      id: festivalId,
      'event.id': eventId,
      festivalEventRequest: {
        name: getParameterValue(data, 'name'),
        description: getParameterValue(data, 'description'),
        status: getParameterValue(data, 'status'),
        tags: getParameterValue(data, 'tags'),
        duration: {},
        images: [],
        place: getParameterValue(data, 'place'),
        category: getParameterValue(data, 'category'),
        authors: [],
        metadata: getParameterValue(data, 'metadata')
      }
    };

    if (data.hasOwnProperty('duration')) {
      parameters.festivalEventRequest.duration = {
        startAt: getParameterValue(data.duration, 'startAt'),
        finishAt: getParameterValue(data.duration, 'finishAt')
      };
    }

    if (data.hasOwnProperty('images')) {
      parameters.festivalEventRequest.images = data.images.map(function (festivalImage) {
        return {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };
      });
    }

    if (data.hasOwnProperty('authors')) {
      parameters.festivalEventRequest.authors = data.authors.map(function (author) {
        return {
          name: getParameterValue(author, 'name'),
          organization: getParameterValue(author, 'organization')
        };
      });
    }

    return client.updateFestivalEvent(parameters);
  };

  var getEvents = function getEvents(festivalId, query) {
    logger.args('FestivalsDeferred.getEvents:', arguments);

    var parameters = {
      id: festivalId
    };

    ['name', 'description', 'dateFrom', 'dateTo', 'author.name', 'author.organization', 'updatedAt', 'place.name', 'category.name', 'limit', 'offset', 'sort'].map(
      function (paramName) {
        parameters[paramName] = getParameterValue(query, paramName);
      });

    return client.getFestivalEvents(parameters);
  };

  var createFestival = function createFestival(festival) {
    logger.args('FestivalsDeferred.createFestival:', arguments);

    var parameters = {
      festivalRequest: {
        name: getParameterValue(festival, 'name'),
        type: getParameterValue(festival, 'type'),
        description: getParameterValue(festival, 'description'),
        tags: getParameterValue(festival, 'tags'),
        duration: {},
        locations: [],
        images: [],
        type: getParameterValue(festival, 'type')
      }
    };

    if (festival.hasOwnProperty('duration')) {
      parameters.festivalRequest.duration = {
        startAt: getParameterValue(festival.duration, 'startAt'),
        finishAt: getParameterValue(festival.duration, 'finishAt')
      };
    }

    if (festival.hasOwnProperty('locations')) {

      parameters.festivalRequest.locations = festival.locations.map(function (festivalLocation) {

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

      parameters.festivalRequest.images = festival.images.map(function (festivalImage) {
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

    ['name', 'description', 'type', 'tag', 'dateFrom', 'dateTo', 'location.country', 'location.name', 'location.city', 'location.state', 'updatedAt', 'limit', 'offset', 'type', 'sort'].map(function (paramName) {
      parameters[paramName] = getParameterValue(query, paramName);
    });

    return client.getFestivals(parameters);
  };

  var createNews = function createNews(festivalId, data) {
    logger.args('FestivalsDeferred.createNews:', arguments);

    var parameters = {
      id: festivalId,
      newsRequest: {
        name: getParameterValue(data, 'name'),
        description: getParameterValue(data, 'description'),
        tags: getParameterValue(data, 'tags'),
        authors: [],
        images: [],
        publishedAt: getParameterValue(data, 'publishedAt')
      }
    };

    if (data.hasOwnProperty('images')) {
      parameters.newsRequest.images = data.images.map(function (festivalImage) {
        return {
          url: getParameterValue(festivalImage, 'url'),
          order: getParameterValue(festivalImage, 'order')
        };
      });
    }

    if (data.hasOwnProperty('authors')) {
      parameters.newsRequest.authors = data.authors.map(function (author) {
        return {
          name: getParameterValue(author, 'name'),
          organization: getParameterValue(author, 'organization')
        };
      });
    }

    return client.createNews(parameters);
  };

  var getFestivalNewsCollection = function getFestivalNewsCollection(festivalId, query) {
    logger.args('FestivalsDeferred.getFestivalNewsCollection:', arguments);

    var parameters = {
      id: festivalId
    };

    ['name', 'updatedAt', 'country', 'limit', 'offset', 'sort'].map(
      function (paramName) {
        parameters[paramName] = getParameterValue(query, paramName);
      });

    return client.getFestivalNewsCollection(parameters);
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
    updateEvent: updateEvent,
    getEvents: getEvents,
    createFestival: createFestival,
    getFestivals: getFestivals,
    createNews: createNews,
    getFestivalNewsCollection: getFestivalNewsCollection
  };

};

module.exports = {
  FestivalsDeferred: FestivalsDeferred
};

