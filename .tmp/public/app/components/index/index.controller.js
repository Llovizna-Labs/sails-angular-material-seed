(function() {
  'use strict';

  angular
    .module('app.components.index')
    .controller('DialogController', dialog)
    .controller('IndexController', index)

  function dialog($scope, $mdDialog, item, $rootScope) {
    $scope.item = item;
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  index.$inject = ["$http", "$q","$rootScope" ,"$scope", "$state", "$mdToast", "$pusher", "$log", "$mdDialog", "$mdMedia", "$sails", "EventService", "lodash"];

  function index($http, $q, $rootScope, $scope, $state, $mdToast, $pusher, $log, $mdDialog, $mdMedia, $sails, EventService, lodash) {
    var vm = this;
    var client = new Pusher('05cebc0ddd1d3b1ba09f');
    var pusher = $pusher(client);
    var imagePath = "http://placehold.it/40x40";


    $scope.selected = [];

    vm.title = 'Debug Console';

    vm.headers = [{
      name: 'Appoinment ID',
      field: 'appoinmentId'
    }, {
      name: 'Clinic',
      field: 'clinic.shortname'
    }, {
      name: 'Patient',
      field: 'patient'
    }, {
      name: 'Doctor',
      field: 'doctor'
    }, {
      name: 'Status',
      field: 'status'
    }, {
      name: 'CreatedAt',
      field: 'CreatedAt'
    }, {
      name: 'updatedAt',
      field: 'updatedAt'
    }];

    vm.filter = false;
    vm.selected = [];
    vm.data = [];
    vm.count = 0;

    vm.query = {
      order: 'name',
      limit: '5',
      page: 1
    };


    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

    $rootScope.$watch('currentClinic', function(value){
      updateDashboard();
    });

    init();

    function init() {
      vm.events = [];
      vm.eventsCountTotal = 0;
      vm.eventsBookedTotal = 0;
      vm.eventsCancelledTotal = 0;
      vm.events.created = [];
      vm.events.cancelled = [];
      vm.onPaginate = onPaginate;
      vm.content = "Hello content !";

      //suscribeToPusher();
      suscribeToSocket();
      //updateDashboard();
    }

    vm.click = function(ev, item) {
      $mdDialog.show({
          controller: 'DialogController',
          templateUrl: 'app/components/event/detail.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            item: item
          },
          fullscreen: true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    }

    function updateDashboard() {

      $q.all([getEvents(), getEventsResume(), getEventsTotals()]).then(function() {
        console.log('dashboard updated');
      });

    }

    function suscribeToSocket() {
      $sails.get("/event/subscribe/").success(function(response) {
        console.log(response);
      }).error(function(response) {
        console.log('error', response);
      });

     $sails.on("event", function(message) {
        updateDashboard();
      });
    }

    function getEventsTotals(clinicId) {
      EventService.getEventsTotals(clinicId).then(function(data) {

        var booked = lodash.find(data, ['_id', 'booked']);
        var cancelled = lodash.find(data, ['_id', 'cancelled']);

        var totals = {
          booked: {
            label: "Booked Appoinments",
            count: booked ? booked.count : 0
          },
          cancelled: {
            label: "Cancelled Appoinments",
            count: cancelled ? cancelled.count : 0
          }
        };

        vm.eventsBookedTotal = totals['booked'].count;
        vm.eventsCancelledTotal = totals['cancelled'].count;

        $scope.pie = {
          labels: [totals['booked'].label, totals['cancelled'].label],
          data: [vm.eventsBookedTotal, vm.eventsCancelledTotal]
        };

        vm.eventsCountTotal = vm.eventsBookedTotal + vm.eventsCancelledTotal;

      });
    }

    function getEventsResume(clinicId) {
      EventService.getEventsResume(clinicId).then(function(data) {
        var resume = [];

        for (var i = 0; i < data.length; i++) {
          resume.push(data[i].count);
        }

        $scope.lineChart = {
          'labels': ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          'series': ["Daily Booked Appoinments"],
          'data': [
            resume
          ]
        };
      }, function(err) {
        console.log(err);
      });
    }

    function getEvents(query, clinicId) {
      vm.promise = EventService.getEvents(query || vm.query, clinicId).then(function(res) {
        vm.data = res.data;
        vm.count = res.count;
      }, function(err) {
        console.log(err);
      });
    }

    function onPaginate(page, limit) {
      getEvents({
        page: page,
        limit: limit,
        sort: ''
      });
    }


    function suscribeToPusher() {
      pusher.subscribe('test-channel');

      pusher.bind('app.booked-appointment-created',
        function(pusherEvent) {
          saveEvent(pusherEvent);
        });

      pusher.bind('app.booked-appointment-cancelled',
        function(pusherEvent) {
          cancelEvent(pusherEvent);
        });

      pusher.bind('pusher:subscription_error', function(status) {
        console.log(status);
        alert('an error ocurred, please reload the page');
        console.log('you have to reload the page my friend');
      });
    }



  }
})();
