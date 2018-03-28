var app = angular.module('index', ['ngAnimate']);

app.controller('index_banner', function($scope) {
	
	var ratio = 823 / 1920,
		header = '.page_header';
	
	$scope.set_height = function(){
	
		return 'height:' + ( $( window ).height() - $( header ).height() ) + 'px;'
	
	}
	
});

app.directive('autoHeight',function ($window) {
	
	var header = '.page_header',
		callback = function(){
			
			if( angular.element( $window ).width() <= 768 )
				
				return ele.css( 'height' , 'auto' );
			
			var height = angular.element( $window ).height() - angular.element( header ).height();
			
			ele.css('height', height + 'px');
			
		},
		ele;

	return {
		restrict : 'A',
		scope : {},
		link : function($scope, element, attrs) {
			
			ele = element;
			
			angular.element( $window ).bind( 'resize' , callback );
			
			callback();
			
		}
	};
});

app.directive('clickScroll',function ( $window ) {
	
	var header = '.page_header',
	
		banner_index = '.banner_index',
		
		change_opacity = function( type ){
			
			type ? 
			
				angular.element( header ).addClass( 'change' ).addClass( 'in' ) :
				
				angular.element( header ).removeClass( 'change' ).removeClass( 'in' );
			
			setTimeout(function(){
				
				type &&
			
				angular.element( header ).removeClass( 'in' )
				
			} , 500 )
			
		},
		
		callback = function( value ){
				
			if( status == 1 || angular.element( $window ).width() <= 768 )
					
				return;
				
			if( value )
				
				change_opacity();
				
			else
				
				change_opacity( true );
				
			status = 1;
		
			$('html,body').animate({
					
				scrollTop: value || get_scroll_top()
					
			}, 800 , function(){
				
				status = 0;
				
			} );
			
		},
		
		get_scroll_top = function(){
			
			return angular.element( banner_index ).height() + angular.element( header ).height();
			
		},
		
		status;

	return {
		
		restrict : 'A',
		
		scope : {},
		
		link : function($scope, element, attrs) {
			
			callback( '0' );
			
			element.bind( 'click' , function(){
				
				callback();
				
			} );
			
			angular.element( $window ).bind( 'mousewheel' , function( e ){
				
				if( angular.element( $window ).scrollTop() < get_scroll_top() ){
					
					if( e.originalEvent.wheelDelta < 0 )
					
						callback();
						
					else
						
						callback( '0' );
					
				}
				
			} );
			
		}
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