$(function(){

  // 子列表展开
  $('#cate').on('click',function(){   
    $(this).next().slideToggle();
    $(this).next().toggleClass('show');
  })
  //点击 隐藏aside
  $('.top_left').on('click',function(){
    $(".lt_aside").toggleClass('now');
    $(".lt_top").toggleClass('now');
    $(".lt_main").toggleClass('now');
  })
  //点击 退出登录
  $('.top_right').on("click",function(){
    $(".loginOutModal").modal("show");
  })
  $('#exit').on('click',function(){
    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      success:function(info){
        if (info.success) {
          location.href='login.html';
        }
      }
    })
  })
})
NProgress.configure({ showSpinner: false });

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
});

$(document).ajaxStop(function () {
  //完成进度条
  setTimeout(function () {
    NProgress.done();
  }, 500);
});
