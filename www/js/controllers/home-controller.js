//for app's Home page
appControllers.controller('homeCtrl', ['$scope', '$stateParams', '$ionicHistory', 
    'plansFilterProvider', 'plansListProvider',
    function ($scope, $stateParams, $ionicHistory, plansFilterProvider, plansListProvider) {
        //use this to control directive
        $scope.addressSelectorControl = {};
        
        //apply address to global filter and reset plans list (to be reloaded later)
        $scope.applyAddress = function () {
            plansFilterProvider.setAddress($scope.address.value);
            plansListProvider.resetPlansList();
        };

        //when actually show view
        $scope.$on('$ionicView.beforeEnter', function () {
            //reread address from global filter
            $scope.address = {
                value: plansFilterProvider.getAddress()
            };
            if ($scope.addressSelectorControl.resetPredictions) {
                $scope.addressSelectorControl.resetPredictions();
            }
        });

        //when actually show view
        $scope.$on('$ionicView.afterEnter', function () {
            $ionicHistory.clearHistory();
        });
    }]);