var page = function(){

    var callback,fn,self,
        each = function( obj , callback , bl ){

            var length,i,result;

            if( 'object' == typeof obj && null != obj && 'function' == typeof callback ){

                if( !isNaN( length = obj.length - 0 ) )

                    for( i = 0 ; i < length ; i ++ ){

                        if( false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                            break;

                    }

                else if( !bl )

                    for( i in obj ){

                        if( false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                            break;

                    }

                else

                    for( i in obj ){

                        if( obj.hasOwnProperty( i ) && false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                            break;

                    }

            }

            return result;

        },
        define = function( json , status ){

            var handle_function = function( value ){

                    return 'function' == typeof value ?

                        function(){

                            return value.apply( this , arguments );

                        } : value;

                },
                target = status == true ?

                    self : fn;

            each( json , function( key ){

                target[ key ] = handle_function( this );

            } , true );

        };

    return function( callback ){

        return callback().init();

    }(function() {

        return callback = new Function(),

            fn = callback.prototype = {

                constructor : callback,

                init : function(){

                    return self = this;

                },

                define : function( json , status ){

                    return define( json , status ),

                        this;

                }

            },

            new callback();

    })

}();

page.define({

    'tool' : function( w , u ){

        var callback,fn,
            each = function( obj , callback , bl ){

                var length,i,result,arr;

                if( is_object( obj ) && is_function( callback ) ){

                    if( is_number( length = obj.length ) )

                        for( i = 0 ; i < length ; i ++ ){

                            if( false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                                break;

                        }

                    else if( !bl )

                        for( i in obj ){

                            if( false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                                break;

                        }

                    else

                        for( i in obj ){

                            if( obj.hasOwnProperty( i ) && false === ( result = callback.call( obj[i] , i , obj[i] , obj ) ) )

                                break;

                        }

                }

                return result;

            },
            in_case = function( bl , arg1 , arg2 ){

                var check_common = function( arg ){

                    return is_function( arg ) ? arg() : ( arg == u ? bl : arg );

                }

                return bl ? check_common( arg1 ) : check_common( arg2 );

            },

            is_type = function( arg , type ){

                var _type;

                return _type = Object.prototype.toString.call( arg ),

                    type != undefined ? _type == type : _type;

            },
            is_object = function( obj ){

                return null != obj && 'object' == typeof obj;

            },
            is_number = function( num ){

                return 'number' == typeof num && !isNaN( num );

            },
            is_string = function( str ){

                return 'string' == typeof str;

            },
            is_array = function( arr ){

                return is_type( arr , '[object Array]' );

            },
            is_function = function( func ){

                return 'function' == typeof func;

            },
            is_regExp = function( reg ){

                return is_type( reg , '[object RegExp]' );

            },
            is_dom = function( dom ){

                return dom instanceof HTMLElement;

            },
            is_page_element = function( element ){

                return element.constructor == page;

            },

            trim = function( str ){

                return ( is_string( str ) ? str : '' ).replace( /(^\s+)|(\s+$)/g , '' );

            },
            is_IE = function(){

                var userAgent = navigator.userAgent,
                    vision = navigator.appVersion.match( /MSIE\s*([0-9]+\.[0-9]+)(?=\;)/ );

                if ( !!w.ActiveXObject || "ActiveXObject" in w )

                    return vision[ 1 ] - 0;

                else if (userAgent.indexOf("Edge") > -1)

                    return "Edge";

                else

                    return false;

            },
            rand = function( min , max , num ){

                var result;

                return result = Math.random() * ( max - min ) + min,

                    is_number( num ) ?

                    result.toFixed( num ) - 0 :

                        result;

            },
            int_rand = function( min , max ){

                return rand( min , max , 0 );

            },

            to_object = function( arr ){

                var result = {},status;

                status = is_array( arr ) ? 1 : 0;

                if( status )

                    result = {length:0},

                    each( arr , function( key , value ){

                        result[ result.length ++ ] = value;

                    } , true );

                else

                    each( arr , function( key , value ){

                        result[ key ] = value;

                    } , true );

                return result;

            },
            to_array = function( obj ){

                var result;

                return result = [],

                    each( obj , function( key , value ){

                        result.push( value );

                    } , true ) , result;

            },
            reverse = function( obj ){

                var result;

                return result = {},

                    each( obj , function( key , value ){

                        result[ value ] = key;

                    } , true ) , result;

            },

            build_constructor = function( attr , prototype_attr ){

                var callback,self,fn;

                return callback = function(){

                    self = this;

                    each( attr , function( key , value ){

                        self[ key ] = value;

                    } , true );

                },

                    fn = callback.prototype = {

                        constructor : callback

                    },

                    each( prototype_attr , function( key , value ){

                        fn[ key ] = value;

                    } , true ),

                    new callback();

            },
            recursive = function( callback ){

                var recursive_callback,
                    result;

                return recursive_callback = function(){

                    return result = callback() ,

                        result === false ?

                            recursive_callback() : result;

                }

            },
            deep_copy = function( obj , own , index ){

                var r, i = 0,
                    target = obj,
                    result,
                    change_value = function( r , t ){

                        return r = !is_object( t ) ? t : ( is_array( t ) ? [] : {} );

                    },
                    callback;

                return r = !!own,

                    !is_number( index ) ?

                        callback = function( target , result ){

                            result = result || change_value( result , target );

                            each( target , function( key , value ){

                                result[ key ] = is_object( result[ key ] = change_value( result[ key ] , value ) ) ? callback( value , result[ key ] ) : value;

                            } , r );

                            return result;

                        } :

                        callback = function( target , result ){

                            result = result || change_value( result , target );

                            ++ i <= index ?

                                each( target , function( key , value ){

                                    result[ key ] = is_object( result[ key ] = change_value( result[ key ] , value ) ) ? callback( value , result[ key ] ) : value;

                                } , r ) :

                                result = target;

                            i --;

                            return result;

                        },

                    callback( target , result );

            },
            assign = function( arr1 , arr2 ){

                var target;

                return target = to_object( arr1 ),

                    each( arr2 , function( key , value ){

                        target[ key ] = value;

                    } , true ),

                    target;

            },
            assign_array = function( arr1 , arr2 ){

                var target;

                return target = to_array( arr1 ),

                    each( arr2 , function( key , value ){

                        target.push( value );

                    } , true ),

                    target;

            },
            handle_try = function( fail , start , complete ){

                var _fail = is_function( fail ) ? fail : new Function(),
                    _complete = is_function( complete ) ? complete : new Function();

                try{

                    start();

                }catch( error ){

                    _fail( error )

                }finally{

                    _complete();

                }

            };

        return function() {

            return callback = new Function(),

                fn = callback.prototype = {

                    constructor: callback,

                    init: function (bl) {

                        return this;

                    }

                } ,

                each({

                    each : each,
                    in_case : in_case,
                    is_page_element : is_page_element,
                    is_type: is_type,
                    is_object: is_object,
                    is_number: is_number,
                    is_string: is_string,
                    is_array: is_array,
                    is_function: is_function,
                    is_regExp: is_regExp,
                    is_dom: is_dom,
                    trim: trim,
                    is_IE: is_IE,
                    rand: rand,
                    int_rand: int_rand,
                    to_object: to_object,
                    to_array: to_array,
                    reverse: reverse,
                    build_constructor : build_constructor,
                    recursive: recursive,
                    deep_copy: deep_copy,
                    assign: assign,
                    assign_array: assign_array,
                    handle_try:handle_try

                }, function(key){fn[key] = this;}) ,

                new callback();

        }()

    }( window , void( 0 ) )

});

page.define({

    'putty' : function( w , u ){

        var callback,fn,self,

            tool = page.tool,

            config = {

                'window' : function(){return w;}(),

                'array' : function(){return Array.prototype;}(),

                'object' : function(){return Object.prototype;}()

            },

            handle_putty = function( type , name , callback ){

                var base;

                return ( base = config[ type ] ) &&

                    ( base[ name ] = base[ name ] || callback );

            },

            putty_callback = new function(){

                this.Map = new function(){

                    var set_json = function( key , value , _json ){

                        var json = {};

                        return json[ key ] = value,

                            json;

                    };

                    return this.type = 'window' , this.name = 'Map' ,

                        this.callback = function( callback ){

                            return function(){
                            	
                            	return new ( callback() )();
                            	
                            };

                        }( function(){

                            var keys = [],
                                values = [],
                                callback;

                            return callback = new Function(),

                                callback.prototype.clear = function(){

                                    return keys = [],

                                        values = [],

                                        this;

                                },

                                callback.prototype.delete = function( key ){

                                    var _key;

                                    return this.forEach( function( in_value , in_key ){

                                        return key == in_key ?

                                        ( _key = in_key ) && false :

                                            u;

                                    } ) ,

                                        _key ? keys.splice( _key , 1 ) && values.splice( _key , 1 ) && true : false;

                                },

                                callback.prototype.forEach = function( callback ){

                                    return tool.is_function( callback ) && tool.each( keys , function( key , value ){

                                        return callback( values[ key ] , value , set_json( value , values[ key ] ) );

                                    } , true ) , u ;

                                },

                                callback.prototype.has = function( key ){

                                    var result = false;

                                    return key != u && ( this.forEach( function( in_value , in_key ){

                                        return key == in_key ?

                                        ( result = true ) && false : u;

                                    } ) ) , result;

                                },

                                callback.prototype.get = function( key ){

                                    var result;

                                    return key != u && ( this.forEach( function( in_value , in_key ){

                                        return key == in_key ?

                                        ( result = in_value ) && false : u;

                                    } ) ) , result;

                                },

                                callback.prototype.set = function( key , value ){

                                    var result;

                                    return result = key != u && ( this.has( key ) && this.delete( key ) , true ) ?

                                    value != u && keys.push( key ) && values.push( value ) && set_json( key , value ) :

                                        u,

                                        this;

                                },

                                callback.prototype.keys = function(){return keys.slice(0);},

                                callback.prototype.values = function(){return values.slice(0);},

                                callback.prototype.toJSON = function(){

                                    var json;

                                    return json = [],

                                        this.forEach( function( value , key ){

                                            json.push( [key,value] );

                                        } ),

                                        json;

                                },

                                callback.prototype.size = 0,

                                Object.defineProperty( callback , 'delete' , {get:function(){this.size = keys.length;}} ),

                                Object.defineProperty( callback , 'clear' , {get:function(){this.size = keys.length;}} ),

                                Object.defineProperty( callback , 'set' , {get:function(){this.size = keys.length;}} ),

                                callback;

                        } ),

                        this;

                }();

                this.forEach = new function(){

                    return this.type = 'array' , this.name = 'forEach' ,

                        this.callback = function( callback ){

                            return callback;

                        }( function( callback ){

                            var arr = this;

                            return tool.is_object( arr ) && tool.is_function( callback ) && tool.each( arr , function( key , value ){

                                    return callback( value , key , arr );

                                } , true )

                        } ),

                        this;

                }();

                this.fill = new function(){
                	
                	var handle_index = function( index ){
                		
                		return ( tool.is_number( index - 0 ) ? index : 0 ) - 0;
                		
                	}, handle_length = function( arr , length ){
                		
                		var _length = length - 0,
                			_arr = tool.is_object( arr ) ? arr : [],
                			arr_length = _arr.length || Object.keys( _arr ).length;
                			
                		return tool.in_case( tool.is_number( _length ) , function(){
                			
                			return tool.in_case( _length < 0 , function(){
                				
                				return arr_length + _length;
                				
                			} , _length );
                			
                		} , arr_length );
                		
                	}

                    return this.type = 'array' , this.name = 'fill' ,

                        this.callback = function( callback ){

                            return callback;

                        }( function( fill , index , length ){

                            var arr = this,
                            	_index = handle_index( index ),
                            	_length = handle_length( arr , length ),
                            	each_index = 0;

                            return tool.is_object( arr ) && tool.each( arr , function( key , value ){

                                    tool.in_case( each_index >= _index && each_index < _length , function(){
                                    	
                                    	arr[ key ] = fill;
                                    	
                                    } );
                                    
                                    each_index ++;

                                } , true ),
                                
                                	this;

                        } ),

                        this;

                }();

                this.map = new function(){

                    return this.type = 'array' , this.name = 'map' ,

                        this.callback = function( callback ){

                            return callback;

                        }( function( callback , thisValue ){

                            var arr = tool.deep_copy( this ),
                            	_thisValue = thisValue !== u ? thisValue : w;

                            return tool.is_object( arr ) && tool.each( arr , function( key , value ){
                            	
                            		arr[ key ] = callback.call( _thisValue , value , key , arr );

                                } , true ),
                                
                                	arr;

                        } ),

                        this;

                }();

            }();

        return tool.each( putty_callback , function(){

            handle_putty( this.type , this.name , this.callback );

        } , true ),

            putty_callback;

    }( window , void( 0 ) )

});

page.define({

    'view' : function( w , u ){

        var callback,fn,self,

            tool = page.tool,

            bind_callback_list = page.bind_callback_list = page.bind_callback_list || new Map(),

            handle_identity = function( dom ){

                var result = [],check_dom = function( dom ){

                    return tool.is_dom( dom ) || dom == w || dom == document;

                },obj,status;

                return result = check_dom( dom ) && ( status = 1 ) ?

                    [dom]:

                    (

                        tool.each( dom , function( key ){

                            result.push( this );

                            return status = 1,

                                !check_dom( this ) ?

                                    ( status = 0 , result = [] , false ) : u ;

                        } , true ) , result

                    ),

                    ( obj = tool.build_constructor( tool.to_object( result ) , fn ) ).length = result.length,

                    obj;

            },
            handle_style = function( target , key , value ){

                var _target = query( target ),
                    get_style = function ( target ){

                        var result;

                        if( !( result = target.style[ _key = _key || handle_key( target ) ] ) ){

                            result = target.currentStyle ?

                                target.currentStyle[_key] :

                                getComputedStyle && getComputedStyle( target , false )[ _key ];

                        }

                        return result ? result : null;

                    },
                    handle_key = function( target ){

                        return key == 'float' ? ( target.style.styleFloat ? 'styleFloat' : ( target.style.cssFloat ? 'cssFloat' : key ) ) : key

                    },
                    _key;

                if( !_target.length || !key )

                    return u;

                if( value === u )

                    return get_style( _target.get(0) );

                else

                    tool.each( _target , function(){

                        this.style[ _key = _key || handle_key( key ) ] = value;

                    } , true );

            },
            handle_attr = function( target , json ){

                var _target = query( target ),
                    attr = json.attr,
                    attr_name = json.attr_name,
                    attr_value = json.attr_value,
                    bl = json.bl,
                    check = tool.is_function( json.callback ) ? json.callback : function( attr , value ){return value;},
                    result,this_target;

                if( !_target.length )

                    return u;

                return bl ?

                    ( attr_value !== u ? tool.each( _target , function(){

                        ( this_target = this )[ attr ] && this_target[ attr ]( attr_name , check( this_target , attr_value , this_target[ attr ] , attr ) );

                    } , true ) : result = ( ( this_target = _target.get(0) ) ? check( this_target = _target.get(0) , this_target[ attr ] && this_target[ attr ]( attr_name ) , this_target[ attr ] , attr ) : u ) ) :

                    ( attr_value !== u ? tool.each( this_target = _target , function(){

                        ( this_target = this )[ attr ] = check( this_target , attr_value , this_target[ attr ] , attr );

                    } , true ) : result = ( ( this_target = _target.get(0) ) ? check( this_target = _target.get(0) , this_target[ attr ] , this_target[ attr ] , attr ) : u ) ),

                    result;

            },
            handle_classname = new function(){

                var handle = function( className ){

                        var result;

                        return ( result = tool.trim( className ) ) ?

                            result.split( ' ' ) : [];

                    },
                    _class_name,class_name;

                this.init = function(){return this;};

                this.add = function( target , className ){

                    if( className && tool.is_string( className ) )

                        handle_attr( target , {

                            attr : 'className',

                            attr_value : 1,

                            callback : function( target , value , result , attr ){

                                return _class_name = tool.reverse( class_name = handle( result ) ),

                                    _class_name[ className ] !== u ?

                                        result : ( _class_name[ className ] = class_name.length , tool.to_array( tool.reverse( _class_name ) ).join( ' ' ) );

                            }

                        } )

                };

                this.remove = function( target , className ){

                    if( className && tool.is_string( className ) )

                        handle_attr( target , {

                            attr : 'className',

                            attr_value : 1,

                            callback : function( target , value , result , attr ){

                                return _class_name = tool.reverse( class_name = handle( result ) ),

                                    _class_name[ className ] !== u ?

                                        ( delete _class_name[ className ], tool.to_array( tool.reverse( _class_name ) ).join( ' ' ) ) : result;

                            }

                        } )

                };

                this.has = function( target , className ){

                    if( className && tool.is_string( className ) )

                        return handle_attr( target , {

                            attr : 'className',

                            callback : function( target , value , result , attr ){

                                return _class_name = tool.reverse( class_name = handle( result ) ),

                                    _class_name[ className ] !== u ?

                                        true : u ;

                            }

                        } );

                };

                this.toggle = function( target , className ){

                    if( className && tool.is_string( className ) )

                        handle_attr( target , {

                            attr : 'className',

                            attr_value : 1,

                            callback : function( target , value , result , attr ){

                                return _class_name = tool.reverse( class_name = handle( result ) ),

                                    _class_name[ className ] !== u ?

                                        delete _class_name[ className ]:

                                        _class_name[ className ] = class_name.length,

                                    tool.to_array( tool.reverse( _class_name ) ).join( ' ' );

                            }

                        } )

                };

            }(),
            insert_element = new function(){

                var self = this;

                this.init = function(){return this;};

                this.create = function( _node , _attr , _html ){

                    return handle_identity( create_element( _node , _attr , _html ) );

                };

                this.append = function( target , selector ){

                    var _target = query( target ),
                        _selector = query( selector );

                    return tool.each( _target , function( key , value ){

                        tool.each( _selector , function(){

                            value.appendChild( this );

                        } , true )

                    } , true ) , this;

                };

                this.insert_before = function( target , selector ){

                    var _target = query( target),
                        _selector = query( selector),
                        parentNode;

                    return tool.each( _target , function( key , value ){

                        tool.each( _selector , function(){

                            value.parentNode.insertBefore( this , value );

                        });

                    } , true ) , this;

                };

                this.insert_after = function( target , selector ){

                    var _target = query( target),
                        _selector = query( selector),
                        parentNode,
                        after,
                        fill = create_element( 'div' , {'class':'fill'} );

                    return tool.each( _target , function( key , value ){

                        tool.each( _selector , function(){

                            parentNode = value.parentNode;

                            after = value.nextElementSibling || ( self.append( parentNode , fill ) , fill );

                            self.insert_before( after , this ).remove( fill );

                        });

                    } , true ) , this;

                };

                this.remove = function( target ){

                    var _target = query( target ),
                        parentNode;

                    return tool.each( _target , function( key , value ){

                        parentNode = value.parentNode;

                        parentNode && parentNode.removeChild( value );

                    } , true ) , this;

                }

            }().init(),
            query_element = new function(){

                var self = this;

                this.init = function(){return this;};

                this.is = function( target , selector ){

                    var _target = query( target ),
                        _selector = query( selector),
                        status;

                    return tool.each( _target , function( key , value ){

                        tool.each( _selector , function(){

                            return value == this ? ( status = 1 ) && false : u;

                        } , true );

                        return status ? true : false;

                    } , true ) , status;

                };

                this.find = function( target , selector , type , r ){

                    var _selector = query( selector ),
                        result = new Map(),
                        get_type = function( target , callback ){

                            !r ?

                            target && callback( target ) :

                                tool.each( target , function(){

                                    callback( this )

                                } )

                        },
                        data = {},
                        self = this,
                        i = 0;

                    return selector ? tool.each( query( target ) , function(){

                        get_type( this[type] , function( target ){

                            tool.is_dom( target ) && self.is( target , _selector ) && result.set( target , i ++ );

                        } );

                    } , true ) : tool.each( query( target ) , function(){

                        get_type( this[type] , function( target ){

                            tool.is_dom( target ) && result.set( target , i ++ );

                        } );

                    } , true ) ,

                        result.forEach(function( value , key ){

                            data[ value ] = key;

                        }) ,

                        result = '',

                        handle_identity( tool.to_array( data ) );

                };

                this.find_all = function( target , selector , type ){

                    var _selector = query( selector ),
                        self = this,
                        set_target = function( target ){

                            return _target = self[ type ]( target )

                        },
                        result = new Map(),
                        _target = set_target( target ),
                        data = {},
                        i = 0;

                    return !function(){

                        return _target.length ?

                            (

                                tool.each( _target , function(){

                                    result.set( this , i ++ );

                                } ) , ( _target = set_target( _target ) ) , arguments.callee()

                            ) :

                            u;

                    }(),

                        selector ? result.forEach(function( value , key ){

                            self.is( key , _selector ) && ( data[ value ] = key );

                        }) : result.forEach(function( value , key ){

                            data[ value ] = key;

                        }),

                        result = '',

                        handle_identity( tool.to_array( data ) );

                };

                this.parent = function( target , selector ){

                    return this.find( target , selector , 'parentNode' );

                };

                this.children = function( target , selector ){

                    return this.find( target , selector , 'children' , true );

                };

                this.next = function( target , selector ){

                    return this.find( target , selector , 'nextElementSibling' );

                };

                this.prev = function( target , selector ){

                    return this.find( target , selector , 'previousElementSibling' );

                };

                this.parents = function( target , selector ){

                    return this.find_all( target , selector , 'parent' );

                };

                this.find_children = function( target , selector ){

                    return this.find_all( target , selector , 'children' );

                };

                this.nextAll = function( target , selector ){

                    return this.find_all( target , selector , 'next' );

                };

                this.prevAll = function( target , selector ){

                    return this.find_all( target , selector , 'prev' );

                };

            }().init(),
            change_element = new function(){

                this.init = function(){return this;};

                this.attr = function( target , attr_name , attr_value ){

                    var attr;

                    return attr = attr_value === u ? 'getAttribute' : 'setAttribute',

                        handle_attr( target , {attr:attr,attr_name:attr_name,attr_value:attr_value,bl:true} );

                };

                this.css = function( target , key , value ){

                    return handle_style( target , key , value );

                };

                this.prop = function( target , key , value ){

                    return handle_attr( target , {attr:key,attr_value:value} );

                };

                this.html = function( target , attr_value ){

                    return handle_attr( target , {attr:'innerHTML',attr_value:attr_value} );

                };

                this.text = function( target , attr_value ){

                    return handle_attr( target , {attr:'innerText',attr_value:attr_value} );

                };

            }().init(),
            create_element = function( _node , _attr , _html ){

                var node,attr,html,element;

                return node = tool.is_string( _node ) ? _node : u,

                    attr = tool.is_object( _attr ) ? _attr : {},

                    html = tool.is_string( _html ) ? _html : '',

                node &&

                (
                    tool.each( ( element = document.createElement( node ) , attr ) , function( key ){

                        element.setAttribute( key , this );

                    } , true ) , element.innerHTML = html , element

                );

            },
            query = function( query_string ){

                var result;

                return tool.handle_try( u , function(){

                    result = tool.is_string( query_string ) ? document.querySelectorAll( query_string ) : query_string;

                }) ,

                    handle_identity( result );

            },
            bind = function( target , type , callback ){

                var _target = query( target),
                    status = type && tool.is_function( callback );

                if( !status )

                    return u;

                return tool.each( _target , function( key ){

                    this.addEventListener( type , callback );

                    return status = bind_callback_list.get( this ) || {},

                        status[ type ] = status[ type ] || ( status[ type ] = [] ),

                        status[ type ].push( callback ),

                        bind_callback_list.set( this , status );

                } , true )

            },

            trigger = function( target , type , json ){

                var _target = query( target ),
                    trigger_callback = function( target , callback ){

                        return callback.call( target , json || {} );

                    },
                    data;

                return type ? tool.each( _target , function( key , value ){

                    data = bind_callback_list.get( value ) || {},

                    tool.each( data[ type ] , function( in_key , in_value ){

                        trigger_callback( value , in_value );

                    } , true )

                } ) : tool.each( _target , function( key , value ){

                    tool.each( bind_callback_list.get( value ) , function( in_key , in_value ){

                        tool.each( in_value , function(){

                            trigger_callback( value , this );

                        } , true );

                    } , true )

                } );

            },

            unbind = function( target , type , callback ){

                var _target = query( target ),
                    removeEventListener = function( target , type , callback ){

                        return target.removeEventListener( type , callback , false );

                    },
                    each_target = function( target , callback ){

                        tool.each( target , function( key , value , arr ){

                            return callback( key , value , arr );

                        } , true )

                    },
                    each_bind_list = function( arr , type , callback ){

                        var copy_arr = arr.slice( 0 );

                        return copy_arr.forEach(function( in_value , in_key ){

                            return callback( in_value , in_key ) ? ( removeEventListener( dom , type , in_value ) , arr.splice( in_key , 1 ) ) : u;

                        });

                    },
                    dom,
                    result;

                return tool.each( _target , function(){

                    return result = bind_callback_list.get( dom = this ),

                        !type ?

                            each_target( result , function( key , value , arr ){

                                each_bind_list( value , key , new Function('return true') );

                            }) :

                            (

                                !callback ?

                                    each_target( result , function( key , value , arr ){

                                        key == type && each_bind_list( value , key , new Function('return true') );

                                    }) :

                                    each_target( result , function( key , value , arr ){

                                        return key == type ?

                                            ( each_bind_list( value , key , function( in_value ){return in_value == callback;} ) , false ) :

                                            u;

                                    })

                            ),

                        u;

                } , true )

            },
            
            change = function( w , u ){
	
				var handle_arguments = function( dom , time , callback , status ){
					
					var result = {};
					
					return result.target = dom,
					
						result.status = status == true ? 'show' : 'hide',
						
						result.time = in_case( tool.is_number( time - 0 ) , time , 0 ) - 0,
						
						result.callback = in_case( tool.is_function( callback ) , function(){return callback;} , function(){return new Function()} ),
						
						result;
					
				},
					
					get_display = function( target ){
						
						return change_element.css( target , 'display' );
						
					},
					
					get_opacity = function( target ){
						
						var opacity_num = change_element.css( target , 'opacity' );
						
						return in_case( tool.is_number( opacity_num - 0 ) , opacity_num , 1 ) - 0;
						
					},
					
					execution = function( data , callback ){
						
						var time = data.time / timeUnit,
							index = 0,
							interval_callback = function( timeUnit ){
								
								in_case( ++ index >= timeUnit , function(){
									
									callback( data , opacityUnit , true );
									
									clearInterval( timer );
									
								} , function(){
									
									callback( data , opacityUnit );
									
								} );
								
							},
							timer;
							
						callback( data , opacityUnit , true , true );
							
						in_case( time , function(){
							
							timer = setInterval(function(){
							
								interval_callback( timeUnit );
								
							} , time )
							
						} , function(){
							
							interval_callback( 0 );
							
						} );
						
					},
					
					create_opacityUnit = function( time , init ){
						
						return opacityUnit = time ? init / timeUnit : 1;
						
					},
					
					check_status = function( data ){
						
						var init_opacity;
						
						switch( data.status ){
							
							case 'show':
							
								create_opacityUnit( data.time , 1 );
							
								return function( data , opacityUnit , isEnd , isStart ){
									
									in_case( isStart , function(){
										
										change_element.css( data.target , 'display' , 'block' );
										
										change_element.css( data.target , 'opacity' , init_opacity = 0 );
										
									} , function(){
										
										in_case( isEnd , function(){
										
											change_element.css( data.target , 'opacity' , '' );
											
											data.callback.call( data.target );
											
										} , function(){
											
											change_element.css( data.target , 'opacity' , init_opacity += opacityUnit );
										
											change_element.css( data.target , 'display' , 'block' );
											
										} );
										
									} )
									
								};
								
							case 'hide':
							
								create_opacityUnit( data.time , in_case( get_display( data.target ) == 'none' , 0 , function(){
									
									return get_opacity( data.target );
									
								} ) );
							
								return function( data , opacityUnit , isEnd , isStart ){
									
									in_case( isStart , function(){
										
											in_case( opacityUnit , function(){
												
												change_element.css( data.target , 'display' , 'block' );
												
											} );
										
										init_opacity = change_element.css( data.target , 'opacity' ) - 0;
										
									} , function(){
										
										in_case( isEnd , function(){
										
											change_element.css( data.target , 'opacity' , '' );
										
											change_element.css( data.target , 'display' , 'none' );
											
											data.callback.call( data.target );
											
										} , function(){
										
											in_case( opacityUnit , function(){
												
												change_element.css( data.target , 'display' , 'block' );
												
												change_element.css( data.target , 'opacity' , init_opacity -= opacityUnit );
												
											} );
											
										} );
										
									} )
									
								};
							
						}
						
					},
					
					change = function( dom , time , callback , status ){
						
						var data = handle_arguments( dom , time , callback , status )
							_callback = check_status( data );
							
						return execution( data , _callback );
						
					},
					
					each = tool.each,
					in_case = tool.in_case,
					create = create_element,
					
					timeUnit = 100,
					
					opacityUnit;
					
				return change;
				
			}( window , void( 0 ) );

        return function( arg ) {

            var query_string = arg;

            return callback = new Function(),

                fn = callback.prototype = {

                    constructor: page,

                    init: function () {

                        return handle_identity( query( query_string ) );

                    },

                    'get' : function( index ){

                        return this[index];

                    },

                    each : function( callback ){

                        return tool.each( this , callback , true ),

                            this;

                    },

                    query : function( query_string ){

                        return query( query_string );

                    },

                    append : function( dom ){

                        return insert_element.append( this , dom ),

                            this;

                    },

                    appendTo : function( dom ){

                        return insert_element.append( dom , this ),

                            this;

                    },

                    create : function( node , attr , html ){

                        return insert_element.create( node , attr , html );

                    },

                    insert_before : function( dom ){

                        return insert_element.insert_before( this , dom ),

                            this;

                    },

                    insert_after : function( dom ){

                        return insert_element.insert_after( this , dom ),

                            this;

                    },

                    remove : function(){

                        return insert_element.remove( this ),

                            this;

                    },

                    is : function( dom ){

                        return query_element.is( this , dom );

                    },

                    parent : function( dom ){

                        return query_element.parent( this , dom );

                    },

                    children : function( dom ){

                        return query_element.children( this , dom );

                    },

                    next : function( dom ){

                        return query_element.next( this , dom );

                    },

                    prev : function( dom ){

                        return query_element.prev( this , dom );

                    },

                    parents : function( dom ){

                        return query_element.parents( this , dom );

                    },

                    find : function( dom ){

                        return query_element.find_children( this , dom );

                    },

                    nextAll : function( dom ){

                        return query_element.nextAll( this , dom );

                    },

                    prevAll : function( dom ){

                        return query_element.prevAll( this , dom );

                    },

                    attr : function( attr , value ){

                        var result;

                        return result = change_element.attr( this , attr , value ),

                            value === u ?

                                result :

                                this;

                    },

                    css : function( attr , value ){

                        var result;

                        return result = change_element.css( this , attr , value ),

                            value === u ?

                                result :

                                this;

                    },

                    prop : function( key , value ){

                        var result;

                        return result = change_element.prop( this , key , value ),

                            value === u ?

                                result :

                                this;

                    },

                    html : function( html ){

                        var result;

                        return result = change_element.html( this , html ),

                            html === u ?

                                result :

                                this;

                    },

                    text : function( text ){

                        var result;

                        return result = change_element.text( this , text ) ,

                            text === u ?

                                result :

                                this;

                    },

                    val : function( value ){

                        var result;

                        return result = change_element.prop( this , 'value' , value ) ,

                            value === u ?

                                result :

                                this;

                    },

                    addClass : function( className ){

                        return handle_classname.add( this , className ),

                            this;

                    },

                    removeClass : function( className ){

                        return handle_classname.remove( this , className ),

                            this;

                    },

                    hasClass : function( className ){

                        return handle_classname.has( this , className );

                    },

                    toggleClass : function( className ){

                        return handle_classname.toggle( this , className ),

                            this;

                    },

                    bind : function( type, callback ){

                        return bind( this , type , callback ),

                            this;

                    },

                    trigger : function( type , json ){

                        return trigger( this , type , json ),

                            this;

                    },

                    unbind : function( type , callback ){

                        return unbind( this , type , callback ),

                            this;

                    },
                    
                    show : function( time , callback ){
                    	
                    	return change( this , time , callback , true ),
                    	
                    		this;
                    	
                    },
                    
                    hide : function( time , callback ){
                    	
                    	return change( this , time , callback ),
                    	
                    		this;
                    	
                    }
                }

                ,

                new callback().init();

        }

    }( window , void( 0 ) )

});

page.define({

    'include' : function( w , u ){

        var tool = page.tool,
            view = page.view,
            create = view().create,
            context = document.body,
            check_function = function( callback ){
            	
            	return tool.is_function( callback ) ? callback : new Function();
            	
            };

        return function( json ){
        	
        	var callback,fn,self,
        	
        		index = 0,
        		length = 0,
        		
        		create_script = function( url , progress_callback , success_callback , error_callback ){

	                return create( 'script' , {src:url} ).bind( 'load' , function(){
	                	
	                	progress_callback( ++ index );
	                	
	                	length <= index && success_callback( index );
	                	
	                	view( this ).remove();
	                	
	                } ).bind( 'error' , function(){
	                	
	                	tool.in_case( error_callback( index ) === u , function(){length --;} );
	                	
	                } );
	
	            };
	        	
        	return callback = new Function(),
        	
        		callback.prototype = fn = {
        			
        			constructor : callback,
        			
        			init : function(){
        				
        				self = this;
        				
        				this.success()
        					.progress()
        					.error();
        				
        				setTimeout(function(){
        					
        					self.include();
        					
        				} , 0 );
        				
        				return this;
        				
        			},
        			
        			success : function( callback ){
        				
        				return this.success_callback = check_function( callback ),
        				
        					this;
        				
        			},
        			
        			progress : function( callback ){
        				
        				return this.progress_callback = check_function( callback ),
        				
        					this;
        				
        			},
        			
        			error : function( callback ){
        				
        				return this.error_callback = check_function( callback ),
        				
        					this;
        				
        			},
        			
        			include : function(){
        				
        				return tool.each( json , function(){
            	
			            	length ++;
			
			                view( create_script( this , self.progress_callback , self.success_callback , self.error_callback ) ).appendTo( context );
			
			            } , true ),
			            
			            	this;
        				
        			}
        			
        		},
        		
        		new callback().init();

        }

    }( window , void( 0 ) )

});