//本文件 需要继承 page.js ， 请通过page.include 引入 或 在page.js引入之后引入。
//本文件是字库文件，默认使用中文cn
//js 文件 共41行;
var lang;

!function(){
	
	var tool = page.tool,
		handle_try = tool.handle_try;
	
	lang = {
	
		'kr' : {

            'error' : {

                '4001' : 'check.js没有被引入!'

            }

		},
		
		'cn' : {

			'check_form' : {

				'detail' : {

					'fail' : {

						'testDate' : '日期格式错误！',
						'testTime' : '时间格式错误！',
						'testDateTime' : '日期时间格式错误！',
						'testEmpty' : '不能为空！',
						'testEmail' : '邮箱格式不正确！',
						'testTelNumber' : '电话号码格式不正确！',
						'testFile' : '文件未通过验证！',
						'testPicFile' : '图片文件未通过验证！',
						'testAllNumber' : '必须为数字格式！'

					},

                    'success' : {

                        'testDate' : '日期格式验证成功！',
                        'testTime' : '时间格式验证成功！',
                        'testDateTime' : '日期时间验证成功！',
                        'testEmpty' : '验证成功！',
                        'testEmail' : '邮箱格式验证成功！',
                        'testTelNumber' : '电话号码格式验证成功！',
                        'testFile' : '文件验证成功！',
                        'testPicFile' : '图片文件验证成功！',
                        'testAllNumber' : '数字格式验证成功！'

                    }

				}

			},
			
			'error' : {

				'4001' : 'check.js没有被引入!'

			}
			
		}
		
	},
	
	handle_try( function(){
		
		lang = lang[ lang_type ] ? lang[ lang_type ] : lang[ 'cn' ];
		
	} , function(){
		
		lang = lang[ 'cn' ];
		
	} );
	
}();