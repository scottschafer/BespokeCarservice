'use strict';

// Offerings controller
angular.module('offerings').controller('OfferingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Offerings',
	function($scope, $stateParams, $location, Authentication, Offerings) {
		$scope.authentication = Authentication;

		// Create new Offering
		$scope.create = function() {
			// Create new Offering object
			var offering = new Offerings ({
				name: this.name
			});

			// Redirect after save
			offering.$save(function(response) {
				$location.path('offerings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Offering
		$scope.remove = function(offering) {
			if ( offering ) { 
				offering.$remove();

				for (var i in $scope.offerings) {
					if ($scope.offerings [i] === offering) {
						$scope.offerings.splice(i, 1);
					}
				}
			} else {
				$scope.offering.$remove(function() {
					$location.path('offerings');
				});
			}
		};

		// Update existing Offering
		$scope.update = function() {
			var offering = $scope.offering;

			offering.$update(function() {
				$location.path('offerings/' + offering._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Offerings
		$scope.find = function() {
			$scope.offerings = Offerings.query();
		};

		// Find existing Offering
		$scope.findOne = function() {
			$scope.offering = Offerings.get({ 
				offeringId: $stateParams.offeringId
			});
		};
	}
]);