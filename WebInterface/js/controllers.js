angular.module('app.controllers', [])

    .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('infoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('iSPListCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $rootScope) {

            $scope.searchStr = {
                value: ''
            };
            $scope.providersList = [];
            var searchTimer;

            $scope.providersList = $rootScope.providersList;

            $scope.applySearchStrChange = function () {
                clearTimeout(searchTimer);
                searchTimer = setTimeout($scope.filterProviders, 2000);
            };

            $scope.filterProviders = function () {
                $scope.providersList = [];
                $rootScope.providersList.forEach(function (item, index) {
                    if (item.name.toLowerCase().indexOf($scope.searchStr.value.toLowerCase()) != -1) {
                        $scope.providersList.push(item);
                    }
                });
                $scope.$apply();
            };

        }])

    .controller('providerCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $rootScope) {
            $scope.openWebsite = function () {
                window.open($scope.provider.addInfo.webLink, '_system', 'location=yes');
            };

            $scope.goToPlans = function () {
                var currentAddress = $rootScope.plansFilter.address;
                $rootScope.plansFilter = {
                    advancedMode: true,
                    address: currentAddress,
                    speedMin: 1,
                    speedMax: 4,
                    priceMin: 49,
                    priceMax: 300,
                    extrasList: [
                        {name: 'Free modem', checked: false},
                        {name: 'VoIP', checked: false},
                        {name: 'LandLine', checked: false},
                        {name: 'TV', checked: false}
                    ],
                    connectionOptions: [
                        {name: 'UFB(Fibre)', checked: false},
                        {name: 'VDSL', checked: false},
                        {name: 'ADSL', checked: false},
                        {name: 'Unlimited', checked: false}
                    ],
                    provider: $scope.provider,
                    speedDnldMin: 1,
                    speedDnldMax: 100,
                    dataMin: 1,
                    dataMax: 0,
                    contractOptions: [0, 1, 3, 6, 12, 24, 36]
                };
                $rootScope.plansList = null;
            };

            $scope.providerIndex = $stateParams.providerIndex;
            $scope.provider = $rootScope.providersList[$scope.providerIndex];
            if ($scope.provider.addInfo == null) {
                $scope.provider.addInfo = {
                    slogan: 'Ultra-fast Blah Blah, index = ' + $scope.providerIndex,
                    description: 'Provider ID = ' + $scope.provider.id,
                    webLink: 'http://mail.ru'
                };
            }
        }])

    .controller('compareBroadbandsCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $rootScope) {
            $scope.sortings = [
                {title: 'Rating', value: 'rating'},
                {title: 'Price Low to High', value: 'price_lh'},
                {title: 'Price High to Low', value: 'price_hl'}
            ];
            $scope.sortBy = {
                val: $scope.sortings[0]
            };

            $scope.initPlansList = function () {
                $rootScope.plansList = [
                    {
                        id: 0,
                        providerId: 3,
                        name: 'Plan 1',
                        rating: '98',
                        minPrice: 33,
                        maxData: 0,
                        connectionType: 'VDSL',
                        specialOffer: 'Offer 1',
                        cashBack: 30
                    },
                    {
                        id: 1,
                        providerId: 2,
                        name: 'Plan 2',
                        rating: '97',
                        minPrice: 35,
                        maxData: 0,
                        connectionType: 'UFB',
                        specialOffer: '',
                        cashBack: 22
                    },
                    {
                        id: 2,
                        providerId: 3,
                        name: 'Plan 3',
                        rating: '89',
                        minPrice: 45,
                        maxData: 1200,
                        connectionType: 'ADSL',
                        specialOffer: 'Offer 3',
                        cashBack: 0
                    },
                    {
                        id: 3,
                        providerId: 1,
                        name: 'Plan 4',
                        rating: '87',
                        minPrice: 42,
                        maxData: 1000,
                        connectionType: 'VDSL',
                        specialOffer: '',
                        cashBack: 0
                    }
                ];
                $rootScope.plansList.forEach(function (plan, planIndex) {
                    plan.options = null;
                    plan.index = planIndex;
                    for (i = 0; i < $rootScope.providersList.length; i++) {
                        var provider = $rootScope.providersList[i];
                        if (plan.providerId === provider.id) {
                            plan.provider = provider;
                            break;
                        }
                    }
                });
            };

            $scope.applyAddress = function () {
                $rootScope.plansFilter.address = $scope.address.value;
                $rootScope.plansList = null;
                $scope.initPlansList();
                $scope.addressSet = true;
            };

            $scope.resetAddress = function () {
                $scope.address.value = '';
                $scope.addressSet = false;
            };

            $scope.sortPlans = function () {
                $rootScope.plansList.sort(function (a, b) {
                    switch ($scope.sortBy.val.value) {
                        case $scope.sortings[0].value:
                            if (a.rating < b.rating) {
                                return 1;
                            } else if (a.rating > b.rating) {
                                return -1;
                            } else {
                                return 0;
                            }
                            break;
                        case $scope.sortings[1].value:
                            if (a.minPrice > b.minPrice) {
                                return 1;
                            } else if (a.minPrice < b.minPrice) {
                                return -1;
                            } else {
                                return 0;
                            }
                            break;
                        case $scope.sortings[2].value:
                            if (a.minPrice < b.minPrice) {
                                return 1;
                            } else if (a.minPrice > b.minPrice) {
                                return -1;
                            } else {
                                return 0;
                            }
                            break;
                    }
                });
            };

            $scope.setAddressValue = function(address) {
                $scope.address.value = address;
            };

            $scope.$on('$ionicView.loaded', function () {
                enableAddressAutocomplete($scope);
            });

            $scope.$on('$ionicView.beforeEnter', function () {
                $scope.address = {
                    value: $rootScope.plansFilter.address
                };
                $scope.addressSet = ($scope.address.value !== '');

                if ($rootScope.plansList == null) {
                    $scope.initPlansList();
                }

                $scope.sortPlans();
            });
        }])

    .controller('filterCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $rootScope) {

            $scope.modeButtonClass = function (advanced) {
                if (advanced === $scope.advancedMode) {
                    return 'button-positive';
                } else {
                    return 'button-stable';
                }
            };

            $scope.setAdvancedMode = function (mode) {
                $scope.advancedMode = mode;
            };

            $scope.extraButtonClass = function (index) {
                if ($scope.extrasList[index].checked) {
                    return 'button-dark';
                } else {
                    return 'button-stable';
                }
            };

            $scope.extraButtonClick = function (index) {
                $scope.extrasList[index].checked = !$scope.extrasList[index].checked;
            };

            $scope.connectionOptionButtonClass = function (index) {
                if ($scope.connectionOptions[index].checked) {
                    return 'button-dark';
                } else {
                    return 'button-stable';
                }
            };

            $scope.connectionOptionButtonClick = function (index) {
                $scope.connectionOptions[index].checked = !$scope.connectionOptions[index].checked;
            };

            $scope.resetFilter = function () {
                $scope.speedMin = 1;
                $scope.speedMax = 4;
                $scope.priceMin = 49;
                $scope.priceMax = 300;
                $scope.extrasList.forEach(function (item, index) {
                    item.checked = false;
                });
                $scope.connectionOptions.forEach(function (item, index) {
                    item.checked = false;
                });
                $scope.priceSlider.noUiSlider.set([$scope.priceMin, $scope.priceMax]);
                $scope.speedSlider.noUiSlider.set([$scope.speedMin, $scope.speedMax]);
            };

            $scope.resetAddress = function () {
                $scope.address.value = '';
                $scope.addressSet = false;
            };

            $scope.applyFilter = function () {
                $rootScope.plansFilter.advancedMode = $scope.advancedMode;
                $rootScope.plansFilter.address = $scope.address.value;
                $rootScope.plansFilter.speedMin = $scope.speedMin;
                $rootScope.plansFilter.speedMax = $scope.speedMax;
                $rootScope.plansFilter.priceMin = $scope.priceMin;
                $rootScope.plansFilter.priceMax = $scope.priceMax;
                $rootScope.plansFilter.extrasList = [];
                $scope.extrasList.forEach(function (item, index) {
                    $rootScope.plansFilter.extrasList.push({name: item.name, checked: item.checked});
                });
                $rootScope.plansFilter.connectionOptions = [];
                $scope.connectionOptions.forEach(function (item, index) {
                    $rootScope.plansFilter.connectionOptions.push({name: item.name, checked: item.checked});
                });

                $rootScope.plansList = null;
            };

            $scope.setAddressValue = function(address) {
                $scope.address.value = address;
            };

            $scope.$on('$ionicView.loaded', function () {
                $scope.speedMin = $rootScope.plansFilter.speedMin;
                $scope.speedMax = $rootScope.plansFilter.speedMax;
                $scope.priceMin = $rootScope.plansFilter.priceMin;
                $scope.priceMax = $rootScope.plansFilter.priceMax;

                $scope.priceSlider = document.getElementById('filter-price-slider');
                $scope.speedSlider = document.getElementById('filter-speed-slider');

                noUiSlider.create($scope.priceSlider, {
                    start: [$scope.priceMin, $scope.priceMax],
                    step: 1,
                    connect: true,
                    range: {
                        'min': 49,
                        'max': 300
                    }
                });
                noUiSlider.create($scope.speedSlider, {
                    start: [$scope.speedMin, $scope.speedMax],
                    step: 1,
                    connect: true,
                    orientation: 'vertical',
                    range: {
                        'min': 1,
                        'max': 4
                    }
                });

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
                    if (handle) {
                        $scope.speedMax = values[handle];
                    } else {
                        $scope.speedMin = values[handle];
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });

                enableAddressAutocomplete($scope);
            });

            $scope.$on('$ionicView.beforeEnter', function () {
                $scope.advancedMode = $rootScope.plansFilter.advancedMode;
                $scope.address = {
                    value: $rootScope.plansFilter.address
                };
                $scope.speedMin = $rootScope.plansFilter.speedMin;
                $scope.speedMax = $rootScope.plansFilter.speedMax;
                $scope.priceMin = $rootScope.plansFilter.priceMin;
                $scope.priceMax = $rootScope.plansFilter.priceMax;
                $scope.extrasList = [];
                $rootScope.plansFilter.extrasList.forEach(function (item, index) {
                    $scope.extrasList.push({name: item.name, checked: item.checked});
                });
                $scope.connectionOptions = [];
                $rootScope.plansFilter.connectionOptions.forEach(function (item, index) {
                    $scope.connectionOptions.push({name: item.name, checked: item.checked});
                });

                $scope.addressSet = ($scope.address.value !== '');
            });

        }])

    .controller('plansCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$ionicHistory', '$ionicConfig', '$ionicPlatform',    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $rootScope, $state, $ionicHistory, $ionicConfig, $ionicPlatform) {

            $scope.nextPlan = function () {
                var nextIndex = parseInt($scope.planIndex) + 1;
                $state.go('.', {planIndex: nextIndex}, {notify: true});
            };

            $scope.prevPlan = function () {
                var prevIndex = parseInt($scope.planIndex) - 1;
                $state.go('.', {planIndex: prevIndex}, {notify: true});
            };

            $scope.nextPlanDisabled = function () {
                return parseInt($scope.planIndex) >= ($rootScope.plansList.length - 1)
            };

            $scope.prevPlanDisabled = function () {
                return parseInt($scope.planIndex) <= 0;
            };

            $scope.planIndex = $stateParams.planIndex;

            $scope.$on('$ionicView.afterEnter', function () {
                if ($rootScope.plansPassed == null) {
                    $rootScope.plansPassed = -1;
                } else {
                    $rootScope.plansPassed--;
                }
                $rootScope.$ionicGoBack = function () {
                    $ionicHistory.goBack($rootScope.plansPassed);
                    $rootScope.plansPassed = null;
                };
            });

            $scope.$on('$ionicView.beforeLeave', function () {
                $rootScope.$ionicGoBack = function () {
                    $ionicHistory.goBack(-1);
                };
            });

            var doCustomBack = function () {
                $ionicHistory.goBack($rootScope.plansPassed);
                $rootScope.plansPassed = null;
            };
            // registerBackButtonAction() returns a function which can be used to deregister it
            var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
                doCustomBack, 101
            );
            $scope.$on('$destroy', function () {
                deregisterHardBack();
            });

            if ($rootScope.plansList[$scope.planIndex].options == null) {
                $rootScope.plansList[$scope.planIndex].options = [
                    {
                        name: 'option 1',
                        speedDnld: 100,
                        speedUpld: 40,
                        data: 0,
                        price: 33.45,
                        rating: 98,
                        contract: '',
                        priceConnection: 102,
                        priceTermination: 0,
                        features: [
                            'Free modem',
                            'Land line'
                        ]
                    },
                    {
                        name: 'option 2',
                        speedDnld: 150,
                        speedUpld: 50,
                        data: 1120,
                        price: 45.45,
                        rating: 80,
                        contract: '12 months',
                        priceConnection: 50,
                        priceTermination: 25,
                        features: [
                            'Free modem',
                            'Feature1',
                            'Feature2',
                            'Feature3',
                            'Feature4',
                            'Feature5',
                            'Feature6',
                            'Feature7',
                            'Feature8',
                            'Feature9',
                            'Land line'
                        ]
                    }
                ];
            }
        }])