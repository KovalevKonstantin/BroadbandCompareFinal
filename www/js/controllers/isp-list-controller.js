//for ISP List (providers) page
appControllers.controller('ispListCtrl', ['$scope', '$stateParams', '$ionicHistory', 'basicServerDataProvider',
    function ($scope, $stateParams, $ionicHistory, basicServerDataProvider) {

        //fired when type in search string
        //start timer (and reset previous one) to start filtering providers with search string
        //timer is used to avoid false filtering when typing
        $scope.applySearchStrChange = function () {
            //reset
            clearTimeout(searchTimer);
            //filter
            searchTimer = setTimeout($scope.filterProviders, 2000);
        };

        //actually filter providers, refresh view as it doesn't automatically
        $scope.filterProviders = function () {
            //clear
            $scope.providersList = [];
            //add
            basicServerDataProvider.getProvidersList().forEach(function (item) {
                if (item.name.toLowerCase().indexOf($scope.searchStr.value.toLowerCase()) != -1) {
                    $scope.providersList.push(item);
                }
            });
            //refresh
            $scope.$apply();
        };

        //when actually show view
        $scope.$on('$ionicView.afterEnter', function () {
            $ionicHistory.clearHistory();
        });

        //initial search string
        $scope.searchStr = {
            value: ''
        };
        //just timer var
        var searchTimer;
        //initial providers list just assign to global app's (don't really have to copy)
        $scope.providersList = basicServerDataProvider.getProvidersList();
    }]);