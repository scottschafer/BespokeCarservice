'use strict';

angular.module('core').controller('BookingsViewController', ['$scope', '$state', '$cookieStore', 'OfferingsService',
	function ($scope, $state, $cookieStore, OfferingsService) {

		// get or initialize the cart and date filter from cookies
		$scope.cart = $cookieStore.get('cart');
		if (!$scope.cart) {
			$scope.cart = {};
		}

		$scope.datefilter = $cookieStore.get('datefilter');
		if (!$scope.datefilter) {
			$scope.cart = {};
			$scope.datefilter = {
				startDate: new Date(),
				endDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
			};
		}

		// save the cart and date filter to cookies as they change
		$scope.$watch('cart', function () {
			$cookieStore.put('cart', $scope.cart);
		}, true);

		$scope.$watch('datefilter', function () {
			$cookieStore.put('datefilter', $scope.datefilter);

			// retrieve the offerings
			$scope.offerings = OfferingsService.updateOfferings($scope.datefilter);
		}, true);


		$scope.go = function (route) {
			$state.go(route);
		};

		$scope.active = function (route) {
			return $state.is(route);
		};

		$scope.tabs = [
			{
				heading: 'Gas',
				route: 'bookings-view.gas',
				active: false
			},
			{
				heading: 'Wash',
				route: 'bookings-view.wash',
				active: false
			},
			{
				heading: 'Air fresheners',
				route: 'bookings-view.freshener',
				active: false
			},
		];

		$scope.$on('$stateChangeSuccess', function () {
			$scope.tabs.forEach(function (tab) {
				tab.active = $scope.active(tab.route);
			});
		});
	}
]);