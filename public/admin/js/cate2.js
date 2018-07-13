$(function () {
  var page = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('tbody').html(template('tpl', info));
        //分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }

  $('.btn-add').on('click',function(){
    $('.cate2Modal').modal('show');
    $.ajax({
      type:'get',
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:1000
      },
      success:function(info){
        $('.dropdown-menu').html( template('tpl2',info));
      }
    })
  })

  //给每个a注册点击事件 改变span的值(事件委托)
  //把id传给隐藏input
  $('.dropdown-menu').on('click','a',function(){
      $('.dropdown-text').text( $(this).text() );
      $("[name='categoryId']").val( $(this).data("id") ); 
      $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  //上传图片 1. 所以用input file 但是input file 太丑了 所以用label
  //用fileupload插件来实现文件异步上传
  $('#file').fileupload({
    dataType:'json',
    done:function(e,data){
      var pic=data.result.picAddr;
      $("[name='brandLogo']").val(pic);
      console.log( $("[name='brandLogo']").val());      
      $('.brandImg').attr('src',pic);
      $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');      
    }
  })
  //表单验证
  //需要手动修改
  $('form').bootstrapValidator({
    excluded: [],//不校验的内容
    fields: {  
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类名不能为空!'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择图片!'
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类!'
          }
        }
      },
    },
    //图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  })
  
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('form').serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('form').data('bootstrapValidator').resetForm(true);          
          $('.cate2Modal').modal('hide');
          page=1;         
          render();
        }
      }
    })
  })

  $.ajaxstart()
})