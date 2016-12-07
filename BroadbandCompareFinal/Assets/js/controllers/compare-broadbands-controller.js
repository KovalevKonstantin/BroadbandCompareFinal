//for Compare Broadband  page
appControllers.controller('compareBroadbandsCtrl', ['$scope', '$stateParams', '$ionicModal', '$state',
    '$http', '$ionicHistory', 'config', 'basicServerDataProvider', 'plansFilterProvider', '$ionicPopup', 'plansListProvider',
    function ($scope, $stateParams, $ionicModal, $state, $http, $ionicHistory, config,
              basicServerDataProvider, plansFilterProvider, $ionicPopup, plansListProvider) {
        
        //use this to control directive
        $scope.addressSelectorControl = {};
        
        //get filtered plans (families) from webserver
        $scope.refreshPlansList = function () {
            plansListProvider.getPlansList()
                .success(function (plansList) {
                    $scope.plansList = plansList;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })
                .error(function (message) {
                    $ionicPopup.alert(message);
                });
        };

        //apply address to global filter and reload plans list
        $scope.applyAddress = function () {
            plansFilterProvider.setAddress($scope.address.value);
            plansListProvider.resetPlansList();
            $scope.refreshPlansList();
            $scope.addressSet = true;
            $scope.predictions = null;
        };

        //clear address field (not global, just on this page)
        $scope.resetAddress = function () {
            $scope.address.value = '';
            $scope.addressSet = false;
            $scope.predictions = null;
        };

        //resort loaded plans according to new setting
        $scope.sortPlans = function () {
            //set new order by value to global filter
            plansFilterProvider.setOrderBy($scope.orderBy.val);

            //sort list and refresh local copy
            plansListProvider.sortPlans();
            $scope.refreshPlansList();
        };

        //show modal page with special offer description
        $scope.showSpecials = function ($event, $index) {
            $event.stopPropagation();
            $scope.planIndex = $index;
            $scope.showCashbackFull = false;
            $scope.specialsModal.show();
        };

        // hide modal page with special offer description
        $scope.closeSpecials = function () {
            $scope.specialsModal.hide();
        };

        // show/hide full cashback conditions
        $scope.setShowCashbackFull = function (value) {
            $scope.showCashbackFull = value;
        };

        //go to specific webpage
        $scope.openWebpage = function (href) {
            window.open(href, '_system', 'location=yes');
        };

        //open page with plan description and it's options
        $scope.goToPlan = function (index) {
            $state.go('tabs.plans', {planIndex: index}, {notify: true});
        };

        //when actually show view
        $scope.$on('$ionicView.beforeEnter', function () {
            //init address
            $scope.address = {
                value: plansFilterProvider.getAddress()
            };
            if ($scope.addressSelectorControl.resetPredictions) {
                $scope.addressSelectorControl.resetPredictions();
            }
            $scope.addressSet = ($scope.address.value !== '');
            //
            $scope.refreshPlansList();
        });

        //when actually show view
        $scope.$on('$ionicView.afterEnter', function () {
            $ionicHistory.clearHistory();
        });

        //possible 'order by' options
        $scope.sortings = plansFilterProvider.getSortings();

        //initialize default order
        $scope.orderBy = {
            val: plansFilterProvider.getOrderBy()
        };
        //initialize modal page for special offer
        $ionicModal.fromTemplateUrl('templates/specialOffers.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.specialsModal = modal;
        });
    }]);