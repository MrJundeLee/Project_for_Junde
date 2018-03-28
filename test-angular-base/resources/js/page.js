var app = angular.module('test', []);

app.controller('test01', function($scope) {
    $scope.J= "John";
    $scope.D= "Doe";
	$scope.get_name = function(){
	
		return $scope.J + '  ' + $scope.D;
	
	}
});

app.directive("runoobDirective", function() {
    return {
        restrict : "AEC",
        template : "<h1>自定义指令!</h1>"
    };
});

app.filter('reverse', function() { //可以注入依赖
    return function(text) {
        return text.split("").reverse().join("");
    }
});

app.controller('ajax', function($scope, $http) {
	
	$http.get( "../templates/view/ajax_test.php" ).success(function (response) {
	  
	  $scope.names = response.sites;
	  
	});
  
});