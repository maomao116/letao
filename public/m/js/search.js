$(function(){
  render();
  function render() {
    //1,从本地获取数据
    var list=JSON.parse(localStorage.getItem('list'))||[];
    console.log(list);
    
    //2.根据模板渲染数据
    $('.content').html( template('tpl',{list:list}))
  }

  //删除历史记录的思路
  //0.给每个删除按钮注册点击事件(委托)
  $(".content").on('click','.btn_delete',function(){
    //要先跳出确认框 确定后执行后面的代码
    mui.confirm('你确定要删除吗?','温馨提示',['取消','确认'],function(e){
        //1.获取到本地数据
      if(e.index != 1){
        return;
      }
    var list=JSON.parse(localStorage.getItem('list'))||[];     
    //2.获取到当前里的index,根据index删除数组中对应的数据
      var index=$(this).data('index'); 
      list.splice(index,1);   
    //3.再把新数组传回本地
      localStorage.setItem('list',JSON.stringify(list));
    //4.重新渲染页面
      render();   
    })
 
  })

  //清空历史记录的思路
  //给清空按钮注册点击事件(委托)
  //点击后直接删除对应数据就行
  //重新渲染页面
  $('.content').on('click','.btn_empty',function(){
    localStorage.removeItem('list');
    render();
  })

  //增加历史记录
  //1.给搜索注册点击事件 
  //2.获取到input的value 再获取本地数据
  //3.

  //5.把新数据加入到数组中,然后传回本地
     // 要判断长度是否大于9 大于删除最后一位
     //是否重复 重复删除
     //最后添加

  $('.mui-btn').on('click',function(){
    
    var val=$('input').val();
    if (val=='') {
      mui.toast('请先输入搜索信息',) 
      return;
    }
    var list=getData();
    console.log(list);
    if(list.length>9){
      list.pop();;
    }
    if(list.indexOf(val) != -1){
      list.splice(list.indexOf(val));
    }
    list.unshift(val);
    localStorage.setItem('list',JSON.stringify(list) );
    render();
    location.href='searchList.html?key='+val;
  })
  //封装获取数据的方法
  function getData(){
    var list=JSON.parse(localStorage.getItem('list'))||[];     
    return list;    
  }
})