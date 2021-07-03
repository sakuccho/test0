
/*  ********************************************************************************************************************/
/*  スマートフォンドロワーナビゲーション*/
/*  ********************************************************************************************************************/

var SPNavigation = {
  init: function () {
    var scrollTop = 0;
    $(".sp-global-header-drawer-btn").on({
      "click":function(){
        if(!$(this).parent().hasClass('on')){
          scrollTop = $( window ).scrollTop();
          $( window ).scrollTop(0);
          $(this).parent().addClass('on');
          $(".sp-global-header-drawer-contents").show();
          $(".wrapper").css({ "height": $(".sp-global-header-drawer-contents").height()+50, "overflow": "hidden" });
        }else{
          $( window ).scrollTop(scrollTop);
          $(this).parent().removeClass('on');
          $(".sp-global-header-drawer-contents").hide();
          $(".wrapper").css({ "height": "auto", "overflow": "hidden" });
        }
      }
    });
    $(".sp-global-header-drawer-contents .close").on({
      "click":function(){
        $(".sp-global-header-drawer-btn").trigger("click");
      }
    });
    //ドロワーメニュー内、リンク用
    $('.sp-global-header-drawer-contents a[href^=#]:not(.sp-global-header-drawer-nav02 a)').on({
      "click":function(){
        $(".sp-global-header-drawer-contents").hide();
        $(".wrapper").css({ "height": "auto"});
        $(".sp-global-header-drawer").removeClass('on');
        var href = $(this).attr("href"),
        target = $(href === "#" || href === "" ? 'html' : href);
        target.velocity("scroll", { duration: 1 });
        return false;
      }
    });
    $('.sp-global-header-drawer-nav02 a[href^=#]').on({
      "click":function(){
        $(".sp-global-header-drawer-contents").hide();
        $(".wrapper").css({ "height": "auto"});
        $(".sp-global-header-drawer").removeClass('on');
        var href = $(this).attr("href"),
        target = $(href === "#" || href === "" ? 'html' : href);
        target.velocity("scroll", { duration: 1,offset: 0 });
        return false;
      }
    });
  }
};


/*  ********************************************************************************************************************/
/*  ショッピングボタンサブナビ*/
/*  ********************************************************************************************************************/
var SubNavi = {
    init : function(){
      $('.global-header-nav02').hover(function(){
          $(".global-header-nav02-sub").css({ "top": 20, "opcity":1,"display":'block','position':'relative' }).velocity({ "top": 5 }, 300, "easeOutExpo");
      },function(){
          $(".global-header-nav02-sub").hide();
      });
      $('.global-header-nav06').hover(function(){
          $(".global-header-nav06-sub").css({ "top": 20, "opcity":1,"display":'block','position':'relative' }).velocity({ "top": 5 }, 300, "easeOutExpo");
      },function(){
          $(".global-header-nav06-sub").hide();
      });
      $('.global-header-nav07').hover(function(){
          $(".global-header-nav07-sub").css({ "top": 20, "opcity":1,"display":'block','position':'relative' }).velocity({ "top": 5 }, 300, "easeOutExpo");
      },function(){
          $(".global-header-nav07-sub").hide();
      });
    }
}



/*  ********************************************************************************************************************/
/*  ページ内スムーススクロール（velocity）*/
/*  ********************************************************************************************************************/

var SmoothScroll = {
  init : function(){
    var $headerH = $(".global-header").height();

    $('a[href^="#"]').click(function () {
      var href = $(this).attr("href"),
      target = $(href === "#" || href === "" ? 'html' : href);
      target.velocity("scroll", { duration: 800, easing: "easeInOutExpo",offset: -$headerH });
      return false;
    });
  }
}



/*  ********************************************************************************************************************/
/*  リストメニュー*/
/*  ********************************************************************************************************************/

var  ListHover ={
  init : function(){
    $(".hover-list .hover-list-box").each(function(index, el) {
      $(this).attr( "data-height", $(this).height() + $(this).find('.text').height());
    });
    $('.list-inner').height(276);
    $('.text').css({ "opacity": 0}).fadeOut();
    $(".hover-list .hover-list-box").css({ "top": 0});
  $(".hover-list .hover-list-box").on({
    'mouseenter':function(){
      var h = $(this).data('height');
      $(this).find('.list-inner').height(h);
      $(this).css({ "top": -(h-276)/2})
      $(this).find('.text').stop().css({ "opacity": 1}).fadeIn();
    },
    'mouseleave':function(){
      $(this).find('.list-inner').height(276);
      $(this).css({ "top": 0})
      $(this).find('.text').stop().css({ "opacity": 0}).fadeOut();
    }
});
  }
}


/*  ********************************************************************************************************************/
/*  設定  */
/*  ********************************************************************************************************************/


$(function() {
  SPNavigation.init();
  var ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 && ua.indexOf('iPod') == -1 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ){
    //スマートフォン
    $('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />');
  }else if(ua.indexOf('iPad') > 0){
    //iPad
    $('head').prepend('<meta name="viewport" content="width=1060">');
  }else{
    //PC
    SmoothScroll.init();
    $("img.lazy").lazyload({
      threshold: 1000,
      failure_limit: 3,
      skip_invisible: false
    });
    $('.top-visual-copy').velocity({ "opacity": 1 }, 1200, "easeInOutSine");
    //PCリサイズ用
    $('.bxslider-sp').bxSlider({
        pause: 6000,
        auto: true,
        mode: 'fade',
        speed:1500,
        pager: true
      });
  }

  var pageWidth = document.documentElement.clientWidth;
  if(pageWidth < 750){
    $('.text').css('display', 'block');
    $(".hover-list .hover-list-box").each(function(index, el) {
      $(this).attr( "data-height", $(this).height() + $(this).find('.text').height()+ 40);
    });
    $(".hover-list .hover-list-box").css({ "top": 0});
    $(".buddy-block-contents .inner .slider-list, .premium-block-contents .inner ul").addClass('slider multiple-item');
    $('.multiple-item').slick({
      dots: true,
      infinite: false,
      speed: 300,
      swipe: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 2,
    });
      $('.bxslider-sp').bxSlider({
        pause: 6000,
        auto: true,
        mode: 'fade',
        speed:1500,
        pager: true
      });
  } else {
    $("img.lazy").lazyload({
      threshold: 1000,
      failure_limit: 3,
      skip_invisible: false
    });
    $('.text').css('display', 'none');
    $(".buddy-block-contents .slider-list, .premium-block-contents ul").addClass("hover-list");
    $(".buddy-block-contents .inner .slider-list, .premium-block-contents .inner ul").removeClass('slider multiple-item');
    ListHover.init();
    SubNavi.init();
  }
  $('.bxslider').bxSlider({
    pause: 6000,
    auto: true,
    mode: 'fade',
    speed: 1500,
    pager: true
  });
});


//リサイズする度に読み込む処理
var widthFlag = '';
function widthCheck() {
    // 画面幅取得
    var winWidth = $(window).width();
    if(winWidth <= 750 && widthFlag != 'sp') {
      widthFlag = 'sp';
      $(".buddy-block-contents ul, .premium-block-contents ul, .assort").removeClass("hover-list");
      $(".buddy-block-contents .inner .slider-list, .premium-block-contents .inner ul").addClass('slider multiple-item');
      $('.multiple-item').slick({
        dots: true,
        infinite: false,
        speed: 300,
        swipe: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
      });
      //hoverのoff
      $("li, div").off("mouseenter").off("mouseleave").removeClass('hover-list-box');
      $('.text').css({'display':'block','opacity':'1'});
      $('.slick-dots').css({'display':'block'});
      $(".list-inner").css({ 'height':'auto' });
      $(".plain-01 .list-inner, .plain-02 .list-inner").height(276);
      $(".assort-01 .list-inner").height(320);

    // 画面幅750よりおおきく、フラグがpcでない時
  } else if(winWidth > 750 && widthFlag != 'pc') {
    widthFlag = 'pc';
    $(".buddy-block-contents ul, .premium-block-contents ul").addClass("hover-list");
    $('.multiple-item').slick('unslick');
    $('.slick-dots').css({'display':'none'});
    ListHover.init();
    $('.top-visual-copy').velocity({ "opacity": 1 }, 1200, "easeInOutSine");
    //hover
    $('.text').css('display', 'none');
    $(".hover-list .hover-list-box").css({ "top": 0});
    $(".hover-list li, .assort-01").on({
      'mouseenter':function(){
        var h = $(this).data('height');
        $(this).find('.list-inner').height(h);
        $(this).css({ "top": -(h-276)/2})
        $(this).find('.text').stop().css({ "opacity": 1}).fadeIn();
      },
      'mouseleave':function(){
        $(this).find('.list-inner').height(276);
        $(this).css({ "top": 0})
        $(this).find('.text').stop().css({ "opacity": 0}).fadeOut();
      }
    });
    SubNavi.init();
  }
}

$(function() {
    // 画面サイズのチェック
    $(window).on('resize', function() {
      widthCheck();
    });
});
