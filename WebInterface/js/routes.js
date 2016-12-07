angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('tabs', {
                url: '/tabs',
                templateUrl: 'templates/tabs.html',
                abstract: true
            })

            .state('tabs.iSPList', {
                url: '/isp-list',
                views: {
                    'tab-isp': {
                        templateUrl: 'templates/iSPList.html',
                        controller: 'iSPListCtrl'
                    }
                }
            })

            .state('tabs.provider', {
                url: '/providers/:providerIndex',
                views: {
                    'tab-isp': {
                        templateUrl: 'templates/provider.html',
                        controller: 'providerCtrl'
                    }
                }
            })

            .state('tabs.compareBroadbands', {
                url: '/compare',
                views: {
                    'tab-compare': {
                        templateUrl: 'templates/compareBroadbands.html',
                        controller: 'compareBroadbandsCtrl'
                    }
                }
            })

            .state('tabs.filter', {
                url: '/filter',
                views: {
                    'tab-compare': {
                        templateUrl: 'templates/filter.html',
                        controller: 'filterCtrl'
                    }
                }
            })

            .state('tabs.plans', {
                url: '/plans/:planIndex',
                views: {
                    'tab-compare': {
                        templateUrl: 'templates/plans.html',
                        controller: 'plansCtrl'
                    }
                }
            })

            .state('tabs.info', {
                url: '/info',
                views: {
                    'tab-info': {
                        templateUrl: 'templates/info.html',
                        controller: 'infoCtrl'
                    }
                }
            })

            .state('tabs.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })


        $urlRouterProvider.otherwise('/tabs/home')


    });