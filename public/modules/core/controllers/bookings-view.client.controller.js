'use strict';

angular.module('core').controller('BookingsViewController', ['$scope', '$state', 'OfferingsService',
	function ($scope, $state, OfferingsService) {

		$scope.cart = {};

		$scope.offerings = OfferingsService.updateOfferings();

		$scope.datefilter = {
			startDate: new Date(),
			endDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
		};

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
				heading: 'Freshener',
				route: 'bookings-view.freshener',
				active: false
			},
		];

		$scope.$on('$stateChangeSuccess', function () {
			$scope.tabs.forEach(function (tab) {
				tab.active = $scope.active(tab.route);
			});
		});

		/*
     $urlRouterProvider.when('', '/PageTab');

     $stateProvider
        .state('PageTab', {
            url: '/PageTab',
            templateUrl: 'PageTab.html'
        })
        .state('PageTab.Page1', {
            url:'/Page1',
            templateUrl: 'Page-1.html'
        })
        .state('PageTab.Page2', {
            url:'/Page2',
            templateUrl: 'Page-2.html'
        })
        .state('PageTab.Page3', {
            url:'/Page3',
            templateUrl: 'Page3.html'
        });
				*/
	}
]);