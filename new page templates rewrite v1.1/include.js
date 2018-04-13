define( 'include' , function( w , u ){
	//static 
	var default_config = {
		type : {
			'post' : 0,
			'get' : 1,
			'html' : 2,
			'js' : 3,
			'css' : 4,
			'image' : 5
		},
		err_code : {
			1001 : {
				template : 'tool.js 或 ajax.js 或 define_jquery.js 没有被引入 ...',
				status : 0
			},
			1002 : {
				template : '参数 type 不正确 , 可选 参数有 "post",get","html","js","css","image";',
				status : 1 
			}
		},
		time : 100
	};
	var err = function( code , arr ){
		var template;
		if( template = default_config.err_code[ code ] )
			switch( template.status - 0 ){
				case 0:
					return throw_error( get_change_str( template.template , arr ) );
				case 1:
					return console.warn( get_change_str( template.template , arr ) );
				case 2:
					return console.log( get_change_str( template.template , arr ) );
			}
	},
	get_change_str = function( str , arr ){
		var _arr = arr && 'object' == typeof arr ?
			arr : [],
			_str = 'string' == typeof str ?
			str : '',
			regexp = / \[(\d+)\] /g;
		return _str.replace( regexp , function( whole , value ){
			return _arr[ value ] || '';
		} );
	},
	throw_error = function( template ){
		throw new Error( template );
	},
	console_warn = function( template ){
		console.warn( template );
	},
	console_log = function( template ){
		console.log( template );
	},
	status = 0;
	//...
	return function( callback ){
		return callback;
	//arguments
	}( function( src , type , param , tool , ajax , $ ){
		//private
		var callback,fn,self,
			handle_arguments = function( src , type , param ){
				var config = {};
				config.src = handle_src( src );
				config.type = handle_type( type );
				config.param = handle_param( param );
				return config;
			},
			handle_src = function( src ){
				return tool.is_object( src ) ?
					src : [ src ];
			},
			handle_type = function( type ){
				return default_config.type[ tool.is_string( type ) ? type.toLocaleLowerCase() : '' ];
			},
			handle_param = function( param ){
				var result = [],
					stringify_arr = function( obj ){
						return tool.is_object( obj ) ?
							JSON.stringify( obj ) :
							obj;
					};
				return tool.in_case(
						tool.is_object( param ),
						function(){
							return tool.each( param , function( key , value ){
								result.push( key + '=' + stringify_arr( value ) );
							} ),
							result.join( '&' );
						},
						param
					);
			},
			get_content = new function(){
				var _ajax = function( url , type , success , error ){
					return ajax({
						url : url,
						type : type,
						success : success,
						error : error
					});
				},
				create_script = function( src , load  , error ){
					var script = document.createElement( 'script' );
					script.onload = tool.default_function( load );
					script.onerror = tool.default_function( error );
					script.src = src;
					return document.body.appendChild( script ),
						script;/*
					return $( '<script>' ).attr({
						src : src
					}).one( 'load' , tool.default_function( load ) ).one( 'error' , tool.default_function( error ) ).appendTo( 'body' ).get( 0 );*/
				},
				create_style = function( href , load , error ){
					var link = document.createElement( 'link' );
					link.rel = 'stylesheet';
					link.onload = tool.default_function( load );
					link.onerror = tool.default_function( error );
					link.href = href;
					return document.body.appendChild( link ),
						link;
					/*return $( '<link>' ).attr({
						rel : 'stylesheet',
						href : href
					}).one( 'load' , tool.default_function( load ) ).one( 'error' , tool.default_function( error ) ).appendTo( 'body' ).get( 0 );*/
				},
				create_image = function( sec , load , error ){
					return $( '<img>' ).attr( 'src' , src ).one( 'load' , tool.default_function( load ) ).one( 'error' , tool.default_function( error ) ).get( 0 );
				};
				this[ 0 ] = function( url , success , error ){
					_ajax( url , 'POST', success , error );	
				}
				this[ 1 ] = function( url , success , error ){
					_ajax( url , 'GET' , success , error );	
				}
				this[ 2 ] = function( url , success , error ){
					_ajax( url , 'GET' , success , error );
				}
				this[ 3 ] = function( url , success , error ){
					var script;
					return script = create_script( url , function(){
						$( script ).remove();
						success.call( this , this );
					} , function(){
						$( script ).remove();
						error.call( this , this );
					} );
				}
				this[ 4 ] = function( url , success , error ){
					var link;
					return link = create_style( url , function(){
						//$( link ).remove();
						success.call( this , this );
					} , function(){
						//$( link ).remove();
						error.call( this , this );
					} );
				}
				this[ 5 ] = function( url , success , error ){
					var img;
					return img = create_image( url , function(){
						success.call( this , this );
					} , function(){
						error.call( this , this );
					} );
				}
			}();
		//...
		return callback = new Function(),
			//prototype...
			callback.prototype = fn = {
				//public
				init : function(){
					self = this;
					var config;
					this.check();
					config = this.config = handle_arguments( src , type , param );
					if( config.type === u )
						this.check( 'type is undefined' );
					this.src = config.src;
					this.type = config.type;
					this.param = config.param;
					this.load();
					return this;
				},
				err : function( code ){
					return err( code ),
						this;
				},
				check : function( key ){
					switch( key ){
						case 'type is undefined' :
							this.err( 1002 );
							break;
						default :
							if( !tool || !ajax || !$ )
								this.err( 1001 );
							break;
					}
					return this;
				},
				load : function(){
					this.set_start_callback();
					this.set_end_callback();
					this.set_success_callback();
					this.set_error_callback();
					this.set_change_target();
					this.set_handle_param_callback();
					return setTimeout(function(){
						self.getContent();
					} , 0 ),
						this;
				},
				set_success_callback : function( callback ){
					return this.success_callback = tool.default_function( callback ),
						this;
				},
				set_error_callback : function( callback ){
					return this.error_callback = tool.default_function( callback ),
						this;
				},
				set_start_callback : function( callback ){
					return this.start_callback = tool.default_function( callback ),
						this
				},
				set_end_callback : function( callback ){
					return this.end_callback = tool.default_function( callback ),
						this;
				},
				set_change_target : function( target ){
					return target && ( this.target = $( target ) ),
						this;
				},
				set_handle_param_callback : function( callback ){
					return this.handle_param_callback = tool.is_function( callback ) ? callback : function( res ){
						return res;
					},
						this;
				},
				getContent : function(){
					if( status )
						return setTimeout( function(){
							self.getContent();
						} , default_config.time ),
						this;
					status = 1;
					var handle_url = function( url , param ){
						if( param )
							return url + '?' + param;
						return url;
					},handle_callback = function( callback , key , _this , target , type ){
						return callback.call( _this , _this , key , self.num , self.length , self),
							type == 'success' && append( _this , target ),
							self.length == self.num && !( status = 0 ) && end_callback( self.num , self.length );
					},add_num = function(){
						return num ++,
							self.num ++;
					},append = function( childNode , parentNode ){
						var _child = $( childNode ),
							_parent = $( parentNode );
						if( tool.is_dom( _child.get( 0 ) ) && tool.is_dom( _parent.get( 0 ) ) )
							_parent.append( _child );
					},
					param,callback,length,num,handle_param;
					return callback = tool.default_function( get_content[ this.type ] ),
						success_callback = this.success_callback,
						error_callback = this.error_callback,
						start_callback = this.start_callback,
						end_callback = this.end_callback,
						handle_param = this.handle_param_callback,
						param = this.param,
						target = this.target,
						length = this.length = Object.keys( this.src ).length,
						num = this.num = 0,
						start_callback( num , length ),
						tool.each( this.src , function( key , value ){
							callback( handle_url( value , param ) , function( res ){
								add_num();
								handle_callback( success_callback , key , handle_param( res , key , 'success' ) , target , 'success' );
							} , function( res ){
								add_num();
								handle_callback( error_callback , key , handle_param( res , key , 'error' ) , target , 'error' );
							} );
						} ),
						this;
				}
			},
			//execute
			new callback().init();
	} );					//arguments
}( window , void( 0 ) ) , [ 'tool' , 'ajax' , 'jquery' ] );
//invocation style ： define.get( 'include' )( url_list , type [ , param] )
//structure => {
//		'config' => array() //handled arguments list
//		'num' => 0 //load number
//		'length' => 1 //will loading number 
//		'param' => ''//handled arguments key => param
//		'src' => []//handled arguments key => src
//		'type' => undefined//handled arguments key => type
//		prototype function ...
//			'set_change_target' => function( target ) //get target
//			 'set_end_callback' => function( callback )//load end handle
//			'set_error_callback' => function( callback )//load error handle
//			'set_handle_param_callback' => function( callback )//load end arguments => handle =>
//			'set_start_callback' => function( calback )//before load handle
//			'set_success_callback' => function( callback )//load success handle
//___________( start )································> (load) ------------------------------------------------------------> ( allot load event callback) ························> ( after load )________________
//					set_start_callback(callback) => set_change_target(target) , set_handle_param_callback(callback) => set_success_callback(callback) => set_end_callback(callback)
//																									  	  								   => set_error_callback(callback) => set_end_callback(callback)
//}