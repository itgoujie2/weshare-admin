angular.module('weshareAdmin', ['ui.router', 'angularUtils.directives.dirPagination', 'ionic.rating'])

	.run(function($rootScope){
		$rootScope.server = {url: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')};
	})

	.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.state('weshare', {
				url: '/weshare',
				templateUrl: 'views/weshare.html',
				controller: 'WeshareCtrl'
			})
			.state('create', {
				url: '/create',
				templateUrl: 'views/create.html',
				controller: 'CreateCtrl'
			})
	})

	.controller('MainCtrl', function($scope){
		$scope.mainMsg = 'Main';
	})

	.controller('WeshareCtrl', function($scope, Weshare, Category, Location){

		$scope.loadingWeshares = true;
		
		Weshare.getWeshares()
			.then(function(data){
				console.log('weshare: ' + JSON.stringify(data, null, 4));
				$scope.weshares = data.data;
				$scope.loadingWeshares = false;

				Category.getCategories()
					.then(function(data){
						$scope.categories = data.data;
						console.log('categories: ' + JSON.stringify($scope.categories, null, 4));

						Location.getLocations()
							.then(function(data){

								// console.log('location: ' + JSON.stringify(data, null, 4));
								$scope.countries = data.data;
							})
					})
			})

		$scope.$watch('filterCountry', function(){

			if (typeof $scope.filterCountry !== 'undefined' && $scope.filterCountry != null){
				$scope.states = $scope.filterCountry.states;

			}
		})

		$scope.deleteWeshare = function(weshareId, index){
			Weshare.deleteWeshare(weshareId)
				.then(function(data){
					$scope.weshares.splice(index, 1);
				})
		}

		$scope.getWesharesWithCondition = function(){

			$scope.loadingWeshares = true;

			var categoryId = (typeof $scope.filterCategory === 'undefined' || $scope.filterCategory == null) ? 'invalid' : $scope.filterCategory._id;
			var countryId = (typeof $scope.filterCountry === 'undefined' || $scope.filterCountry == null) ? 'invalid' : $scope.filterCountry._id;
			var stateVal = (typeof $scope.filterState === 'undefined' || $scope.filterState == null) ? 'invalid' : $scope.filterState.value;


			Weshare.getWesharesWithCondition(categoryId, countryId, stateVal)
				.then(function(data){

					$scope.weshares = data.data;
					$scope.loadingWeshares = false;
				})
		}

	})

	.controller('CreateCtrl', function($scope, Weshare, Category, Location){

		Category.getCategories()
			.then(function(data){

				$scope.categories = data.data;
				Location.getLocations()
					.then(function(data){

						$scope.countries = data.data;
					})

			})

		$scope.$watch('weshare.country', function(){

			if (typeof $scope.weshare !== 'undefined' && $scope.weshare != null){
				$scope.states = $scope.weshare.country.states;

			}
		})
	})

	.factory('Weshare', function($http, $rootScope){
		var o = {};

		o.getWeshares = function(){
			return $http.get($rootScope.server.url + '/weshares');
		}

		o.getWesharesWithCondition = function(category, country, state){
			return $http.get($rootScope.server.url + '/weshares/withConditions' + '?category=' + category + '&country=' + country + '&state=' + state);
		}

		o.deleteWeshare = function(weshareId){
			return $http.delete($rootScope.server.url + '/delete/' + weshareId);
		}

		return o;
	})

	.factory('Category', function($http, $rootScope){
		var o = {};

		o.getCategories = function(){
			return $http.get($rootScope.server.url + '/categories');
		}

		return o;
	})

	.factory('Location', function($http, $rootScope){
		var o = {};

		o.getLocations = function(){
			return $http.get($rootScope.server.url + '/location');
		}

		return o;
	})
