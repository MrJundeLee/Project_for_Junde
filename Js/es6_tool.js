var tool = ( ( w , u ) => {

	class base{
	
		is_string( str ){
			
			return 'string' == typeof str;
		
		}
		
		is_number( num ){
		
			return 'number' == typeof num && !isNaN( num );
		
		}
		
		is_function( callback ){
		
			return 'function' == typeof callback;
		
		}
		
		is_object( obj ){
		
			return null != obj && 'object' == typeof obj;
		
		}
		
		is_dom( dom ){
		
			return dom instanceof HTMLElement;
		
		}
		
		is_regExp( reg ){
		
			return '[object RegExp]' == Object.prototype.toString.call( reg );
		
		}
		
		is_array( arr ){
		
			return '[object Array]' == Object.prototype.toString.call( arr );
		
		}
		
		is_boolean( bl ){
		
			return '[object Boolean]' == Object.prototype.toString.call( bl );
		
		}
		
		is_date( date ){
		
			return 'Invalid Date' != date && '[object Date]' == Object.prototype.toString.call( date );
		
		}
		
		is_type( target , type ){
		
			return type == Object.prototype.toString.call( target );
		
		}
	
	}
	
	class common extends base {
	
		default_object( obj ){
		
			return super.is_object( obj ) ?
			
				obj : {};
		
		}
		
		default_function( callback ){
		
			return super.is_function( callback ) ?
			
				callback : function(){
				
				
				};
		
		}
	
		in_case( ...arg ){
		
			var check_func = callback => super.is_function( callback ) ? 
			
				callback() : callback;
		
			var [ bl , arg1 , arg2 ] = arg;
			
			return bl ?
			
				check_func( arg1 ) :
				
				check_func( arg2 );
		
		}
		
		each( ...arg ){
		
			var [ obj , callback , bl , re ] = arg;
			
			if( !super.is_object( obj ) || !super.is_function( callback ) )

				return false;
		
			var length = obj.length,
				i = -1,
				re_callback = ( () =>  
				
					re ?
					
					(
					
						i = length,
					
						() => -- i >= 0
					
					) :
					
					() => ++ i < length
					
				)(),
				bl_callback = ( () => 
				
					bl ?
					
					() => obj.hasOwnProperty( i ) :
					
					() => true
				
				)();
			
			if( super.is_number( length ) )

				for( ; re_callback() ; ){
				
					if( false === callback.call( obj[ i ] , i , obj[ i ] , obj ) )

						break;
				
				}
			
			else
			
				for( i in obj ){
				
					if( bl_callback() ){

						if( false === callback.call( obj[ i ] , i , obj[ i ] , obj ) )
						
							break;
						
					}
				
				}
				
		}
		
		mt_rand( start_num , end_num ){
		
			var get_default_num = ( num , default_num ) => this.in_case(
			
				this.is_number( num ),
				
				num,
				
				default_num
			
			);
		
			var [ _start_num , _end_num ] = [
			
				get_default_num( start_num , 0 ),
				
				get_default_num( end_num , u )
			
			],
			length = this.in_case(
			
				_end_num === u,
				
				1,
				
				_end_num - _start_num
			
			);
		
			return Math.random() * length + _start_num;
		
		}
		
		int_rand( start_num , end_num ){
		
			return Math.round( this.mt_rand( start_num , end_num ) );
		
		}
		
		assign( ...arg ){
		
			var result = {},
				bl = true;
				
			this.in_case(
			
				!arg[ arg.length - 1 ],
				
				() => {
					
					arg.pop();
				
					let target = arg[ arg.length - 1 ];
				
					result = this.in_case(
					
						super.is_object( target ) && !super.is_array( target ),
						
						target ,
						
						{}
					
					);
				
				}
			
			);
			
			return this.each( arg , ( key , data ) => {
			
				this.each( data , ( in_key , value ) => result[ in_key ] = value , bl );
			
			} ),
			
				result;
		
		}
		
		assign_array( ...arg ){
		
			var result = [],
				bl = true;
				
			this.in_case(
			
				!arg[ arg.length - 1 ],
				
				() => {
					
					arg.pop();
				
					let target = arg[ arg.length - 1 ];
				
					result = this.in_case(
					
						super.is_array( target ),
						
						target ,
						
						[]
					
					);
				
				}
			
			);
			
			return this.each( arg , ( key , data ) => {
			
				this.each( data , ( in_key , value ) => result.push( value ) , bl );
			
			} ),
			
				result;
		
		}
		
		reverse( arr ){
		
			var result = {};
			
			return this.each( arr , ( key , value ) => this.in_case(
			
						!super.is_object( value ),

						() => result[ value ] = key,
						
						() => result[ JSON.stringify( value ) ] = key
					
					) , true
				
				),
				
				result;
		
		}
		
		to_object( obj ){
		
			return this.assign( obj );
		
		}
		
		to_array( arr ){
		
			return this.assign_array( arr );
		
		}
	
	}
	
	class senjor extends common{
	
		create_constructor( attr , proto_attr ){
		
			var [ _attr , _proto_attr ] = [ this.default_object( attr ) , this.default_object( proto_attr ) ];
			
			return super.assign( attr , {
			
				__proto__ : _proto_attr
			
			} , false );
		
		}
		
		handle_try( ...arg ){
		
			var [ _catch , _try , _complete ] = arg;
		
			try{
			
				_try()
			
			}catch( error ){
			
				super.default_function( _catch )();
			
			}
			
			super.default_function( _complete )();
		
		}
		
		recursive( ...arg ){
		
			var [ callback , ...arg_list ] = arg,
			
				re_callback = function(){
				
					let result = callback( ...arg_list );
				
					if( false === result )
					
						return re_callback();
						
					return result;
				
				};
		
			if( super.is_function( callback ) )
			
				re_callback();
		
		}
		
		deep_copy( ...arg ){
		
			var [ obj , bl ] = arg;
		
			var result = super.in_case(
			
				super.is_array( obj ),
				
				[],
				
				{}
			
			);
			
			return super.each( obj , ( key , value ) => result[ key ] = super.in_case(
			
					super.is_object( value ),
					
					() => this.deep_copy( value , bl ),
					
					value
					
				) , bl ),
				
				result;
		
		}
	
	}

	return new senjor();
	
} )( window , void( 0 ) );