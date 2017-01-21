//provides lists of data used over all the app, should be initialized when the app starts
appServices.service('basicServerDataProvider', ['$http', 'config', function ($http, config) {
    //providers list
    var providersList = [];
    //extras list
    var extrasList = [];
    //contract options list
    var contractOptions = [];
    //connection options list
    var connectionOptions = [];

    //check if it's time to use callback and fire if yes
    function checkCallbackNeed(callbackObj) {
        if ((providersList.length) && (extrasList.length) &&
            (connectionOptions.length) && (contractOptions.length)) {
            callbackObj.initCallback();
        }
    }

    //get list of providers
    function loadProviders(callbackObj) {
        $http.get(config.siteAddress + '/api/providers/')
            .success(function (list) {
                list = list ? list : [];
                list.forEach(function (item, index) {
                    item.addInfo = null;
                    item.index = index;
                });
                providersList = list;
                //
                checkCallbackNeed(callbackObj);
            })
            .error(function (err) {
                providersList = [];
                callbackObj.errCallback(config.errMsg.loadProviders, err);
            });
    }

    //get list of extras (tariff options)
    function loadExtras(callbackObj) {
        $http.get(config.siteAddress + '/api/tariff-options/')
            .success(function (list) {
                list = list ? list : [];
                list.forEach(function (item) {
                    item.checked = false;
                });
                extrasList = list;
                //
                checkCallbackNeed(callbackObj);
            })
            .error(function (err) {
                extrasList = [];
                callbackObj.errCallback(config.errMsg.loadExtras, err);
            });
    }

    //get list of contract options
    function loadContractOptions(callbackObj) {
        $http.get(config.siteAddress + '/api/contract-options/')
            .success(function (list) {
                list = list ? list : [];
                list.forEach(function (item) {
                    item.checked = false;
                });
                contractOptions = list;
                //
                checkCallbackNeed(callbackObj);
            })
            .error(function (err) {
                contractOptions = [];
                callbackObj.errCallback(config.errMsg.loadContractOptions, err);
            });
    }

    //get list of connection options
    function loadConnectionOptions(callbackObj) {
        $http.get(config.siteAddress + '/api/connection-options/')
            .success(function (list) {
                list = list ? list : [];
                list.forEach(function (item) {
                    item.checked = false;
                });
                connectionOptions = list;
                //
                checkCallbackNeed(callbackObj);
            })
            .error(function (err) {
                connectionOptions = [];
                callbackObj.errCallback(config.errMsg.loadConnectionOptions, err);
            });
    }

    //START getters
    this.getProvidersList = function () {
        return _.cloneDeep(providersList);
    };

    this.getSingleProvider = function (index) {
        return _.cloneDeep(providersList[index]);
    };

    this.getExtrasList = function () {
        return _.cloneDeep(extrasList);
    };

    this.getContractOptions = function () {
        return _.cloneDeep(contractOptions);
    };

    this.getConnectionOptions = function () {
        return _.cloneDeep(connectionOptions);
    };
    //END getters

    //START setters
    this.setProviderAddInfo = function (index, addInfo) {
        providersList[index].addInfo = _.cloneDeep(addInfo);
    };
    //END setters

    //get data from server and fill lists, after filling all of them use callback
    this.initialize = function() {
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

        loadProviders(callbackObj);
        loadExtras(callbackObj);
        loadContractOptions(callbackObj);
        loadConnectionOptions(callbackObj);

        return callbackObj;
    }
}]);