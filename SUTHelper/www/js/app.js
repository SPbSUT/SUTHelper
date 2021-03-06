// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SUT', ['ionic', 'SUT.controllers','SUT.vk','SUT.parse', 'SUT.QRScanService'])

.run(function($ionicPlatform,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    //$state.go('administrationInformation');
  });
}).config(function($stateProvider, $urlRouterProvider){
        $stateProvider
        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "views/menu.html",
          controller: "AppController"
        })
        .state('app.side-item', {
          views: {
            'sideView' : {
              templateUrl: "view/side-item.html"
            }
          }
        })
        .state('app.articles',{
          url:'/articles',
          views: {
              'menuContent': {
                  controller:'ArticleListController',
                  templateUrl:'views/articles.html'
              }
          }           
        })
        .state('app.readArticle',{
            url:'/read-article/:id',
            views: {
              'menuContent': {
                controller:'ArticleReadController',
                templateUrl:'views/read-article.html'
              }
            }
        })
        .state('app.administrationInformation',{
            url:'/administrationInformation',
            views: {
              'menuContent': {
                controller:'ADMController',
                templateUrl:'views/categories.html'
              }
            }
        })
        .state('app.administrationInformationList',{
            url:'/adm/:id',
            views: {
              'menuContent': {
                controller:'ADMListController',
                templateUrl:'views/informationList.html'
              }
            }
        })
        .state('app.administrationInformationRead',{
            url:'/adm/:id/:informationId',
            views: {
              'menuContent': {
                controller:'ADMInformationController',
                templateUrl:'views/information.html'
              }
            }
        })
        .state('app.qrchoice',{
            url:'/qrchoice',
            views: {
              'menuContent': {
                controller:'qrchoiceController',
                templateUrl:'views/qrchoice.html'
              }
            }
        })
        .state('app.room',{
            url:'/room/:id',
            views: {
              'menuContent': {
                controller:'roomController',
                templateUrl:'views/room.html',
                params: ['id']
              }
            }
        })
            .state('app.scheduleList', {
            url: "/scheduleList",
            views: {
                'menuContent': {
                    templateUrl: "views/scheduleList.html",
                    controller: 'ScheduleListCtrl'
                }
            }
        })
            .state('app.schedule', {
            url: "/scheduleList/:id",
            views: {
                'menuContent': {
                    templateUrl: "views/schedule.html",
                    controller: 'ScheduleCtrl'
                }
            }
        })
            .state('app.event', {
            url: "/event",
            views: {
                'menuContent': {
                    templateUrl: "views/event.html",
                    controller: 'EventCtrl'
                }
            }
        })
            .state('app.contact', {
            url: "/contact",
            views: {
                'menuContent': {
                    templateUrl: "views/contact.html",
                    controller: 'contactsController'
                }
            }
        })
        ;
        $urlRouterProvider.otherwise('/app/articles');

})
.directive('markdown', function() {
        var converter = new Showdown.converter();
        var link = function(scope, element, attrs, model) {
            var render = function(){            
                var htmlText = converter.makeHtml(model.$modelValue);
                element.html(htmlText);
            };
            scope.$watch(attrs['ngModel'], render);
            render();        
        };
        return {
            restrict: 'E',
            require: 'ngModel',
            link: link
        }
    })