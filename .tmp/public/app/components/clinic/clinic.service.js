(function() {
    'use strict';

    angular
        .module('app.components.clinic')
        .factory('ClinicService', factory);

    factory.$inject = ['$http','$q'];

    /* @ngInject */
    function factory($http, $q) {
        var service = {
            getClinics: getClinics
        };

        return service;

        function getClinics(query) {
          var deferred = $q.defer();

          $http.get('/clinic', {params: query})
            .success(function(data, status, headers, config) {
              deferred.resolve(data);
            })
            .error(function(status) {
              deferred.reject(status);
            });
          return deferred.promise;
          }
    }
})();
