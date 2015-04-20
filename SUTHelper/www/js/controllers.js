angular.module('SUTHelper.controllers',[])

.controller('AppController',['$scope','Parse',function($scope, Parse){
	//-
}])



.controller('ArticleListController',['$scope','Parse', 'vk',function($scope, Parse, vk){
    // Parse.getAllNews().success(function(data){
    //     $scope.items=data.results;
    // });
    $scope.items = {}
    
    vk.getNews().success(function(data){
        for (d in data.response) {
           if (typeof(data.response[d]) == "number") {
           } else {
            item = {}
            item.title = data.response[d].text.split('<br>')[0]
            item.description = data.response[d].text.substring(0, 200)
            item.like = data.response[d].likes.count
            if (data.response[d].attachment)
                item.thumbnail = data.response[d].attachment.photo.src_big
            item.objectId = data.response[d].id
            $scope.items[d] = item
           }
       }

     })
}])
.controller('ArticleReadController',['$scope','vk','$state','$stateParams',function($scope, vk,$state,$stateParams){
   
    vk.getNews().success(function(data){
        for (d in data.response) {
           if (typeof(data.response[d]) == "number") {
           } else if (data.response[d].id == $stateParams.id) {
            $scope.article = {}
            $scope.article.title = data.response[d].text.split('<br>')[0]
            $scope.article.content = data.response[d].text
            $scope.article.updatedAt = data.response[d].text.split('<br>')[1]
            $scope.article.thumbnail = data.response[d].attachment.photo.src_big
           }
       }

     })
}])


.controller('ADMController',['$scope','Parse','$state','$stateParams',function($scope, Parse,$state,$stateParams){
    Parse.getCategories().success(function(data){
    $scope.categories=data.results;
    })

}])

.controller('ADMListController',['$scope','Parse','$state','$stateParams',function($scope, Parse,$state,$stateParams){
    $scope.items = []
    //$scope.category = "loading ...";
    Parse.getCategories().success(function(data){
        for (object in data.results) {
            if (data.results[object].objectId == $stateParams.id) {
                $scope.category = data.results[object].name
            }
        }
    });
    Parse.getAllInformation().success(function(data){
    	for (object in data.results) {
    		if (data.results[object].categoriesId == $stateParams.id) {
    			$scope.items.push(data.results[object])
    		}
    	}
    })

}])
.controller('ADMInformationController',['$scope','Parse' ,'$state','$stateParams',function($scope, Parse,$state,$stateParams){
    
    Parse.getAllInformation().success(function(data){
        $scope.item = data.results
        for (object in data.results) {
            if (data.results[object].objectId == $stateParams.informationId) {
                $scope.item=data.results[object]
            }
        }
    });

}])
.controller('qrchoiceController',['$scope', 'Parse','QRScanService', '$state' ,function($scope, Parse ,QRScanService, $state){
    $scope.qrcode = "Please Scan a room QRcode";
    $scope.room = {}
    $scope.scan = function() {
        QRScanService.scan(function(result) {
            if (result.cancelled) {
                console.log("Cancelled: ------------------------------------")
            } else {
                console.log("success: ------------------------------------")
                console.log(result.text)
                $scope.qrcode = result.text
                if (result.text == "")
                    alert('This room does not exist in the database')
                $state.go('app.room',{id:result.text});
            }
        }, function(error) {
          console.log("error: ------------------------------------")
          console.log(error)
        });
    };

    $scope.goroom = function() {
        $state.go('app.room',
            {id:'X3aEj4B4kI'}
        );
    }

    $scope.search = function() {
        Parse.getAllRooms().success(function(data){
            for (object in data.results) {
                if (data.results[object].number == $scope.room.number) {
                    $state.go('app.room',{id:data.results[object].objectId});
                }
            }
        })
    }
}])

.controller('roomController',['$scope', 'Parse', '$state', '$stateParams',function($scope, Parse, $state, $stateParams){
    $scope.test = $stateParams.id
    Parse.getRoom($stateParams.id).success(function(data){
        $scope.room = data
    })
}])


.controller('contactsController',['$scope','Parse',function($scope, Parse){
    Parse.getContacts().success(function(data){
        $scope.contacts=data.results;
        for (var i=0; i<$scope.contacts.length; i++) {
            if ($scope.contacts[i].photo == "")
                $scope.contacts[i].photo = "./img/John_Doe.jpg"
        }
    });
}])






    .controller('ScheduleListCtrl', function($scope, Parse) {
    Parse.getCalendar().success(function (data) {
        $scope.scheduleList = data.results
        console.log($scope.scheduleList)
    })
})

    .controller('ScheduleCtrl', function($scope, $stateParams, Parse) {
        Parse.getCalendar().success(function (data) {
            $scope.scheduleList = data.results
            console.log($scope.scheduleList)
            
            for (object in data.results) {
            if (data.results[object].objectId == $stateParams.id) {
                $scope.schedule=data.results[object]
            }
        }
        })
        /*var cssLink = document.createElement("link");
        cssLink.href = "css/calstyle.css";  cssLink .rel = "stylesheet";  
        cssLink .type = "text/css";  
        frames['frame1'].document.body.appendChild(cssLink);*/ 
})

    .controller('EventCtrl', function($scope, $stateParams) {
})
    .controller('ContactCtrl', function($scope, $stateParams) {
})
;
