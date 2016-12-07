//actions on app start
app.run(['$ionicPlatform', '$rootScope', '$http', '$state', 'config', '$ionicPopup', 'basicServerDataProvider',
    'plansFilterProvider',
    function ($ionicPlatform, $rootScope, $http, $state, config, $ionicPopup, basicServerDataProvider,
              plansFilterProvider) {
        //some tech stuff
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        //number of plans swiped on plans page (used to alter back button press action), NA on start
        $rootScope.plansPassed = null;

        basicServerDataProvider.initialize()
            .success(function () {
                plansFilterProvider.setExtrasList(basicServerDataProvider.getExtrasList());
                plansFilterProvider.setContractOptions(basicServerDataProvider.getContractOptions());
                plansFilterProvider.setConnectionOptions(basicServerDataProvider.getConnectionOptions());
                $state.go('tabs.home', null, {notify: true});
            })
            .error(function (message) {
                $ionicPopup.alert(message);
            });
    }]);