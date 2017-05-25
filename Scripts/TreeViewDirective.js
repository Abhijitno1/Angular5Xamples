angular.module('Angular5Xamples').directive('treeView', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            branch: '='
        },
        templateUrl: 'TreeViewTemplate.html',
        compile: function (tElm, tAttr) {
            var contents = tElm.contents().remove();
            var compiledContents;

            return function (scope, elm, attrs) {
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function (clone, scope) {
                    elm.append(clone);
                });
            };
        }
    }
});