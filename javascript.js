angular.module('PortalApp')

.controller('facultywarsCtrl', ['$scope', '$http', '$q', 'facultywarsFactory', function ($scope, $http, $q,
facultywarsFactory) {
    
    $scope.configuration
    
    $scope.riddle = "What has roots but does not grow?";
 
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