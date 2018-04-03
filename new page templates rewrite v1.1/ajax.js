define( 'ajax' , function( w , u ){
	const default_config = {
		arg : {
			'url' : 1,
			'data' : 2,
			'param' : 3,
			'type' : 4,
			'success' : 5,
			'error' : 6,
			'complete' : 7
		},
		type_options : {
			'GET' : 1,
			'POST' : 2,
			'__default__' : 1
		},
		err_code : {
			'1001' : {
				status : 0,
				responseText : '你并没有引入 tool 文件。'
			}
		},
		regExp : {
			'string_split' : [ / \[(\d+)\] /g ]
		}
	},
	throw_error = function( txt ){
		throw new Error( txt );
	},
	console_warn = function( txt ){
		console.warn( txt );
	},
	console_log = function( txt ){
		console.log( txt );
	},
	is_FormData = function( data ){
		return "[object FormData]" == data.__proto__.toString();
	};
	return function( callback ){
		return callback;
	}(function( json , tool ){
		var callback,fn,self,
			handle_arguments = function( json ){
				var config = default_config.arg,
					result = {},
					target;
				return tool.each( config , function( key , value ){
					result[ key ] = handle( value , json[ key ] );
				} , true ),
				result;
			},
			handle = function( index , value ){
				switch( index ){
					case 1:
						return tool.is_string( value ) ?
							value : '';
					case 2:
					case 3:
						return tool.in_case( 
							tool.is_string( value ) || tool.is_object( value ) ,
							function(){
								return tool.in_case(
									tool.is_object( value ),
									function(){
										var result = [];
										if( is_FormData( value ) )
											return value;
										return tool.each( value , function( key , value ){
											result.push( key +'=' + string_object( value ) );
										} , true ),
											result.join( '&' );
									},
									value
								);
							},
							''
						 );
					case 4:
						return default_config.type_options[ ( tool.is_string( value ) ? value : '' ).toLocaleUpperCase() ] || default_config.type_options[ '__default__' ];
					case 5:
					case 6:
					case 7:
						return tool.default_function( value );
				}
			},
			err = function( code , arr ){
				var err_code = default_config[ 'err_code' ][ code ] || {},
					response_arr = typeof arr == 'object' && arr ?
						arr : [],
					response_txt =  get_string_special( err_code.responseText || '' , response_arr );
				switch( err_code.status - 0 || 0 ){
					case 0 :
						return throw_error( response_txt );
					case 1:
						return console_warn( response_txt );
					case 2:
						return console_log( response_txt );
				}
			},
			get_string_special = function( str , arr ){
				return ( str || '' ).replace( default_config[ 'regExp' ][ 'string_split' ][0] , function( str , target ){
					return arr[ target ] || '';
				} );
			},
			string_object = function( data ){
				return tool.is_object( data ) ?
					JSON.stringify( data ) : data;
			},
			check = function(){
				var result;
				if( !tool )
					return result = 1001;
				return result;
			},
			set_request = new function(){
				var set_request = function( success , error , complete ){
					var request = new XMLHttpRequest();
					request.onreadystatechange = function(){
						switch( request.readyState ){
							case 4:
								if( request.status == 200 || request.status == 304 )
									success.call( request , handle_response( request.responseText ) );
								else
									error.call( request , handle_response( request.responseText ) );
								complete.call(  request );
						}
					}
					request.onerror = function(){
						error.call(  request );
					};
					return request;
				},
				handle_response = function( res ){
					var response;
					return tool.handle_try(function(){
						response = res;
					} , function(){
						response = JSON.parse( res );
					}),
					response;
				},
				string_data = function( url , data ){
					var result = [];
					tool.each( data , function( key , value ){
						tool.is_string( value ) && value &&
							result.push( value );
					} );
					if( result.length )
						return url + '?' + result.join( '&' );
					return url;
				}
				this[1] = function( url , data , success , error , complete , param ){
					this.type = 'GET';
					this.request = set_request( success , error , complete );
					this.request.open( this.type , string_data( url , [ data , param ] ) , true );
					this.request.send();
					return this.request;
				}
				this[2] = function( url , data , success , error , complete , param ){
					this.type = 'POST';
					this.request = set_request( success , error , complete );
					this.request.open( this.type , string_data( url , [ param ] ) , true );
					if( !is_FormData( data ) )
						this.request.setRequestHeader( "Content-type" , "application/x-www-form-urlencoded" );
					else
						this.request.setRequestHeader( "Content-type" , "multipart/form-data" );
					this.request.send( data );
					return this.request;
				}
			}();
		return callback = new Function(),
			fn = callback.prototype = {
				init : function( init_json ){
					self = this;
					this.check();
					var data = handle_arguments( tool.assign( json , init_json ) );
					this.config = data;
					this.url = data.url;
					this.data = data.data;
					this.type = data.type;
					this.success = function( res ){
						self.status = 1;
						data.success.call( this , res )
					};
					this.error = function( res ){
						self.status = 0;
						data.error.call( this , res )
					};
					this.complete = function( res ){
						data.complete.call( this , res )
					};;
					this.param = data.param;
					this.ajax();
					return this;
				},
				err : function( code ){
					return err( code ),
						this;
				},
				check : function(){
					var result = check();
					if( result )
						this.err( result );
					return this;
				},
				ajax : function(){
					return this.request = set_request[ this.type ]( this.url , this.data , this.success , this.error , this.complete , this.param ),
						this;
				}
			},
			new callback().init();
	});
}( window , void( 0 ) ) , ['tool'] );