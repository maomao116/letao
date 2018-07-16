$(function () {

  var page = 1;
  var pageSize = 2;
  //定义一个数组来存储图片路径和名字
  var imgs = [];
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('tbody').html(template('tpl', info));
        //分页出来
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          },
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'prev':
                return '上一页';
                break;
              case 'next':
                return '下一页';
                break;
              case 'first':
                return '首页';
                break;
              case 'last':
                return '尾页';
                break;
              default:
                return page;
                break;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'prev':
                return '上一页';
                break;
              case 'next':
                return '下一页';
                break;
              case 'first':
                return '首页';
                break;
              case 'last':
                return '尾页';
                break;
              default:
                return '跳转到第' + page + '页';
                break;
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }

  $('.btn-add').on('click', function () {
    $('.goodsModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl2', info));
      }
    })
  })

  //点击 替换文本 储存id 手动修改验证状态
  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown-text').text($(this).text());
    $("[name='brandId']").val($(this).data('id'));
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  //图片上传
  $("#file").fileupload({
    done: function (e, data) {
      if (imgs.length == 3) {
        return;
      }
      imgs.push(data.result);
      // console.log(imgs);
      // 每次上传成功 创建一个img到img_box
      $('.img_box').append("<img src=" + data.result.picAddr + " width='100' height='100'>");
      if (imgs.length == 3) {
        $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
      }
    }
  })

  //表单验证
  $('form').bootstrapValidator({
    excluded: [], //不校验的内容
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '二级分类名不能为空!'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空!'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空!'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空!'
          },
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: "请输入 1-99099的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '尺码不能为空!'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的尺寸格式(xx-xx)"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品现价不能为空!'
          },
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空!'
          },
        
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择三张图片!'
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
  })

  //表单验证成功实践
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    //拼接数据
    var pram = $('form').serialize();
    pram += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    pram += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    pram += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
    // console.log(pram);

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: pram,
      success: function (info) {
        if (info.success) {
          $('.goodsModal').modal('hide');
          page = 1;
          render();
          $('form').data('bootstrapValidator').resetForm(true);
          手动修改非表单数据
          $('.dropdown-text').text('请选择二级分类');        
          $(".img_box").empty();
          重置imgs
          imgs=[];
        }
      }
    })
  })
})