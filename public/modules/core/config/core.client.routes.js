'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
			/*
			state('bookings-view', {
				url: '/bookings-view',
				templateUrl: 'modules/core/views/bookings-view.client.view.html'
			}). */
		state('bookings-view', {
				url: '/',
				templateUrl: 'modules/core/views/bookings-view.client.view.html'
			})
			.state('bookings-view.gas', {
				url: '/gas',
				templateUrl: '/modules/core/views/bookings-partial-gas.html'
			})
			.state('bookings-view.wash', {
				url: '/wash',
				templateUrl: '/modules/core/views/bookings-partial-wash.html'
			})
			.state('bookings-view.freshener', {
				url: '/freshener',
				templateUrl: '/modules/core/views/bookings-partial-freshener.html'
			});
}]);