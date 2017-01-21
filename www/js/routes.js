angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('loadSettings', {
                url: '/load-settings',
                templateUrl: 'templates/loadSettings.html'
            })

            .state('tabs', {
                url: '/tabs',
                templateUrl: 'templates/tabs.html',
                abstract: true
            })

            .state('tabs.ispList', {
                url: '/isp-list',
                views: {
                    'tab-isp': {
                        templateUrl: 'templates/ispList.html',
                        controller: 'ispListCtrl'
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

        $urlRouterProvider.otherwise('/load-settings')
    });