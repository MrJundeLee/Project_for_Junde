
var calendar = function( w , u ){
	//const
	const default_config = new function(){
		var set_default_value = function( _default_arg , arg ){
			return _default_arg + in_case( arg , ' ' + arg , '' );
		};
		this.context = 'body';
		this.date = new Date();
		this.set_container_className = function( arg ){
			return set_default_value( 'calendar_container' , arg );
		};
		this.set_header_className = function( arg ){
			return set_default_value( 'calendar_header' , arg );
		};
		this.set_header_content_className = function( arg ){
			return set_default_value( 'calendar_header_content' , arg );
		};
		this.set_header_date_className = function( arg ){
			return set_default_value( 'calendar_header_date' , arg );
		};
		this.set_left_icon_className = function( arg ){
			return set_default_value( 'calendar_left_icon' , arg );
		};
		this.set_right_icon_className = function( arg ){
			return set_default_value( 'calendar_right_icon' , arg );
		};
		this.set_content_className = function( arg ){
			return set_default_value( 'calendar_content' , arg );
		};
		this.set_row_className = function( arg ){
			return set_default_value( 'calendar_row' , arg );
		};
		this.set_cell_className = function( arg ){
			return set_default_value( 'calendar_cell' , arg );
		};
		this.set_style = function( arg ){
			return set_default_value( 'calendar_styleRules' , arg );
		};
	}() , styles_rules = new function(){
		this.container = {
			target : '.calendar_container',
			className : 'calendar_container',
			stylesRules : {
				'display' : 'block',
				'width' : '100%',
				'height' : '100%',
				'min-height' : '300px',
				'min-width' : '300px',
				'position' : 'relative',
				'overflow' : 'hidden'
			},
			type : 'style'
		};
		this.header = {
			target : '.calendar_container .calendar_header',
			className : 'calendar_header',
			stylesRules : {
				'display' : 'block',
				'width' : '100%',
				'height' : '50px',
				'line-height' : '50px',
				'white-space' : 'nowrap',
				'overflow' : 'hidden',
				'text-overflow' : 'ellipsis',
				'font-size' : '16px',
				'text-align' : 'center'
			},
			type : 'style'
		};
		this.header_content = {
			target : '.calendar_container .calendar_header .calendar_header_content',
			className : 'calendar_header_content',
			stylesRules : {
				'display' : 'inline-block'
			},
			type : 'style'
		};
		this.left_icon = {
			target : '.calendar_container .calendar_header .calendar_header_content .calendar_left_icon',
			className : 'calendar_left_icon',
			stylesRules : {
				'float' : 'left'
			},
			type : 'style'
		};
		this.right_icon = {
			target : '.calendar_container .calendar_header .calendar_header_content .calendar_right_icon',
			className : 'calendar_right_icon',
			stylesRules : {
				'float' : 'left'
			},
			type : 'style'
		};
		this.header_date = {
			target : '.calendar_container .calendar_header .calendar_header_content .calendar_header_date',
			className : 'calendar_header_date',
			stylesRules : {
				'float' : 'left'
			},
			type : 'style'
		};
		this.content = {
			target : '.calendar_container .calendar_content',
			className : 'calendar_content',
			stylesRules : {
				'display' : 'table',
				'width' : '100%',
				'height' : 'calc( 100% - 50px )',
				'text-align' : 'center',
				'font-size' : '14px'
			},
			type : 'style'
		};
		this.row = {
			target : '.calendar_container .calendar_content .calendar_row',
			className : 'calendar_row',
			stylesRules : {
				'display' : 'table-row'
			},
			type : 'style'
		};
		this.cell = {
			target : '.calendar_container .calendar_content .calendar_row .calendar_cell',
			className : 'calendar_cell',
			stylesRules : {
				'display' : 'table-cell',
				'vertical-align' : 'middle'
			},
			type : 'style'
		}
	}() , errcode = new function(){
		this.handle = {
			context : '你设置了 无效的上下文',
			date : '你设置了 无效的日期格式'
		};
	}() , event = new function(){
		this.load = {
			'start' : 0,
			'container' : 1,
			'header' : 2,
			'left_icon' : 3,
			'header_date' : 4,
			'right_icon' : 5,
			'content' : 6,
			'row' : 7,
			'cell' : 8,
			'end' : 9
		};
		this.click = {
			'left_icon' : 10,
			'right_icon' : 11,
			'cell' : 12
		};
		this.change = {
			'header' : 13,
			'header_date' : 14,
			'left_icon' : 15,
			'right_icon' : 16,
			'content' : 17
		};
	}();
	//static variables
	var only_list = {},
		bind_list = {},
		programKey = 0,
	//tools functions... ( static function )
	is_object = function( obj ){
		return typeof obj == 'object' && obj != null;
	},is_string = function( str ){
		return typeof str == 'string';
	},is_number = function( num ){
		return typeof num == 'number' && !isNaN( num );
	},is_function = function( callback ){
		return typeof callback == 'function';
	},is_date = function( date ){
		return is_object( date ) ?
			date != 'Invalid Date' && date.constructor == Date :
			false;
	},is_dom = function( dom ){
		return dom instanceof HTMLElement;
	},default_object = function( obj ){
		return is_object( obj ) ?
			obj : {};
	},default_function = function( callback ){
		return is_function( callback ) ?
			callback : function(){};
	},default_date = function( date ){
		return in_case(
			is_date( date ),
			date ,
			function(){
				var _date = new Date( date );
				return in_case(
					is_date( _date ),
					_date ,
					new Date()
				);
			}
		);
	},in_case = function( bl , arg1 , arg2 ){
		var set_callback = function( arg ){
			return is_function( arg ) ?
				arg() : arg;
		};
		return bl ?
			set_callback( arg1 ) : 
			set_callback( arg2 );
	},each = function( obj , callback , bl , bn ){
		var _obj = default_object( obj ),
			_callback = default_function( callback ),
			num = -1,
			length = _obj.length,
			bl_callback,
			result;
		return in_case(
				is_number( length ),
				function(){
					if( !bl )
						bl_callback = function(){
							return ++ num < length;
						}
					else
						num = length,
						bl_callback = function(){
							return -- num >= 0;
						}
					for( ; bl_callback() ; ){
						result = _callback( num , _obj[ num ] , _obj );
						if( result === false )
							break;
					}
				},
				function(){
					bl_callback = function(){
						return true;
					};
					if( bn )
						bl_callback = function(){
							return _obj.hasOwnProperty( num );
						}
					for( num in _obj ){
						if( bl_callback() )
							result = _callback( num , _obj[ num ] , _obj );
						if( result === false )
							break;
					}
				}
			),
			result;
	},
	assign = function(){
		var result = {};
		return each( arguments , function( key , value ){
			each( value , function( in_key , in_value ){
				result[ in_key ] = in_value;
			} );
		} ),
		result;
	},
	addEventListener = function( target , type , callback ){
		if( !is_dom( target ) || !type || !is_function( callback ) )
			return false;
		var target_list = [];
		bind_list[ type ] = bind_list[ type ] || _map();
		if( bind_list[ type ].has( target ) )
			target_list = bind_list[ type ].get( target );
		else
			bind_list[ type ].set( target , target_list );
		target_list.push( callback );
		target.addEventListener( type , callback );
		return target_list.length - 1;
	},
	removeEventListener = function( target , type , index ){
		if( !is_dom( target ) || !type )
			return false;
		if( !bind_list[ type ] || !bind_list[ type ].has( target ) )
			return u;
		var target_list = bind_list[ type ].get( target );
		if( index !== u ){
			if( target_list[ index ] )
				target.removeEventListener( type , target_list[ index ] ),
				target_list.splice( index , 1 );
		} else
			each( target_list , function( key , value ){
				target.removeEventListener( type , value );
			}),
			target_list = [];
	},
	_map = function(){
		var callback,self,
			_map_list = {
				keys : [],
				values : []
			},
			_foreach = function( callback ){
				if( !is_function( callback ) )
					return;
				each( _map_list.keys , function( key , value ){
					callback( value , _map_list.values[ key ] , key );
				} );
			},
			_get = function( key ){
				var result;
				_foreach( function( in_key , in_value , _key ){
					if( in_key == key )
						result = [_key , in_value];
				} );
				return result;
			},
			_has = function( key ){
				var result = false;
				_foreach( function( in_key , in_value ){
					if( in_key == key )
						result = true;
				} );
				return result;
			},
			_set = function( key , value ){
				var data;
				if( data = _get( key ) )
					_map_list.values[ data[ 0 ] ] = value;
				else
					_map_list.values.push( value ),
					_map_list.keys.push( key );
			},
			_delete = function( key ){
				var data;
				if( data = _get( key ) )
					_map_list.values.splice( data[0] , 1 ),
					_map_list.keys.splice( data[0] , 1 );
			} ;
		return callback = new Function(),
			callback.prototype = {
				constructor : callback,
				get : function( key ){
					var result = _get( key );
					return result ?
						result[ 1 ] : u;
				},
				set : function( key , value ){
					return _set( key , value );
				},
				has : function( key ){
					return _has( key );
				},
				forEach : function( callback ){
					if( is_function( callback ) )
						_foreach(function( key , value ){
							callback( key , value );
						});
					return this;
				},
				'delete' : function( key ){
					_delete( key );
					return this;
				}
			},
			new callback();
	},
	handle_try = function( arg1 , arg2 , arg3 ){
		var arg;
		try{
			arg = arg2();
		}catch( err ){
			arg = default_function( arg1 )();
		}
		return default_function( arg3 )( arg );
	},
	append = function( arg1 , arg2 ){
		return arg1.appendChild( arg2 ),
			arg1;
	},
	//handle functions... ( private function )
	check_leap = function( year ){
		if( !is_number( year ) )
			return false;
		return in_case(
			year % 100 == 0,
			year % 400,
			year % 4
		) == 0;
	},
	get_errcode = function( key1 , key2 ){
		return in_case(
			errcode[ key2 ] && errcode[ key2 ][ key1 ],
			errcode[ key2 ][ key1 ],
			false
		);
	},
	get_month_list = function( year ){
		var month_list = [31,28,31,30,31,30,31,31,30,31,30,31];
		if( check_leap( year ) )
			month_list[ 1 ] = 29;
		return month_list;
	},
	get_year = function( date ){
		return default_date( date ).getFullYear();
	},
	get_month = function( date ){
		return default_date( date ).getMonth();
	},
	get_date = function( date ){
		return default_date( date ).getDate();
	},
	get_day = function( date ){
		return default_date( date ).getDay();
	},
	get_no_01_day = function( date , day ){
		var sat_date = date - day - 1;
		return 0 - in_case( 
			( sat_date = sat_date % 7 ) > 0, 
			sat_date - 7,
			sat_date
		);
	},
	handle_arguments = function( config ){
		var _config = handle_config_format( config ),
			result = {},
			callback_list = {};
		if( !( result.context = handle_context( _config.context ) ) )
			return get_errcode( 'context' , 'handle' );
		result.date = handle_date( _config.date );
		callback_list.container = handle_create_function( _config.set_container_className );
		callback_list.header = handle_create_function( _config.set_header_className );
		callback_list.header_content = handle_create_function( _config.set_header_content_className );
		callback_list.header_date = handle_create_function( _config.set_header_date_className );
		callback_list.left_icon = handle_create_function( _config.set_left_icon_className );
		callback_list.right_icon = handle_create_function( _config.set_right_icon_className );
		callback_list.content = handle_create_function( _config.set_content_className );
		callback_list.row = handle_create_function( _config.set_row_className );
		callback_list.cell = handle_create_function( _config.set_cell_className );
		callback_list.style = handle_create_function( _config.set_style , 'style' );
		result.create = callback_list;
		return result;
	},
	handle_config_format = function( config ){
		var _config = default_object( config ),
			result = {},
			arg;
		return each( default_config , function( key , value , obj ){
			arg = in_case( 
				_config[ key ] !== u,
				_config[ key ]
			);
			result[ key ] = in_case(
				is_function( value ),
				function(){
					return value( arg );
				},
				arg || value
			);
		} , true ),
		result;
	},
	handle_context = function( context ){
		var _context;
		in_case( 
			is_dom( context ),
			function(){
				_context = context;
			},
			function(){
				in_case(
					is_string( context ),
					function(){
						handle_try( u , function(){
							_context = document.querySelector( context );
						} );
					}
				);
			}
		);
		if( !_context )
			return false;
		return _context;
	},
	handle_date = function( date ){
		return default_date( date );
	},
	handle_create_function = function( className , nodes ){
		var _nodes = nodes ? nodes : 'div';
		return function( callback , arg ){
			var div = document.createElement( _nodes );
			div.className = className || '';
			if( false === callback.apply( div , arg ) )
				return false;
			return div;
		}
	};
	return function( __config ){
		var callback,fn,self,
			appKey = ++ programKey,
			bind_status = 0,
			split_date = function( year , month ){
				return [ year , format_date( month + 1 ) ].join( ' - ' );
			},
			format_date = function( num ){
				return in_case(
					num < 10,
					'0' + ( num - 0 ),
					num
				);
			},
			set_date_data = function( target , year , month , date , day ){
				return target.setAttribute( 'data-year' , year ),
				target.setAttribute( 'data-month' , month + 1 ),
				target.setAttribute( 'data-date' , date ),
				target.setAttribute( 'data-day' , day ),
				target;
			};
		return callback = new Function(),
			fn = callback.prototype = {
				constructor : callback,
				init : function( config ){
					self = this;
					var _config = handle_arguments( assign( __config , config ) ),
						style_rules_wrap = '\r\n',
						style_rules_header = '{' + style_rules_wrap,
						style_rules_footer = '}' + style_rules_wrap,
						style_rules = '';
					if( !is_object( _config ) )
						return this.err( _config );
					this.DATE = _config.date;
					this.year = get_year( this.DATE );
					this.month = get_month( this.DATE );
					this.date = get_date( this.DATE );
					this.day = get_day( this.DATE );
					this.date_length = get_month_list( this.year )[ this.month ];
					this.context = _config.context;
					this.create = _config.create;
					each( styles_rules , function( key , value ){
						if( value.type == 'style' )
							style_rules += ( value.target + style_rules_header ),
							each( value.stylesRules , function( in_key , in_value ){
								style_rules += ( in_key + ':' + in_value + ';' + style_rules_wrap );
							} , true ),
							style_rules += style_rules_footer;
					} , true );
					append( document.body , this.style = this.query_nodes( 'style' , style_rules , true ) );
					return this;
				},
				err : function( code ){
					throw new Error( code );
				},
				show : function( mode ){
					var container = this.container = this.query_nodes( 'container' ),
						header = this.header = this.query_nodes( 'header' ),
						header_content = this.header_content = this.query_nodes( 'header_content' ),
						left_icon = this.left_icon = this.query_nodes( 'left_icon' , '<' ),
						header_date = this.header_date = this.query_nodes( 'header_date' ,  split_date( this.year , this.month ) ),
						right_icon = this.right_icon = this.query_nodes( 'right_icon' , '>' )
						content = this.content = this.query_nodes( 'content' ),
						bind_list = this.bind_list = _map();
					bind_list.set( container , 'container' );
					bind_list.set( header , 'header' );
					bind_list.set( header_content , 'header_content' );
					bind_list.set( left_icon , 'left_icon' );
					bind_list.set( header_date , 'header_date' );
					bind_list.set( right_icon , 'right_icon' );
					bind_list.set( content , 'content' );
					this.create_content_unit();
					this.default_icon_click();
					append( container , header );
					append( container , content );
					append( header , header_content );
					append( header_content , left_icon );
					append( header_content , header_date );
					append( header_content , right_icon );
					append( this.context , container );
					if( bind_status ++ == 0 )
						addEventListener( container , 'click' , function( e ){
							var target = e.target;
							if( bind_list.has( target ) )
								self.click_nodes( bind_list.get( target ) , target );
						} );
					return this;
				},
				default_icon_click : function(){
					var slice_month = function(){
						if( -- self.month < 0 )
							self.year --,
							self.month = 11;
						return self.year + '-' + format_date( self.month - 0 + 1 );
					},add_month = function(){
						if( ++ self.month > 11 )
							self.year ++,
							self.month = 0;
						return self.year + '-' + format_date( self.month - 0 + 1 );
					},data = {};
					this.set_callback( 'left_icon' , 'click' , function(){
						data[ 'date' ] = slice_month();
						self.init( data ).show();
					} );
					this.set_callback( 'right_icon' , 'click' , function(){
						data[ 'date' ] = add_month();
						self.init( data ).show();
					} );
				},
				create_content_unit : function(){
					var no_01_day = get_no_01_day( this.date , this.day ),
						day_index = no_01_day,
						day = 0,
						html,
						row,
						cell,
						num;
					this.content.innerHTML = '';
					while( !num || num < this.date_length ){
						append( this.content , row = this.create_nodes( 'row' ) );
						this.bind_list.set( row , 'row' );
						for( day = 0 ; day < 7 ; day ++  ){
							html = in_case( 
								num !== u,
								function(){
									return ++ num;
								},
								function(){
									return in_case(
										day >= day_index,
										function(){
											return num = 1;
										}
									);
								}
							);
							if( num > this.date_length  )
								html = u;
							append( row , cell = this.create_nodes( 'cell' , html ) );
							if( html )
								set_date_data( cell , this.year , this.month , num , day );
							this.bind_list.set( cell , 'cell' );
						}
					}
				},
				set_event_list : function( key , name , callback ){
					if( key === u || name === u || callback === u )
						return this;
					this.event_list = this.event_list || {};
					this.event_list[ name ] = this.event_list[ name ] || {};
					this.event_list[ name ][ key ] = default_function( callback );
					return this;
				},
				get_event : function( key , name ){
					this.event_list = this.event_list || {};
					return default_function( 
						this.event_list[ name ] && this.event_list[ name ][ key ]
					);
				},
				set_callback :function( key , name , callback ){
					var _callback = default_function( callback );
					if( name === u || key === u || event[ name ] === u || event[ name ][ key ] === u )
						return this;
					this.set_event_list( key , name , _callback );
					return this;
				},
				create_nodes : function( key , html ){
					var name = 'load',
						target; 
					this.domList = this.domList || {};
					target = default_function( this.create[ key ] )(
						this.get_event( key , name ),
						[
							in_case( 
								event[ name ] && event[ name ][ key ] , 
								event[ name ][ key ]
							),
							html || ''
						]
					);
					if( target )
						this.domList[ key ] = target,
						target.innerHTML = html || '';
					return target;
				}, 
				change_nodes : function( key , target , html ){
					var name = 'change';
					if( target )
						target.innerHTML = html || '',
						this.get_event( key , name ).apply( target , [
							in_case( 
								event[ name ] && event[ name ][ key ] , 
								event[ name ][ key ]
							),
							html || ''
						] );
					return target;
				}, 
				click_nodes : function( key , target ){
					var name = 'click';
					if( target )
						this.get_event( key , name ).apply( target , [
							in_case( 
								event[ name ] && event[ name ][ key ] , 
								event[ name ][ key ]
							)
						] );
					return target;
				},
				query_nodes : function( key , innerHTML , only ){
					var target;
					this.domList = this.domList || {};
					if( only ){
						if( only_list[ key ] )
							return self.domList[ key ] = target = only_list[ key ];
						else
							return only_list[ key ] = target = self.create_nodes( key , innerHTML );
					}
					return in_case(
						this.domList[ key ],
						function(){
							target = self.domList[ key ];
							return self.change_nodes( key , target , innerHTML );
						},
						function(){
							return target = self.create_nodes( key , innerHTML );
						}
					);
				}
			},
			new callback().init();
	}
}( window , void(0) );