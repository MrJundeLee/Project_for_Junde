var app = angular.module('index', ['ngAnimate']);

app.controller('get_more', ['$scope','$http',function($scope,$http) {
	
	$scope.data = [];
	
	$scope.new_evaluate_data = [];
	
	var index = 0;
	
	var callback = $scope.get_more = function(){
	
		$http({
			
			method: "POST",
		   
			url: $scope.ajax_url.get_more,
			
			data:{
				
				index : index || 0
				
			}
			
		}).success(function( res ){
			
			if( res && angular.isObject( res ) ){
				
				if( res.status == 1 )
				
				angular.forEach( res.data , function( value , key ){
					
					$scope.data.push( value );
					
				} );
				
				else if( res.status == 2 )
					
				$scope.status = true;
				
			}
			
		});
		
	}, init_news_evaluate_data = function(){
		
		$http({
			
			method: "POST",
		   
			url: $scope.ajax_url.init_new_evaluate,
			
			data:{}
			
		}).success(function( res ){
			
			if( res && angular.isObject( res ) ){
				
				if( res.status == 1 )
				
				angular.forEach( res.data , function( value , key ){
					
					$scope.new_evaluate_data.push( value );
					
				} );
				
			}
			
		});
		
	};
	
	$scope.thumbs_up = function( index , key , type ){
				
		var data = type ? 
		
			$scope.new_evaluate_data :
			
			$scope.data;
		
		if( index !== undefined )
	
			$http({
				
				method: "POST",
			   
				url: $scope.ajax_url.thump_up,
				
				data:{
					
					index : index
					
				}
				
			}).success(function( res ){
					
				if( res && angular.isObject( res ) && res.status == 1 )
				
					data[ key ].thumbs_type = false,
				
					data[ key ].thumbs_number ++;
				
			});
	
	};
	
	callback( index ++ );
	
	init_news_evaluate_data();
	
}]);

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

$(function(){
		
	document.body.style.height = 'auto';
	
	document.body.style.overflow = 'initial';
	
	$( 'html' ).css( 'overflow' , 'initial' )
	
});