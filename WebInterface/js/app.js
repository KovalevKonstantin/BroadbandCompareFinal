// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services'])

    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.previousTitleText(false);
    })

    .run(function ($ionicPlatform, $rootScope) {
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

        ///////////////////
        //DEMO DATA
        //////////////////
        $rootScope.plansFilter = {
            advancedMode: false,
            address: '',
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
            provider: null,
            speedDnldMin: 1,
            speedDnldMax: 100,
            dataMin: 1,
            dataMax: 0,
            contractOptions: [0, 1, 3, 6, 12, 24, 36]
        };

        $rootScope.providersList = [
            {
                id: 1,
                name: 'Spark',
                plansCount: 10,
                image: 'https://www.broadbandcompare.co.nz/uploads/30_med_spark140x140.png',
                addInfo: null
            },
            {
                id: 2,
                name: 'Vodafone',
                plansCount: 13,
                image: 'https://www.broadbandcompare.co.nz/uploads/38_med_vodafone140x140.png',
                addInfo: null
            },
            {
                id: 3,
                name: 'MyRepublic',
                plansCount: 8,
                image: 'https://www.broadbandcompare.co.nz/uploads/19_med_myrepublic140x140.png',
                addInfo: null
            },
            {
                id: 4,
                name: 'Flip',
                plansCount: 14,
                image: 'https://www.broadbandcompare.co.nz/uploads/45_med_flip-med.jpg',
                addInfo: null
            },
        ];

        for (i = 0; i < 200; i++) {
            $rootScope.providersList.push({
                id: i + 5,
                name: 'Flip',
                plansCount: 14,
                image: 'https://www.broadbandcompare.co.nz/uploads/45_med_flip-med.jpg',
                description: null
            });
        }

        $rootScope.providersList.forEach(function (item, index) {
            item.index = index;
        });

        $rootScope.plansList = null;

        $rootScope.plansPassed = null;

    })
