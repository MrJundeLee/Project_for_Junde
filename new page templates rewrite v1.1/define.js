var define = function( w , u ){
	//todo:define global variable
	var data = {
		keys : [],
		values : []
	},callback = function( name  , content, include ){
		return handle_arguments( name , content , include );
	},
	//todo:tool function
	is_function = function( callback ){
		return 'function' == typeof callback;
	},
	is_object = function( obj ){
		return 'object' == typeof obj && null != obj;
	},
	is_number = function( num ){
		return !isNaN( parseInt( num ) );
	},
	each = function( target , callback , bn , re ){
		if( !is_function( callback ) || !is_object( target ) )
			return false;
		var length = target.length,
			i = -1,
			re_callback = function(){
				return ++ i < length;
			},
			bn_callback = new Function( 'return true' );
		if( bn )
			bn_callback = function(){
				return target.hasOwnProperty( i );
			};
		if( is_number( length ) ){
			if( re )
				i = length,
				re_callback = function(){
					return -- i >= 0;
				};
			for( ; re_callback() ;  ){
				if( false === callback.call( target[ i ] , i , target[ i ] , target ) )
					break;
			}
		} else 
			for( i in target ){
				if( !bn_callback() )
					continue;
				if( false === callback.call( target[ i ] , i , target[ i ] , target ) )
					break;
			}
	},
	assign = function(){
		var result = [];
		return each( arguments , function( key , value ){
			each( value , function( in_key , in_value ){
				result.push( in_value );
			} , true );
		} , true ),
		result;
	},
	//todo:define private function
	set = function( key , value ){
		var status = false;
		if( key !== u )
			return get( key ) !== u && delete_data( key ),
				data.keys.push( key ),
				data.values.push( value ),
				status = true;
		return status;
	},
	get = function( key ){
		var result;
		return forEach(function( in_key , in_value ){
			if( in_key === key )
				return result = in_value,
					false;
		}),
			result;
	},
	has = function( key ){
		var result;
		return forEach(function( in_key , in_value , index ){
			if( key === in_key )
				return result = 1,
					false;
		}),
			!!result;
	},
	forEach = function( callback ){
		if( !is_function( callback ) )
			return;
		return each( data.keys , function( key , value ){
			return callback( value , data.values[ key ] , key );
		} );
	},
	delete_data = function( key ){
		var status = true;
		return forEach( function( in_key , in_value , index ){
			if( key === in_key )
				return data.keys.splice( index , 1 ),
				data.values.splice( index , 1 ),
				status = false;
		} ),
		!status;
	},
	handle_arguments = function( name , content , include ){
		var _include = [],
			_content = content;
		if( name === u )
			return;
		if( is_object( include ) )
			_include = assign( include );
		else if( include )
			_include = [include];
		if( is_function( content ) )
			_content = handle_content( content , _include );
		return handle( name , _content );
	},
	handle_content = function( content , include ){
		var arr = [],
			result = [],
			target;
		return function(){
			return target = assign( arguments ),
				arr.length = content.length - include.length,
				each( arr  , function( key ){
					result[ key ] = target[ key ] !== u ?
						target[ key ] : u;
				} , true ),
				each( include , function( key , value ){
					result.push(get( value ));
				} , true ),
				content.apply( callback , result );
		}
	},
	handle = function( name , content ){
		return set( name , content ),
			callback;
	};
	return callback.get = get,
		callback[ 'delete' ] = delete_data,
		callback.forEach = forEach,
		callback.keys = data.keys,
		callback.values = data.values,
		callback.has = has , 
		callback;
}( window , void( 0 ) );