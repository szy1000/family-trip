// SuperSlide
var Slide = {
  init: function (op) {
    require(['js/swiper'], function (Swiper) {
      var mySwiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        // pagination: '.swiper-pagination',
        paginationClickable: true,
        // loop: true,
        centeredSlides: true,
        // autoplay: 2500,
        autoplayDisableOnInteraction: false
      })        
    })
  }
}

var Slide2 = {
  init: function (op) {
    require(['js/swiper'], function (Swiper) {
      var mySwiper = new Swiper ('.swiper-container2', {
        direction : 'vertical',
        paginationClickable: true,
        loop: true,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
      })        
    })
  }
}
//show
var Show = {
  init:function(ele,close,overlay){
    require(['zepto','zepto/touch'],function($,tap){
      $(ele).tap(function(){
        $(overlay).css('display','block');
      });
      $(close).tap(function(){
        $(overlay).css('display','none');
        // $(close).css('display','none');
      })
    })
  }
}
//Toggle
var Toggle = {
  init:function(control,box,cls,cls2){
    require(['zepto','zepto/touch'],function($,tap){
      $(control).on('tap',function(){
        $(this).children().toggleClass(cls2);
        $(this).next().toggleClass(cls);
      })
    })
  }
}
// Pikaday
var Datepicker = {
  init: function (op) {
    require(['pikaday/pikaday'], function (Pikaday) {
      var picker = new Pikaday(op);
    })
  }
}

// Tab
var Tab = {
  init: function(e,content) {
    require(['zepto', 'zepto/touch'], function ($, tap) {
      $(e).tap(function () {
        console.log($(this).index());
        // $(e).children().eq($(this).index()).addClass('active').siblings().removeClass('active')
        $(e).eq($(this).index()).addClass('active').siblings().removeClass('active')
        $(content).eq($(this).index()).addClass('show').siblings().removeClass('show');
      })
    })
  }
}

var Tab1 = {
  init: function(e,content) {
    require(['jquery.1.4.2-min'], function () {
      $(e).click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        $(content).eq($(this).index()).addClass('on').siblings().removeClass('on');
      })
    })
  }
}

//Alert
var Alert ={
  init : function (open ,overlay,block,close) {
    require(['zepto','zepto/touch'],function($,tap){
      $(open).tap(function(){
        $(overlay).addClass('fadeIn');
        $(block).addClass('mySilderdown');
        $(close).addClass('mySilderdown');
      })
      $(close).tap(function(){
        $(overlay).removeClass('fadeIn');
        $(block).removeClass('mySilderdown');
        $(close).removeClass('mySilderdown');
      })
    })
  }
}
//Offcanvas
var Offcanvas ={
  init: function(trigger,drawer){
    require(['zepto/zepto','js/drawer'],function($, draw){
      $(trigger).drawer({
        "model": $(drawer),

        "dimens": {
        "width": "50%"
        },
        "dir": "left"
    });
  
    })
  }
}

var Change = {
  init: function(){
    require(['mzp-packed.js'],function(){
      function selectId(e) {return document.getElementById(e);}
      document.getElementsByClassName = function(cl) {
          var retnode = [];
          var myclass = new RegExp('\\b'+cl+'\\b');
          var elem = this.getElementsByTagName('*');
          for (var i = 0; i < elem.length; i++) {
              var classes = elem[i].className;
              if (myclass.test(classes)) retnode.push(elem[i]);
          }
          return retnode;
      }
      window.onload = function(){
        var MyMar;
        var speed = 1; //速度，越大越慢
        var spec = 1; //每次滚动的间距, 越大滚动越快
        var ipath = 'images/'; //图片路径
        var thumbs = document.getElementsByClassName('thumb_img');
        for (var i=0; i<thumbs.length; i++) {
            thumbs[i].onmouseover = function () {selectId('main_img').src=this.rel; selectId('main_img').link=this.link;};
            thumbs[i].onclick = function () {location = this.link}
        }
        // selectId('main_img').onclick = function () {location = this.link;}
        // selectId('gotop').onmouseover = function() {this.src = ipath + 'gotop2.gif'; MyMar=setInterval(gotop,speed);}
        selectId('gotop').onmouseout = function() {this.src = ipath + 'gotop.gif'; clearInterval(MyMar);}
        selectId('gobottom').onmouseover = function() {this.src = ipath + 'gobottom2.gif'; MyMar=setInterval(gobottom,speed);}
        selectId('gobottom').onmouseout = function() {this.src = ipath + 'gobottom.gif'; clearInterval(MyMar);}
        function gotop() {selectId('showArea').scrollTop-=spec;}
        function gobottom() {selectId('showArea').scrollTop+=spec;}
      };
    })
  }
}

exports.Offcanvas =Offcanvas;
exports.Slide = Slide;
exports.Slide2 = Slide2;
exports.Show = Show;
exports.Datepicker = Datepicker;
exports.Tab = Tab;
exports.Tab1 = Tab1;
exports.Alert = Alert;
exports.Toggle = Toggle;
exports.Change = Change;