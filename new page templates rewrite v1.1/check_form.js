define( 'verify' , function( callback ){
	return callback;
}(function( w , u ){
	var default_config = {
		'context' : 'body',
		'no_reload_iframe_name' : 'no_reload_target',
		'unit_type' : 'data-verify_mode' ,
		'verify_type' : 'data-verify_type',
		'user_verify_type' : 'data-user_verify_type',
		'verify_ins_key' : 'data-verify_ins_key',
		'verify_detail_location' : 'data-verify_detail_location',
		'verify_group_key' : 'data-verify_group_key',
		'verify_group_type' : 'data-verify_group_type',
		'none_verify' : 'data-none_verify',
		'verify_detail_type' : {
			'underline' : 1,
			'alert' : 2,
			'toast' : 3
		},
		'verify_unit_type' : {
			'' : 1,
			'check_empty' : 1,
			'check_allway_assess' : 2,
			'check_email' : 3,
			'check_telnumber' : 4,
			'check_allnumber' : 5,
			'check_date' : 6,
			'check_time' : 7,
			'check_datetime' : 8,
			'check_file' : 9,
			'check_image' : 10,
			'custom_check' : 11,
			'check_radio' : 12
		},
		'group_type' : {
			'__default__' : 1,
			'and' : 1,
			'or' : 2
		},
		'default_group_radio_or_checkbox_key' : '__default_radio_or_checkbox__',
		'default_group_radio_or_checkbox_value' : 'or',
		'verify_detail_className' : 'detail',
		'verify_change_className' : {
			'success' : 'success',
			'fail' : 'fail'
		},
		'verify_regexp' : {
			3 : [ /^\w+\@\w+\.\w+.*$/ ],
			4 : [/^((\(\+?\d+\))|(\+\d+))?(\-?\d+)+$/ , /[\+\(\)\-]+/g ],
			5 : [ /^\d+$/ ],
			6 : [ /^(\d{1,4})([^\w])(\d{1,4})([^\w])(\d{1,4})$/ ],
			7 : [ /^(0?[1-9]|1[0-9]|2[0-3])\:([0-5]?[0-9])\:([0-5]?[0-9])$/ ],
			8 : [ /(\d{1,4})([^\w])(\d{1,4})([^\w])(\d{1,4})$/ ],
			10 : [ /^bmp|gif|jpg|jpeg|png$/i ]
		},
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
			},
			1003 : {
				code : 1003,
				template : 'form 未指定 ...',
				status : 1
			},
			1004 : {
				code : 1004,
				template : '请调整ie浏览器的安全级别以运行脚本 ：\r\n IE -> Internet选项 -> 安全 -> 自定义级别 -> ActiveX控件和插件 -> 对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全） -> 启用',
				status : '3,0'
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
	var bind_list,data,group,
	create = function( node ){
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
	};
	return function( form , tool , alert , toast , $ , ajax , putty , lang ){
		var handle_form = function( form ){
			var target = $( form );
			return target.length ?
				target : 
				$( default_config.context );
		}, handle_form_unit = function( data ){
			var result = {},
				target,
				type;
			return tool.each( data , function( key , value ){
				type = value.getAttribute( default_config.unit_type );
				if( type = default_config.verify_detail_type[ type ] )
					target = handle_verify_type( handle_radio_or_checkbox( value ) , type ),
					( result[ target.verify_unit_type ] = result[ target.verify_unit_type ] || [] ).push( target );
			}),
			result;
		}, handle_radio_or_checkbox = function( target ){
			var $_target = $( target ),
				_target = $_target.get( 0 ),
				name = _target.name,
				check_radio = function( target ){
					return target.type == 'checkbox' || target.type == 'radio';
				};
			if( check_radio( _target ) && !$_target.attr( default_config[ 'verify_group_key' ] ) )
				$_target.attr( default_config[ 'verify_group_key' ] , default_config.default_group_radio_or_checkbox_key + ( name || '' ) ),
				$_target.attr( default_config[ 'verify_group_type' ] , default_config.default_group_radio_or_checkbox_value );
			return target;
		}, handle_verify_type = function( unit , type ){
			var target = $( unit ),
				verify_type = target.attr( default_config[ 'verify_type' ] ),
				user_verify = target.attr( default_config[ 'user_verify_type' ] ),
				verify_ins_key = target.attr( default_config[ 'verify_ins_key' ] ),
				verify_detail_location = target.attr( default_config[ 'verify_detail_location' ] ),
				verify_group_key = target.attr( default_config[ 'verify_group_key' ] ),
				verify_group_type = target.attr( default_config[ 'verify_group_type' ] ),
				verify_unit_type = default_config.verify_unit_type[ verify_type ];
			lang.verify = tool.default_object( lang.verify );
			lang.verify.ins = tool.default_object( lang.verify.ins );
			result = {
				target:target.get( 0 )
			};
			if( verify_unit_type )
				result[ 'mode' ] = type,
				result[ 'verify_type' ] = verify_list[ verify_unit_type ],
				result[ 'type' ] = verify_type,
				result[ 'verify_unit_type' ] = verify_unit_type,
				result[ 'group_key' ] = verify_group_key,
				result[ 'group_type' ] = handle_group_type( verify_group_type ),
				result[ 'user_type' ] = handle_user_verify( user_verify ),
				result[ 'success' ] = function( target , detail , location , bn ){
					return verify_callback[ type ].success( target , detail , location , bn );
				},
				result[ 'fail' ] = function( target , detail , location , bn ){
					return verify_callback[ type ].fail( target , detail , location , bn );
				},
				result[ 'clear' ] = function( target ){
					return verify_callback[ type ].clear( target );
				},
				result[ 'ins' ] = lang.verify.ins[ verify_ins_key ] || {},
				result[ 'location' ] = handle_user_detail_location( target , verify_detail_location ),
				result[ 'value' ] = handle_value( target ),
				result
			return result;
		}, handle_query_unit_type = function(){
			return '[' + default_config.unit_type + ']';
		}, handle_user_verify = function( __user_verify__ ){
			var error_callback = function(){
				result = eval( 'new Function( " return '+ __user_verify__ +'" )' );
			},result;
			tool.handle_try( error_callback , function(){
				!tool.is_function( eval( 'result = ' + __user_verify__ ) ) && error_callback() ;
			});
			return result;
		}, handle_group_type = function( type ){
			return default_config.group_type[ type && type.toLocaleLowerCase() ] ||default_config.group_type[  '__default__' ];
		},handle_user_detail_location = function( target , location ){
			var _target = $( target ),
				dom;
			return dom = $( location ).get( 0 ),
				tool.is_dom( dom ) ?
					dom :
					_target.parent();
		}, handle_value = function( target ){
			return tool.trim( $( target ).val() );
		},get_verify_unit = function( form ){
			return handle_form_unit( $( handle_form( form ).find( handle_query_unit_type() ) ) );
		},get_attr_action = function( target ){
			return $( target ).attr( 'action' );
		},get_attr_method = function( target ){
			return $( target ).attr( 'method' );
		},get_attr_target = function( target ){
			return $( target ).attr( 'target' );
		},get_attr_enctype = function( target ){
			return $( target ).attr( 'enctype' );
		},get_attr_accept = function( target ){
			return $( target ).attr( 'accept-charset' );
		},get_iframe_document = function( iframe ){
			return iframe.contentDocument;
		},get_file = function( input ){
			if( !input.value )
				return ;
			var ie_vision = tool.is_IE();
			if( ie_vision && ie_vision <= 9 )
				return get_file_ie( input );
			return get_file_common( input );
		},get_file_ie = function( input ){
			var result = {},file;
			return input.select(),
				input.blur(),
				file = input.value.split( '/' ),
				result.url = document.selection.createRange().text,
				result.fileName = file[ file.length - 1 ],
				result.fileSize = new ActiveXObject( "Scripting.FileSystemObject" ).GetFile( result.url ).size,
				[result];
		},get_file_common = function( input ){
			var url = window.URL || window.webkitURL,
				result = [];
			return tool.each( input.files , function( key , value ){
				result.push({
					fileName : value.name,
					fileSize : value.size,
					url : url.createObjectURL( value )
				});
			} ),
				result;
		}, get_map_first = function( map ){
			var data;
			return map.forEach(function( value , key ){
				return data !== u ? 
					false :
					data = value;
			}),
				data;
		},verify_list = new function(){
			var check = function( key , index , value , type , replace ){
				if( !type )
					return ( value || '' ).match( default_config.verify_regexp[ key ][ index ] );
				switch( type ){
					case 1:
						return default_config.verify_regexp[ key ][ index ].test( value || '' );
					case 2:
						return ( value || '' ).replace( default_config.verify_regexp[ key ][ index ] , replace || '' );
				}
			},change_format = function( num ){
				return num < 10 ? '0' + ( num - 0 ) : num;
			},check_image_name = function( filename ){
				var name = filename.split( '.' );
				return check( 10 , 0 , name[ name.length - 1 ] || '' );
			},self = this;
			this[ 1 ] = function( value ){
				self.verify_unit = value;
				return value == ''?
					false : true;
			};
			this[ 2 ] = function( value ){
				self.verify_unit = value;
				return true;
			}
			this[ 3 ] = function( value ){
				self.verify_unit = value;
				return check( 3 , 0 , value ) ?
					true : false;
			}
			this[ 4 ] = function( value ){
				var result;
				self.verify_unit = value;
				 if( result = check( 4 , 0 , value ) )
				 	result = self.verify_unit = check( 4 , 1 , value , 2 , '' );
				 return result ?
				 	true: false;
			}
			this[ 5 ] = function( value ){
				self.verify_unit = value;
				return  check( 5 , 0 , value ) ?
					true : false;
			}
			this[ 6 ] = function( value ){
				self.verify_unit = value,split_icon = '/';
				var result,_date = check( 6 , 0 , value );
				if( _date && tool.is_date( result = new Date( [
					_date[ 1 ] = change_format( _date[ 1 ] ),
					_date[ 2 ],
					_date[ 3 ] = change_format( _date[ 3 ] ),
					_date[ 4 ],
					_date[ 5 ] = change_format( _date[ 5 ] )
					].join( '' ) ) ) )
					return self.verify_unit = [ _date[ 1 ] , _date[ 3 ] , _date[ 5 ] ].join( '/' ),
						true;
				return false;
			}
			this[ 7 ] = function( value ){
				self.verify_unit = value;
				if( check( 7 , 0 , value ) )
					return self.verify_unit = check( 7 , 0 , value , 2 , function( all , hour , minute , second ){
						return change_format( hour ) + ':' + change_format( minute ) + ':' + change_format( second );
					}  ),
					true;
				return false;
			}
			this[ 8 ] = function( value ){
				self.verify_unit = value;
				var result = {
					date : '',
					time : ''
				},_time = check( 8 , 0 , value );
				if( _time )
					result.date = self[ 6 ]( tool.trim( check( 8 , 0 , value , 2 , '' ) ) ) ? self.verify_unit : '' ,
					result.time = self[ 7 ]( tool.trim( _time[ 0 ] ) ) ? self.verify_unit : '';
				if( result.date && result.time && tool.is_date( new Date( result = result.date + ' ' + result.time ) ) )
					return self.verify_unit = result,
						true;
				return false;
			}
			this[ 9 ] = function( value ){
				self.verify_unit = [];
				var result;
				return ( result = get_file( this ) ) && result.length ?
					( self.verify_unit = result , true ): 
					false;
			}
			this[ 10 ] = function( value ){
				self.verify_unit = [];
				var result,data = [];
				return result = get_file( this ),
					tool.each( result , function( key , value ){
						( value.image = new Image() ).src = value.url;
						if( check_image_name( value.fileName ) )
							data.push( value );
					} , true ),
					data.length ?
						( self.verify_unit = data , true ): 
						false;
			}
			this[ 11 ] = function( value ){
				self.verify_unit = value;
				return true;
			}
			this[ 12 ] = function( value ){
				self.verify_unit = value;
				return this.checked ? 
					true : false;
			}
		}(),
		verify_callback = new function(){
			var _target,change_className;
			this[1] = new function(){
				var get_detail = function( target , detail , location ){
					_target = $( target ).get( 0 );
					return $( data.has( _target ) ?
						data.get( _target ) :
						create_detail( _target , detail , location ) ).html( detail ).show();
				}, create_detail = function( target , detail , location ){
					var _target;
					return data.set( $( target ).get( 0 ) , _target = $( '<div>' ).addClass( default_config.verify_detail_className ).appendTo( location ) ),
						_target;
				}, change_className = function( target , type ){
					var target_className = default_config.verify_change_className[ type ],
						other_className = default_config.verify_change_className.success;
					if( type == 'success' )
						other_className = default_config.verify_change_className.fail;
					return $( target ).removeClass( other_className ).addClass( target_className );
				}, clear_className = function( target ){
					var _target = $( target );
					return tool.each( default_config.verify_change_className , function( key , value ){
						_target.removeClass( value );
					} ),
						target;
				}, clear_detail = function( target ){
					return $( data.get( $( target ).get( 0 ) ) ).remove();
				};
				this.success = function( target , detail , location , bn ){
					var _detail = get_detail( target , detail , location ),
						type = 'success';
					change_className( _detail , type );
					change_className( target , type );
					return _detail;
				};
				this.fail = function( target , detail , location , bn ){
					var _detail = get_detail( target , detail , location ),
						type = 'fail';
					change_className( _detail , type );
					change_className( target , type );
					return _detail;
				};
				this.clear = function( target ){
					clear_detail( target );
					clear_className( target );
					return target;
				}
			}();
			this[2] = new function(){
				var get_detail = function( target , detail , location ){
					_target = $( target ).get( 0 );
					return data.has( _target ) ?
						data.get( _target ) :
						create_detail( _target , detail , location );
				}, create_detail = function( target , detail , location ){
					var _target;
					return data.set( $( target ).get( 0 ) , _target = alert({
						context : location,
						header : lang.verify.alert._default_verify_alert_header,
						body : detail,
						btns : [{
							title : lang.verify.alert._default_verify_alert_btn_title,
							click : function( hide ){
								hide();
							}
						}]
					}) ),
						_target;
				}, change_className = function( target , type ){
					var target_className = default_config.verify_change_className[ type ],
						other_className = default_config.verify_change_className.success;
					if( type == 'success' )
						other_className = default_config.verify_change_className.fail;
					return $( target ).removeClass( other_className ).addClass( target_className );
				}, clear_className = function( target ){
					var _target = $( target );
					return tool.each( default_config.verify_change_className , function( key , value ){
						_target.removeClass( value );
					} ),
						target;
				}, clear_detail = function( target ){
					var _target = $( target ).get( 0 ),
						_data = data.get( _target );
					return _data && _data.remove(),
						data.delete( _target );
				};
				this.success = function( target , detail , location , bn ){
					var type = 'success';
					change_className( target , type );
				};
				this.fail = function( target , detail , location , bn ){
					var _detail = get_detail( target , detail , location ),
						type = 'fail';
					if( detail && bn )
						_detail.show();
					change_className( target , type );
					return _detail;
				};
				this.clear = function( target ){
					clear_detail( target );
					clear_className( target );
					return target;
				}
			}();
			this[3] = new function(){
				var get_detail = function( target , detail , location ){
					_target = $( target ).get( 0 );
					return data.has( _target ) ?
						data.get( _target ) :
						create_detail( _target , detail , location );
				}, create_detail = function( target , detail , location ){
					var _target;
					return data.set( $( target ).get( 0 ) , _target = toast({
						context : location,
						title : detail || '',
						time : 2000
					}) ),
						_target;
				}, change_className = function( target , type ){
					var target_className = default_config.verify_change_className[ type ],
						other_className = default_config.verify_change_className.success;
					if( type == 'success' )
						other_className = default_config.verify_change_className.fail;
					return $( target ).removeClass( other_className ).addClass( target_className );
				}, clear_className = function( target ){
					var _target = $( target );
					return tool.each( default_config.verify_change_className , function( key , value ){
						_target.removeClass( value );
					} ),
						target;
				}, clear_detail = function( target ){
					var _target = $( target ).get( 0 ),
						_data = data.get( _target );
					return _data && _data.remove(),
						data.delete( _target );
				};
				this.success = function( target , detail , location , bn ){
					var type = 'success';
					change_className( target , type );
				};
				this.fail = function( target , detail , location , bn ){
					var _detail = get_detail( target , detail , location ),
						type = 'fail';
					if( detail && bn )
						_detail.show();
					change_className( target , type );
					return _detail;
				};
				this.clear = function( target ){
					clear_detail( target );
					clear_className( target );
					return target;
				}
			}();
		}(),
		handle_group_callback = function( list , callback ){
			var target,result,data,type ;
			return tool.each( tool.reverse( list ) , function( key , value ){
				target = $();
				result = [];
				data = [];
				group[ key ].forEach(function( value , key ){
					if( !check_none_verify( key ) )
						target[ target.length ++ ] = key,
						result.push( value.verify() ),
						data.push( value.data ),
						type = type || value.data.group_type;
					else
						value.data.clear( value.data.target );
				});
				switch( type - 0 ){
					case 1:
						handle_group_AND_callback( target , result , data , callback );
						break;
					case 2:
						handle_group_OR_callback( target , result , data , callback );
						break;
				}
			} , true );
		}, handle_group_AND_callback = function( target , result , data , callback ){
			var bn = true;
			return result.forEach(function( value , key ){
				if( bn == false )
					return false;
				bn = value;
			}),
				callback( bn , data[ 0 ] , target );
		}, handle_group_OR_callback = function( target , result , data , callback ){
			var bn = false;
			return result.forEach(function( value , key ){
				if( bn == true )
					return false;
				bn = value;
			}),
				callback( bn , data[ 0 ] , target );
		}, handle_response = function( res ){
			var response;
			return tool.handle_try(function(){
				response = res;
			},function(){
				response = JSON.parse( res );
			}),
				response;
		},check_file_verify_index = function( index ){
			return index == 9 || index == 10;
		},check_radio_verify_index = function( index ){
			return index == 12;
		},check_radio_checked = function( target ){
			return $( target ).prop( 'checked' );
		}, check_none_verify = function( target ){
			return $( target ).attr( default_config.none_verify ) !== u;
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
		},
		callback,fn,self;
		return callback = new Function(),
			callback.prototype = fn = {
				init : function(){
					self = this;
					this.check();
					bind_list = bind_list || new Map();
					data = data || new Map();
					group = group || {};
					this.unit = get_verify_unit( form );
					this.action = get_attr_action( form );
					this.method = get_attr_method( form );
					this.target = get_attr_target( form );
					this.enctype = get_attr_enctype( form );
					this.accept = get_attr_accept( form );
					this.change_status( 1 );
					return this;
				},
				err : function( arr ){
					return err( this.err_code , arr ),
						this;
				},
				verify : function( unit ){
					this.check( 'is ie? has file?' );
					this.num = 0;
					var timeout_callback_list = [],
					timeout_callback = function(){
						var target;
						return handle_group_callback( timeout_callback_list , callback );
					},
					add_num = function(){
						return self.num ++;
					},callback = function( bn , value , target ){
						if( bn )
							value.success( target || value.target , value.ins[ 'success' ] , value.location , self.status == 1 );
						else
							value.fail( target || value.target , value.ins[ 'fail' ] , value.location , self.status == 1 ),
							add_num();
					},get_dom = function( dom ){
						return $( dom ).get( 0 );
					},get_result = function( value ){
						result = value.verify_type.call( value.target , value.value )
						value.value = _value = verify_list.verify_unit;
						if( false === value.user_type.call( value.target , _value ) )
							result = !result;
						return result;
					},result,_value;
					return tool.each( unit ? [[unit]] : this.unit , function( key , value ){
						tool.each( value , function( key , value ){
							if( check_none_verify( value.target ) )
								return value.clear( value.target );
							_value = '';
							get_result( value );
							if( !bind_list.has( value.target ) )
								bind_list.set( value.target , 1 ),
								$( value.target ).on({
									'change' : function(){
										value.value = handle_value( value.target );
										self.change_status( 2 );
										self.verify( value );
									},
									'input' : function(){
										value.value = handle_value( value.target );
										self.change_status( 2 );
										self.verify( value );
									}
								});
							if( value.group_key == null )
								callback( result , value );
							else
								( group[ value.group_key ] = group[ value.group_key ] || new Map() ).set( get_dom( value.target ) , {
									data : value,
									verify : function(){
										return get_result( value )
									}
								} ),
								timeout_callback_list.push( value.group_key );
						} , true )
					} , true ),
						timeout_callback(),
						this;
				},
				check : function( ins ){
					switch( ins ){
						case 'is ie? has file?' :
							this.ie_vision = tool.is_IE();
							if( ( this.unit[ 9 ] || this.unit[ 10 ] ) && this.ie_vision && this.ie_vision <= 9 ){
								tool.handle_try(function(){
									self.err_code = 1004;
									self.err();
								} , function(){
									new ActiveXObject( "Scripting.FileSystemObject" );
								});
							}
							break;
						default :
							if( !tool || !$ || !putty && false === check_putty() || !lang ){
								this.err_code = 1001;
								if( !tool )
									this.err( [ 'tool.js' ] );
								if( !$ )
									this.err( [ 'define_jquery.js' ] );
								if( !putty && false === check_putty() )
									this.err( [ 'putty.js' ] );
								if( !lang )
									this.err( [ 'lang.js' ] );
							}
							if( !alert )
								this.err_code = 1002,
								this.err( ['alert.js'] );
							if( !form || !tool.is_dom( $( form ).get( 0 ) ) )
								this.err_code = 1003,
								this.err();
							break;
					}
				},
				serializing : function( data ){
					var result = this.formData = [],
						target = {};
					return tool.each( this.unit , function( key , value ){
						tool.each( value , function( in_key , in_value ){
							if( !check_radio_verify_index( in_value.verify_unit_type ) || check_radio_checked( in_value.target ) )
								result.push({
									name : in_value.target.name,
									value : in_value.value,
									target : in_value.target,
									isFile : check_file_verify_index( in_value.verify_unit_type )
								});
						} , true )
					} ),
						tool.each( data , function( key , value ){
							if( tool.is_object( value ) && value.name ){
								result.push( target = {
									name : value.name,
									value : value.value
								});
								if( value.target )
									target.target = value.target;
								else if( tool.is_dom( value ) )
									target.target = value;
								if( target.isFile = $( target.target ).attr( 'type' ) == 'file' )
									target.value = get_file( target.target );
							}
						} , true ),
						result;
				},
				submit : function( target , data , url , method , enctype , accept ){
					var json = {},
						form = create( 'form' ),
						handle_target = function( target ){
							var iframe;
							if( target !== true && !tool.is_function( target ) )
								return target;
							return iframe = create( 'iframe' ),
								iframe.name = default_config.no_reload_iframe_name,
								iframe.id = default_config.no_reload_iframe_name,
								iframe.style.display = 'none',
								append( iframe , $( default_config.context ).get( 0 ) ),
								iframe.onload = function( e ){
									tool.is_function( target ) && target.call( this , handle_response( get_iframe_document( this ).body.innerHTML ) , e );
									remove( this );
								},
								iframe.name;
						}, handle_attr = function(){
							var result = {};
							return tool.each( json , function( key , value ){
								if( value )
									result[ key ] = value;
							} , true ),
								result;
						}, create_input = function( name , value ){
							var unit;
							return unit = create( 'input' ),
								unit.name = name,
								unit.value = value,
								unit;
						};
					json.action = this.action || url || '';
					json.method = this.method || method || 'GET';
					json.target = this.target || handle_target( target ) || '';
					json.enctype = this.enctype || enctype || '';
					json.accept = this.accept || accept || '';
					json = handle_attr( json );
					form.style.display = 'none';
					append( form , $( default_config.context ).get( 0 ) );

					return tool.each( this.serializing( data ) , function( key , value ){
						if( value.isFile )
							append( clone( value.target ) , form ),
							json.method = 'POST',
							json.enctype = 'multipart/form-data';
						else
							append( create_input( value.name , value.value ) , form );
					} , true ),
					tool.each( json , function( key , value ){
						if( value )
							form.setAttribute( key , value );
					} , true ),
					form.submit(),
					remove( form );
				},
				change_status : function( num ){
					return this.status = num,
						this;
				}
			},
			new callback().init();
	}
}( window , void( 0 ) )) , ['tool' , 'alert' , 'toast' , 'jquery' , 'ajax' , 'putty' , 'lang'] )