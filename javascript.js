angular.module('PortalApp')

.controller('facultywarsCtrl', ['$scope', '$http', '$q', 'facultywarsFactory', function($scope,
        $http, $q,
        facultywarsFactory) {

        $scope.callSeed = function() {
            $scope.portalHelpers.invokeServerFunction('seed');
        };

        $scope.isCollapsed1 = false;
        $scope.isCollapsed2 = true;
        $scope.isCollapsed3 = true;
        $scope.isCollapsed4 = true;

        $scope.chosenRiddle = {};
    
    	function riddleMaker() {
            $scope.portalHelpers.invokeServerFunction('getRiddles').then(function(
                result) {
                var riddles = result;
                if(riddles.length>0){
                    var riddle = riddles[parseInt(Math.random() * riddles.length)];
                	$scope.chosenRiddle.question = riddle.question;
                	$scope.chosenRiddle.id = riddle.id;
                } else {
                    $scope.chosenRiddle = {};
                }   
            });
        }
    
    	$scope.portalHelpers.invokeServerFunction('getUserScore').then(function(result) {
            	$scope.yourHighScore = result.count;
            });
    
    	//$scope.portalHelpers.invokeServerFunction('getFacultyHighscores').then)(function(result) {
         //   $scope.firstPlace = result...
           // $scope.secondPlace = result...
            //$scope.thirdPlace = result...
            //$scope.fourthPlace = result...
            //$scope.fifthPlace = result...
            //$scope.sixthPlace = result...
            
           // $scope.score1 = result...
           // $scope.score2 = result...
            //$scope.score3 = result...
           // $scope.score4 = result...
           // $scope.score5 = result...
            //$scope.score6 = result...
        //});

        $scope.processUserAnswer = function(userAnswer) {
            $scope.portalHelpers.invokeServerFunction('attemptAnswer', {
                "riddleId": $scope.chosenRiddle.id,
                "answer": userAnswer
            }).then(function(result) {
                if (!result.status) $scope.reply1 = "Wrong Answer :(";
                else {
                    $scope.reply1 = "Right Answer!";
                    riddleMaker();
                };
            });
        };

        $scope.retrieveUserRiddle = function(userRiddleQuestion, userRiddleAnswer) {
            $scope.portalHelpers.invokeServerFunction('submitRiddle', {
                "question": userRiddleQuestion,
                "answer": userRiddleAnswer
            }).then(function(result) {
                $scope.reply2 = "Thank you for your submission!";
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
            $scope.portalHelpers.invokeServerFunction('getRiddles').then(function(
                result) {
                var riddles = result;
                var riddle = riddles[parseInt(Math.random() *
                    riddles.length)];

                $scope.chosenRiddle.question = riddle.question;
                $scope.chosenRiddle.id = riddle.id;
            });
        }

        return {
            init: init
        };

    }]);