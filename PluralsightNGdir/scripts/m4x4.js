angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
    $scope.message = "This is original Message";
    console.log('mainController scope', $scope);
    $scope.items = ['Mango', 'Banana', 'Guava'];
});

angular.module('myApp').controller('innerController', function ($scope) {
    console.log('innerController scope', $scope);
});

angular.module('myApp').directive('displayBox', function () {
    return {
        templateUrl: '../templates/displayBox.html',
        restrict: 'E',
        scope: true,
        transclude: true,
        controller: function ($scope) {
            $scope.hidden = false;
            $scope.hide = function () {
                $scope.hidden = true;
            }
            $scope.message = "I am hijacking message";
            console.log('directive scope', $scope);
        }
    };
});

angular.module('myApp').directive('myTransclude', function () {
    return {
        restrict: 'A',
        transclude: 'element',
        link: function (scope, elm, attrs, ctrl, transclude) {
            transclude(scope, function (clone) {
                elm.after(clone);
            });
        }
    }
});