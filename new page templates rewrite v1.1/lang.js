define( 'lang' , new function(){
	this.verify = {
		ins : {
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
		    		fail : '图片验证失败!请选择一个不大于1MB的图片上传...'
		    	},
		    	Junde_verify_custom_check : {
		    		success : '自定义验证成功!',
		    		fail : '自定义验证失败!'
		    	}
		}
	}
}() );