var app = angular.module("RatingControllerDemo", []);

app.controller("RatingWidgetController", function ($scope) {
    $scope.initialRating = 0;
    $scope.rateFunction = function (rating) {
        alert("new rating= " + rating);
    }

    $scope.physics = 5;
    $scope.chemistry = 4;
    $scope.maths = 3;
})

app.directive("starRating", function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">'
                    + '<li ng-repeat="star in stars" ng-class="star" ng-click="toggleRating($index)"><span>*</span></li>'
                    + '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected : '&'
        },
        link: function (scope, elm, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            }
            scope.toggleRating = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({ rating: index + 1 });
            };

            scope.$watch('ratingValue', function (oldValue, newValue) {
                if (!isNaN(newValue)) {
                    updateStars();
                }
            });

            //updateStars();
        }
    };
});

(function () {
    var opts = {
        lines: 12, // The number of lines to draw
        angle: 0.00, // The length of each line
        lineWidth: 0.44, // The line thickness
        pointer: {
            length: 0.9, // The radius of the inner circle
            strokeWidth: 0.035, // The rotation offset
            color: '#000000' // Fill color
        },
        limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
        colorStart: '#6FADCF',   // Colors
        colorStop: '#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',   // to see which ones work best for you
        generateGradient: true,
        percentColors : [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]]
    };

    var target = document.getElementById('myGuage'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 5; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(2.25); // set actual value

})();

