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
        getGeoByIPv4: function(ipv4, locality) {
            //ipv4 address lookup
            switch (locality) {
                case 'country':
                    {
                        // Open the country data file
                        var Country = geoip.Country;

                        var country = new Country('./data/GeoIP.dat');
                        // Synchronous method:
                        var country_obj = country.lookupSync(ipv4);
                        return country_obj;
                    };
                    break;
                case 'city':
                    {
                        // Open the GeoLiteCity.dat file first.
                        var City = geoip.City;
                        var city = new City('./data/GeoLiteCity.dat');

                        // Synchronous method:
                        var city_obj = city.lookupSync(ipv4);
                        return city_obj;
                    };
                    break;
                case 'orginization':
                    {
                        var Org = geoip.Org;
                        var org = new Org('./data/GeoIPOrg.dat'); // Org module can open three edition database 'org', 'asnum', 'isp'

                        // Synchronous method:
                        var org_str = org.lookupSync(ipv4);
                        return org_str;
                    };
                    break;
                case 'region':
                    {
                        var Region = geoip.Region;
                        var region = new Region('./data/GeoIPRegion.dat');

                        // Synchronous method:
                        var region_obj = region.lookupSync(ipv4);
                        return region_obj;
                    };
                    break;
                case 'netspeed':
                    {
                    	var NetSpeed = geoip.NetSpeed;
						var netspeed = new NetSpeed('./data/GeoIPNetSpeed.dat');

						// Synchronous method:
						var netspeed_str = netspeed.lookupSync(ipv4);
						return netspeed_str;
                    };
                    break;
                case 'netspeedcell':
                    {
						var NetSpeedCell = geoip.NetSpeedCell;
						var netspeedcell = new NetSpeedCell('./data/GeoIPNetSpeedCell.dat');

						// Synchronous method:
						var netspeedcell_str = netspeed.lookupSync(ipv4);
						return netspeedcell_str;                    	
                    };
                    break;
                default:
                    {
                        var geoip = require('geoip');
                        var edition = geoip.check('./data/');
                        return edition;
                    }
            }
        },
        getGeoByIPv6: function(ipv6, locality) {
            // ipv6 address lookup
            
            switch (locality) {
                case 'country':
                    {                       
                        // Open the ipv6 edition of country module
						var Country6 = geoip.Country6;
						var country_v6 = new Country6('./data/GeoIPv6.dat');

						// Synchronous method
						var country_obj_v6 = country_v6.lookupSync(ipv6);
						 return country_obj_v6;
                    };
                    break;
                case 'city':
                    {
			            // Open the GeoLiteCityv6.dat file first.
			            var City6 = geoip.City6;
			            var city6 = new City6('./data/GeoLiteCityv6.dat');

			            // Synchronous method:
			            var city6_obj = city6.lookupSync(ipv6);
			            return city6_obj;
                    };
                    break;
                case 'orginization':
                    {
                        var Org = geoip.Org;
                        var org = new Org('./data/GeoIPOrg.dat'); // Org module can open three edition database 'org', 'asnum', 'isp'

                        // Synchronous method:
                        var org_str = org.lookupSync(ipv4);
                        return org_str;
                    };
                    break;
                case 'region':
                    {
                        var Region = geoip.Region;
                        var region = new Region('./data/GeoIPRegion.dat');

                        // Synchronous method:
                        var region_obj = region.lookupSync(ipv4);
                        return region_obj;
                    };
                    break;
                case 'netspeed':
                    {
                    	var NetSpeed = geoip.NetSpeed;
						var netspeed = new NetSpeed('./data/GeoIPNetSpeed.dat');

						// Synchronous method:
						var netspeed_str = netspeed.lookupSync(ipv4);
						return netspeed_str;
                    };
                    break;
                case 'netspeedcell':
                    {
						var NetSpeedCell = geoip.NetSpeedCell;
						var netspeedcell = new NetSpeedCell('./data/GeoIPNetSpeedCell.dat');

						// Synchronous method:
						var netspeedcell_str = netspeed.lookupSync(ipv4);
						return netspeedcell_str;                    	
                    };
                    break;
                default:
                    {
                        var geoip = require('geoip');
                        var edition = geoip.check('./data');
                        console.log(edition);
                        return edition;
                    }
            }
        },
        countryGeo: function(ip) {
            if (isIPv4(ip)) {
                return this.getGeoByIPv4(ip, "country");
            } else if (isIPv6(ip)) {
                return this.getGeoByIPv4(ip, "country");
            } else {
                return {};
            }
        },
        cityGeo: function(ip) {
            if (isIPv4(ip)) {
                return this.getGeoByIPv4(ip, "city");
            } else if (isIPv6(ip)) {
                return this.getGeoByIPv4(ip, "city");
            } else {
                return {};
            }
        },
        organizationGeo: function(ip) {
            if (isIPv4(ip)) {
                return this.getGeoByIPv4(ip, "organization");
            } else if (isIPv6(ip)) {
                return this.getGeoByIPv4(ip, "organization");
            } else {
                return {};
            }
        },
        regionGeo: function(ip) {
            if (isIPv4(ip)) {
                return this.getGeoByIPv4(ip, "region");
            } else if (isIPv6(ip)) {
                return this.getGeoByIPv4(ip, "region");
            } else {
                return {};
            }
        }
    }

}());
