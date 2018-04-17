define( 'toast' , function( callback ){
	return callback;
}(function( w , u ){
	var default_config = {
		'context' : 'body',
		'speed' : 500,
		}],
		'err_code' : {
			1001 : {
				code : 1001,
				template : ' [0]  未被引入 ...',
				status : 0
			},
			1002 : {
				code : 1002,
				template : ' [0]  未被引入 ...',
				status : 1
			}
		},
		'regexp_list' : [/ \[(\d+)\] /g],
		'check_include_putty' : [ window.Map ]
	},
	check_putty = function(){
		var result;
		if( ![].forEach )
			return false;
		return default_config.check_include_putty.forEach(function( value ){
			u === value && 
				( result = false );
			if( false === result )
				return false;
		}),
			result;
	};
	var create = function( node ){
		return document.createElement( node );
	},
	append = function( target , parent ){
		return parent.appendChild( target ),
			parent;
	},
	clone = function( target ){
		return target.cloneNode();
	},
	remove = function( target ){
		var parent;
		return parent = target.parentNode,
			parent.removeChild( target ),
			parent;
	} , load_list = [],status,target,styleRules;
	return function( json , tool , set_style_rules , $ , putty , lang ){
		var handle_response = function( res ){
			var response;
			return tool.handle_try(function(){
				response = res;
			},function(){
				response = JSON.parse( res );
			}),
				response;
		},
		err = function( code , arr , callback ){
			var config = default_config.err_code,
				_callback = 'function' == typeof callback ?callback : function(){},
				status = ( ( config[ code ] || {} ).status + '' || '' ).split( ',' ),
				err_callback = function( status ){
					switch( status - 0 ){
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
							alert({
								body : split_string( config[ code ].template , arr ),
								btns : [{
									'click' : function( hide ){
										hide();
									}
								}]
							}).show();
							break;
						case 4:
							_callback( split_string( config[ code ].template , arr ) );
							break;
					}
				},
				i = 0,
				length = status.length;
			for( ; i < length ; i ++ )
				err_callback( status[ i ] );
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
		}, create = function( node , attr , html ){
			var _node = document.createElement( node );
			return tool.each( attr , function( key , value ){
				_node.setAttribute( key , value );
			} , true ),
				_node.innerHTML = html || '',
				_node;
		}, create_div = function( attr , html ){
			return create( 'div' , attr , html );
		}, handle_arguments = function( json ){
			var _json = tool.default_object( json ),
				result = {};
			return result.time = handle_time( _json.time ),
				result.title = handle_title( _json.title ),
				result.context = handle_context( _json.context ),
				result;
		},handle_time = function( time ){
			return tool.is_number( time ) && !!time ?
				time : default_config.time;
		},handle_title = function( title ){
			var result = {
				title : '',
				style : '',
				'class' : default_config.toast_content
			};
			return tool.in_case(
					tool.is_object( title ),
					function(){
						result.title = title.title || '';
						result.style = handle_style( title.style || '' );
						result[ 'class' ] = title[ 'class' ] || default_config.toast_content;
						return result
					},
					function(){
						 result.title = title || '';
						 return result;
					}
				);
		} , handle_context = function( context ){
			var target;
			return target = $( context ).get( 0 ),
				tool.is_dom( target ) ?
					target : $( default_config.context )
		},handle_style = function( style ){
			var result = '';
			return tool.each( style , function( key , value ){
				if( key !== u && value !== u )
					result += ( i + ':' + ( style[ i ] || '' ) + ';' );
			} , true ),
				result;
		} , create_toast = function( json , context ){
			var attr = {},
				target;
			return attr[ 'class' ] = json[ 'class' ],
				attr[ 'style' ] = json[ 'style' ],
				append( target = create_div( attr , json.title ) , $( context ).get( 0 ) ),
				target.style.display = 'none',
				target;
		} , add_load_list = function(){
			return load_list.push(function(){
				return fn.show();
			});
		} , clear_status = function(){
			status = 0;
			$( target ).fadeOut();
			if( load_list.length )
				return setTimeout(function(){
					load_list.shift()();
				} , default_config.speed );
		},
		callback,fn,self;
		return callback = new Function(),
			callback.prototype = fn = {
				init : function( _json ){
					self = this;
					var json_args = tool.assign( json , _json ),
						args,toast;
					this.check();
					args = this.args = handle_arguments( json_args );
					toast = this.toast = create_toast( args.title , args.context );
					this.styleRules = styleRules = styleRules || set_style_rules( default_config.rules );
					return this;
				},
				show : function(){
					if( status )
						return add_load_list(),
							this;
					status = 1;
					target = self.toast;
					return $( self.toast ).fadeIn( default_config.speed , function(){
						setTimeout(function(){
							self.hide();
						} , self.args.time );
					} ),
						this;
				},
				hide : function(){
					return clear_status(),
						this;
				},
				remove : function(){
					return remove( self.toast ),
						this;
				},
				err : function( arr ){
					return err( this.err_code , arr ),
						this;
				},
				check : function( ins ){
					switch( ins ){
						default :
							if( !tool || !$ || !putty && false === check_putty() || !lang || !set_style_rules ){
								this.err_code = 1001;
								if( !tool )
									this.err( [ 'tool.js' ] );
								if( !$ )
									this.err( [ 'define_jquery.js' ] );
								if( !putty && false === check_putty() )
									this.err( [ 'putty.js' ] );
								if( !lang )
									this.err( [ 'lang.js' ] );
								if( !set_style_rules )
									this.err( [ 'set_style_rules.js' ] );
							}
							break;
					}
				}
			},
			new callback().init();
	}
}( window , void( 0 ) )) , ['tool' , 'set_style_rules' , 'jquery' , 'putty' , 'lang'] );