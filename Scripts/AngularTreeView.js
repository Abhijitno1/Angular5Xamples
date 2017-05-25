angular.module('Angular5Xamples', [])
    .controller('AngularTreeViewCtrl', function () {
        var vm = this;

        vm.data = newItem(0, "Portal");
        var item1 = addChild(vm.data, 1, "Search");
        var item2 = addChild(vm.data, 2, "Dashboard");
        var item3 = addChild(vm.data, 3, "Item 3");
        var item4 = addChild(vm.data, 4, "Item 4");

        item4.isSelected = true;
        item1.isExpanded = true;
        addChild(item1, 5, "Policy Search.");
        addChild(item1, 6, "Claims Search.");
        addChild(item2, 7, "Underwriter Dashboard.");
        addChild(item2, 8, "Claims Dashboard.");


        function newItem(id, name) {
            return {
                id: id,
                name: name,
                children: [],
                isExpanded: false,
                isSelected: false,
            };
        }

        function addChild(parent, id, name) {
            var child = newItem(id, name);
            child.parent = parent;
            parent.children.push(child);
            return child;
        }

        vm.expandTreeText = "Expand All";

        vm.toggleExpandCollapseTree = function () {
            var root = vm.data;
            var setting;
            if (vm.expandTreeText === "Expand All") {
                vm.expandTreeText = "Collapse All";
                setting = true;
            }
            else {
                vm.expandTreeText = "Expand All";
                setting = false;
            }
            toggleChildren(root, setting);
        };

        function toggleChildren(root, setting) {
            root.isExpanded = setting;
            root.children.forEach(function (branch) {
                toggleChildren(branch, setting);
            });
        }

    });