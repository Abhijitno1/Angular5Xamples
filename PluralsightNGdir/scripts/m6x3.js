angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
});

angular.module('myApp').directive('swTabstrip', function () {
    return {
        restrict: 'E',
        templateUrl: '../templates/swTabstrip.html',
        scope: {},
        transclude: true,
        controller: function($scope) {
            $scope.panes = [];
            $scope.select = function (pane) {
                $scope.panes.forEach(function (curpane) {
                    if (curpane !== pane) curpane.selected = false;
                });
                pane.selected = true;
            };
            this.addPane = function (pane) {
                $scope.panes.push(pane);
                if ($scope.panes.length == 1) pane.selected = true;
            }
        }
    };
});

angular.module('myApp').directive('swTab', function () {
    return {
        restrict: 'E',
        template: '<div class="tab-pane" ng-show="selected" ng-transclude></div>',
        scope: {
            title: '@'
        },
        transclude: true,
        require: '^swTabstrip',
        link: function (scope, elm, attrs, tbStrpCtrl) {
            tbStrpCtrl.addPane(scope);
        }
    };
});
