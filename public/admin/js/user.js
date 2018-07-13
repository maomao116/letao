$(function () {
  var page = 1;
  var pageSize = 5;
  var id;
  var isDelete;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: '/user/queryUser',
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
  $('tbody').on('click', '.btn', function () {
    $('.userModal').modal('show');
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 1 : 0;
  })
  $('#confirm').on('click', function () {
    // console.log('嘤嘤嘤');
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {
        console.log(info,isDelete);
        if (info.success) {
          $('.userModal').modal('hide');
          render();
        }

      }
    })

  })
})