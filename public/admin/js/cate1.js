$(function () {
  var page = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
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
  //点击禁用 出现模态框 要用事件委托
  $('.btn-add').on('click', function () {
    $('.cate1Modal').modal('show');
  })
  //表单验证
  $('form').bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名不能为空!'
          }
        }
      }
    },
    //图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }

  });
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          $('form').data('bootstrapValidator').resetForm(true);          
          $('.cate1Modal').modal('hide');
          page=1;
          render();
        }
      }
    })
  })
  // $('#add').on('click', function (e) {

  //   e.preventDefault();


  // })
})