$(function(){
  $('form').bootstrapValidator({
    fields:{
      username:{
        validators:{
          notEmpty: {
            message : '用户名不能为空'
          },
          stringLength: {
            min:3,
            max:6,
            message: '请输入介于 3 至 6 个字'         
          },
          callback: {
            message:"用户名不存在"
          } 
        }
      },
      password:{
        validators:{
          notEmpty: {
            message : '密码不能为空'
          },
          callback: {
            message:"密码错误"
          },
          stringLength: {
            min:6,
            max:12,
            message: '请输入介于 6 至 12 个字'          
          }
        }
      }
    },
    //配置校验时的图标,
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  });
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      data:$("form").serialize(),
      url:"/employee/employeeLogin",
      success:function(info){
        console.log(info);
        if(info.error === 1000){
          $('form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error === 1001){
          $('form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
        if(info.success){
          location.href="index.html";
        }
      }
    })
  })
  $('[type="reset"]').on('click',function () {
    // console.log(1);
    $('form').data('bootstrapValidator').resetForm(true);
  })
})