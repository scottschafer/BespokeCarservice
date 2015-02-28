'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
	// Init module configuration options
	var applicationModuleName = 'booking';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'daterangepicker', 'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function (moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('offerings');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
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
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
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

				scope.onCheckout = function () {
					window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
				}
			}
		};
	}
]);
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
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

angular.module('core').factory('OfferingsService', ['$q',
	function ($q) {

		var mockOfferings;

		var offerings = {};

		// Public API
		return {
			/**
			 * Get the offerings object owned by this service, which will be updated by
			 * the updateOfferings() call, etc
			 */
			getOfferings: function () {
				return offerings;
			},

			/**
			 * Update (if necessary) the offerings object to include the specified date
			 * range. This is mock data, and the daterange is ignored, but this could make
			 * for efficient caching.
			 */
			updateOfferings: function (daterange) {

				if (!mockOfferings) {
					buildMockOfferings();
				}
				offerings = $.extend(offerings, mockOfferings);
				return offerings;
			}
		};

		/**
		 * generate a table of mock offerings
		 */
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
					description: 'When ordinary retro is not enough, have our black and white attendant fill your tank with vintage gas.',
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
				},

				{
					type: 'freshener',
					price: 2,
					image: 'http://www.p-wholesale.com/upimg/9/428a1/car-air-freshener-494.jpg',
					description: 'Want fries with that?',
					shortDesc: 'Burger freshener'
				}
			];

			mockOfferings = {};
			var date = new Date().getTime(); // today
			var additionalPrice = 0;

			// go fifty dates out
			for (var i = 0; i < 50; i++) {
				for (var j = 0; j < arMockOfferings.length; j++) {
					var oID = "O_" + i + "_" + j;
					var offering = $.extend({}, arMockOfferings[j]);
					offering.date = new Date(date);
					offering.price += additionalPrice;
					mockOfferings[oID] = offering;
				}
				++additionalPrice; // increase the price each day
				date += 24 * 60 * 60 * 1000;
			}
		};
	}
]);
'use strict';

// Configuring the Articles module
angular.module('offerings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Offerings', 'offerings', 'dropdown', '/offerings(/create)?');
		Menus.addSubMenuItem('topbar', 'offerings', 'List Offerings', 'offerings');
		Menus.addSubMenuItem('topbar', 'offerings', 'New Offering', 'offerings/create');
	}
]);
'use strict';

//Setting up route
angular.module('offerings').config(['$stateProvider',
	function($stateProvider) {
		// Offerings state routing
		$stateProvider.
		state('listOfferings', {
			url: '/offerings',
			templateUrl: 'modules/offerings/views/list-offerings.client.view.html'
		}).
		state('createOffering', {
			url: '/offerings/create',
			templateUrl: 'modules/offerings/views/create-offering.client.view.html'
		}).
		state('viewOffering', {
			url: '/offerings/:offeringId',
			templateUrl: 'modules/offerings/views/view-offering.client.view.html'
		}).
		state('editOffering', {
			url: '/offerings/:offeringId/edit',
			templateUrl: 'modules/offerings/views/edit-offering.client.view.html'
		});
	}
]);
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
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);