angular.module('PortalApp')

.controller('facultywarsCtrl', ['$scope', '$http', '$q', 'facultywarsFactory', function ($scope, $http, $q,
facultywarsFactory) {

    // Widget Configuration
    $scope.portalHelpers.config = {
        // make 'widgetMenu.html' the template for the top right menu
        "widgetMenu": "widgetMenu.html"
    };
    
    // initialize the service
    facultywarsFactory.init($scope);

}])
    // Factory maintains the state of the widget
    .factory('facultywarsFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope,
        $filter, $q) {
        var initialized = {
            value: false
        };

        // Your variable declarations
        var loading = {
            value: true
        };
        var insertValue = {
            value: null
        };
        var links = {
            value: null
        };
        var openDataExampleData = {
            value: null
        };
        var dbData = {
            value: null
        };
        var item = {
            value: null
        };
        var sourcesLoaded = 0;

        var init = function ($scope) {
            if (initialized.value)
                return;
            initialized.value = true;

            // Place your init code here:

            // Get data for the widget
            $http.get('/ImportantLinks/JSONSource').success(function (data) {
                links.value = data;
                sourceLoaded();
            });

            // OPEN DATA API EXAMPLE
            $scope.portalHelpers.invokeServerFunction('getOpenData').then(function (
                result) {
                console.log('getopendata data: ', result);
                openDataExampleData.value = result.data;
                sourceLoaded();
            });

            $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
                dbData.value = result;
                sourceLoaded();
            });
        }

        function sourceLoaded() {
            sourcesLoaded++;
            if (sourcesLoaded == 3)
                loading.value = false;
        }

        return {
            init: init,
            loading: loading,
            insertValue: insertValue,
            links: links,
            openDataExampleData: openDataExampleData,
            dbData: dbData,
            item: item
        };

    }])
    // Custom directive example
    .directive('facultywarsDirectiveName', ['$http', function ($http) {
        return {
            link: function (scope, el, attrs) {

            }
        };
    }])
    // Custom filter example
    .filter('facultywarsFilterName', function () {
        return function (input, arg1, arg2) {
            // Filter your output here by iterating over input elements
            var output = input;
            return output;
        }
    });