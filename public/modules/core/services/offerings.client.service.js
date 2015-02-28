'use strict';

angular.module('core').factory('OfferingsService', ['$q',
	function ($q) {

		var mockOfferings;

		var offerings = {};

		// Public API
		return {
			getOfferings: function () {
				return offerings;
			},

			updateOfferings: function (daterange) {

				if (!mockOfferings) {
					buildMockOfferings();
				}
				offerings = $.extend(offerings, mockOfferings);
				return offerings;
			}
		};

		function buildMockOfferings() {
			var arMockOfferings = [
				{
					type: 'gas',
					price: 100,
					image: 'http://www.mikanet.com/museum/images/full-service_gas.jpg',
					description: 'A retro fill up that won\'t disappoint!',
					shortDesc: 'Retro fill up'
			},

				{
					type: 'gas',
					price: 150,
					image: 'http://yesteryearremembered.com/wp-content/uploads/2012/01/man_pumping_gas.jpg#full%20service%20gas%20stations.%20330x244',
					description: 'When retro is not enough, have our black and white attendant fill your tank with vintage gas.',
					shortDesc: 'B & W fill up'
			},

				{
					type: 'gas',
					price: 450,
					image: 'http://i.ebayimg.com/00/s/MTIwMFgxNjAw/$(KGrHqVHJF!E+(636eh1BQf4zU3fCw~~60_35.JPG',
					description: 'Ask for the Special',
					shortDesc: 'Special fill up'
			},

				{
					type: 'wash',
					price: 250,
					image: 'http://crosscountry.smesports.org/wp-content/uploads/2011/08/poolside-Car-wash.jpg',
					description: 'Special deep cleaning',
					shortDesc: 'Special cleaning'
			},

				{
					type: 'freshener',
					price: 0.25,
					image: 'https://tvrecappersanonymous.files.wordpress.com/2010/12/tree-fresh.jpg',
					description: 'the classic',
					shortDesc: 'Classic freshener'
			}
			];

			mockOfferings = {};
			var date = new Date().getTime(); // today
			var additionalPrice = 0;

			for (var i = 0; i < 50; i++) {
				for (var j = 0; j < arMockOfferings.length; j++) {
					var oID = "O_" + i + "_" + j;
					var offering = $.extend({}, arMockOfferings[j]);
					offering.date = new Date(date);
					offering.price += additionalPrice;
					mockOfferings[oID] = offering;
				}
				++additionalPrice;
				date += 24 * 60 * 60 * 1000;
			}
		};
	}
]);