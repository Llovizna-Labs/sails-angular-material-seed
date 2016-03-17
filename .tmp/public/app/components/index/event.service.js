(function() {
  'use strict';

  angular
    .module('app.components.index')
    .factory('EventService', EventService)

  EventService.$inject = ["$http", "$q", "$state", "$rootScope", "BaseApiUrl"];

  function EventService($http, $q, $state, $rootScope, BaseApiUrl) {

    var self = this;

    var EventService = {
      saveEvent: saveEvent,
      getEventsResume: getEventsResume,
      getEventsTotals: getEventsTotals,
      getEvents: getEvents,
      setAppoinmentAsCancelled: setAppoinmentAsCancelled
    };

    function saveEvent(payload) {

      var deferred = $q.defer();

      $http.post('/event/', payload)
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }

    function getEventsResume() {

      var deferred = $q.defer();

      $http.get('/event/resume/', {
          params: {
            clinicId: $rootScope.currentClinic ? $rootScope.currentClinic.value : "all"
          }
        }).success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }

    function getEvents(query) {

      var deferred = $q.defer();

      $http.get('/event', {
          params:  {
            page: query.page,
            limit: query.limit,
            clinicId: $rootScope.currentClinic ? $rootScope.currentClinic.value : "all"
          }
        })
        .success(function(data, status, headers, config) {
          setTimeout(function() {
            deferred.resolve(data);
          }, 2000);

        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }

    function getEventsTotals() {

      var deferred = $q.defer();

      $http.get('/event/totals/', {
          params: {
            clinicId: $rootScope.currentClinic ? $rootScope.currentClinic.value : "all"
          }
        })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }


    function setAppoinmentAsCancelled(appoinmentId) {
      var deferred = $q.defer();

      $http.post('/event/cancelAppointment/', {
          appoinmentId: appoinmentId
        })
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }


    return EventService;
  }
})();
