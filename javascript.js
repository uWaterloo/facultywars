angular.module('PortalApp')

.controller('facultywarsCtrl', ['$scope', '$http', '$q', 'facultywarsFactory', function($scope,
        $http, $q,
        facultywarsFactory) {

        $scope.oneAtATime = true;

        $scope.groups = [{
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        }, {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.chosenRiddle = {};

        $scope.processUserAnswer = function(userAnswer) {
            $scope.portalHelpers.invokeServerFunction('attemptAnswer', {
                "riddleId": $scope.chosenRiddle.id,
                "answer": userAnswer
            }).then(function(result) {
                if (!result.status) $scope.reply = "Wrong Answer :(";
                else $scope.reply = "Right Answer!";
            });
        };

        $scope.retrieveUserRiddle = function(userRiddleQuestion, userRiddleAnswer) {
            $scope.portalHelpers.invokeServerFunction('submitRiddle', {
                "question": userRiddleQuestion,
                "answer": userRiddleAnswer
            }).then(function(result) {

            });
        };

        // Widget Configuration
        $scope.portalHelpers.config = {
            // make 'widgetMenu.html' the template for the top right menu
            "widgetMenu": "widgetMenu.html"
        };

        // initialize the service
        facultywarsFactory.init($scope);

        $scope.portalHelpers.showView("main.html", 1);
    }])
    // Factory maintains the state of the widget
    .factory('facultywarsFactory', ['$http', '$rootScope', '$filter', '$q', function($http,
        $rootScope, $filter, $q) {
        var init = function($scope) {
            // Place your init code here:
            $scope.portalHelpers.invokeServerFunction('seed').then(function(result) {
                $scope.portalHelpers.invokeServerFunction('getRiddles').then(
                    function(result) {
                        var riddles = result;
                        var riddle = riddles[parseInt(Math.random() *
                            riddles.length)];

                        $scope.chosenRiddle.question = riddle.question;
                        $scope.chosenRiddle.id = riddle.id;
                    });
            });
        }

        return {
            init: init
        };

    }]);