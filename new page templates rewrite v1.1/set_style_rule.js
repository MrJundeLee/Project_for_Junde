define( 'set_style_rules' , function( w , u ){
	var default_config = {
		context : 'body',
		err_code : {
			1001 : {
				code : 1001,
				template : '.js文件【tool.js,define_jquery.js】 未被引入 ...',
				status : 0
			}
		},
		regexp_list : [/ \[(\d+)\] /g]
	}, err = function( code , arr , callback ){
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
						alert( split_string( config[ code ].template , arr ) );
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
	}, append = function( target , parent ){
		return parent.appendChild( target ),
			parent;
	}, clone = function( target ){
		return target.cloneNode();
	},remove = function( target ){
		var parent;
		return parent = target.parentNode,
			parent.removeChild( target ),
			parent;
	}, target;
	return function( callback ){
		return callback;
	}( function( json , tool , $ , putty , lang ){
		var callback,fn,self,
			create = function( node , attr , html ){
				var _node = document.createElement( node );
				return tool.each( attr , function( key , value ){
					_node.setAttribute( key , value );
				} , true ),
					_node.innerHTML = html || '',
					_node;
			},
			create_style = function( attr , html ){
				return create( 'style' , attr , html );
			},
			append_style = function( attr , html ){
				var style;
				return append( style = create_style( attr , html ) , $( default_config.context ).get( 0 ) ),
					style;
			},
			handle_styleRules = function( rules ){
				var styleRules = '',
					styleLeft = '{\r\n',
					styleRight = '}\r\n',
					styleMediaLeft = '@media(',
					styleMediaRight = ')',
					styleKeyframes = ['@keyframes ','@-webkit-keyframes ','@-o-keyframes ','@-moz-keyframes ','@-ms-keyframes '],
					allot_type = function( data ){
						switch( data.type || '' ){
							case 'style' :
								return create_style( data );
							case 'media':
								return create_media( data );
							case 'animation':
								return create_keyframes( data );
							case '' :
								return create_style( data );
						}
					}, create_style = function( data ){
						var styleText = '';
						return styleText = data.target + styleLeft,
							tool.each( data.styleRules , function( key , value ){
								if( key !== u )
									styleText += ( create_styleUnit_format( key , value ) + '\r\n' );
							} , true ),
							styleText + styleRight;
					}, create_media = function( data ){
						var styleText = styleMediaLeft + data.size + styleMediaRight + styleLeft;
						return styleText += data.target + styleLeft,
							tool.each( data.styleRules , function( key , value ){
								if( key !== u )
									styleText += ( create_styleUnit_format( key , value ) + '\r\n' );
							} , true ),
							styleText + styleRight + styleRight;
					}, create_keyframes = function( data ){
						var styleText = '';
						return tool.each( styleKeyframes , function( key , value ){
							styleText += value + data.target + styleLeft;
							console.log( data )
							tool.each( data.actions , function( key , value ){
								styleText += value.target + styleLeft;
								tool.each( value.styleRules , function( key , value ){
									if( key !== u )
										styleText += ( create_styleUnit_format( key , value ) + '\r\n' );
								} , true );
								styleText += styleRight;
							} , true );
							styleText += styleRight
						} , true ),
							styleText;
					},create_styleUnit_format = function( key , value ){
						return key + ':' + value + ';';
					};
				return tool.each( rules , function( key , value ){
					if( tool.is_object( value ) )
						styleRules += allot_type( this ) || '';
				} , true ),
					styleRules;
			},append_html = function( target , html ){
				return $( target ).each(function(){
					this.innerHTML += ( html || '' );
				}),
					target;
			}, set_html = function( target , html ){
				return $( target ).html( html || '' ),
					target;
			};
		return callback = new Function(),
			callback.prototype = fn = {
				init : function(){
					self = this;
					this.check();
					var rules = handle_styleRules( json ),
						container = target = target || append_style();
					append_html( container , rules );
					return self;
				},
				err : function( code ){
					return err( code ),
						this;
				},
				check : function( ins ){
					switch( ins ){
						default :
							if( !tool || !$ )
								this.err( 1001 );
							break;
					}
				}
			},
			new callback().init();
	} )
}( window , void( 0 ) ) , ['tool','jquery','putty','lang'] )