//for Info page
appControllers.controller('infoCtrl', ['$scope', '$stateParams', '$ionicHistory', 'config',
    function ($scope, $stateParams, $ionicHistory, config) {
        //when actually show view
        $scope.$on('$ionicView.afterEnter', function () {
            $ionicHistory.clearHistory();
        });

        $scope.appVersion = config.appVersion;
        $scope.appDate = config.appDate;
    }]);