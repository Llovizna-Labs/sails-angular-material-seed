(function() {
    'use strict';

    angular.module('statsDashboard', [

        /*
         * Shared
         */
        'app.shared.layout',
        'app.shared.table',
        'app.shared.searchbox',

        /*
         * Components
         */
        'app.components.index',
        'app.components.auth',
        'app.components.users',
        'app.components.account',
        'app.components.clinic',


         /*
         * other
         */
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'pusher-angular',
        'ngMdIcons',
        'angularMoment',
        'ngSails'
    ]);
})();
