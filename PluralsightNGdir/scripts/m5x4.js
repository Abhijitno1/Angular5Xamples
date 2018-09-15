angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
    $scope.actors = [
        {
            name: 'Jack', age: 35
        }, {
            name: 'Jill', age: 20
        }, {
            name: 'Marylene', age: 42
        }, {
            name: 'Victor', age: 32
        }, {
            name: 'Jane', age: 30
        }
    ];

});

angular.module('myApp').directive('myLazyRender', function () {
    return {
        restrict: 'A',
        transclude: 'element',
        priority: 1100,
        link: function (scope, elm, attrs, ctrl, transclude) {
            var alreadyAdded = false;

            var unwatchFn = scope.$watch(attrs.myLazyRender, function (newVal) {
                if (newVal && !alreadyAdded) {
                    transclude(scope, function (clone) {
                        elm.after(clone);
                    });
                    alreadyAdded = true;
                    unwatchFn();
                }
            });
        }
    };
});
