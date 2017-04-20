'use strict';

$(document).ready(function () {

  var _window = $(window);
  var _document = $(document);

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // HAMBURGER
  $('.hamburger').on('click', function () {
    $(this).toggleClass('is-active');
    $('.navi').toggleClass('active');
  });

  // if something was clicked - hide mobile menu
  $('.navi__list a').on('click', function () {
    setTimeout(function () {
      $('.hamburger').removeClass('is-active');
      $('.navi').removeClass('active');
    }, 500);
  });

  // PRELOADER
  var $div = $('.section--home');
  var bg = $div.css('background-image');

  if (bg) {
    var src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
    var $img = $('<img>').attr('src', src).on('load', function () {
      // set delay, so users with fast connection can see preloader :)
      setTimeout(function () {
        $('.preloader').addClass('ready');
      }, 1500);
    });
  }

  // LOGO ANIMATION
  function appendLetters() {
    function appendA() {
      var letter = $('<div class="header__logo__ajs">a</div>').insertBefore('.header__logo__main');
      setTimeout(function () {
        letter.remove();
      }, 1800);
    }
    function appendX() {
      var letter = $('<div class="header__logo__xjs">x</div>').insertAfter('.header__logo__main');

      setTimeout(function () {
        letter.remove();
      }, 1800);

      // .animate({
      //   'dumb': '90'
      // }, {
      //   step: function (now, fx) {
      //       $(this).css({"transform": "translate3d(" + now + "px, 0px, 0px)"});
      //   },
      //   duration: 900,
      //   easing: 'linear',
      //   queue: false,
      //   complete: function () {
      //     $(this).remove();
      //   }
      // }, 'linear');
    }

    appendA();
    appendX();
  }

  // fire on hover
  var timerId;
  $('.header__logo').on('mouseenter', function () {
    appendLetters();
    timerId = setInterval(function () {
      appendLetters();
    }, 300);
  });

  $('.header__logo').on('mouseleave', function () {
    clearInterval(timerId);
  });

  // SLICK
  $('.js-slick-sections').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    vertical: false,
    adaptiveHeight: false,
    dots: false,
    arrows: false,
    centerPadding: 0,
    draggable: false,
    easing: 'linear',
    infinite: false,
    lazyLoad: 'ondemand',
    swipe: false,
    touchMove: false,
    fade: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        draggable: true,
        verticalSwiping: true,
        swipe: true,
        touchMove: true
      }
    }]
  });

  // CHECK SAVED STATE
  if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    $('.navi__list a').each(function (i, val) {
      if ($(this).data('hash') == hash) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        $('.js-slick-sections').slick('slickGoTo', $(this).data('section'));
      }
    });
    // refactor - why does the callback for section is not fired on slickGoTo??
    if (hash == "about") {
      $('.about-control').addClass('animate');
    }
  }

  // SLICK SECTIONS CALLBACK
  $('.js-slick-sections').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.navi__list a').each(function (i, val) {
      if ($(val).data('section') == nextSlide) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });

    // about animation
    if (nextSlide == 1) {
      $('.about-control').addClass('animate');
      // trigger parent slider
      setTimeout(triggerAbout, 800);
      // triggerAbout();
    } else {
      $('.about-control').removeClass('animate');
    }
  });

  function triggerAbout() {
    var activeSlide = $('.about-control__item.active').data('about');
    if (activeSlide == 3) {
      $('.about-control__item:first-child').click();
    } else {
      $('.about-control__item.active').next().click();
    }

    // $('.js-slick-about').slick('slickGoTo', activeSlide - 1);

    // $('.js-slick-about .slick-slide:nth-child('+ activeSlide + 1 +')').addClass('slick-acitve');
  }

  // SLICK NAVIGATION
  $('.navi__list').on('click', 'a', function (e) {
    // url actions
    var loc = window.location.href;

    // get params from clicked element
    var hash = $(this).data('hash');
    var section = $(this).data('section');

    $('.js-slick-sections').slick('slickGoTo', section);

    // save state
    window.location.hash = hash;

    // window.history.pushState("", "", hash);
  });

  // SLICK ANIMATIONS
  // $('.js-slick-sections').on('afterChange', function(event, slick, currentSlide){
  //   $('.slick-active').removeClass('hidden');
  //   $('.slick-active').addClass('animated bounce');
  // });
  //
  // $('.js-slick-sections').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  //     $('.slick-active').removeClass('animated bounce');
  //     $('.slick-active').addClass('hidden');
  // });


  // SLICK ABOUT
  $('.js-slick-about').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    vertical: false,
    fade: true,
    dots: false,
    arrows: false,
    centerPadding: 0,
    lazyLoad: 'ondemand'
  });

  // about navigation
  $('.about-control').on('click', '.about-control__item', function (e) {
    $('.js-slick-about').slick('slickGoTo', $(this).data('about'));
  });

  // Slick about callback
  $('.js-slick-about').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    event.stopPropagation();
    $('.about-control__item').each(function (i, val) {
      if ($(val).data('about') == nextSlide) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
  });

  // handle logo click
  $('.header__logo').on('click', function (e) {
    $('.navi__list a').siblings().removeClass('active');
    $('.navi__list a:first-child').addClass('active');

    $('.js-slick-sections').slick('slickGoTo', 0);
  });

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  // MODAL
  $("a[href^='#modal']").on('click', function (e) {
    var targetModal = $(this).attr('href');
    $('.app').addClass('tilt');
    $(targetModal).addClass('active');
    e.preventDefault();
  });

  // close modal
  $('.ico-close').on('click', function () {
    $('.app').removeClass('tilt');
    $(this).closest('.modal').removeClass('active');
  });

  // $(document).click(function (e) {
  //   var value = $('.modal__container');
  //   if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
  //     $('.app').removeClass('tilt');
  //     $(this).closest('.modal').removeClass('active');
  //   }
  // });

  // YANDEX MAPS
  ymaps.ready(init);
  var myMap, myPlacemark;

  function init() {
    myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });

    myMap.behaviors.get('drag').disable();

    myPlacemark = new ymaps.Placemark([55.76, 37.64], {
      hintContent: 'Москва!',
      balloonContent: 'Столица России'
    });

    myMap.geoObjects.add(myPlacemark);
  }

  // map overlay
  ymaps.ready(init2);
  var myMap2;

  function init2() {
    myMap2 = new ymaps.Map("map-over", {
      center: [55.76, 37.64],
      zoom: 7
    });
  }

  // FILE SELECT
  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
      var fileName = '';
      if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

      if (fileName) label.innerHTML = fileName;else label.innerHTML = labelVal;
    });
  });
});