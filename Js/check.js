//本文件 需要继承 page.js ， 请通过page.include 引入 或 在page.js引入之后引入。
/*
 *
 *check 调用方式  : page.check( 
 * 
 * 		要验证的form(字符串或dom节点),
 * 		[{
 * 	
 * 			dom : 要验证的target(字符串或dom节点),
 * 			regExp_callback : 预定义函数名 或 自定义函数( 预定义函数  : 'testDate'(日期) , 'testTime'(时间 ) , 'testDateTime'(日期时间) , 'testTelNumber'(电话号码) , 'testEmail'(邮箱) , 'testFile'(文件) , 'testPicFile'(图片文件) , 'testEmpty'(非空) , 'testAllNumber'(数字) )
 * 
 * 		}]
 * 
 * ).check({
 * 
 * 		success : 验证成功回调,//默认:空函数
 * 		fail : 验证失败回调,//默认:空函数
 * 		complete : 验证完成回调,//默认:空函数
 * 		once : 是否只调用一次回调,//默认:0
 * 		target : 验证目标,//默认:不存在
 * 		regExp_callback : 预定义函数名 或 自定义函数//默认:不存在
 * 
 * });
 * 
 * */
//js 文件 共605行;
page.define({

    'check' : function( w , u ){

        var tool = page.tool,
            view = page.view,

            each = tool.each,

            keyword = 'formData_unit',

            default_config = {

                monthList : {'january':'01','jan.':'01','jan':'01','february':'02','feb.':'02','feb':'02','march':'03','mar.':'03','mar':'03','april':'04','apr.':'04','apr':'04','may':'05','june':'06','jun.':'06','jun':'06','july':'07','jul.':'07','jul':'07','august':'08','aug.':'08','aug':'08','september':'09','sep.':'09','sep':'09','sept.':'09','sept':'09','october':'10','oct.':'10','oct':'10','november':'11','nov.':'11','nov':'11','december':'12','dec.':'12','dec':'12'},

                reg_dom_type_list : function( target ){

                    var check_arr = 'checkbox,radio',
                        type;

                    return type = page.view( target ).attr( 'type' ),

                        tool.reverse( check_arr.split( ',' ) )[ type ] != null ?

                            1 : u;

                },

                get_checked_value : function( target ){

                    var name = target.attr( 'name'),
                        get_common_name = function(){

                            return view( '[name="' + name + '"]' );

                        },
                        check = function( target ){

                            return view( target ).prop( 'checked' );

                        },
                        result;

                    return name ? each( get_common_name() , function(){

                        return result = check( this ),

                            !result;

                    } , true ) : result = check( target ),

                        result;

                },

                regList : {

                    'check_file_image' : /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i,

                    'check_date_format' : /(\d{4})|(\d{1,2})|([a-zA-Z\.]{3,})/g,

                    'check_time_format' : /\d{1,2}/g,

                    'handle_time_format' : /(\d{1,2})\s*\:\s*(\d{1,2})\s*\:\s*(\d{1,2})/,

                    'check_telnumber_format' : /^(((\+\d+)?|(\(\+?\d+\))?)((\s*(\-|\.)?(\s*\d)+)+)+)$/,

                    'check_mail' : /^\w+@\w+\.\w+(\.\w+)?$/,

                    'check_four_number' : /^\d{4}$/,

                    'check_month_format' : /^((0?\d)|(1[012]))$/,

                    'check_day_format' : /^((0?\d)|([12]\d)|(3[01]))$/,

                    'check_hour_format' : /^(0?\d|1\d|2[0123])$/,

                    'check_m_s_fotmat' : /^(0?\d|1\d|2[0123])$/,

                    'trim' : /\s*/g

                },

                checkCallback : {

                    testDate : function( arg ){

                        var config = default_config,
                            monthList = config.monthList,
                            regList = config.regList,
                            check_date_format = regList.check_date_format,
                            check_four_number = regList.check_four_number,
                            check_month_format = regList.check_month_format,
                            check_day_format = regList.check_day_format,
                            result = arg.match( check_date_format ),
                            date = [ '0000' , '00' , '00'],
                            length,
                            last,
                            index,
                            key;

                        if( !result )

                            return;

                        result = [ result[0] , result[1] , result[2] ];

                        length = result.length;

                        last = length - 1;

                        if( last <= 0 )

                            return;

                        index = check_four_number.test( result[0] ) ? 0 : ( check_four_number.test( result[ last ] ) ? last : u );

                        if( index == u )

                            return;

                        date[0] = result[ index ];

                        result.splice( index , 1 );

                        each( result , function( okey , ovalue ){

                            key = (ovalue + '').toLowerCase();

                            if( monthList[ key ] ){

                                date[1] = monthList[ key ];

                                result.splice( okey , 1 );

                                return false;

                            }

                        } , true );

                        if( date[1] - 0 === 0 ){

                            index = index == 0 ? index : index - 1;

                            date[1] = result[ index ];

                            if( !check_month_format.test( date[1] ) )

                                return;

                            result.splice( index , 1 );

                            date[1] = date[1] < 10 ? '0' + (date[1] - 0) : date[1]-0+'';

                        }

                        result[0] = parseInt(result[0]);

                        if( check_day_format.test( result[0] ) )

                            date[2] = result[0] < 10 ? '0' + (result[0] - 0) : result[0]-0+'' ;

                        else

                            return ;

                        return ( date = new Date( date.join( '/' ) ) ),

                            date == 'Invalid Date' ?

                                u :

                                (function( d ){

                                    var data = [ d.getFullYear() , d.getMonth() , d.getDate() ];

                                    return 	(data[0] = data[0] < 10 ? '0' + (data[0] - 0) : data[0]-0+''),

                                        (data[1] = data[1] < 9 ? '0' + (data[1] - 0 + 1 ) : data[1]-0 + 1 +''),

                                        (data[2] = data[2] < 10 ? '0' + (data[2] - 0) : data[2]-0+''),

                                        data.join('-');


                                })( date );

                    },

                    testTime : function( arg ){

                        var config = default_config,
                            regList = config.regList,
                            check_time_format = regList.check_time_format,
                            check_hour_format = regList.check_hour_format,
                            check_m_s_fotmat = regList.check_m_s_fotmat,
                            result = arg.match( check_time_format ),
                            data;

                        if( result === u )

                            return;

                        ( result.length = 3 ) &&

                        each( result , function( key , value ){

                            result[ key ] = value || '00';

                        } , true );

                        if( check_hour_format.test( result[0] ) && check_m_s_fotmat.test( result[1] ) && check_m_s_fotmat.test( result[2] ) )

                            data = [ result[0] < 10 ? '0' + ( result[0] - 0 ) : result[0] - 0 , result[1] < 10 ? '0' + ( result[1] - 0 ) : result[1] - 0 ,  result[2] < 10 ? '0' + ( result[2] - 0 ) : result[2] - 0  ];

                        return data ? data.join(':') : data;

                    } ,

                    testDateTime : function( arg ){

                        var config = default_config,
                            callback = config.checkCallback,
                            regList = config.regList,
                            handle_time_format = regList.handle_time_format,
                            result = arg.match( handle_time_format ),
                            index = result ? result.index : u,
                            length,
                            temp = [],
                            data = [];

                        if( index === u )

                            return;

                        length = result[0].length;

                        temp = [ arg.split( result[0] ).join('') , result[0] ];

                        data[0] = callback.testDate( tool.trim( temp[0] ) );

                        data[1] = callback.testTime( tool.trim( temp[1] ) );

                        if( data[0] && data[1] )

                            return data.join( ' ' );

                    } ,

                    testTelNumber : function( arg ){

                        var config = default_config,
                            callback = config.checkCallback,
                            regList = config.regList,
                            check_telnumber_format = regList.check_telnumber_format,
                            trim = regList.trim,
                            result,
                            data;

                        data = arg.match( check_telnumber_format );

                        if ( data == null )

                            return;

                        result = [

                            data[2] ? data[2] : '',

                            data[5] ? data[5] : ''

                        ].join( '' ).replace( trim , '' );

                        if ( result && result.length > 0 )

                            return result;

                    } ,

                    testEmail : function( arg ){

                        return default_config.regList.check_mail.test( arg ) ?

                            arg : u;

                    },

                    testFile : function( arg ){

                        return getFile( this , true , function( data , url , result ){

                            result.push( {

                                name : data.name,

                                time : data.lastModified,

                                size : ( data.size / 1000000 ).toFixed( 2 ) + 'MB',

                                type : data.type

                            } );

                            return result;

                        } );

                    },

                    testPicFile : function( arg ){

                        return getFile( this , regList.check_file_image , function( data , url , result ){

                            var img = new Image();

                            img.src = url;

                            result.push( {

                                obj : img,

                                name : data.name,

                                time : data.lastModified,

                                size : ( data.size / 1000000 ).toFixed( 2 ) + 'MB',

                                type : data.type

                            } );

                            return result;

                        } );

                    },

                    testEmpty : function( arg ){

                        return arg ?

                            arg : u;

                    },

                    testAllNumber : function( arg ){

                        return arg != '' && tool.is_number( arg - 0 ) ? arg + '' : u ;

                    }

                }

            },

            getFile = function( target , type , callback ){

                var target = view( target ),
                    files = target.prop( 'files' ),
                    windowURL = window.URL || window.webkitURL,
                    config = default_config,
                    regList = config.regList,
                    result = [];

                if( !files || !files.length )

                    return;

                each( files , function( key , value ){

                    if( page.tool.is_regExp( type ) ? type.test( value.type ) : true ){

                        result = tool.is_function( callback ) && callback( value , windowURL.createObjectURL( value ) , result );

                    } else {

                        result = [];

                        return false;

                    }

                } , true );

                return result.length == 0 ? u : result;

            },

            get_value = function( target ){

                var value,trim = tool.trim;

                if( target && ( tool.is_page_element( target ) || tool.is_dom( target ) ) )

                    return target = view( target ),

                        value = default_config.reg_dom_type_list( target ) ? default_config.get_checked_value( target ) : trim( target.val() );

            },
            handle_context = function( context ){

                var target;

                return target = view( context ),

                    target.length ?

                        target :

                        view( document.body );

            },
            handle_regExp_callback = function( regExp_callback ){

                return tool.is_function( regExp_callback ) ?

                    regExp_callback :

                    default_config.checkCallback[ default_config.checkCallback[ regExp_callback ] ? regExp_callback : 'testEmpty' ];

            },
            handle_config = function( config , context ){

                var result = {},domList = new Map(),
                    _target, target,reg_callback;

                return each( config , function( key , value ){

                    _target = view();

                    return target = ( each( ( ( value = tool.is_object( value ) ? value : {} ).dom , target = view( value.dom ) ) , function(){

                            view( this ).parents( context ).length && ( _target[ _target.length ++ ] = this );

                        } , true ) , _target ),

                        reg_callback = handle_regExp_callback( value.regExp_callback ),

                        target && ( result[ key ] = [target,reg_callback] , each( target , function(){

                            domList.set( this , {

                                index : key,
                                this_data : result[ key ],
                                data : result,
                                reg_callback : reg_callback

                            });

                        } , true ) ),

                        u;

                } , true ),

                    [result,domList];

            },
            handle_arguments = function( json ){

                var _json ,result = {};

                return _json = tool.is_object( json ) ? json : {},

                    result.success_callback = tool.is_function( _json.success ) ? _json.success : new Function("console.log(this,arguments)"),

                    result.fail_callback = tool.is_function( _json.fail ) ? _json.fail : new Function("console.log(this,arguments)"),

                    result.complete_callback = tool.is_function( _json.complete ) ? _json.complete : new Function("console.log(this,arguments)"),

                    result.once = _json.once || 0,

                    result.target = _json.target && view( _json.target ),

                    result.reg_callback = _json.regExp_callback && handle_regExp_callback( _json.regExp_callback ),

                    result;

            },
            handle_check = function( status , json , domList ){

                var check = function( target , check_callback , success , fail , complete ){

                        var _target = view( target ),
                        	target_callback,
                        	other_callback,
                        	target_arg,
                        	other_arg,
                        	result,value;

                        console.log( target );
                        	
                        check_callback && _target.each( function(){
                        	
                        	if( null != ( result = check_callback.call( target , value = get_value( target ) ) ) ){
                        		
                        		target_callback = success;
                        		
                        		other_callback = fail;
                        		
                        		target_arg = [result];
                        		
                        		other_arg = [value];
                        		
                        	} else {
                        		
                        		target_callback = fail;
                        		
                        		other_callback = success;
                        		
                        		other_arg = [result];
                        		
                        		target_arg = [value];
                        		
                        	}
                        	
                        	if( false === target_callback.apply( target , target_arg ) )
                        	
                        		other_callback.apply( target , other_arg );
                        		
                        	complete.call( target , value );
                        	
                        } , true );

                        return result != null;

                    },
                    result,target;

                switch( status ){

                    case 0:

                        domList.forEach(function( value , key ){

                            return result = check( key , value.reg_callback , json.success_callback , json.fail_callback , json.complete_callback ),

                                json.once ? result : u;

                        });

                        break;

                    case 1:

                        check( json.target , ( target = domList.get( json.target ) || {} ).reg_callback , json.success_callback , json.fail_callback , json.complete_callback );

                        break;

                    case 2:

                        check( json.target , json.reg_callback , json.success_callback , json.fail_callback , json.complete_callback );

                        break;

                }

            };

        return function( context , config ) {

            var callback,fn,self;

            return callback = new Function(),

                fn = callback.prototype = {

                    constructor: page,

                    init : function( context , config ){

                        var list;

                        this.context = handle_context( context );

                        list = handle_config( config , this.context );

                        this.data = list[0];

                        this.domList = list[1];

                        return self = this;

                    },

                    check : function( json ){

                        var _json = handle_arguments( json ),
                            status;

                        return status = _json.target && _json.target.length ?

                            ( _json.reg_callback ? 2 : 1 ):

                            0,

                            handle_check( status , _json , this.domList );

                    }

                },

                new callback().init( context , config );

        }

    }( window , void( 0 ) )

});