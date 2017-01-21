//for Filter  page
appControllers.controller('filterCtrl', ['$scope', '$stateParams', '$ionicScrollDelegate', 
    'plansFilterProvider', 'plansListProvider',
    function ($scope, $stateParams, $ionicScrollDelegate, plansFilterProvider, plansListProvider) {

        //use this to control directive
        $scope.addressSelectorControl = {};
        
        //get class for filter mode button (enabled/disabled)
        $scope.modeButtonClass = function (advanced) {
            if (advanced === $scope.advancedMode) {
                return 'button-positive';
            } else {
                return 'button-stable';
            }
        };

        //set filter mode (advances/simple)
        $scope.setAdvancedMode = function (mode) {
            $scope.advancedMode = mode;
            $ionicScrollDelegate.resize();
        };

        //get class for extra option button (enabled/disabled)
        $scope.extraButtonClass = function (index) {
            if ($scope.extrasList[index].checked) {
                return 'button-dark';
            } else {
                return 'button-stable';
            }
        };

        //switch extra option selected
        $scope.extraButtonClick = function (index) {
            $scope.extrasList[index].checked = !$scope.extrasList[index].checked;
        };

        //get class for connection option button (enabled/disabled)
        $scope.connectionOptionButtonClass = function (index) {
            if ($scope.connectionOptions[index].checked) {
                return 'button-dark';
            } else {
                return 'button-stable';
            }
        };

        //switch connection option selected
        $scope.connectionOptionButtonClick = function (index) {
            $scope.connectionOptions[index].checked = !$scope.connectionOptions[index].checked;
        };

        //get class for contract option button (enabled/disabled)
        $scope.contractOptionButtonClass = function (index) {
            if ($scope.contractOptions[index].checked) {
                return 'button-dark';
            } else {
                return 'button-stable';
            }
        };

        //switch contract option selected
        $scope.contractOptionButtonClick = function (index) {
            $scope.contractOptions[index].checked = !$scope.contractOptions[index].checked;
        };

        //reset filter settings (not globally)
        $scope.resetFilter = function () {
            $scope.speedMin = plansFilterProvider.getDefaultPlansFilter().speedMin;
            $scope.speedMax = plansFilterProvider.getDefaultPlansFilter().speedMax;
            $scope.priceMin = plansFilterProvider.getDefaultPlansFilter().priceMin;
            $scope.priceMax = plansFilterProvider.getDefaultPlansFilter().priceMax;
            $scope.speedDnldMin = plansFilterProvider.getDefaultPlansFilter().speedDnldMin;
            $scope.speedDnldMax = plansFilterProvider.getDefaultPlansFilter().speedDnldMax;
            $scope.dataMin = plansFilterProvider.getDefaultPlansFilter().dataMin;
            $scope.dataMax = plansFilterProvider.getDefaultPlansFilter().dataMax;
            $scope.providers = [];
            $scope.extrasList.forEach(function (item) {
                item.checked = false;
            });
            $scope.connectionOptions.forEach(function (item) {
                item.checked = false;
            });
            $scope.contractOptions.forEach(function (item) {
                item.checked = false;
            });
            //reset sliders
            $scope.priceSlider.noUiSlider.set([$scope.priceMin, $scope.priceMax]);
            $scope.speedSlider.noUiSlider.set([$scope.speedMin]);
            $scope.downloadSlider.noUiSlider.set([$scope.speedDnldMin, $scope.speedDnldMax]);
            $scope.dataSlider.noUiSlider.set([$scope.dataMin, $scope.dataMax]);
        };

        //reset address field (not globally)
        $scope.resetAddress = function () {
            $scope.address.value = '';
            $scope.addressSet = false;
            $scope.predictions = null;
        };

        //save local page filter as global, reset plans list (to be reloaded later)
        $scope.applyFilter = function () {
            plansFilterProvider.setAdvancedMode($scope.advancedMode);
            plansFilterProvider.setAddress($scope.address.value);
            plansFilterProvider.setSpeedMin($scope.speedMin);
            plansFilterProvider.setSpeedMax($scope.speedMax);
            plansFilterProvider.setPriceMin($scope.priceMin);
            plansFilterProvider.setPriceMax($scope.priceMax);
            plansFilterProvider.setSpeedDnldMin($scope.speedDnldMin);
            plansFilterProvider.setSpeedDnldMax($scope.speedDnldMax);
            plansFilterProvider.setDataMin($scope.dataMin);
            plansFilterProvider.setDataMax($scope.dataMax);
            plansFilterProvider.markChosenExtras($scope.extrasList);
            plansFilterProvider.markChosenConnectionOptions($scope.connectionOptions);
            plansFilterProvider.markChosenContractOptions($scope.contractOptions);
            plansFilterProvider.setProvider();
            //
            plansListProvider.resetPlansList();
        };

        //when loaded view to DOM
        $scope.$on('$ionicView.loaded', function () {
            //read params for sliders
            $scope.speedMin = plansFilterProvider.getSpeedMin();
            $scope.speedMax = plansFilterProvider.getSpeedMax();
            $scope.priceMin = plansFilterProvider.getPriceMin();
            $scope.priceMax = plansFilterProvider.getPriceMax();
            $scope.speedDnldMin = plansFilterProvider.getSpeedDnldMin();
            $scope.speedDnldMax = plansFilterProvider.getSpeedDnldMax();
            $scope.dataMin = plansFilterProvider.getDataMin();
            $scope.dataMax = plansFilterProvider.getDataMax();
            //find DOM elements
            $scope.priceSlider = document.getElementById('filter-price-slider');
            $scope.speedSlider = document.getElementById('filter-speed-slider');
            $scope.downloadSlider = document.getElementById('filter-download-slider');
            $scope.dataSlider = document.getElementById('filter-data-slider');
            //initialize sliders
            noUiSlider.create($scope.priceSlider, {
                start: [$scope.priceMin, $scope.priceMax],
                step: 1,
                connect: true,
                range: {
                    'min': plansFilterProvider.getDefaultPlansFilter().priceMin,
                    'max': plansFilterProvider.getDefaultPlansFilter().priceMax
                }
            });
            noUiSlider.create($scope.speedSlider, {
                start: [$scope.speedMin],
                step: 1,
                connect: 'upper',
                orientation: 'vertical',
                range: {
                    'min': plansFilterProvider.getDefaultPlansFilter().speedMin,
                    'max': plansFilterProvider.getDefaultPlansFilter().speedMax
                }
            });
            noUiSlider.create($scope.downloadSlider, {
                start: [$scope.speedDnldMin, $scope.speedDnldMax],
                step: 1,
                connect: true,
                range: {
                    'min': plansFilterProvider.getDefaultPlansFilter().speedDnldMin,
                    'max': plansFilterProvider.getDefaultPlansFilter().speedDnldMax
                }
            });
            noUiSlider.create($scope.dataSlider, {
                start: [$scope.dataMin, $scope.dataMax],
                step: 1,
                connect: true,
                range: {
                    'min': plansFilterProvider.getDefaultPlansFilter().dataMin,
                    'max': plansFilterProvider.getDefaultPlansFilter().dataMax
                }
            });
            //set listeners for sliders, bind scope vars
            $scope.priceSlider.noUiSlider.on('update', function (values, handle) {
                if (handle) {
                    $scope.priceMax = values[handle];
                } else {
                    $scope.priceMin = values[handle];
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            $scope.speedSlider.noUiSlider.on('update', function (values, handle) {
                $scope.speedMin = values[handle];
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            $scope.downloadSlider.noUiSlider.on('update', function (values, handle) {
                if (handle) {
                    $scope.speedDnldMax = values[handle];
                } else {
                    $scope.speedDnldMin = values[handle];
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            $scope.dataSlider.noUiSlider.on('update', function (values, handle) {
                if (handle) {
                    $scope.dataMax = values[handle];
                } else {
                    $scope.dataMin = values[handle];
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        });

        //when actually show view
        $scope.$on('$ionicView.beforeEnter', function () {
            //read settings from global filter, save to local
            $scope.advancedMode = plansFilterProvider.getAdvancedMode();
            $scope.address = {
                value: plansFilterProvider.getAddress()
            };
            $scope.speedMin = plansFilterProvider.getSpeedMin();
            $scope.speedMax = plansFilterProvider.getSpeedMax();
            $scope.priceMin = plansFilterProvider.getPriceMin();
            $scope.priceMax = plansFilterProvider.getPriceMax();
            $scope.speedDnldMin = plansFilterProvider.getSpeedDnldMin();
            $scope.speedDnldMax = plansFilterProvider.getSpeedDnldMax();
            $scope.dataMin = plansFilterProvider.getDataMin();
            $scope.dataMax = plansFilterProvider.getDataMax();
            $scope.extrasList = plansFilterProvider.getExtrasList();
            $scope.connectionOptions = plansFilterProvider.getConnectionOptions();
            $scope.contractOptions = plansFilterProvider.getContractOptions();
            $scope.providers = plansFilterProvider.getProviders();
            //
            if ($scope.addressSelectorControl.resetPredictions) {
                $scope.addressSelectorControl.resetPredictions();
            }
            $scope.addressSet = ($scope.address.value !== '');
        });
    }]);