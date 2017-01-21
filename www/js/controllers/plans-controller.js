//for Options (family plans) page
appControllers.controller('plansCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$ionicHistory',
    '$ionicPlatform', '$http', '$ionicModal', 'config', '$ionicPopup', 'plansFilterProvider', 'plansListProvider',
    function ($scope, $stateParams, $rootScope, $state, $ionicHistory, $ionicPlatform, $http, $ionicModal,
              config, $ionicPopup, plansFilterProvider, plansListProvider) {

        //use this to control directive
        $scope.addressSelectorControl = {};

        //go to next plan in the list
        $scope.nextPlan = function () {
            var nextIndex = parseInt($scope.planIndex) + 1;
            $state.go('.', {planIndex: nextIndex}, {notify: true});
        };

        //go to previous plan in the list
        $scope.prevPlan = function () {
            var prevIndex = parseInt($scope.planIndex) - 1;
            $state.go('.', {planIndex: prevIndex}, {notify: true});
        };

        //check button disabled (end of list)
        $scope.nextPlanDisabled = function () {
            if (!$scope.plansList) return true;
            return parseInt($scope.planIndex) >= ($scope.plansList.length - 1)
        };

        //check button disabled (start of list)
        $scope.prevPlanDisabled = function () {
            if (!$scope.plansList) return true;
            return parseInt($scope.planIndex) <= 0;
        };

        //reset address field,  reset plans list (to be reloaded later)
        $scope.resetAddress = function () {
            $scope.address.value = '';
            plansFilterProvider.setAddress('');
            $scope.addressSet = false;
            $scope.predictions = null;
            plansListProvider.resetPlansList();
        };

        //apply address to global filter and reset plans list (to be reloaded later)
        $scope.applyAddress = function () {
            plansFilterProvider.setAddress($scope.address.value);
            plansListProvider.resetPlansList();
            $scope.addressSet = true;
            $scope.predictions = null;
        };

        //show modal page with special offer description
        $scope.showSpecials = function () {
            $scope.showCashbackFull = false;
            $scope.specialsModal.show();
        };

        // hide modal page with special offer description
        $scope.closeSpecials = function () {
            $scope.specialsModal.hide();
        };

        //show modal page with sing up form
        $scope.showSignUpPage = function (index) {
            //convenient vars
            var plan = $scope.plansList[$scope.planIndex];
            var option = plan.options[index];
            $scope.currentOption = option;
            //set variables for modal window
            $scope.purchaseAgree = {value: true};
            $scope.purchaseName = {value: ''};
            $scope.purchaseEmail = {value: ''};
            $scope.purchaseAddress = {value: ''};
            $scope.purchasePhone = {value: ''};
            //find purchase link for cookie
            var link = (option.purchaseLink != null) ?
                option.purchaseLink : option.ispPurchaseLink;
            $scope.purchaseLink = ((link !== '') && (link != null)) ?
                link : '#';
            $scope.ispHasContract = ($scope.purchaseLink === '#') ? 0 : 1;
            //show modal
            $scope.signUpModal.show();

            //reset trackCookies so if we don't get them for this purchase click we don't
            // bind customer data to them afterwards
            $scope.trackCookies = null;
            //if isp has tracking link fire it
            var trackUrl = option.trackingLink;
            if ((trackUrl != undefined) && (trackUrl != null) && (trackUrl != '')) {
                trackUrl = fillPurchaseLinkParams(trackUrl, option, plan, config);

                //fire and get cookie
                $http.post(config.siteAddress + '/api/post-click', {link: trackUrl})
                    .success(function (cookies) {
                        //save cookie
                        $scope.trackCookies = cookies;
                    })
                    .error(function (err) {
                        //do nothing
                    });
            }
        };

        //proceed button press
        $scope.signUp = function (signupForm) {
            //check that form is valid
            if (signupForm.$valid && $scope.checkPhoneNumber($scope.purchasePhone.value) && $scope.purchaseAgree.value) {
                //save lead, bind it to transaction number from cookie
                var saveLink = config.siteAddress + '/api/save-lead';
                var params = {};
                params[config.leadParamPrefix + '[name]'] = $scope.purchaseName.value;
                params[config.leadParamPrefix + '[email]'] = $scope.purchaseEmail.value;
                params[config.leadParamPrefix + '[address]'] = $scope.purchaseAddress.value;
                params[config.leadParamPrefix + '[phone]'] = '' + $scope.purchasePhone.value;
                params[config.leadParamPrefix + '[is_agree]'] = $scope.purchaseAgree.value ? 1 : 0;
                params[config.leadParamPrefix + '[tariff_id]'] = $scope.currentOption.id;
                params[config.leadParamPrefix + '[isp_has_contract]'] = $scope.ispHasContract;
                params['isFormSubmit'] = 1;
                $http.post(saveLink, params)
                    .success(function (data) {params
                        //if got tracking link to bind customer data to click AND cookies with click ID
                        //send tracking request via API
                        if (($scope.trackCookies != null) && (data.pixel != null)) {
                            $http.post(config.siteAddress + '/api/post-customer-tracking', {
                                link: data.pixel,
                                cookies: JSON.stringify($scope.trackCookies)
                            })
                                .success(function (data) {
                                    //do nothing
                                })
                                .error(function (err) {
                                    //do nothing
                                });
                        }

                        //if purchase link is not empty then open it in phone's browser
                        //so customer can finish the registration
                        if ($scope.purchaseLink !== '#') {
                            $scope.purchaseLink = fillPurchaseLinkParams($scope.purchaseLink, $scope.currentOption,
                                $scope.plansList[$scope.planIndex], config, $scope.trackCookies.afclick);
                            $ionicPopup.alert(config.cnfMsg.signUpPartner)
                                .then(function () {
                                    window.open($scope.purchaseLink, '_system', 'location=yes');
                                });
                        }
                        //else just show confirmation
                        else {
                            $ionicPopup.alert(config.cnfMsg.signUpNonPartner);
                        }

                        // close page
                        $scope.closeSignUpPage();
                    })
                    .error(function (err) {
                        $ionicPopup.alert(config.errMsg.saveLead);
                    });
            }
        };

        // hide modal page with sing up form
        $scope.closeSignUpPage = function () {
            $scope.signupForm.value.$setPristine();
            $scope.signupForm.value.$setUntouched();
            $scope.signUpModal.hide();
        };

        //custom check function for phone number on sign up form (only digits)
        $scope.checkPhoneNumber = function (number) {
            return /^(0|64)([34679]\d{7}|2\d{7,9})$/.test(number);
        };

        //check if have to show text block on sign up form
        $scope.showTextBlock = function (header, partner, nameCompare, partnerName) {
            if ($scope.currentOption != null) {
                var purchaseLink = ($scope.currentOption.purchaseLink != null) ? $scope.currentOption.purchaseLink : $scope.currentOption.ispPurchaseLink;
                var hasLink = ((purchaseLink !== '') && (purchaseLink !== '#') && (purchaseLink != null));
                if (header) {
                    return (hasLink && partner) || (!hasLink && !partner);
                } else {
                    if ($scope.plansList[$scope.planIndex].provider.name === 'Compass') {
                        if (nameCompare && partnerName === $scope.plansList[$scope.planIndex].provider.name) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return ((hasLink && partner) || (!hasLink && !partner)) && (!nameCompare);
                    }
                }
            } else {
                return false;
            }
        };

        //go to terms and conditions page
        $scope.goToTermsAndConditions = function () {
            window.open(config.siteAddress + '/p/privacy-policy', '_system', 'location=yes');
        };

        // show/hide full cashback conditions
        $scope.setShowCashbackFull = function (value) {
            $scope.showCashbackFull = value;
        };

        //when actually show view
        $scope.$on('$ionicView.beforeEnter', function () {
            //read address from global filter
            $scope.address = {
                value: plansFilterProvider.getAddress()
            };
            if ($scope.addressSelectorControl.resetPredictions) {
                $scope.addressSelectorControl.resetPredictions();
            }
            $scope.addressSet = ($scope.address.value !== '');
        });

        //when actually show view
        $scope.$on('$ionicView.afterEnter', function () {
            //count number of viewed plans (after entering this page)
            //used to alter Back Button
            if ($rootScope.plansPassed == null) {
                $rootScope.plansPassed = -1;
            } else {
                $rootScope.plansPassed--;
            }
            //alter Back Button action to go back to initial page of the tab
            $rootScope.$ionicGoBack = function () {
                $ionicHistory.goBack($rootScope.plansPassed);
                //reset viewed plans count
                $rootScope.plansPassed = null;
            };
        });

        //when leave view
        $scope.$on('$ionicView.beforeLeave', function () {
            //reset Back Button action to default
            $rootScope.$ionicGoBack = function () {
                $ionicHistory.goBack(-1);
            };
        });

        // registerBackButtonAction() returns a function which can be used to deregister it
        var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
            $rootScope.$ionicGoBack, 101
        );
        $scope.$on('$destroy', function () {
            deregisterHardBack();
        });

        //read plan index in global list
        $scope.planIndex = $stateParams.planIndex;

        //get plans list
        plansListProvider.getPlansList()
            .success(function (plansList) {
                $scope.plansList = plansList;

                //load plans options from website (if not cached)
                if ($scope.plansList[$scope.planIndex].options == null) {

                    //create request string out of filter parameters

                    //main route
                    var requestStr = config.siteAddress + '/api/options?';
                    //add parameters
                    requestStr = addMainParamsToRequestStr(requestStr, plansFilterProvider.getPlansFilter(),
                        plansFilterProvider.getDefaultPlansFilter(), config, plansFilterProvider.getTypeToParameters());
                    requestStr = addOptionsParamsToRequestStr(requestStr, $scope.plansList, $scope.planIndex);
                    //transform
                    requestStr = encodeURI(requestStr);

                    //get data from website
                    $http.get(requestStr)
                        .success(function (optionsList) {
                            //sort options list as it can come unsorted from the website
                            globalComparatorForPlansOptions.orderBy = plansFilterProvider.getOrderBy();
                            globalComparatorForPlansOptions.sortings = plansFilterProvider.getSortings();
                            optionsList.sort(globalComparatorForPlansOptions);
                            //set indexes just in case
                            optionsList.forEach(function (option, optionIndex) {
                                option.index = optionIndex;
                            });
                            //
                            $scope.plansList[$scope.planIndex].options = optionsList;
                            plansListProvider.setPlanOptions($scope.planIndex, optionsList);
                        })
                        .error(function () {
                            $ionicPopup.alert(config.errMsg.loadOptions);
                        });
                }
            })
            .error(function (message) {
                $ionicPopup.alert(message);
            });

        //initialize modal page for special offer
        $ionicModal.fromTemplateUrl('templates/specialOffers.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.specialsModal = modal;
        });
        //initialize modal page for purchasing
        $ionicModal.fromTemplateUrl('templates/signUp.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.signUpModal = modal;
        });
        //object to store signup form
        $scope.signupForm = {};
    }]);