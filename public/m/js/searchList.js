$(function () {
  var page = 1;
  var pageSize = 100;
  var proName = getSearch().key;
  var type;
  var val;
  $('input').val(proName);
  // console.log(proName);
  
  render();
  //给那两个按钮注册点击事件  
  //1,高亮  如果已经高亮 切换箭头方向 
  $('.title [data-type]').on('click',function(){
    // console.log("嘿嘿嘿");
    if ($(this).parent().hasClass('active')) {
    $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');      
    }else{
    $(this).parent().addClass('active').siblings().removeClass('active');      
    }
    type=$(this).data('type');
    val=$(this).find('span').hasClass('fa-angle-down')?2:1;
  
    
    //切换箭头方向
    render();
  })

 
  //点击搜索,重新渲染页面
  $('.mui-btn').on('click',function(){
      render();    
  })
  //先封装获取地址栏数据的函数
  //1.获取的数据 location.search  ?  =   & =  & =
  //2.处理数据 0. 转码  decodeURL()
  //          1.处理 ?   slice    =   & =  & =
  //          2.处理 $   split    =    =    =
  //          3.处理 =   split    加到对一个象当中存起来
  function render() {
    proName=$('input').val();
    var obj = {
      page: page,
      pageSize: pageSize,
      proName: proName
    }
    if($('.title [data-type]').parent().hasClass('active')){
      obj[type]=val;
      // console.log(1);
      
    }
    console.log(obj);
    
    $.ajax({

      type: 'get',
      url: '/product/queryProduct',
      data: obj,
      success: function (info) {
        // console.log(info);
        $('.list').html(template('tpl', info));
      }
    })

  }
  function getSearch() {
    var info = location.search;
    info = decodeURI(info);
    info = info.slice(1);
    info = info.split('&');
    var obj = {};
    info.forEach(function (item) {
      var k = item.split('=')[0];
      var v = item.split('=')[1];
      obj[k] = v;
    })
    return obj;


  }
})