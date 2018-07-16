$(function () {
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });
  var id = 1;
  rendercate();

  function rendercate() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      success: function (info) {
       
        console.log(info);
        
        $('.main-left ul').html(template('tpl', info));
        $('.main-left li:first-child').addClass('active');
        
      }
    })
  }

  renderSecond(id);

  function renderSecond(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      type: 'get',
      data: {
        id: id
      },
      success: function (info) {
        console.log(info);
         if (info.rows.length ==0) {
          $('.main-right ul').html('该分类下没有更多的品牌信息');
          return;
        }
        $('.main-right ul').html(template('tpl2', info))
      }
    })
  }

  //点击左边的li 给当前li添加active类 然后根据id重新渲染二级分类(委托)
  $('.main-left ul').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active');
    //获取id
    id=$(this).data('id');
    renderSecond(id);   
  })
}) 