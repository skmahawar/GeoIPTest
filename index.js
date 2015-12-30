(function() {
    'use strict';
    //Module dependencies
    var geoip = require('geoip');
    var Joi = require('joi');
    var isIPv4 = function(ip) {
        var valid = Joi.validate(ip, Joi.string().ip({
            version: [
                'ipv4'
            ],
            cidr: 'required'
        }));
        if (valid.error) {
            return false;
        } else {
            return true;
        }
    };
    var isIPv6 = function(ip) {
        var valid = Joi.validate(ip, Joi.string().ip({
            version: [
                'ipv6'
            ],
            cidr: 'required'
        }));
        if (valid.error) {
            return false;
        } else {
            return true;
        }
    };

    module.exports = {
        getGeoByIPv4: function(ipv4) {
            //ipv4 address lookup
            // Open the GeoLiteCity.dat file first.
            var City = geoip.City;
            var city = new City('./data/GeoLiteCity.dat');

            // Synchronous method:
            var city_obj = city.lookupSync(ipv4);
            console.log(city_obj);
            return city_obj;
        },
        getGeoByIPv6: function(ipv6) {
            // ipv6 address lookup
            // Open the GeoLiteCityv6.dat file first.
            var City6 = geoip.City6;
            var city6 = new City6('./data/GeoLiteCityv6.dat');

            // Synchronous method:
            var city6_obj = city6.lookupSync(ipv6);
            console.log(city6_obj);
            return city6_obj;
        },
        getGeo: function(ip) {
            if (isIPv4(ip)) {
                return this.getGeoByIPv4(ip);
            } else if (isIPv6(ip)) {
                return this.getGeoByIPv4(ip);
            } else {
                return {};
            }
        }
    }

}());
