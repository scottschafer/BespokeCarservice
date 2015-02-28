'use strict';

angular.module('core').filter('ofilter', [
	function () {
		return function (input, type, datefilter) {

			// filter the offerings by type and date
			var result = {};
			for (var key in input) {
				var offering = input[key];
				if (offering.type === type &&
					offering.date >= datefilter.startDate &&
					offering.date <= datefilter.endDate) {
					result[key] = offering;
				}
			}
			return result;
		};
}]);