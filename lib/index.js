'use strict';

var meta = require('./meta');
var Festivals = require('./client/festivals').Festivals;
var FestivalsDeferred = require('./client/festivalsDeferred').FestivalsDeferred;
var FestivalsApi = require('./api/festivalsApi').FestivalsApi;

module.exports = {
  VERSION: meta.VERSION,
  Festivals: Festivals,
  FestivalsDeferred: FestivalsDeferred,
  FestivalsApi: FestivalsApi
};

