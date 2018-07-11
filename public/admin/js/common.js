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
    $(".modal").modal("show");
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