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
        ],
        level: 2
    };
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
        ],
        level: 0
    };
    $scope.droid1 = {
        name: 'R2-D2',
        specifications: {
            manufacturer: 'Industrial Automaton',
            type: 'Astromech',
            productLine: 'R2 series'
        },
        level: 1
        // owners...etc
    };
    $scope.droid2 = {
        name: 'Rex-Beta',
        specifications: {
            manufacturer: 'Vinegar Industries',
            type: 'Remote Controlled',
            productLine: 'RC series'
        },
        level: 0
        // owners...etc
    };
});

angular.module('myApp').directive('userInfoCard', function () {
    return {
        templateUrl: '../templates/userInfoCard.html',
        restrict: 'E',
        scope: {
            user: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            $scope.collapsed = $scope.initialCollapsed == "true";
            $scope.toggleCollapse = function () {
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.knightMe = function () {
                $scope.user.rank = 'Jedi-Knight';
            }
            $scope.removeFriend = function (friend) {
                //alert('removing ' + friend)
                var foundIdx = $scope.user.friends.indexOf(friend);
                if (foundIdx > -1) {
                    $scope.user.friends.splice(foundIdx, 1);
                }
            };
            $scope.incrementLevel = function () {
                $scope.user.level++;
                $scope.user.level = $scope.user.level % 4; //Cycle through 4 levels
            };
        }
    };
});

angular.module('myApp').directive('address', function () {
    return {
        templateUrl: '../templates/address.html',
        restrict: 'AE',
        scope: true,
        controller: function ($scope) {
            $scope.showAddress = function (toShow) {
                $scope.collapsed = !toShow;
            }
        }
    };
});
angular.module('myApp').directive('addressV2', function () {
    return {
        templateUrl: '../templates/addressV2.html',
        restrict: 'AE',
        scope: true,
        controller: function ($scope) {
            $scope.showAddress = function (toShow) {
                $scope.collapsed = !toShow;
            }
        }
    };
});

angular.module('myApp').directive('removeFriend', function () {
    return {
        templateUrl: '../templates/removeFriend.html',
        restrict: 'E',
        scope: {
            notifyParent: '&removeMethod'
        },
        controller: function ($scope) {
            $scope.startedRemoving = false;

            $scope.confirmRemove = function () {
                $scope.startedRemoving = true;
            };

            $scope.removeCancelled = function () {
                $scope.startedRemoving = false;
            };

            $scope.removeConfirmed = function () {
                $scope.notifyParent();
            }
        }
    };
});

angular.module('myApp').directive('levelDisplay', function () {
    return {
        link: function (scope, elm, attrs) {
            scope.$watch(attrs['levelDisplay'], function (newValue) {
                var colors = ['yellow', 'lime', 'lightblue'];
                elm.css('background-color', colors[newValue]);
            });
        }
    }
});

angular.module('myApp').directive('levelDisplay2', function () {
    return {
        link: function (scope, elm, attrs) {
            var array = attrs['levelDisplay2'].split(' ');
            var linkVar = array[0];
            var colorClasses = array.slice(1);
            scope.$watch(linkVar, function (newValue) {
                elm.removeClass(colorClasses.join(' '));
                elm.addClass(colorClasses[newValue]);
            });
        }
    }
});

angular.module('myApp').directive('droidInfoCard', function () {
    return {
        templateUrl: '../templates/droidInfoCard.html',
        restrict: 'E',
        scope: {
            droid: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            $scope.collapsed = $scope.initialCollapsed == "true";
            $scope.toggleCollapse = function () {
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.incrementLevel = function () {
                $scope.droid.level++;
                $scope.droid.level = $scope.droid.level % 4; //Cycle through 4 levels
            };
        }
    };
});

angular.module('myApp').directive('personInfoCard', function () {
    return {
        templateUrl: '../templates/personInfoCard.html',
        restrict: 'E',
        scope: {
            person: '='
        },
        controller: function ($scope) {
            $scope.knightMe = function () {
                $scope.person.rank = 'Jedi-Knight';
            }
            $scope.removeFriend = function (friend) {
                //alert('removing ' + friend)
                var foundIdx = $scope.person.friends.indexOf(friend);
                if (foundIdx > -1) {
                    $scope.person.friends.splice(foundIdx, 1);
                }
            };
        }
    };
});

angular.module('myApp').directive('userPanel', function () {
    return {
        templateUrl: '../templates/userPanel.html',
        restrict: 'E',
        scope: {
            name: '@',
            level: '=',
            initialCollapsed: '@collapsed'
        },
        transclude: true,
        controller: function ($scope) {
            $scope.collapsed = $scope.initialCollapsed == "true";
            $scope.toggleCollapse = function () {
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.incrementLevel = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.level++;
                $scope.level = $scope.level % 4; //Cycle through 4 levels
            };
        }
    };
});

angular.module('myApp').directive('droidInfoCardV2', function () {
    return {
        templateUrl: '../templates/droidInfoCardV2.html',
        restrict: 'E',
        scope: {
            droid: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
        }
    };
});
