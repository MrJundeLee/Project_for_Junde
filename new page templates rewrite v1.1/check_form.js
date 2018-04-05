define( 'verify' , function( callback ){
	return callback;
}(function(){
	const default_config = {
		'context' : 'body',
		'unit_type' : 'data-verify_mode' ,
		'verify_type' : 'data-verify_type',
		'user_verify_type' : 'data-user_verify_type',
		'verify_ins_key' : 'data-verify_ins_key',
		'verify_detail_location' : 'data-verify_detail_location',
		'verify_detail_type' : {
			'underline' : 1,
			'alert' : 2
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
			'custom_check' : 11
		},
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
			7 : [ /^(0?[1-9]|1[0-9]|2[0-3])\:[0-5]?[0-9](\:[0-5]?[0-9])?$/ ],
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
				template : '请调整ie浏览器的安全级别以运行脚本 ： /r/n IE -> Internet选项 -> 安全 -> 自定义级别 -> ActiveX控件和插件 -> 对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全） -> 启用',
				status : '4,0'
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
	var bind_list,data;
	return function( form , tool , alert , $ , ajax , putty , lang ){
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
					target = handle_verify_type( value , type ),
					( result[ target.verify_type ] = result[ target.verify_type ] || [] ).push( target );
			}),
			result;
		}, handle_verify_type = function( unit , type ){
			var target = $( unit ),
				verify_type = target.attr( default_config[ 'verify_type' ] ),
				user_verify = target.attr( default_config[ 'user_verify_type' ] ),
				verify_ins_key = target.attr( default_config[ 'verify_ins_key' ] ),
				verify_detail_location = target.attr( default_config[ 'verify_detail_location' ] ),
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
				result[ 'user_type' ] = handle_user_verify( user_verify ),
				result[ 'success' ] = function( target , detail , location ){
					return verify_callback[ type ].success( target , detail , location );
				},
				result[ 'fail' ] = function( target , detail , location ){
					return verify_callback[ type ].fail( target , detail , location );
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
		}, handle_user_detail_location = function( target , location ){
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
					result.fileSize = new ActiveXObject( "Scripting.FileSystemObject" ).GetFile( url ).size,
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
				self.verify_unit = value;
				var result,_date = check( 6 , 0 , value );
				if( _date && tool.is_date( result = new Date( [
					_date[ 1 ] = change_format( _date[ 1 ] ),
					_date[ 2 ],
					_date[ 3 ] = change_format( _date[ 3 ] ),
					_date[ 4 ],
					_date[ 5 ] = change_format( _date[ 5 ] )
					].join( '' ) ) ) )
					return self.verify_unit = [ _date[ 1 ] , _date[ 3 ] , _date[ 5 ] ].join( '-' ),
						true;
				return false;
			}
			this[ 7 ] = function( value ){
				self.verify_unit = value;
				return check( 7 , 0 , value ) ?
					true : false;
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
				self.verify_unit = value;
				var result;
				return ( result = get_file( this ) ) && result.length ?
					( self.verify_unit = result , true ): 
					false;
			}
			this[ 10 ] = function( value ){
				self.verify_unit = value;
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
				}
				this.success = function( target , detail , location ){
					var _detail = get_detail( target , detail , location ),
						type = 'success';
					change_className( _detail , type );
					change_className( target , type );
					return _detail;
				};
				this.fail = function( target , detail , location ){
					var _detail = get_detail( target , detail , location ),
						type = 'fail';
					change_className( _detail , type );
					change_className( target , type );
					return _detail;
				};
			}()
			this[2] = function(){}
		}(),
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
		},
		callback,fn,self;
		return callback = new Function(),
			callback.prototype = fn = {
				init : function(){
					self = this;
					this.check();
					bind_list = bind_list || new Map();
					data = data || new Map();
					this.unit = get_verify_unit( form );
					return this;
				},
				err : function( arr ){
					return err( this.err_code , arr ),
						this;
				},
				verify : function( unit ){
					this.check( 'is ie? has file?' );
					this.num = 0;
					var add_num = function(){
						return self.num ++;
					},result,_value;
					return tool.each( unit ? [[unit]] : this.unit , function( key , value ){
						tool.each( value , function( key , value ){
							console.log( value );
							if( result = value.verify_type.call( value.target , value.value ) )
								 value.value = _value = verify_list.verify_unit;
							if( false === value.user_type.call( value.target , _value ) )
								result = !result;
							if( result )
								value.success( value.target , value.ins[ 'success' ] , value.location );
							else
								value.fail( value.target , value.ins[ 'fail' ] , value.location );
							if( !bind_list.has( value.target ) )
								bind_list.set( value.target , 1 ),
								$( value.target ).on({
									'change' : function(){
										value.value = handle_value( value.target );
										self.verify( value );
									},
									'input' : function(){
										value.value = handle_value( value.target );
										self.verify( value );
									}
								})
						} , true )
					} , true ),
						this;
				},
				check : function( ins ){
					switch( ins ){
						case 'is ie? has file?' :
							this.ie_vision = tool.is_IE();
							if( this.unit[ 9 ] || this.unit[ 10 ] || this.ie_vision && this.ie_vision <= 9 ){
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
				}
			},
			new callback().init();
	}
}( window , void( 0 ) )) , ['tool' , 'alert' , 'jquery' , 'ajax' , 'putty' , 'lang'] )