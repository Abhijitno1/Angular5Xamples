angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
    $scope.users = [
      { name: 'Luke', planet: 'Tatooine', job: 'Jedi' },
      { name: 'Han', planet: 'Nowhere', job: 'Jedi' },
      { name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot' }
    ]
});

angular.module('myApp').factory('userStateService', function () {
    return {
        selectedUser: null,
        stateWatchers: [],
        addWatcher: function (client) {
            this.stateWatchers.push(client);
        },
        notifyWatchers: function () {
            this.stateWatchers.forEach(function (client) {
                client.onUserSelected();
            });
        },
        removeWatcher: function (client) {
            var idx = this.stateWatchers.indexOf(client);
            if (idx > -1)
                this.stateWatchers.splice(idx, 1);
        }
    };
});

angular.module('myApp').directive('masterUsers', function (userStateService) {
    return {
        restrict: 'E',
        templateUrl: '../templates/masterUsers.html',
        scope: {
            users: '=data'
        },
        controller: function ($scope) {
            $scope.select = function (user) {
                user.selected = true;
                $scope.users.forEach(function (usr) {
                    if (user !== usr) usr.selected = false;
                });
                userStateService.selectedUser = user;
                userStateService.notifyWatchers();
            }
        }
    };
});

angular.module('myApp').directive('detailUser', function (userStateService) {
    return {
        restrict: 'E',
        templateUrl: '../templates/detailUser.html',
        controller: function ($scope) {
            $scope.user = {};
            var listener = {
                onUserSelected: function () {
                    $scope.user = userStateService.selectedUser;
                }
            }

            userStateService.addWatcher(listener);
        }
    };
});