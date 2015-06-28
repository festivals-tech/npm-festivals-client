/*jshint -W069 */
/**
 * 
 * @class FestivalsApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var FestivalsApi = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function FestivalsApi(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://festivals-app.herokuapp.com/api';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    /**
     * Set Token
     * @method
     * @name FestivalsApi#setBearerToken
     * @param {string} value - token's value
     *
     */
    FestivalsApi.prototype.setBearerToken = function(value) {
        this.token.value = value;
    };

    /**
     * Get festivals collection
     * @method
     * @name FestivalsApi#getFestivals
     * @param {string} name - name
     * @param {string} startAt - startAt
     * @param {string} updatedAt - updatedAt
     * @param {integer} limit - limit
     * @param {integer} offset - offset
     * @param {string} country - country
     * 
     */
    FestivalsApi.prototype.getFestivals = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['startAt'] !== undefined) {
            queryParameters['startAt'] = parameters['startAt'];
        }

        if (parameters['updatedAt'] !== undefined) {
            queryParameters['updatedAt'] = parameters['updatedAt'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters['country'] !== undefined) {
            queryParameters['country'] = parameters['country'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Create festival
     * @method
     * @name FestivalsApi#createFestival
     * @param {} body - Festival object
     * 
     */
    FestivalsApi.prototype.createFestival = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update festival
     * @method
     * @name FestivalsApi#updateFestival
     * @param {} body - Festival object
     * 
     */
    FestivalsApi.prototype.updateFestival = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get festival events collection
     * @method
     * @name FestivalsApi#getFestivalEvents
     * @param {string} id - Festival id
     * @param {string} name - name
     * @param {string} place - place
     * @param {string} startAt - startAt
     * @param {string} finishAt - finishAt
     * @param {string} updatedAt - updatedAt
     * @param {string} category - category
     * @param {integer} limit - limit
     * @param {integer} offset - offset
     * 
     */
    FestivalsApi.prototype.getFestivalEvents = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/events';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['place'] !== undefined) {
            queryParameters['place'] = parameters['place'];
        }

        if (parameters['startAt'] !== undefined) {
            queryParameters['startAt'] = parameters['startAt'];
        }

        if (parameters['finishAt'] !== undefined) {
            queryParameters['finishAt'] = parameters['finishAt'];
        }

        if (parameters['updatedAt'] !== undefined) {
            queryParameters['updatedAt'] = parameters['updatedAt'];
        }

        if (parameters['category'] !== undefined) {
            queryParameters['category'] = parameters['category'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Create festival events
     * @method
     * @name FestivalsApi#createFestivalEvent
     * @param {string} id - Festival id
     * @param {} body - Festival event object
     * 
     */
    FestivalsApi.prototype.createFestivalEvent = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/events';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update festival events
     * @method
     * @name FestivalsApi#updateFestivalEvent
     * @param {string} id - Festival id
     * @param {} body - Festival event object
     * 
     */
    FestivalsApi.prototype.updateFestivalEvent = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/events';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get festival categories collection
     * @method
     * @name FestivalsApi#getFestivalCategories
     * @param {string} id - Festival id
     * @param {string} updatedAt - updatedAt
     * @param {string} parent.id - category parent id
     * @param {string} name - name
     * @param {integer} limit - limit
     * @param {integer} offset - offset
     * 
     */
    FestivalsApi.prototype.getFestivalCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/categories';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['updatedAt'] !== undefined) {
            queryParameters['updatedAt'] = parameters['updatedAt'];
        }

        if (parameters['parent.id'] !== undefined) {
            queryParameters['parent.id'] = parameters['parent.id'];
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = '';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Create festival category
     * @method
     * @name FestivalsApi#createFestivalCategory
     * @param {string} id - Festival id
     * @param {} body - Festival category object
     * 
     */
    FestivalsApi.prototype.createFestivalCategory = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/categories';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update festival category
     * @method
     * @name FestivalsApi#updateFestivalCategory
     * @param {string} id - Festival id
     * @param {} body - Festival category object
     * 
     */
    FestivalsApi.prototype.updateFestivalCategory = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/categories';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Get festival places collection
     * @method
     * @name FestivalsApi#getFestivalPlaces
     * @param {string} id - Festival id
     * @param {string} updatedAt - updatedAt
     * @param {string} parent.id - place parent id
     * @param {string} name - name
     * @param {integer} limit - limit
     * @param {integer} offset - offset
     * 
     */
    FestivalsApi.prototype.getFestivalPlaces = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/places';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['updatedAt'] !== undefined) {
            queryParameters['updatedAt'] = parameters['updatedAt'];
        }

        if (parameters['parent.id'] !== undefined) {
            queryParameters['parent.id'] = parameters['parent.id'];
        }

        if (parameters['name'] !== undefined) {
            queryParameters['name'] = parameters['name'];
        }

        if (parameters['limit'] !== undefined) {
            queryParameters['limit'] = parameters['limit'];
        }

        if (parameters['offset'] !== undefined) {
            queryParameters['offset'] = parameters['offset'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = '';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Create festival place
     * @method
     * @name FestivalsApi#createFestivalPlace
     * @param {string} id - Festival id
     * @param {} body - Festival place object
     * 
     */
    FestivalsApi.prototype.createFestivalPlace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/places';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'POST',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
    /**
     * Update festival place
     * @method
     * @name FestivalsApi#updateFestivalPlace
     * @param {string} id - Festival id
     * @param {} body - Festival place object
     * 
     */
    FestivalsApi.prototype.updateFestivalPlace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var domain = this.domain;
        var path = '/festivals/{id}/places';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (this.token.value) {
            headers['Authorization'] = 'Bearer ' + this.token.value;
        }

        path = path.replace('{id}', parameters['id']);

        if (parameters['id'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }

        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        if (parameters['body'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        /**
         * headers['Content-Type'] = 'application/vnd.festivals.v1+json';
         * headers['Accept'] = 'application/vnd.festivals.v1+json';
         */

        headers['Accept'] = 'application/vnd.festivals.v1+json';
        headers['User-Agent'] = 'festivals-client';

        var req = {
            method: 'PUT',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object') {
            req.json = true;
        }

        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };

    return FestivalsApi;
})();

exports.FestivalsApi = FestivalsApi;