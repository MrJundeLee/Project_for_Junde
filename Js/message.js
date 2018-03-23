//本文件 样式依赖 bootstrap.min.css , 请在引用时 同时引入 bootstrap.min.css
//本文件 需要继承 page.js ， 请通过page.include 引入 或 在page.js引入之后引入。
//js 文件 共289行;
/*message 调用方式 ： page.message({
	
	header : 'message 的标题',//默认：Alert
	body : 'message 的内容',//默认：''
	hover : 'message 鼠标悬停判断',//默认:false
	time : 'message 的关窗时间',//默认:0
	type : 'message 的样式选择(info,success,warn,danger)',//默认:info
	context : 'message 的可选上下文'//默认:body
	
})*/

page.define({

    message : function( w , u ){

        var view = page.view,
            tool = page.tool,
            create = view().create,
            each = tool.each,

            _default_format = {

                'header' : 'Alert',
                'body' : '',
                'hover' : false,
                'time' : 3000,
                'context' : '',
                'type' : 'info'

            },
            typeList = {

                'success' : 'alert alert-success',
                'info' : 'alert alert-info',
                'warn' : 'alert alert-warning',
                'danger' : 'alert alert-danger'

            },

            data = new Map(),
            setData = function( key , value ){return data.set( key , value ),data;},
            getData = function( key ){return data.get( key );},

            change = function( dom , type , callback , time ){

                var opacity = 0,
                    _dom = view( dom ),
                    check = function(){return opacity < end_number;},
                    change_dom = function(){_dom.css( 'opacity' , opacity += change_number )},
                    change_callback = function( type , status ){_dom.css('display',type ? 'block' : 'none');status && ( data.set( 'change_status' , 0 ) , clearInterval( timer ) , callback && callback() );},
                    change_number = 0.05,
                    end_number = 1,
                    status,
                    timer;

                if( data.get( 'change_status' ) )

                    return setTimeout(function(){

                        change( dom , type , time );

                    },( time || 50 ) * 20) , u;

                data.set( 'change_status' , type );

                if( type == 'hide' )

                    opacity = 1,change_number = -0.05,end_number = 0,check = function(){return opacity > end_number;};

                else

                    change_callback( status = true );

                timer = setInterval( function(){

                    change_dom();

                    !check() && change_callback( status , true );

                } , time || 50 )

            },
            hide = function( dom , callback ){

                change( dom , 'hide' , callback );

            },
            show = function( dom , callback ){

                change( dom , 'show' , callback );

            },

            create_div = function( attr , html ){return create( 'div' , attr , html );},

            handle_context = function( context ){

                var target;

                return target = view( context ),

                    !target.length && ( target = view( document.body ) ),

                    target.get(0);

            },
            handle_container = function( context ){

                var create_data = function( context ){

                    var data = {},
                        _context;

                    return data.dom = create_div( {'style':'position:fixed;bottom:15px;right:15px;left:15px;float:left;z-index:10000;'} ),

                        _context = view( context ).append( data.dom ),

                        data.length = 0,

                        setData( _context.get(0) , data ),

                        data.dom;

                },data;

                return data = getData( context ),

                    data ?

                        data.dom :

                        create_data( context );

            },
            handle_arguments = function( json ){

                var _json = tool.is_object( json ) ? json : {},
                    config = _default_format,
                    result = {};

                return each( config , function( key , value ){

                    result[ key ] = _json[ key ] === u ? value : _json[ key ];

                } , true ),

                    result;

            },
            handle_header = function( header ){

                return create( 'strong' , u , header );

            },
            handle_body = function( body ){

                return create( 'span' , {'style':'display:inline-block;margin-left:5px;'} , body );

            },
            handle_hover = function( hover , self ){

                return hover ? function( dom ){

                    return view( dom ).bind( 'mousemove' , function(){

                        self.hover = true;

                    }).bind( 'mouseout' , function(){

                        self.hover = false;

                    });

                } : new Function();

            },
            handle_time = function( time , hide ){

                var _time = tool.is_number( time - 0 ) ? time : _default_format.time;

                return time ? function( dom , getHover ){

                    var set_time_callback = function(){

                        setTimeout(function(){

                            return getHover() ? set_time_callback() : hide( dom );

                        } , _time );

                    };

                    return set_time_callback();

                } : new Function();

            },
            handle_type = function( type ){

                return {'class':typeList[ type ] || typeList[ _default_format.type ]  ,'style':'transition:all .5s;-webkit-transition:all .5s;-o-transition:all .5s;-moz-transition:all .5s;'};

            },

            create_message = function( container , header , body , hover , time , type , getHover , remove ){

                var alert;

                return alert = create_div( type ),

                    alert.append( header ).append( body).append( create_close( remove ) ),

                    hover( alert ),

                    time( alert , getHover ),

                    view( container ).append( alert ),

                    alert;

            },
            create_close = function( remove ){

                var close;

                return close = create( 'a' , {'href':'javascript:;','style':'float:right;'} , '✖' ),

                    close.bind( 'click' , remove );

            };

        return function( config ){

            var callback,fn,self;

            return callback = new Function(),

                fn = callback.prototype = {

                    constructor : page,
                    
                    init : function( json ){
                    	
                        var _json = handle_arguments( json ),
                            header = handle_header( _json.header ),
                            body = handle_body( _json.body ),
                            hover = handle_hover( _json.hover , this ),
                            time = handle_time( _json.time , hide ),
                            type = handle_type( _json.type ),
                            context = handle_context( _json.context);

                        self = this

                        this.context = context;
                        this.container = handle_container( context );
                        this.message = create_message( this.container , header , body , hover , time , type , function(){return self.hover} , function(){return self.remove()} );

                        getData( context )['length'] ++;

                        return this;
                    },
                    show : function(){
                        return show( this.message ),
                            this;
                    },
                    hide : function(){
                        return hide( this.message ),
                            this;
                    },
                    remove : function(){
                        return hide(this.message , function(){

                            view( self.message ).remove(),
                                delete self.message,
                                -- getData( self.context )['length'];

                        })
                    }
                },

                new callback().init( config );

        }

    }( window , void( 0 ) )

});