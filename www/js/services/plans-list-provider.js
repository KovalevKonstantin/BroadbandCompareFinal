//provides lists of data used over all the app, should be initialized when the app starts
appServices.service('plansListProvider', ['$http', 'config', 'plansFilterProvider', 'basicServerDataProvider',
    function ($http, config, plansFilterProvider, basicServerDataProvider) {
        //list itself
        var plansList = null;

        //get filtered plans (families) from webserver
        function initPlansList(callbackObj) {

            //create request string out of filter parameters

            //main route
            var requestStr = config.siteAddress + '/api/plans?';
            //add parameters
            requestStr = addMainParamsToRequestStr(requestStr, plansFilterProvider.getPlansFilter(),
                plansFilterProvider.getDefaultPlansFilter(), config, plansFilterProvider.getTypeToParameters());
            //transform
            requestStr = encodeURI(requestStr);

            //get data from website
            $http.get(requestStr)
                .success(function (list) {
                    list.forEach(function (plan, planIndex) {
                        plan.options = null;
                        plan.index = planIndex;
                        //convert strings to number
                        plan.pureRate = parseInt(plan.pureRate);
                        plan.rating = parseInt(plan.rating);
                        plan.reverseRating = 100 - parseInt(plan.rating);
                        plan.price = parseFloat(plan.price);
                        //find provider for each plan (family)
                        var providers = basicServerDataProvider.getProvidersList();
                        for (i = 0; i < providers.length; i++) {
                            var provider = providers[i];
                            if (plan.providerId === provider.id) {
                                plan.provider = provider;
                                break;
                            }
                        }
                    });
                    plansList = list;
                    callbackObj.initCallback(_.cloneDeep(plansList));
                })
                .error(function (err) {
                    callbackObj.errCallback(config.errMsg.loadPlans, err);
                });
        }

        //get cached plans (families)
        function getCachedPlansList(callbackObj) {
            function getList(callbackObj) {
                callbackObj.initCallback(_.cloneDeep(plansList));
            }

            setTimeout(getList, 100, callbackObj);
        }

        //START getters
        this.getPlansList = function () {
            var callbackObj = {
                //callback on finishing initialization
                initCallback: function () {
                },
                //callback on $http error
                errCallback: function () {
                },
                //to set init callback
                success: function (func) {
                    this.initCallback = func;
                    return this;
                },
                //to set error callback
                error: function (func) {
                    this.errCallback = func;
                    return this;
                }
            };

            if (plansList == null) {
                initPlansList(callbackObj);
            } else {
                getCachedPlansList(callbackObj);
            }

            return callbackObj;
        };
        //END getters

        //START setters
        this.setPlanOptions = function (index, optionsList) {
            plansList[index].options = _.cloneDeep(optionsList);
        };
        //END setters
        
        this.resetPlansList = function () {
            plansList = null;
        };

        //resort loaded plans according to new setting
        this.sortPlans = function () {
            if (!plansList) return;

            //sort plans (families)
            globalComparatorForPlansOptions.orderBy = plansFilterProvider.getOrderBy();
            globalComparatorForPlansOptions.sortings = plansFilterProvider.getSortings();
            plansList.sort(globalComparatorForPlansOptions);
            //reset indexes according to new order
            plansList.forEach(function (plan, planIndex) {
                plan.index = planIndex;
            });
            //sort loaded (cached) options
            plansList.forEach(function (plan) {
                if (plan.options != null) {
                    globalComparatorForPlansOptions.orderBy = plansFilterProvider.getOrderBy();
                    globalComparatorForPlansOptions.sortings = plansFilterProvider.getSortings();
                    plan.options.sort(globalComparatorForPlansOptions);
                    //reset indexes
                    plan.options.forEach(function (option, optionIndex) {
                        option.index = optionIndex;
                    });
                }
            });
        };
    }]);