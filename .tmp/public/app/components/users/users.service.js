(function() {
	'use strict';

	angular
		.module('app.components.users')
		.factory('UserService', UserService)

	UserService.$inject = ["$http", "$q","$state","BaseApiUrl"];

	function UserService($http, $q ,$state,BaseApiUrl) {

    var UserService = {
      getUsers: getUsers,
			registerUser: registerUser,
			activateUser: activateUser,
			setAsAdmin: setAsAdmin
    };


		function getUsers(params){
			var deferred = $q.defer();

      $http.get('/user', {
				params: {
					page: params.page,
					limit: params.limit,
					sort: params.order
				}
			})
        .success(function(data, status, headers, config) {

					setTimeout(function () {
						deferred.resolve(data);
					}, 2000);

        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
		}

		function registerUser(payload) {
			var deferred = $q.defer();

			$http.post('/auth/register/', payload)
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(status) {
					deferred.reject(status);
				});
			return deferred.promise;
		}

		function activateUser(userId) {
			var deferred = $q.defer();

			$http.post('/user/activate/',{
				userId: userId
			})
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(status) {
					deferred.reject(status);
				});
			return deferred.promise;
		}

		function setAsAdmin(userId) {
			var deferred = $q.defer();

			$http.post('/user/makeAdmin/',{
				userId: userId
			})
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(status) {
					deferred.reject(status);
				});
			return deferred.promise;
		}



    return UserService;
	}
})();
