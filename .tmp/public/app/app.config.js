(function() {
	'use strict';

	angular
		.module('statsDashboard')
		.config(appConfig)

	function appConfig($mdThemingProvider, $mdIconProvider) {
		$mdThemingProvider
			.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');

	 $mdIconProvider
		 .defaultIconSet('img/icons/sets/core-icons.svg', 24);

	}

})();
