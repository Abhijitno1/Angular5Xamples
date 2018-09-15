angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
    $scope.user1 = {
        name: 'Luke Skywalker',
        address: {
            street: 'PO Box 123',
            city: 'Secret Rebel Base',
            planet: 'Yavin 4'
        },
        friends: [
          'Han',
          'Leia',
          'Chewbacca'
        ]
    }
    $scope.user2 = {
        name: 'Han Solo',
        address: {
            street: 'PO Box 123',
            city: 'Mos Eisley',
            planet: 'Tattoine'
        },
        friends: [
          'Han',
          'Leia',
          'Chewbacca'
        ]
    }
    $scope.size = 150;
    $scope.clickedMessage = "You haven't clicked Header3";
    $scope.customClickHandler = function (param) {
        $scope.clickedMessage = "You have clicked " + param;
    };
    $scope.clickedOk = function () {
        alert('User clicked Ok');
    };
    $scope.videoPaused = function (e) {
        if (console)
            console.log('Video directive pause event', e);
    };
});

angular.module('myApp').directive('userTile', function () {
    return {
        templateUrl: '../templates/userTile.html',
        restrict: 'E',
        scope: {
            user: '='
        }
    };
});

angular.module('myApp').directive('userSelector', function () {
    return {
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                scope.user.selected = !scope.user.selected;
                scope.$apply();
            });
        }
    };
});

angular.module('myApp').directive('fontScale', function () {
    return function (scope, elm, attrs) {
        scope.$watch(attrs['fontScale'], function (newvalue) {
            elm.css('font-size', newvalue + '%');
        });
    };
});

angular.module('myApp').directive('myClick', function ($parse) {
    return function (scope, elm, attrs) {
        var handlerFn = $parse(attrs['myClick']);
        elm.on('click', function () {
            scope.$apply(handlerFn(scope, {data: 'Header3'}));
        });
    };
});

angular.module('myApp').directive('bsDialog', function () {
    return {
        templateUrl: '../templates/bsDialog.html',
        restrict: 'E',
        scope: {
            title: '@',
            triggerElm: '@',
            okHandler: '&'
        },
        transclude: true,
        link: function (scope, elm, attrs) {
            angular.element(scope.triggerElm).click(function () {
                //alert('opening the modal');
                elm.modal('show');
                //workaround as animation is not working
                elm.find('.modal').css('display', 'block');
            });
            elm.find('#btnOk').click(function () {
                elm.modal('hide');
                scope.okHandler(scope);
            });
        }
    };
});

angular.module('myApp').directive('spacebarSupport', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            $('body').on('keypress', function (evt) {
                //console.log('captured the event', evt);
                if (evt.keyCode == 32) {
                    var vidEl = elm[0];
                    if (vidEl.paused)
                        vidEl.play();
                    else
                        vidEl.pause();
                }
            });
        }
    };
});

angular.module('myApp').directive('pauseHandler', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var strFn = attrs['pauseHandler'];
            if (strFn) {
                var fn = $parse(strFn);
                elm.on('pause', function (event) {
                    fn(scope, { evt: event });
                });
            }
        }
    };
});