angular.module('myApp', []);

angular.module('myApp').controller('mainController', function ($scope) {
    $scope.bountyHunters = [
        {
            name: 'Boba Fett', age: 35
        }, {
            name: 'IG-88', age: 130
        }, {
            name: 'Dengar', age: 42
        }, {
            name: 'Bossk', age: 782
        }, {
            name: 'Cad Bane', age: 51
        }
    ];

    $scope.addTest = function () {
        $scope.bountyHunters.push({ name: '4LOM', age: 25 });
    }
    $scope.removeTest = function () {
        $scope.bountyHunters.length--;
    }

});

angular.module('myApp').directive('myRepeater', function () {
    return {
        restrict: 'A',
        transclude: 'element',
        link: function (scope, elm, attrs, ctrl, transclude) {
            var valueParts = attrs.myRepeater.split(' ');
            var itemString = valueParts[0], collectionName = valueParts[2];
            var itemsBag = [];

            scope.$watchCollection(collectionName, function (collection) {
                //Cleanup old elements before adding new ones
                for (var i = 0; i < itemsBag.length; i++) {
                    itemsBag[i].el.remove();
                    itemsBag[i].scope.$destroy();
                }

                for (var i = 0; i < collection.length; i++) {
                    var childScope = scope.$new();
                    childScope[itemString] = collection[i];
                    transclude(childScope, function (clone) {
                        elm.before(clone);

                        var item = {
                            el: clone,
                            scope: childScope
                        };
                        itemsBag.push(item);
                    });
                }
            });
        }
    };
});

angular.module('myApp').directive('myRepeaterV2', function ($compile) {
    return {
        restrict: 'A',
        transclude: 'element',
        link: function (scope, elm, attrs, ctrl, transclude) {
            var valueParts = attrs.myRepeaterV2.split(' ');
            var itemString = valueParts[0], collectionName = valueParts[2];
            var itemsBag = [];

            scope.$watchCollection(collectionName, function (collection) {
                //Cleanup old elements before adding new ones
                for (var i = 0; i < itemsBag.length; i++) {
                    itemsBag[i].el.remove();
                    itemsBag[i].scope.$destroy();
                }

                for (var i = 0; i < collection.length; i++) {
                    var childScope = scope.$new();
                    childScope[itemString] = collection[i];
                    transclude(childScope, function (clone) {
                        var templateFn = $compile('<div class="panel panel-primary">\
                            <div class="panel-heading">{{' + itemString + '.name}}</div>\
                            <div class="panel-body"></div>\
                            </div>');
                        var styledClone = templateFn(childScope);
                        styledClone.find('.panel-body').append(clone);
                        elm.before(styledClone);

                        var item = {
                            el: styledClone,
                            scope: childScope
                        };
                        itemsBag.push(item);
                    });
                }
            });
        }
    };
});
