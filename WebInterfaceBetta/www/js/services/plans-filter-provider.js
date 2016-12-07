//provides global filter for plans and functions to interact with it 
appServices.service('plansFilterProvider', ['basicServerDataProvider', function (basicServerDataProvider) {
    //sorting options list
    var sortings = {
        rating: {title: 'Rating', value: 'rating'},
        price_asc: {title: 'Price Low to High', value: 'price_asc'},
        price_desc: {title: 'Price High to Low', value: 'price_desc'}
    };

    //default filter settings
    var defaultPlansFilterSettings = {
        advancedMode: false,
        address: '',
        speedMax: 4,
        priceMin: 25,
        priceMax: 200,
        extrasList: [],
        connectionOptions: [],
        providers: [],
        speedDnldMin: 0,
        speedDnldMax: 100,
        dataMin: 0,
        dataMax: 200,
        contractOptions: [],
        orderBy: sortings.rating
    };

    //global filter for the whole app
    var plansFilter = null;

    //START getters
    this.getAdvancedMode = function () {
        return plansFilter.advancedMode;
    };

    this.getAddress = function () {
        return plansFilter.address;
    };

    this.getSpeedMax = function () {
        return plansFilter.speedMax;
    };

    this.getPriceMin = function () {
        return plansFilter.priceMin;
    };

    this.getPriceMax = function () {
        return plansFilter.priceMax;
    };

    this.getExtrasList = function () {
        return _.cloneDeep(plansFilter.extrasList);
    };

    this.getConnectionOptions = function () {
        return _.cloneDeep(plansFilter.connectionOptions);
    };

    this.getProviders = function () {
        return _.cloneDeep(plansFilter.providers);
    };

    this.getSpeedDnldMin = function () {
        return plansFilter.speedDnldMin;
    };

    this.getSpeedDnldMax = function () {
        return plansFilter.speedDnldMax;
    };

    this.getDataMin = function () {
        return plansFilter.dataMin;
    };

    this.getDataMax = function () {
        return plansFilter.dataMax;
    };

    this.getContractOptions = function () {
        return _.cloneDeep(plansFilter.contractOptions);
    };

    this.getOrderBy = function () {
        return _.cloneDeep(plansFilter.orderBy);
    };

    this.getPlansFilter = function () {
        return _.cloneDeep(plansFilter);
    };

    this.getDefaultPlansFilter = function () {
        return _.cloneDeep(defaultPlansFilterSettings);
    };

    this.getSortings = function () {
        return _.cloneDeep(sortings);
    };
    //END getters

    //START setters
    this.setAdvancedMode = function (advancedMode) {
        plansFilter.advancedMode = advancedMode;
    };

    this.setAddress = function (address) {
        plansFilter.address = address;
    };

    this.setSpeedMax = function (speedMax) {
        plansFilter.speedMax = speedMax;
    };

    this.setPriceMin = function (priceMin) {
        plansFilter.priceMin = priceMin;
    };

    this.setPriceMax = function (priceMax) {
        plansFilter.priceMax = priceMax;
    };

    this.setExtrasList = function (list) {
        plansFilter.extrasList = list;
    };

    this.setConnectionOptions = function (list) {
        plansFilter.connectionOptions = list;
    };

    this.setProvider = function (provider) {
        plansFilter.providers = [];
        plansFilter.providers.push(provider);
    };

    this.setSpeedDnldMin = function (speedDnldMin) {
        plansFilter.speedDnldMin = speedDnldMin;
    };

    this.setSpeedDnldMax = function (speedDnldMax) {
        plansFilter.speedDnldMax = speedDnldMax;
    };

    this.setDataMin = function (dataMin) {
        plansFilter.dataMin = dataMin;
    };

    this.setDataMax = function (dataMax) {
        plansFilter.dataMax = dataMax;
    };

    this.setContractOptions = function (list) {
        plansFilter.contractOptions = list;
    };

    this.setOrderBy = function (orderBy) {
        plansFilter.orderBy = orderBy;
    };
    //END setters

    //change only 'checked' prop
    this.markChosenExtras = function (list) {
        list.forEach(function (item, index) {
            plansFilter.extrasList[index].checked = item.checked;
        });
    };
    this.markChosenConnectionOptions = function (list) {
        list.forEach(function (item, index) {
            plansFilter.connectionOptions[index].checked = item.checked;
        });
    };
    this.markChosenContractOptions = function (list) {
        list.forEach(function (item, index) {
            plansFilter.contractOptions[index].checked = item.checked;
        });
    };

    //reset global filter to default state, also used to initialize filter
    this.resetFilter = function () {
        plansFilter = {
            advancedMode: defaultPlansFilterSettings.advancedMode,
            address: defaultPlansFilterSettings.address,
            speedMax: defaultPlansFilterSettings.speedMax,
            priceMin: defaultPlansFilterSettings.priceMin,
            priceMax: defaultPlansFilterSettings.priceMax,
            extrasList: basicServerDataProvider.getExtrasList(),
            connectionOptions: basicServerDataProvider.getConnectionOptions(),
            providers: [],
            speedDnldMin: defaultPlansFilterSettings.speedDnldMin,
            speedDnldMax: defaultPlansFilterSettings.speedDnldMax,
            dataMin: defaultPlansFilterSettings.dataMin,
            dataMax: defaultPlansFilterSettings.dataMax,
            contractOptions: basicServerDataProvider.getContractOptions(),
            orderBy: defaultPlansFilterSettings.orderBy
        };
        if (plansFilter.extrasList != null) {
            plansFilter.extrasList.forEach(function (item) {
                item.checked = false;
            });
        }
        if (plansFilter.connectionOptions != null) {
            plansFilter.connectionOptions.forEach(function (item) {
                item.checked = false;
            });
        }
        if (plansFilter.extrasList != null) {
            plansFilter.extrasList.forEach(function (item) {
                item.checked = false;
            });
        }
    };

    //initialize global filter
    this.resetFilter();
}]);