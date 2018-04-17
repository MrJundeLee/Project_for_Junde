define( 'alert' , function( w , u ){
	var default_config = {
		style_data_id : 'alert_styleRule',
		context : 'body',
		styleRules : {
			'*' : {
				'container_*' : {
					'target' : '.alert-container *,.alert-container',
					'type' : 'style',
					'styleRules' : {
						'box-sizing' : 'border-box',
						'-webkit-box-sizing' : 'border-box',
						'-moz-box-sizing' : 'border-box',
						'-ms-box-sizing' : 'border-box',
						'-o-box-sizing' : 'border-box'
					}
				}
			},
			'body' : {
				'show_alert' : {
					'target' : 'body.alert-open,html.alert-open',
					'className' : 'alert-open',
					'type' : 'style',
					'styleRules' : {
						'overflow' : 'hidden',
						'padding-right' : '17px'
					}
				},
				'hide_alert' : {
					'target' : 'body.alert-close,html.alert-close',
					'className' : 'alert-close',
					'type' : 'style'
				}
			},
			'alert' : {
				'container' : {
					'target' : '.alert-container',
					'className' : 'alert-container',
					'type' : 'style',
					'table' : true,
					'styleRules' : {
						'position' : 'fixed',
						'top' : '45%;top:calc( 50% - 125px )',
						'width' : '300px',
						'margin' : 'auto',
						'display' : 'none',
						'left' : '0',
						'right' : '0',
						'z-index' : '10000001',
						'box-sizing' : 'border-box',
						'-ms-box-sizing' : 'border-box',
						'-o-box-sizing' : 'border-box',
						'-moz-box-sizing' : 'border-box',
						'-webkit-box-sizing' : 'box-sizing'
					}
				},				
				'fill' : {					
					'target' : '.alert-fill',			
					'className' : 'alert-fill',
					'type' : 'style',
					'styleRules' : {
						'position' : 'fixed',
						'top' : 0,
						'left' : 0,
						'right' : 0,
						'bottom' : 0,
						'display' : 'none',
						'z-index' : '10000000',
						'background' : 'rgba( 0 , 0 , 0 , .9 )'
					}
				},
				'content' : {
					'target' : '.alert-content',
					'className' : 'alert-content',
					'type' : 'style',
					'styleRules' : {
						'width' : '300px',
						'height' : '250px',
						'position' : 'relative',
						'margin' : 'auto'
					}
				},
				'table' : {
					'target' : '.alert-table',
					'className' : 'alert-table',
					'type' : 'style',
					'styleRules' : {
						'display' : 'table',
						'width' : '100%',
						'height' : '100%'
					}
				},
				'table_row' : {
					'target' : '.alert-table-row',
					'className' : 'alert-table-row',
					'type' : 'style',
					'styleRules' : {
						'display' : 'table-row',
					}
				},
				'table_col' : {
					'target' : '.alert-table-col',
					'className' : 'alert-table-col',
					'type' : 'style',
					'styleRules' : {
						'display' : 'table-cell',
						'vertical-align' : 'middle',
						'text-align' : 'center'
					}
				},
				'alert_header' : {
					'target' : '.alert-header',
					'className' : 'alert-header',
					'type' : 'style',
					'styleRules' : {
						'line-height' : '50px',
						'height' : '60px',
						'width' : '100%',
						'font-size' : '16px',
						'font-weight' : 'bold',
						'background' : '#ff5400',
						'color' : '#fff',
						'text-align' : 'left',
						'padding' : '5px 15px',
						'white-space' : 'nowrap',
						'overflow' : 'hidden',
						'text-overflow' : 'ellipsis',
						'border-radius' : '5px 5px 0 0'
					}
				},
				'alert_body' : {
					'target' : '.alert-body',
					'className' : 'alert-body',
					'type' : 'style',
					'table' : true,
					'styleRules' : {
						'height' : '130px',
						'width' : '100%',
						'padding' : '5px',
						'line-height' : '1.5',
						'font-size' : '14px',
						'font-weight' : 'normal',
						'overflow-y' : 'auto',
						'background' : '#fff'
					}
				},
				'alert_footer' : {
					'target' : '.alert-footer',
					'className' : 'alert-footer',
					'type' : 'style',
					'table' : true,
					'styleRules' : {
						'height' : '60px',
						'width' : '100%',
						'padding' : '15px',
						'overflow' : 'hidden',
						'background' : '#fff',
						'border-radius' : '0 0 5px 5px'
					}
				},
				'alert_btn' : {
					'target' : '.alert-btn',
					'className' : 'alert-btn',
					'type' : 'style',
					'styleRules' : {
						'padding' : '5px 10px',
						'border' : '1px solid #ddd',
						'color' : '#333',
						'font-size' : '14px',
						'border-radius' : '3px',
						'background' : '#fff',
						'box-shadow' : '0 0 1px #ddd',
						'cursor' : 'pointer',
						'display' : 'inline-block',
						'min-width' : '50px'
					}
				},
				'alert_btn_hover' : {
					'target' : '.alert-btn:hover',
					'type' : 'style',
					'styleRules' : {
						'box-shadow' : '0 0 1px #ddd inset',
					}
				}
			}
		},
		err_code : {
			1001 : {
				code : 1001,
				template : '.js文件【tool.js,define_jquery.js,putty.js,lang.js】 未被引入 ...',
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
	}, addEventListener = function( target , type , callback ){
		return target.addEventListener( type , callback );
	},
	status = 0,
	show_status = 0,
	load_list = [],
	style;
	return function( callback ){
		return callback;
	}( function( json , tool , set_style_rules , $ , putty , lang ){
		var callback,fn,self,
			create = function( node , attr , html ){
				var _node = document.createElement( node );
				return tool.each( attr , function( key , value ){
					_node.setAttribute( key , value );
				} , true ),
					_node.innerHTML = html || '',
					$( _node );
			},
			handle_styleRules = function(){
				if( style )
					return;
				return tool.each( default_config.styleRules , function(){
					style = set_style_rules(this);
				} , true );
			}, handle_context = function( context ){
				var _context = $( context );
				return tool.in_case( _context.length , _context , $( default_config.context ) );
			}, handle_time = function( time ){
				return tool.in_case( time && tool.is_number( time - 0 ) , time , 0 ) - 0;
			}, convert_str_options = function( str ){
				return tool.in_case( tool.is_string( str ) , str , '' ).split( ',' )
			}, map_arr = function( arr , callback ){
				return tool.in_case( tool.is_array( arr ) , arr , [] ).map( callback );
			}, create_div = function( attr , html ){
				return create( 'div' , attr , html );
			},create_alert = function( data , context ){
				var _data = {},
					_r_data = new Map(),
					setAttr = function( value ){
						var styleText = '';
						return tool.each( value.style , function( key , value ){
							styleText += create_styleUnit_format( key , value );
						} , true ),
							{
								'style' : styleText,
								'class' : value[ 'class' ]
							};
					},
					target,
					_context,
					context_key;	
				return tool.each( data , function( key , value ){
					tool.in_case( value[ '#proto#' ].more , function(){
						_data[ key ] = $();
						tool.each( value.domList , function( in_key , in_value ){
							target = _data[ key ][ _data[ key ].length ++ ] = create_div( setAttr( in_value ) , in_value.title ).get( 0 );
							in_value.click && addEventListener( $( target ).get( 0 ) , 'click' , in_value.click );
						} , true );
					} , function(){
						target = _data[ key ] = create_div( setAttr( value ) , value.title );
						value.click && addEventListener( $( target ).get( 0 ) , 'click' , value.click );
					} )
				} , true ),
					tool.each( data , function( key , value ){
						context_key = value[ '#proto#' ].context;
						_context = $( tool.in_case( context_key == 'context' , context , _data[ context_key ] ) ).get( 0 );
						( target = _r_data.get( _context ) || ( _r_data.set( _context , {type:data[ context_key ] ? data[ context_key ][ '#proto#' ].table : u , length:0} ) , _r_data.get( _context ) ) )[ value[ '#proto#' ].index ] = _data[ key ];
						target.length = tool.in_case( target.length < value[ '#proto#' ].index , value[ '#proto#' ].index , target.length + 1 );
					} , true ),
					_r_data.forEach(function( value , key ){
						var dom = $( key ),
							_append = append( dom , value );
						tool.each( value , function( key ){
							_append( this );
						} , true );
					}),
					_data;
			}, append_common = function( dom , value ){
				return $( dom ).append( value );
			}, append_type_table = function( dom , value , table ){
				return $( value ).each(function(){
					$( table ).append( create_div( {'class':'alert-table-col'} ).append( this ) )
				});
			}, append_type_table_lone = function( dom , value , table ){
				return $( table ).append( create_div( {'class':'alert-table-col'} ).append( value ) );
			}, append_table = function( dom ){
				return create_div( {'class':'alert-table-row'} ).appendTo( create_div( {'class':'alert-table'} ).appendTo( dom ) );
			}, allot_append = function( type ){
				switch( type ){
					case true:
						return append_type_table;
					case 1:
						return append_type_table_lone;
					default:
						return append_common;
				}
			}, append = function( dom , value ){
				var callback = allot_append( value.type ),
					table = value.type && append_table( dom );
				return function( value ){
					return callback( dom , value , table );
				}
			}, clear_target_className = function( target , key1 , key2 ){
				var _target = $( target );
				return tool.in_case( key1 && key2 , function(){
					return default_config.styleRules[ key1 ] && default_config.styleRules[ key1 ][ key2 ] && _target.removeClass( default_styleRules[ key1 ][ key2 ].className ),
						_target;
				} , function(){
					return tool.each( default_config.styleRules[ key1 ] , function( key , value ){
						_target.removeClass( this.className );
					} , true ),
						_target;
				} )
			}, add_body_className = function(){
				var body = $( document.body ),
					className_arr = default_config.styleRules.body;
				return clear_target_className( body , 'body' ).addClass( className_arr.show_alert.className );
			},
			remove_body_className = function(){
				var body = $( document.body ),
					className_arr = default_config.styleRules.body;
				return clear_target_className( body , 'body' ).addClass( className_arr.hide_alert.className );
			},
			init_styleRules = function(){
				return handle_styleRules();
			}(),
			change_status = function( bl ){
				return status = tool.in_case( bl == true , 1 , 0 );
			},
			check_status = function(){
				return tool.in_case( status , false , function(){
					return change_status( true );
				} );
			},
			build_default_config = function(){
				var config = default_config.styleRules.alert;
				return {
					header : {
						'class' : config.alert_header.className,
						'title' : 'Alert',
						'style' : {},
						'#proto#' : {	
							'revise' : true,
							'context' : 'content',
							'index' : 0		
						}	
					},
					body_container : {	
						'class' : config.alert_body.className,
						'style' : {},
						'#proto#' : {
							'context' : 'content',
							'index' : 1,
							'table' : 1
						}
					},
					body : {
						'class' : '',
						'title' : '',
						'style' : {},
						'#proto#' : {
							'context' : 'body_container',
							'index' : 0,
							'revise' : true
						}
					},
					footer : {
						'class' : config.alert_footer.className,
						'#proto#' : {
							'context' : 'content',
							'index' : 2,
							'table' : true
						}
					},
					btns : {
						'class' : config.alert_btn.className,
						'title' : 'confirm',
						'style' : {},
						'click' : new Function(),
						'#proto#' : {
							'revise' : true,
							'context' : 'footer',
							'index' : 0,
							'more' : true
						}
					},
					fill : {
						'class' : config.fill.className,
						'click' : function(){
							return self.hide();
						},
						'#proto#' : {
							'context' : 'context',
							'index' : 0
						}
					},
					container : {
						'class' : config.container.className,
						'#proto#' : {
							'context' : 'context',
							'index' : 1,
							//'table' : 1
						}	
					},
					content : {
						'class' : config.content.className,							
						'#proto#' : {
							'context' : 'container',
							'index' : 0
						}	
					}
				}
			};
		return callback = new Function(),
			callback.prototype = fn = {
				init : function(){
					self = this;
					this.check();
					this.handle_arguments();
					this.create();
					this.time_close();
					return self;
				},
				err : function( code ){
					return err( code ),
						this;
				},
				check : function( ins ){
					switch( ins ){
						default :
							if( !tool || !$ || !putty || !lang || !set_style_rules )
								this.err( 1001 );
							break;
					}
				},
				handle_arguments : function(){
					var _json = tool.is_object( json ) ? json : {},
						config = build_default_config(),
						result = {},
						check_arg_format = function( data , value ){
							var result = [];
							return tool.in_case( tool.is_object( data ) , function(){
								return tool.in_case( value[ '#proto#' ].more , function(){
									return tool.each( data , function( key , value ){
										tool.in_case( tool.is_object( value ) , function(){
											result.push( value )
										} , function(){
											result.push( {title : value} )
										} )
									} , true ),
										result;
								} , data )
							} , function(){
								return tool.in_case( value[ '#proto#' ].more , u , {title : data} )	
							} );
						},
						handle_result = function(){
							return tool.each( config , function( key , value ){
								result[ key ] = tool.in_case( ( _json[ key ] = check_arg_format( _json[ key ] , value ) ) && value[ '#proto#' ].revise , function(){
									return handle_value( value , _json[ key ] );
								} , function(){
									return tool.in_case( value[ '#proto#' ].more , handle_value_more_callback( value , [value] ) , value )
								} )
							} , true ),
								result;
						},
						handle_value_more_callback = function( value , domList ){
							var result = {'#proto#':value[ '#proto#' ]};
							return result.domList = domList,
								result;	
						},
						handle_value = function( value , arg_value ){
							var result = {},
								target;
							return tool.in_case( value[ '#proto#' ].more , function(){
								result = handle_value_more_callback( value , [] );
								tool.each( arg_value , function( in_key , in_value ){
									result.domList.push( target = {} );
									tool.each( value , function( key , value ){
										target[ key ] = tool.in_case( in_value[ key ] && typeof in_value[ key ] == typeof value , function(){
											return allot_value( value , in_value[ key ] , key );
										} , value );
									} , true )
								} , true )
							} , function(){
								tool.each( value , function( key , value ){
									result[ key ] = tool.in_case( arg_value[ key ] && typeof arg_value[ key ] == typeof value , function(){
										return allot_value( value , arg_value[ key ] , key );
									} , value );
								} , true )
							} ),
								result;
						},
						allot_value = function( value , arg_value , key ){
							switch( key ){
								case 'className' :
									return value + ' ' + arg_value;
								case 'title' :
									return arg_value;
								case 'style' :
									return tool.assign( value , arg_value );
								case 'click' : 
									return function(){
										var arg = [function(){return self.hide();}];
										return tool.each( arguments , function( key , value ){
											arg.push( value );
										} , true ),
											arg_value.apply( this , arg );
									}
							}
						};
					return this.context = handle_context( _json.context ),
						this.time = handle_time( _json.time ),
						this.data = handle_result(),
						this;
				},
				create : function(){
					return this.domList = create_alert( this.data , this.context ),
						this.hide( u , 0 , true ),
						this;
				},
				hide : function( callback , time , bn ){
					var _time = tool.in_case( time === u , 500 , time ),
						_callback = tool.is_function( callback ) ? callback : new Function();
					return tool.in_case( bn , function(){
						$( self.domList.fill ).hide();
					} , function(){
						$( self.domList.fill ).fadeOut( _time , function(){
							$( this ).remove();
						} );
					} ),
						this.domList.container.fadeOut( _time , function(){
							if( !bn ){
								show_status = 0;
								setTimeout(function(){
									if( load_list.length )
										load_list.shift()();
								} , 500 );
							}
							_callback();
						} ),
						change_status(),
						remove_body_className(),
						this;
				},
				remove : function(){
					return this.hide(function(){
						$( this ).remove();
					}),
						remove_body_className(),
						change_status(),
						this;
				},
				show : function( callback , time ){
					var _time = tool.in_case( time === u , 500 , time ),
						_callback = tool.is_function( callback ) ? callback : new Function();
					if( show_status )
						return this.reload(function(){
							return self.show( callback , time );
						});
					show_status = 1;
					this.target = this.domList.container;
					return this.domList.fill.appendTo( default_config.context ).fadeIn( _time ),
						this.target.fadeIn( _time , function(){
							_callback();
						} ),
						add_body_className(),
						change_status( true ),
						this;
				},
				time_close : function(){
					return this.time && setTimeout(function(){
						self.hide();
					} , this.time )
				},
				reload : function( callback ){
					return load_list.push( callback ),
						this;
				}
			},
			new callback().init();
	} )
}( window , void( 0 ) ) , ['tool' , 'set_style_rules','jquery','putty','lang'] )