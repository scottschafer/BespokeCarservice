'use strict';

angular.module('core').directive('cart', ['OfferingsService',
	function (OfferingsService) {
		return {
			templateUrl: '/modules/core/directives/cart.html',
			restrict: 'E',
			scope: {
				cart: '='
			},
			link: function postLink(scope, element, attrs) {
				scope.offerings = OfferingsService.getOfferings();

				scope.sum = function (cart) {
					var result = 0;
					for (var id in cart) {
						result += scope.offerings[id].price * cart[id];
					}
					return result;
				};

				scope.isEmpty = function (cart) {
					for (var id in cart) {
						return false;
					}
					return true;
				};

			}
		};
	}
]);