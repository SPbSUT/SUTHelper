angular.module('SUTHelper.parse',[]).factory('Parse',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        getAllNews:function(){
            return $http.get('https://api.parse.com/1/classes/news',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getNews:function(id){
            return $http.get('https://api.parse.com/1/classes/news/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getCategories:function(){
            return $http.get('https://api.parse.com/1/classes/categories',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getAllInformation:function(){
            return $http.get('https://api.parse.com/1/classes/information',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getInformation:function(id){
            return $http.get('https://api.parse.com/1/classes/information/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getAllRooms:function(){
            return $http.get('https://api.parse.com/1/classes/items',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getRoom:function(id){
            return $http.get('https://api.parse.com/1/classes/items/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getContacts:function(){
            return $http.get('https://api.parse.com/1/classes/contact',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getCalendar:function(){
            return $http.get('https://api.parse.com/1/classes/calendar',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        }
    }
}]).value('PARSE_CREDENTIALS',{
    APP_ID: 'F6CX25piahP4vbfoeXsQDRDzdHNhOxyMH7Y1CQW9',
    REST_API_KEY:'TS0WZuxe3DfaLxOQVa9sm8NdzOJkhUGsW6v0Dexe'
});

angular.module('SUTHelper.QRScanService', []).factory('QRScanService', [function () {

  return {
    scan: function(success, fail) {
      cordova.plugins.barcodeScanner.scan(
        function (result) { success(result); },
        function (error) { fail(error); }
      );
    }
  };

}]);


angular.module('SUTHelper.vk',[]).factory('vk',['$http',function($http){
    return {
        getNews:function(){
            return $http.get('https://api.vk.com/method/wall.get?domain=bonch.news.english&filter=all&count=20&offset=0');
        }
    }
}]);
