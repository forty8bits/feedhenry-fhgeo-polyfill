/**
 * A polyfill for $fh.geo, which the FeedHenry online IDE doesn't seem to
 * support. Drop it into your project in the online IDE (I recommend through a
 * package which you only include for the Studio Preview build) and go wild.
 *
 * @author: Gareth Murphy (gareth.cpm@gmail.com)
 * @version: 0.1
 */

// Create the global $fh object if doesn't exist already.
window.$fh = window.$fh || {};

window.$fh.geo = (function() {
  'use strict';

  var geoInterval, parsePos, getPos, geoOptions;

  // By default set high accuracy (potential to debug through phone browsers).
  geoOptions = {
    enableHighAccuracy: true
  };

  // Simple function which transforms the position object we get from the
  // navigator.geolocation call into the object format $fh.geo callbacks expect.
  parsePos = function(pos) {
    var fhPos = {};
    // Everything maps across very cleanly.
    fhPos.lon =   pos.coords.longitude;
    fhPos.lat =   pos.coords.latitude;
    fhPos.alt =   pos.coords.altitude;
    fhPos.acc =   pos.coords.accuracy;
    fhPos.head =  pos.coords.heading;
    fhPos.speed = pos.coords.speed;
    fhPos.when =  pos.timestamp;
    return fhPos;
  };

  // Wrap the call to geolocation API and facilitate position object conversion.
  getPos = function(success, failure) {
    navigator.geolocation.getCurrentPosition(function(webPos) {
      var pos = parsePos(webPos);
      // Always call the callback providing an $fh.geo style position object!
      success(pos);
    }, function(error) {
      // TODO: Implement.
    }, geoOptions);
  };

  // Using the modular pattern, hiding private functionality in the closure.
  return function(options, success, failure) {

    // If a bad call is made, make the over-worked developer aware.
    if (!options || !success || !failure) {
      throw new Error('You must provide the arguments specified!');
    }

    // Very simple to mock the unregister event by just clearing the interval.
    if (options.act && options.act === 'unregister') {
      clearInterval(geoInterval);
      // Don't forget to also 'reset' the geoOptions and call the callback.
      delete geoOptions.timeout;
      success();
    } else {
      // We can now assume default act of 'register'...

      // TODO: Make less obscure!
      if (!(!options.interval || options.interval === 0)) {

        // We set the 'timeout' for the geolocation call to be the same as the
        // interval, so that requests won't 'boil over' and stack up resulting
        // in a mess of longitudes and latitudes.
        geoOptions.timeout = options.interval;

        geoInterval = setInterval(function() {
          getPos(success, failure);
        }, options.interval);
      } else {
        getPos(success, failure);
      }
    }
  };
}());