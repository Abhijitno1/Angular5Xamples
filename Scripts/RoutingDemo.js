
var sampleApp = angular.module('sampleApp', ['ngRoute']);

sampleApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/AddNewOrder', {
            templateUrl: 'add_order.html',
            controller: 'AddOrderController'
        }).
        when('/ShowOrders', {
            templateUrl: 'show_orders.html',
            controller: 'ShowOrdersController'
        }).
          when('/SearchOrder', {
              templateUrl: 'ExternalView.html',
              controller: 'SearchOrderController'
          }).
        otherwise({
            redirectTo: '/AddNewOrder'
        });
  }]);


sampleApp.controller('AddOrderController', function ($scope) {
    $scope.message = 'This is Add new order screen';
});


sampleApp.controller('ShowOrdersController', function ($scope) {
    $scope.message = 'This is Show orders screen';
});

sampleApp.controller('SearchOrderController', function ($scope) {
    $scope.message = "This is a view in a separate file"
});

