//for single provider page
appControllers.controller('providerCtrl', ['$scope', '$stateParams', '$http', 'config', 'basicServerDataProvider',
    'plansFilterProvider', '$ionicPopup', 'plansListProvider',
    function ($scope, $stateParams, $http, config, basicServerDataProvider, plansFilterProvider,
              $ionicPopup, plansListProvider) {

        //go to website
        $scope.openWebsite = function () {
            window.open($scope.provider.addInfo.href, '_system', 'location=yes');
        };

        //reset global filter (but leave current address set) and apply current provider
        $scope.applyProvider = function () {
            //save
            var currentAddress = plansFilterProvider.getAddress();
            //reset filter
            plansFilterProvider.resetFilter();
            plansFilterProvider.setAddress(currentAddress);
            plansFilterProvider.setProvider($scope.provider);
            //reset plans list (will be requested again later)
            plansListProvider.resetPlansList();
        };

        //get additional info about provider
        $scope.loadAddInfo = function () {
            $http.get(config.siteAddress + '/api/providers/' + $scope.provider.id)
                .success(function (addInfo) {
                    $scope.provider.addInfo = addInfo;
                    //save to service, don't have to load every time
                    basicServerDataProvider.setProviderAddInfo($scope.providerIndex, $scope.provider.addInfo)
                })
                .error(function (err) {
                    $ionicPopup.alert(config.errMsg.loadProviderInfo);
                });
        };

        //get provider's index in array
        $scope.providerIndex = $stateParams.providerIndex;
        //get direct link to current provider
        $scope.provider = basicServerDataProvider.getSingleProvider($scope.providerIndex);
        //get additional info about provider from website if not cached yet
        if ($scope.provider.addInfo == null) {
            $scope.loadAddInfo();
        }
    }]);