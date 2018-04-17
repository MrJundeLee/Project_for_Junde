define( 'lang' , new function(){
	this.verify = {
		ins : {
			article_name : {

				'fail' : '文章标题不能为空'

			},
			article_content : {

				'fail' : '文章内容不能为空'

			},
			record_province : {

				'fail' : '省份未选择'

			},
			record_year : {

				'fail' : '请输入正确的年份格式'

			},
			record_month : {

				'fail' : '月份未选择'

			},
			record_file : {

				'fail' : '请选择一个Excel数据文件'

			},
			Junde_verify_check_empty : {
				success : '',
	    			fail : '非空验证失败!'
			},
			Junde_verify_check_allway_assess : {
				success : '默认正确验证成功!',
	    			fail : '默认正确验证失败!'
			},
			Junde_verify_check_email : {
				success : '邮箱验证成功!',
	    			fail : '邮箱验证失败!'
			},
			Junde_verify_check_telnumber : {
				success : '电话验证成功!',
	    			fail : '电话验证失败!'
			},
			Junde_verify_check_allnumber : {
		    		success : '全数字验证成功!',
		    		fail : '全数字验证失败!'
		    	},
		    	Junde_verify_check_date :  {
		    		success : '日期格式验证成功!',
		    		fail : '日期格式验证失败!'
		    	},
		    	Junde_verify_check_time : {
		    		success : '时间格式验证成功!',
		    		fail : '时间格式验证失败!'
		    	},
		    	Junde_verify_check_datetime : {
		    		success : '日期时间格式验证成功!',
		    		fail : '日期时间格式验证失败!'
		    	},
		    	Junde_verify_check_file : {
		    		success : '文件验证成功!',
		    		fail : '文件验证失败!请选择一个不大于5MB的文件上传...'
		    	},
		    	Junde_verify_check_image : {
		    		success : '图片验证成功!',
		    		fail : '图片验证失败!请选择一个不大于1MB的,后缀应是 ( .bmp | .gif | .jpg | .jpeg | .png ) 的图片上传...'
		    	},
		    	Junde_verify_custom_check : {
		    		success : '自定义验证成功!',
		    		fail : '自定义验证失败!'
		    	},
		    	Junde_verify_group_or : {
		    		success : '组( group_or ) 匹配成功!',
		    		fail : '组( group_or )  内元素应该至少一个满足验证!'
		    	},
		    	Junde_verify_group_and : {
		    		success : '组( group_and ) 匹配成功!',
		    		fail : '组( group_and )  内元素必须全部满足验证!'
		    	},
		    	Junde_verify_check_radio : {
		    		success : 'radio 匹配成功!',
		    		fail : 'radio 验证失败!'
		    	},
		    	Junde_verify_check_checkbox : {
		    		success : 'checkbox 匹配成功!',
		    		fail : 'checkbox 验证失败!'
		    	}
		},
		alert : {
			_default_verify_alert_header : 'verify',
			_default_verify_alert_btn_title : 'confirm'
		}
	}
}() );