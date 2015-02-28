'use strict';

angular.module('core').filter('ofilter', [
	function () {
		return function (input, type, datefilter) {

			// filter the offerings by type and date
			var startDate = (typeof datefilter.startDate === 'object') ? datefilter.startDate :
				new Date(datefilter.startDate);

			var endDate = (typeof datefilter.endDate === 'object') ? datefilter.endDate :
				new Date(datefilter.endDate);

			var result = {};
			for (var key in input) {
				var offering = input[key];
				if (offering.type === type &&
					offering.date >= startDate &&
					offering.date <= endDate) {
					result[key] = offering;
				}
			}
			return result;
		};
}]);