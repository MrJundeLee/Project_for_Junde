define( 'putty' , function( w , u ){
	const default_config = {
		err_code : {
			1001 : {
				code : 1001,
				template : 'tool.js 未被引入 ...',
				status : 0
			}
		},
		regexp_list : [/ \[(\d+)\] /g]
	}, err = function( code , arr , callback ){
		var config = default_config.err_code,
			_callback = 'function' == typeof callback ?callback : function(){};
		switch( ( config[ code ] || {} ).status ){
			case 0:
				throw_error( split_string( config[ code ].template , arr ) );
				break;
			case 1:
				console_warn( split_string( config[ code ].template , arr ) );
				break;
			case 2:
				console_log( split_string( config[ code ].template , arr ) );
				break;
			case 3:
				alert( split_string( config[ code ].template , arr ) );
				break;
			case 4:
				_callback( split_string( config[ code ].template , arr ) );
				break;
		}
	}, split_string = function( str , arr ){
		var regexp = default_config.regexp_list[ 0 ],
			_arr = !!arr && 'object' == typeof arr ? arr : [];
		return str.replace( regexp , function( all , key ){
			return _arr[ key ] || '';
		} );
	}, throw_error = function( template ){
		throw new Error( template );
	}, console_warn = function( template ){
		console.warn( template );
	}, console_log = function( template ){
		console.log( template );
	};
	return function( callback ){
		return callback;
	}( function( json , tool ){
		var callback,fn,self,
			handle_arguments = function( json ){
				return handle( tool.default_object( json ) );
			},
			handle = function( json ){
				var result = {};
				return tool.each( json , function( key , value ){
					var set_target,
						unit = tool.default_object( value );
					if( unit.context )
						set_target = function( value ){
							return value !== u ?  
							tool.default_object( unit.context )[ unit.target ] = value: 
							tool.default_object( unit.context )[ unit.target ];
						}
					else
						set_target = function( value ){
							return value !== u ?  
							unit.target = value: 
							unit.target;
						};
					if( u === set_target() && u !== unit.callback && unit.target )
						result[ key ] = {config:value},
						result[ key ].callback = function( callback ){
							return set_target( callback );
						}
				} , true ),
					result;
			};
		return callback = new Function(),
			callback.prototype = fn = {
				init : function(){
					self = this;
					this.check();
					this.putty_list = {__default__:[]};
					this.arg = handle_arguments( json );
					this.execute();
					return self;
				},
				execute : function(){
					var context;
					return tool.each( this.arg , function( key , value ){
						if( value.config.name )
							self.putty_list[ value.config.name ] = value.callback( value.config.callback );
						else
							self.putty_list.__default__.push( value.callback( value.config.callback ) );
					} , true ),
						this;
				},
				err : function( code ){
					return err( code ),
						this;
				},
				check : function( ins ){
					switch( ins ){
						default :
							if( !tool )
								this.err( 1001 );
							break;
					}
				}
			},
			new callback().init();
	} )
}( window , void( 0 ) ) , 'tool' );
//putty callback
define.get( 'putty' )([{
	//putty:Map
	'target' : 'Map',
	'name' : 'Map',
	'callback' : function(){
		return function( callback ){
			return callback();
		}(function(){
			var callback,fn,self,
				data = {
					keys : [],
					values : []
				},
				reSet = function( index , content ){
					data.values[ index ] = content;
				},
				Set = function( name , content ){
					data.keys.push( name );
					data.values.push( content );
				},
				Get = function( index , type ){
					return data[ type ][ index ];
				},
				Has = function( name ){
					var result;
					return forEach( function( key , value , index ){
						name == key &&
							( result = index );
					} ),
						result;
				},
				forEach = function( callback ){
					var i = 0,
						target;
					while( undefined !== ( target = Get( i , 'keys' ) ) )
						callback( target , Get( i , 'values' ) , i ),
						i ++;
				},
				Delete = function( index ){
					data.keys.splice( index , 1 );
					data.values.splice( index , 1 );
				},
				Clear = function(){
					data.keys = [];
					data.values = [];
				},
				GetAll = function( type ){
					return data[ type ].slice();
				},
				GetSize = function(){
					return data.keys.length;
				};
			return callback = new Function(),
				callback.prototype = fn = {
					'set' : function( name , content ){
						var key;
						if( name === undefined )
							name = String( undefined );
						if( undefined !== ( key = Has( name ) ) )
							reSet( key , content );
						else
							Set( name , content );
						this.size = GetSize();
					},
					'get' : function( name ){
						var key;
						if( undefined === ( key = Has( name ) ) )
							return ;
						return Get( key , 'values' );
					},
					'forEach' : function( callback ){
						var _callback = 'function' == typeof callback ? callback : new Function();
						forEach( function( key , value , index ){
							return _callback( key , value );
						} );
					},
					'delete' : function( name ){
						var key;
						if( undefined === ( key = Has( name ) ) )
							return undefined;
						Delete( key );
						this.size = GetSize();
					},
					'clear' : function(){
						Clear();
						this.size = GetSize();
					},
					'keys' : function(){
						return GetAll( 'keys' );
					},
					'values' : function(){
						return GetAll( 'values' );
					},
					'has' : function( name ){
						return Has( name ) === undefined ?
							false : true;
					}
				},
				new callback();
		})
	}
},{
	//putty:forEach
	'target' : 'forEach',
	'name' : 'array forEach',
	'context' : Array.prototype,
	'callback' : function( callback , thisArg ){
		var T, k;
	    if (this == null) 
	      throw new TypeError(' this is null or not defined');
	    var O = Object(this);
	    var len = O.length >>> 0;
	    if (typeof callback !== "function") 
	      throw new TypeError(callback + ' is not a function');
	    if (arguments.length > 1) 
	      T = thisArg;
	    k = 0;
	    while (k < len) {
	      var kValue;
	      if (k in O) {
	        kValue = O[k];
	        callback.call(T, kValue, k, O);
	      }
	      k++;
	    }
	}
}])