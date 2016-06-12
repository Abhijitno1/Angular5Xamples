function OrderFormController($scope) {
    $scope.services = [{
        name: "Web Development",
        price: 350,
        active: true
    }, {
        name: "Design",
        price: 300,
        active: false
    }, {
        name: "Integration",
        price: 200,
        active: false
    }, {
        name: "Training",
        price: 250,
        active: false
    }];

    $scope.toggleActive = function (s) {
        s.active = !s.active;
    }

    $scope.calculateTotal = function () {
        var total = 0;
        angular.forEach($scope.services, function (s) {
            if (s.active) {
                total += s.price;
            }
        });
        return total;
    }
}
