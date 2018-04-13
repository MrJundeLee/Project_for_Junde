//checkform 插件 -- 用于表单验证
//
//调用方式 : define.get( 'verify' )( form ).verify()
//api : {
//
//	serializing : 序列化函数
//
//	submit : 自定义提交
//
//	verify : 验证
//
//}
//dom :
//		data-verify_mode : underline ( 显示说明文字 ), alert ( 弹窗提示 )
//		data-verify_type : check_empty ( 非空验证 ), check_allway_assess ( 默认验证总是通过 ), check_email ( 邮箱验证 ), check_telnumber( 电话验证 ), check_allnumber( 都为数字验证 ), check_date( 日期验证 ), check_time( 时间验证 ), check_datetime( 日期时间验证 ), check_radio( radio 或 checkbox 验证 ), check_file ( 文件验证 ), check_image ( 图片文件验证 ), custom_check( 自定义验证 -- 就是不验证,自定义接口在下面说明 ) 
//		data-verify_ins_key : ( lang.js 中 this.verify => ins => 属性名 )
//		data-user_verify_type : ( 自定义验证 ：三种方式 【单行模式，匿名函数模式，自定义验证函数模式】，其中 ： 单行模式 顾名思义就是一行js逻辑 ， 匿名函数模式 就是 function(){return true;} 这样的方式 ，自定义验证函数模式 就是 该函数名 ， 但不管是哪一种方式 ， 其优先级皆高于 data-verify_type 的验证 ， 函数所输出的结果 为 true 或是 false 就是验证的结果 )
//		data-verify_group_key : ( 如果想要同时验证几个表单元素，可以使用该属性 它能够将想要同时验证的表单元素归为一组同时验证 ， 其组名为 data-verify_group_key 的值， 所以你需要确保组名唯一 )
//		data-verify_group_type ：( 如果存在 data-verify_group_key 属性 ， 可以使用 data-verify_group_type 对组的结果集进行逻辑判断 值为 and => 组的结果集中必须全部满足验证 , or => 组的结果集中至少有一个满足验证 )
//		data-verify_detail_location : ( 如果想要调整 data-verify_mode 不同模式下生成的说明dom所生成的 位置 ， 可以使用 该属性 ， 其值为 jQuery( data-verify_detail_location ) 中所允许的 查询方式 )
//		data-none_verify : 如果不想要 验证 这个dom 添加这个属性 如果想要验证 就 removeAttr 这个属性
$( '.none_verify' )
$( '[data-none_verify]' )