angular.module('myApp', []);

angular.module('myApp').service('usersData', function () {
    return [{
        id: 1,
        name: 'Luke Skywalker',
        address: {
            street: 'PO Box 123',
            city: 'Secret Rebel Base',
            planet: 'Yavin 4'
        },
        friends: [
          { id: 2, name: 'Han Solo' },
          { id: 3, name: 'Chewbacca' },
          { id: 4, name: 'Leia' }
        ]
    }, {
        id: 2,
        name: 'Han Solo',
        address: {
            street: 'PO Box 123',
            city: 'Mos Eisley',
            planet: 'Tattoine'
        },
        friends: [
          { id: 1, name: 'Luke Skywalker' },
          { id: 3, name: 'Chewbacca' },
          { id: 4, name: 'Leia' }
        ]
    }, {
        id: 3,
        name: 'Chewbacca',
        address: {
            street: 'PO Box 123',
            city: 'Big Tree',
            planet: 'Kashyyyk'
        },
        friends: [
          { id: 1, name: 'Luke Skywalker' },
          { id: 2, name: 'Han Solo' },
          { id: 4, name: 'Leia' }
        ]
    }, {
        id: 4,
        name: 'Leia',
        address: {
            street: 'PO Box 123',
            city: 'Imperial City',
            planet: 'Alderaan'
        },
        friends: [
          { id: 1, name: 'Luke Skywalker' },
          { id: 2, name: 'Han Solo' },
          { id: 3, name: 'Chewbacca' }
        ]
    }
    ]
});

angular.module('myApp').controller('mainController', function ($scope, usersData) {
    $scope.users = usersData;
});

angular.module('myApp').directive('userInfoCardV3', function () {
    return {
        templateUrl: '../templates/userInfoCardV3.html',
        restrict: 'E',
        scope: {
            user: '=',
            initialCollapsed: '@collapsed'
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: function () {
            var me = this;
            this.collapsed = this.initialCollapsed == "true";
            this.showDialog = false;

            this.toggleCollapse = function () {
                me.collapsed = !me.collapsed;
            };
            this.knightMe = function () {
                me.showDialog = true;
            }
            this.knightModalDone = function (reply) {
                if (reply === true) {
                    me.user.rank = 'Jedi-Knight';
                }
            };
            this.removeFriend = function (friend) {
                //alert('removing ' + friend)
                var foundIdx = me.user.friends.indexOf(friend);
                if (foundIdx > -1) {
                    me.user.friends.splice(foundIdx, 1);
                }
            };
        }
    };
});

angular.module('myApp').directive('myModal', function ($document) {
    return {
        templateUrl: '../templates/myModal.html',
        restrict: 'E',
        scope: {
            options: '=',
            modalOpened: '=',
            onClose: '&'
        },
        transclude: true,
        link: function (scope, el, attrs) {
            //set default options if not set by user
            scope.options = scope.options || {};
            var options = angular.extend(scope.options, {
                height: '250px',
                width: '500px',
                top: '20%',
                left: '30%'
            });
            //position the modal
            el.find('modal-blackout').css({
                top: 0,
                left: 0,
                width: $document.width + 'px',
                height: $document.height + 'px'
            });
            el.find('modal-container').css(options);
        },
        controller: function ($scope) {
            //handle the events
            $scope.close = function () {
                $scope.modalOpened = false;
                $scope.onClose($scope, { response: false });
            }
        }
    };
});

angular.module('myApp').directive('addressV3', function () {
    return {
        templateUrl: '../templates/addressV3.html',
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
