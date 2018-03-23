//本文件 需要继承 page.js ， 请通过page.include 引入 或 在page.js引入之后引入。
/*
 *
 *cookie 调用方式  : 设置cookie => set_cookie , 获取cookie => get_cookie , 删除cookie => delete_cookie
 * 		
 * 		set_cookie({
 * 	
 * 			'data' : {
 * 	
 * 				'dataIndex(存储的cookie的key值)' : 'dataValue(存储的cookie的value值)'
 * 				//... ...
 * 
 * 			},
 * 			'expires' : Mon Feb 26 2018 10:38:03 GMT+0800 (中国标准时间),//存在时间(date类型)
 * 			'domain' : 'a.b.com/cn',//cookie存在域
 * 			'path' : '/test/*',//cookie存在目录
 * 			'max-age' : 20000,//存在时间(数字类型)(单位:秒)
 * 
 * 		});
 * 
 * 		get_cookie( 'dataIndex(存储的cookie的key值)' );
 * 
 * 		delete_cookie( 'dataIndex(存储的cookie的key值)' );
 * 
 * */
//js 文件 共155行;
page.define({
	
	'cookie' : new function( w , u ){

		this.set_cookie = function( json ){

			var reg_data = {

					'data' : 'data',
					'expires' : 'expires',
					'domain' : 'domain',
					'path' : 'path',
					'httponly' : 'HttpOnly',
					'max-age' : 'max-age'

				},
				i = 0,
				j = 0,
				txt = '',
				check_date;

			for( i in json ){

				if( !reg_data[i] )

					continue;

				switch( i ){

					case 'data':

						if( json[i] == null )

							return false;

						if( typeof json[i] == 'object' ){

							for( j in json[i] )
							{
								if( json[i][j] && typeof json[i][j] != 'object'  )

									txt += j + '=' +json[i][j] + ';';

							}


						}else

							txt += 'page_cookie=' + json[i] + ';';

						break;

					case 'expires':

						if( json[i] instanceof Date ){

							txt += ( reg_data[i] + '=' + json[i] + ';' );

							check_date = true;

						}

					case 'max-age':

						if( typeof ( json[i] - 0 ) == 'number' ){

							txt += ( reg_data[i] + '=' + ( json[i] - 0 ) + ';' );

							check_date = true;

						}

						break;

					case 'domain':

					case 'path':

						if( typeof json[i] == 'string' )

							txt += ( reg_data[i] + '=' + json[i] + ';' );

						break;

				}

			}

			document.cookie = txt;

			return true;

		};

		this.get_cookie = function( name ){

			var arr,
				reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");

			if( arr = document.cookie.match(reg) )

				return unescape(arr[2]);

			else

				return null;

		};

		this.delete_cookie = function( name ){

			var date = new Date(),
				cookie = this.get_cookie( name );

			date.setTime( date.getTime() - 1000 );

			if( cookie != null ){

				document.cookie= name + "=" + cookie + ";expires=" + date;

				return cookie;

			}

		};

	}( window , void( 0 ) )
	
});