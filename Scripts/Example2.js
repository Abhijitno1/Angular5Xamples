function InlineEditorController($scope) {
    $scope.value = "Edit me";
    $scope.showTooltip = false;


    $scope.hideTooltip = function () {
        $scope.showTooltip = false;
    }

    $scope.toggleTooltip = function (e) {
        e.stopPropagation();
        $scope.showTooltip = !$scope.showTooltip;
    }
}
