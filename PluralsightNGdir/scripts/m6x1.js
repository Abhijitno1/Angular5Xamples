angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
});

angular.module('myApp').directive('emperor', function () {
    var name = 'emperor';
    return {
        restrict: 'E',
        scope: true,
        link: {
            pre: function (scope, elm, attrs) {
                elm.data('name', name);
                scope.master = name;
            }
        }
    };
});

angular.module('myApp').directive('vader', function () {
    var name = 'Vader';
    return {
        restrict: 'E',
        scope: true,
        link: {
            pre: function (scope, elm, attrs) {
                elm.data('name', name);
                elm.data('master', scope.master);
                console.log(name + '\'s master is ' + scope.master);
                scope.master = name;
            }
        }        
    };
});

angular.module('myApp').directive('starkiller', function () {
    var name = 'Starkiller';
    return {
        restrict: 'E',
        scope: true,
        link: {
            pre: function (scope, elm, attrs) {
                elm.data('name', name);
                elm.data('master', scope.master);
                console.log(name + '\'s master is ' + scope.master);
            }
        }
    };
});
