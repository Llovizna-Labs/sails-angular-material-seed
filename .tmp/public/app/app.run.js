(function() {

    angular.module('statsDashboard')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', 'Auth', '$location', '$http','LocalService','lodash'];

    function runBlock($rootScope, $state, Auth, $location, $http, LocalService, lodash) {
        console.log('Lodash Version', lodash.VERSION);

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
            $rootScope.isAuthenticated = false;

            /**
             * if the state does not requires authentication and the
             * user is logged in, redirect to the dashboard page.
             */

            // if (!toState.authenticate && Auth.isAuthenticated()) {
            //     event.preventDefault();
            //     $state.go('home.index');
            //     $rootScope.currentState = 'home.index';
            // }

            if(Auth.isAuthenticated()){
              $rootScope.isAuthenticated = true;
              $rootScope.user = angular.fromJson(LocalService.get('user'));

              if(!$rootScope.user.isAdmin){
                $rootScope.currentClinic = {
                  value : $rootScope.user.clinics[0]
                };
              }
            }
            /**
             * if the state requires authentication and the
             * user is not logged in, redirect to the login page.
             */
            if (toState.authenticate && !Auth.isAuthenticated()) {
                console.log('not auth');
                event.preventDefault();
                $state.go('home.login');
                $rootScope.currentState = 'home.login';
            }

            if(Auth.isAuthenticated() && toState.admin && !$rootScope.user.isAdmin){
              event.preventDefault();
              $state.go('home.index');
            }

        });

    }


}());
