angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
});

angular.module('myApp').directive('emperor', function () {
    var name = 'emperor';
    return {
        restrict: 'E',
        scope: true,
        controller: function($scope) {
            console.log('emporer controller invoked');
            this.name = name;
        },
        link: function (scope, elm, attrs) {
            console.log('emporer link invoked');
            elm.data('name', name);
            scope.master = name;
        }
    };
});

angular.module('myApp').directive('vader', function () {
    var name = 'Vader';
    return {
        restrict: 'E',
        scope: true,
        require: '^emperor',
        controller: function($scope) {
            console.log('vader controller invoked');
            this.name = name;
        },
        link: function (scope, elm, attrs, emprCtrl) {
            console.log('vader link invoked');
            elm.data('name', name);
            elm.data('master', emprCtrl.name);
            console.log(name + '\'s master is ' + emprCtrl.name);
        }
    };
});

angular.module('myApp').directive('starkiller', function () {
    var name = 'Starkiller';
    return {
        restrict: 'AE',
        scope: true,
        require: '?^^vader',
        controller: function ($scope) {
            this.name = name;
        },
        link: function (scope, elm, attrs, vdrCtrl) {
            elm.data('name', name);
            if (vdrCtrl) {
                elm.data('master', vdrCtrl.name);
                console.log(name + '\'s master is ' + vdrCtrl.name);
            }
            else {
                console.log(name + ' does not have a master');
            }
        }
    };
});

angular.module('myApp').directive('multikiller', function () {
    var name = 'Multikiller';
    return {
        restrict: 'E',
        scope: true,
        require: ['^emperor', '^vader'],
        link: function (scope, elm, attrs, ctrls) {
            elm.data('name', name);
            elm.data('master', ctrls[0].name);
            console.log(name + '\'s master is ' + ctrls[1].name);
            console.log(name + '\'s grandmaster is ' + ctrls[0].name);
        }
    };
});
