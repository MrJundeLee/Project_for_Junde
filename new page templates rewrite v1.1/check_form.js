define( 'verify' , function( callback ){
	return callback;
}(function(){
	var default_config = {
		'context' : 'body',
		'unit_type' : 'data-verify' ,
		'verify_type' : 'data-verify_type',
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
		'verify_regexp' : {
			3 : [ /^\w+\@\w+\.\w+.*$/ ],
			4 : [/^((\(\+?\d+\))|(\+\d+))?(\-?\d+)+$/ , /[\+\(\)]+/ , /\-+/ ],
			5 : [ /^\d+$/ ],
			7 : [ /^(0?[1-9]|1[0-9]|2[0-3])\:[0-5]?[0-9](\:[0-5]?[0-9])?$/ ]
		}
	};
	return function( form , tool , alert , $ , ajax ){
		var handle_form = function( form ){
			var target = $( form );
			return target.length ?
				target : $( default_config.context );
		}, handle_form_unit = function( data ){
			var result = {},
				type;
			return tool.each(function( key , value ){
				type = value.getAttribute( default_config.unit_type );
				if( type = default_config.verify_detail_type[ type ] )
					( result[ type ] = result[ type ] || [] ).push( handle_verify_type( value , type ) );
			}),
			result;
		}, handle_verify_type = function( unit , type ){
			var target = $( unit ),
				type = target.getAttribute( default_config[ 'verify_type' ] );
				result = {target:target};
			if( type = default_config.verify_unit_type[ type ] )
				result[ 'mode' ] = type,
				result[ 'type' ] = verify_list [ type ];
			return result;
		}, handle_query_unit_type = function(){
			return '[' + default_config.unit_type + ']';
		},get_verify_unit = function( form ){
			var data = handle_form_unit( $( form ).find( handle_query_unit_type() ) );
		},verify_list = new function(){
			var check = function( type , index , value , type , replace ){
				if( !type )
					return value.match( default_config.verify_regexp[ type ][ index ] );
				switch( type ){
					case 1:
						return default_config.verify_regexp[ type ][ index ].test( value );
					case 2:
						return value.replace( default_config.verify_regexp[ type ][ index ] , replace || '' );
				}
			}
			this[ 1 ] = function( value ){
				this.verify_unit = value;
				return value == ''?
					false : true;
			};
			this[ 2 ] = function( value ){
				this.verify_unit = value;
				return true;
			}
			this[ 3 ] = function( value ){
				this.verify_unit = value;
				return check( 3 , 0 , value ) ?
					true : false;
			}
			this[ 4 ] = function( value ){
				var result;
				this.verify_unit = value;
				 if( result = check( 4 , 0 , value ) )
				 	result[ 1 ] = check( 4 , 1 , value , 2 , '' ),
				 	result[ 4 ] = check( 4 , 2 , value , 2 , '' ),
				 	result = this.verify_unit = result[ 1 ] + result[ 4 ];
				 return result ?
				 	true: false;
			}
			this[ 5 ] = function( value ){
				this.verify_unit = value;
				return  check( 5 , 0 , value ) ?
					true : false;
			}
			this[ 6 ] = function( value ){
				this.verify_unit = value;
				var result = new Date( value );
				if( tool.is_date( result ) )
					return this.verify_unit = result,
						true;
				return false;
			}
			this[ 7 ] = function( value ){
				this.verify_unit = value;
				return check( 7 , 0 , value ) ?
					true : false;
			}
			this[ 8 ] = function( value ){
				
			}
			this[ 9 ] = function( value ){
				
			}
			this[ 10 ] = function( value ){
				
			}
			this[ 11 ] = function( value ){
				
			}
		}();
	}
}( window , void( 0 ) )) , ['tool' , 'alert' , 'jquery' , 'ajax'] )