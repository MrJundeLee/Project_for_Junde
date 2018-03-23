//本文件 样式依赖 bootstrap.min.css js需要继承 bootstrap.min.js , 请在引用时 同时引入 bootstrap.min.css 和 bootstrap.min.js
//本文件 需要继承 page.js ， 请通过page.include 引入 或 在page.js引入之后引入。
/*modal 调用方式 ： var modal = page.modal({
 * 	
 *		header:'模态窗的标题', //默认:''
 * 		body:'模态窗的内容', //默认:''
 * 		btns:[
 * 			
 * 			page.view().create('button',{},'close').bind('click',function(){modal.remove()})
 * 
 * 		] //模态窗的按钮们  默认：''
 * 
 * })*/
//js 文件 共232行;
page.define({
	
	'modal' : function( w , u ){
		
		var view = page.view,
			tool = page.tool,
			
			create = view().create,
			each = tool.each,
			in_case = tool.in_case,
			
			change_$ = function( v ){
				
				var _$ = $ && $();
				
				return _$ && each( v , function( key , value ){
					
					_$[ _$.length ++ ] = value;
					
				} , true ),
				
					_$;
				
			},
			
			default_config = {
				
				'context' : 'body'
				
			},
			
			create_div = function( attr , html ){
				
				return create( 'div' , attr , html );
				
			},
			is_true_format = function( bl , target , default_target ){
				
				return bl ? target : default_target;
				
			},
			is_function_format = function( target ){
				
				return is_true_format( tool.is_function( target ) , target , new Function() );
				
			},
			is_object_format = function( target ){
				
				return is_true_format( tool.is_object( target ) , target , new Object() );
				
			},
			is_dom_format = function( target , callback ){
				
				var _target = view( target ),
					_callback = is_function_format( callback );
				
				return is_true_format( _target.length , _target , _callback( target ) );
				
			},
			create_modal = function(){
				
				var fade = create_div( {'class':'modal fade','tabindex':'-1','role':'dialog'} ),
					dialog = create_div( {'class':'modal-dialog','role':'document'} ),
					content = create_div( {'class':'modal-content'} );
					
				return {
					
					main : fade.append( dialog.append( content ) ),
					
					content : content
					
				};
				
			},
			handle_header = function( header ){
				
				var head = create_div( {'class' : 'modal-header'} ),
					btn = create( 'button' , {'type':'button','class':'close','data-dismiss':'modal','aria-label':'Close'} , '<span aria-hidden="true">&times;</span>' ),
					title = create( 'h4' , {'class':'modal-title'} ),
					target;
						
				return head.append( btn ).append( title.append( is_dom_format( header , function( target ){
					
					return create( 'span' , u , target );
					
				} ) ) ),
				
					head;
				
			},
			handle_body = function( body ){
				
				return create_div( {'class':'modal-body'} ).append( is_dom_format( body , function( target ){
					
					return create_div( u , target );
					
				} ) );
				
			},
			handle_btns = function( btns ){
				
				var _btns = view(),
					target;
				
				return each( btns , function( key , value ){
					
					target = is_dom_format( value );
					
					target && ( _btns[ _btns.length ++ ] = target.get( 0 ) );
					
				} , true ),
				
					_btns;
				
			},
			handle_footer = function(){
				
				return create_div( {'class':'modal-footer'} );
				
			},
			handle_context = function( context ){
				
				return is_dom_format( context , function( target ){
					
					return view( default_config.context );
					
				} );
				
			};
		
		return function( json ){
			
			var callback,fn,self;
			
			return callback = new Function(),
			
				fn = callback.prototype = {
					
					constructor : callback,
					
					init : function(){
						
						self = this;
						
						this.handle_arguments( json );
						
						this.create();
						
						return this;
						
					},
					
					handle_arguments : function( json ){
						
						var arg = is_object_format( json );
						
						return this.header = handle_header( arg.header ),
							
							this.body = handle_body( arg.body ),
							
							this.btns = handle_btns( arg.btns ),
							
							this.footer = handle_footer().append( this.btns ),
							
							this.context = handle_context( arg.context ),
							
							this;
						
					},
					
					create : function(){
						
						var modal = create_modal(),
							main = modal.main,
							content = modal.content;
							
						return content.append( this.header ).append( this.body ).append( this.footer ),
						
							this.modal = change_$( main.appendTo( this.context ) ).modal( 'show' );
						
					},
					
					hide : function( callback ){
						
						var _callback = is_function_format( callback );
						
						return tool.handle_try( change_$( this.modal ).one( 'hidden.bs.modal' , _callback ).modal( 'hide' ) ),
						
							this;
						
					},
					
					remove : function( callback ){
						
						var _callback = is_function_format( callback );
						
						return tool.handle_try( change_$( this.modal ).one( 'hidden.bs.modal' , function(){
							
							_callback();
							
							self.modal.remove();
							
						} ).modal( 'hide' ) ),
						
							this;
						
					}
					
				},
				
				new callback().init();
			
		}
		
	}( window , void( 0 ) )
	
})
