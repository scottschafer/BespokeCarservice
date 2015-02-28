'use strict';

angular.module('core').directive('booking', [
	function () {
		return {
			templateUrl: '/modules/core/directives/booking.html',
			restrict: 'E',
			scope: {
				offering: '=',
				cart: '=',
				offeringId: '@'
			},
			link: function postLink(scope, element, attrs) {

				scope.onAddToCart = function (id) {
					if (!scope.cart.hasOwnProperty(id)) {
						scope.cart[id] = 0;
					}
					++scope.cart[id];
				};

				scope.onRemoveFromCart = function (id) {
					if (scope.cart.hasOwnProperty(id)) {
						--scope.cart[id];
					}
				};

				scope.isInCart = function (id) {
					if (scope.cart.hasOwnProperty(id)) {
						return scope.cart[id] > 0;
					}
					return false;
				};
			}
		};
	}
]);