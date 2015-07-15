angular.module('controller', [])

.controller('HelloCtrl', function($scope) {

    $scope.name = 'Greg';
    $scope.input;

    $scope.submit = function () {
        if ($scope.input == 'Alex') {
            $scope.name = $scope.input + '. Have a great day!';
        } else if ($scope.input) {
            $scope.name = $scope.input;    
        }        
    }
});
