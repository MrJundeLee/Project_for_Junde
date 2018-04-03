define( 'tool' , function( w , u ){
	return new function(){
		var self = this;
		this.is_string = function( str ){
			return 'string' == typeof str;
		}
		this.is_number = function( num ){
			return 'number' == typeof num && !isNaN( num );
		}
		this.is_function = function( callback ){
			return 'function' == typeof callback;
		}
		this.is_object = function( obj ){
			return null != obj && 'object' == typeof obj;
		}
		this.is_dom = function( dom ){
			return dom instanceof HTMLElement;
		}
		this.is_regExp = function( reg ){
			return '[object RegExp]' == Object.prototype.toString.call( reg );
		}
		this.is_array = function( arr ){
			return '[object Array]' == Object.prototype.toString.call( arr );
		}
		this.is_boolean = function( bl ){
			return '[object Boolean]' == Object.prototype.toString.call( bl );
		}
		this.is_date = function( date ){
			return 'Invalid Date' != date && '[object Date]' == Object.prototype.toString.call( date );
		}
		this.is_type = function( target , type ){
			return type == Object.prototype.toString.call( target );
		}
		this.is_IE = function(){
			var userAgent = navigator.userAgent,
				isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1,
				isEdge = userAgent.indexOf("Edge") > -1 && !isIE,
				isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1,
				regexp = /MSIE (\d+\.\d+)/,
				result;
			if(isIE) 
				switch( parseFloat( ( result = userAgent.match( regexp ) ) ? result[ 1 ] : null ) ){
					case 7:
						return 7;
					case 8:
						return 8;
					case 9:
						return 9;
					case 10:
						return 10;
					default:
						return 6;
				}
			else if(isEdge) 
				return 'edge';
			else if(isIE11) 
				return 11; 
			else
				return false;
		}
		this.trim = function( str ){
			return ( is_string( str ) ? str : '' ).replace( /^\s+|\s+$/ , '' );
		}
		this.default_object = function( obj ){
			return this.is_object( obj ) ?
				obj : {};
		}
		this.default_function = function( callback ){
			return this.is_function( callback ) ?
				callback : function(){};
		}
		this.handle_try = function( fail , success , complete ){
			var _fail = this.default_function( fail ),
				_complete = this.default_function( complete ),
				_success = success;
			try{
				_success();
			}catch( error ){
				_fail( error );
			}
			return _complete();
		}
		this.in_case = function( bn , success , fail ){
			var check_func = function( callback ){
				return self.is_function( callback ) ?
					callback() : callback;
			}
			return bn ?
				check_func( success ) :
				check_func( fail );
		}
		this.each = function( target , callback , bn , re ){
			if( !this.is_function( callback ) || !this.is_object( target ) )
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
			if( this.is_number( parseInt( length ) ) ){
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
		}
		this.mt_rand = function( start_num , end_num ){
			var get_default_num = function( num , default_num ){
				return self.in_case(
					self.is_number( num ),
					num,
					default_num
				);
			},
			_start_num = get_default_num( start_num , 0 ),
			_end_num = get_default_num( end_num , u ),
			length = this.in_case(
				_end_num === u,
				1,
				_end_num - _start_num
			);
			return Math.random() * length + _start_num;
		}
		this.int_rand = function( start_num , end_num ){
			return Math.round( this.mt_rand( start_num , end_num ) );
		}
		this.assign = function(){
			var result = {},
				bl = true,
				re = false,
				check_last_index = function(){
					return arguments.length > 0 && !self.is_object(  target = arguments[ arguments.length - 1 ]  );
				},
				target;
			if( check_last_index() )
				arguments.length --,
				re = target;
			if( check_last_index() )
				arguments.length --,
				bl = target;
			return this.each( arguments , function( key , data ){
				self.each( data , function( in_key , value ){
					return result[ in_key ] = value;
				} , bl , re );
			} , true ),
				result;
		}
		this.assign_array = function(){
			var result = [],
				bl = true,
				re = false,
				check_last_index = function(){
					return arguments.length > 0 && !self.is_object(  target = arguments[ arguments.length - 1 ]  );
				},
				target;
			if( check_last_index() )
				arguments.length --,
				re = target;
			if( check_last_index() )
				arguments.length --,
				bl = target;
			return this.each( arguments , function( key , data ){
				self.each( data , function( in_key , value ){
					return result.push(  value );
				} , bl , re );
			} , true ),
				result;
		}
		this.reverse = function( arr ){
			var result = {};
			return this.each( arr , function( key , value ) {
				!self.is_object( value ) ?
					result[ value ] = key :
					result[ JSON.stringify( value ) ] = key;
			}),
			result;
		}
		this.to_object = function( obj ){
			return this.assign( obj );
		}
		this.to_array = function( arr ){
			return this.assign_array( arr );
		}
	}();
}( window , void( 0 ) ) )