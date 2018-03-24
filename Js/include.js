//include.js
var include = new function( w , u ){

	var include_list = {
		
		
		
	}, default_include_attr = {
	
		'__default__' : []
	
	}, 
		
	is_object = function( obj ){
	
		return typeof obj == 'object' && obj != null;
	
	}, is_function = function( callback ){
	
		return typeof callback == 'function';
	
	}, is_number = function( num ){
	
		return typeof num == 'number' && !isNaN( num );
	
	}, default_function = function( callback ){
	
		return is_function( callback ) ?

			callback : function(){};
	
	}, default_object = function( obj ){
	
		return is_object( obj )?

			obj : {};
	
	},each = function( obj , callback , bl , re ){
	
		if( !is_object( obj ) || !is_function( callback ) )

			return false;
	
		var length = obj.length,
			i = -1,
			re_callback = function(){
			
				if( re )

					return i = length,
					function(){
					
						return -- i >= 0;
					
					}

				return function(){
				
					return ++ i < length;
				
				}
			
			}(),
			bl_callback = function(){
			
				return bl ?

				function(){
				
					return obj.hasOwnProperty( i );
				
				} :

				function(){
				
					return true;
				
				}
			
			}();
		
		if( is_number( length ) )

			for( ; re_callback() ; ){
			
				if( false === callback( i , obj[ i ] , obj ) )

					break;
			
			}
		
		else
		
			for( i in obj ){
			
				if( bl_callback() ){

					if( false === callback( i , obj[ i ] , obj ) )
					
						break;
					
				}
			
			}
		
	}, 
		
	create_constructor = function( attr , con_attr ){
	
		var _attr = default_object( attr ),
		    _con_attr = default_object( con_attr ),
		    callback = function(){
		    
			    var self = this;

			    return each( _attr , function( key , value ){
			    
				    self[ key ] = value;
			    
			    } , true ),
				    
				    this;
		    
		    },
		    fn = callback.prototype = {};

		return each( _con_attr , function( key , value ){
		
			fn[ key ] = value;
		
		} , true ),

			new callback();
	
	}
	
	include_list = create_constructor( {} , default_include_attr );

	return function( _name , _import , _content , _type ){
	
		var self,fn,callback;

		return callback = new Function(),

		fn = callback.prototype = {
		
			constructor : callback,
			
			init : function(){
			
				self = this;

				

				return this;

			}
		
		},

		new callback().init();
	
	}

}( window , void( 0 ) )
