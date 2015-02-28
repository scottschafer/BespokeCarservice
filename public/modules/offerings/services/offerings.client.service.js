'use strict';

//Offerings service used to communicate Offerings REST endpoints
angular.module('offerings').factory('Offerings', ['$resource',
	function($resource) {
		return $resource('offerings/:offeringId', { offeringId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);