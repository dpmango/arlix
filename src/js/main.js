'use strict';

// JQUERY PAUSE
(function () {
  var $ = jQuery,
      pauseId = 'jQuery.pause',
      uuid = 1,
      oldAnimate = $.fn.animate,
      anims = {};

  function now() {
    return new Date().getTime();
  }

  $.fn.animate = function (prop, speed, easing, callback) {
    var optall = $.speed(speed, easing, callback);
    optall.complete = optall.old; // unwrap callback
    return this.each(function () {
      // check pauseId
      if (!this[pauseId]) this[pauseId] = uuid++;
      // start animation
      var opt = $.extend({}, optall);
      oldAnimate.apply($(this), [prop, $.extend({}, opt)]);
      // store data
      anims[this[pauseId]] = {
        run: true,
        prop: prop,
        opt: opt,
        start: now(),
        done: 0
      };
    });
  };

  $.fn.pause = function () {
    return this.each(function () {
      // check pauseId
      if (!this[pauseId]) this[pauseId] = uuid++;
      // fetch data
      var data = anims[this[pauseId]];
      if (data && data.run) {
        data.done += now() - data.start;
        if (data.done > data.opt.duration) {
          // remove stale entry
          delete anims[this[pauseId]];
        } else {
          // pause animation
          $(this).stop();
          data.run = false;
        }
      }
    });
  };

  $.fn.resume = function () {
    return this.each(function () {
      // check pauseId
      if (!this[pauseId]) this[pauseId] = uuid++;
      // fetch data
      var data = anims[this[pauseId]];
      if (data && !data.run) {
        // resume animation
        data.opt.duration -= data.done;
        data.done = 0;
        data.run = true;
        data.start = now();
        oldAnimate.apply($(this), [data.prop, $.extend({}, data.opt)]);
      }
    });
  };
})();

/////////////////
// READY FUNCTION
/////////////////

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
  var preloaderVisible = true;

  function showPreloader(bg) {
    var bg = bg || $('.section--home').css('background-image');

    if (bg) {
      var src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
      var $img = $('<img>').attr('src', src).on('load', function () {
        // set delay, so users with fast connection can see preloader :)
        setTimeout(function () {
          $('.preloader').addClass('ready');
          preloaderVisible = false;
          clearInterval(timerId);
        }, 1500);
      });
    }
  }

  // showPreloader( $('.section--home').css('background-image') );

  if (preloaderVisible) {
    appendLetters();
    timerId = setInterval(function () {
      appendLetters();
    }, 1800);
  } else {
    clearInterval(timerId);
  }

  // LOGO ANIMATION
  var letterA, letterAA, letterAAA, letterX, letterXX, letterXXX;
  var logoPaused = false;
  var timerId;

  function appendLetters(action) {
    var target = '';
    if (action == 'break') {
      target = '.header__logo--primary .header__logo__main';
    } else {
      // else target all logos
      target = '.header__logo__main';
    }
    function appendA() {
      letterA = $('<div class="header__logo__ajs">a</div>').insertBefore(target).animate({
        opacity: 0,
        left: "-=60"
      }, 1800, 'linear', function () {
        $(this).remove();
      });
    }
    function appendAA() {
      letterAA = $('<div class="header__logo__ajs">a</div>').insertBefore(target).animate({
        opacity: 0,
        left: "-=60"
      }, 1800, 'linear', function () {
        $(this).remove();
      });
    }
    function appendAAA() {
      letterAAA = $('<div class="header__logo__ajs">a</div>').insertBefore(target).animate({
        opacity: 0,
        left: "-=60"
      }, 1800, 'linear', function () {
        $(this).remove();
      });
    }

    function appendX() {
      letterX = $('<div class="header__logo__xjs">x</div>').insertAfter(target).animate({
        opacity: 0,
        right: "-=60"
      }, 1800, 'linear', function () {
        $(this).remove();
      });
    }
    function appendXX() {
      letterXX = $('<div class="header__logo__xjs">x</div>').insertAfter(target).animate({
        opacity: 0,
        right: "-=60"
      }, 1800, 'linear', function () {
        $(this).remove();
      });
    }
    function appendXXX() {
      letterXXX = $('<div class="header__logo__xjs">x</div>').insertAfter(target).animate({
        opacity: 0,
        right: "-=60"
      }, 1800, 'linear', function () {
        $(this).remove();
      });
    }

    // action handler
    appendA();
    setTimeout(appendAA, 600);
    setTimeout(appendAAA, 1200);
    appendX();
    setTimeout(appendXX, 600);
    setTimeout(appendXXX, 1200);

    if (action == "break") {
      setTimeout(stopAnimation, 1750);
    }
  }

  function stopAnimation() {
    letterA.pause();
    letterAA.pause();
    letterAAA.pause();
    letterX.pause();
    letterXX.pause();
    letterXXX.pause();
  }

  // HOVER FUNCTION
  appendLetters('break');
  $('.header__logo').not('.animated').on('mouseenter', function () {
    // we are checking if letters was moved alread
    $('.header__logo__xjs').resume();
    $('.header__logo__ajs').resume();
    appendLetters();
    timerId = setInterval(function () {
      appendLetters();
    }, 1800);
  });

  $('.header__logo').not('.animated').on('mouseleave', function () {
    stopAnimation();
    clearInterval(timerId);
  });

  ////////////////
  // SLICK
  ////////////////
  $('.js-slick-sections').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    vertical: false,
    adaptiveHeight: true,
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
        touchMove: true,
        fade: false,
        vertical: true
      }
    }]
  });

  // CHECK SAVED STATE
  if (window.location.hash) {
    var hash = window.location.hash.substring(1);

    // if modal
    if (hash.match("^modal")) {
      // open modal
      $('.app').addClass('tilt');
      $('#' + hash).addClass('active');

      // set slide also

      if (hash.indexOf('modalPortfolio') == 0) {
        // wait for modal image load
        showPreloader($('#' + hash).find('.modal__content img:first-child').attr('src'));

        $('.js-slick-sections').slick('slickGoTo', 2);
        $('.navi__list a:nth-child(3)').siblings().removeClass('active');
        $('.navi__list a:nth-child(3)').addClass('active');
      } else if (hash.match("^modalAbout")) {
        showPreloader();

        $('.js-slick-sections').slick('slickGoTo', 1);
        $('.navi__list a:nth-child(2)').siblings().removeClass('active');
        $('.navi__list a:nth-child(2)').addClass('active');

        $('.about-control').addClass('animate');
      }
    } else {
      // if section

      showPreloader();

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
      if (hash == "contacts") {
        $('.app').addClass('section-3');
      }
    }
  } else {
    showPreloader();
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
    } else {
      $('.about-control').removeClass('animate');
    }

    // append class
    $('.app').removeClass('section-0').removeClass('section-1').removeClass('section-2').removeClass('section-3');
    $('.app').addClass('section-' + nextSlide + '');
  });

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
  });

  // SLICK ABOUT
  var _owlAbout = $('.js-slick-about');

  _owlAbout.owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    URLhashListener: true,
    touchDrag: false,
    mouseDrag: false,
    onInitialized: owlAboutInitialized
  });

  function owlAboutInitialized() {
    addSwipeEventsForAnimation();
  }

  // custom triggers on swipe
  function addSwipeEventsForAnimation() {
    var targetEl = document.querySelector('.section--about');
    var hamEvents = new Hammer(targetEl, {});

    hamEvents.on("swiperight", function () {
      console.log('swipe right');
      _owlAbout.trigger('prev.owl.carousel');
    });
    hamEvents.on("swipeleft", function () {
      console.log('swipe left');
      _owlAbout.trigger('next.owl.carousel');
    });

    _owlAbout.on('drag.owl.carousel', function () {
      _owlAbout.trigger('translated.owl.carousel');
    });
  }

  // about navigation
  $('.about-control').on('click', '.about-control__item', function (e) {
    _owlAbout.trigger('to.owl.carousel', $(this).data('about'));
  });

  $('.js-slick-about').on('changed.owl.carousel', function (event) {
    var nextSlide = event.page.index;
    $('.about-control__item').each(function (i, val) {
      if ($(val).data('about') == nextSlide) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
    event.stopPropagation();
  });

  // handle logo click
  $('.header__logo').on('click', function (e) {
    $('.navi__list a').siblings().removeClass('active');
    $('.navi__list a:first-child').addClass('active');

    $('.js-slick-sections').slick('slickGoTo', 0);
  });

  // SCROLLBARS
  $('.scrollbar-macosx').scrollbar();

  //////////
  // MODAL
  //////////

  $("a[href^='#modal']").on('click', function (e) {
    var targetModal = $(this).attr('href');
    $('.app').addClass('tilt');
    $(targetModal).addClass('active');

    window.location.hash = targetModal;

    e.preventDefault();
  });

  // close modal
  function modalExit(that) {
    $('.app').removeClass('tilt');
    $(that).closest('.modal').removeClass('active');

    // update hash on close
    window.location.hash = $('.navi__list a').data('hash');
  }

  $('.ico-close').on('click', function () {
    modalExit(this);
  });

  $(document).mouseup(function (e) {
    var container = new Array();
    // which areas are clickable
    container.push($('.modal__container'));

    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
        modalExit(value);
      }
    });
  });

  ////////////////
  // YANDEX MAPS
  ////////////////
  ymaps.ready(init);

  var myMap, myMap2, myPlacemark, synchroListeners;
  var coors = [55.747115, 37.539078];
  var mapsZoom = 16;

  // Инициализируем карты
  function init() {
    myMap = new ymaps.Map("map", {
      center: coors,
      zoom: mapsZoom,
      controls: []
    });

    // myMap.behaviors.disable(["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]);

    // немного замедляем скролл
    myMap.options.set('scrollZoomSpeed', 1.25);

    myPlacemark = new ymaps.Placemark(coors, {
      hintContent: 'ARLIX!',
      balloonContent: 'Россия, Москва, Пресненская набережная, 8с1'
    }, {
      preset: 'islands#redDotIcon'
    });

    myMap.geoObjects.add(myPlacemark);

    //вторая карта - наложение как фон
    myMap2 = new ymaps.Map("map-over", {
      center: coors,
      zoom: mapsZoom,
      controls: []
    });

    myMap2.options.set('scrollZoomSpeed', 1.25);

    // синхронизация карт
    synchroListeners = synchronizeMaps(myMap, myMap2);
  }

  function synchronizeMaps(firstMap, secondMap) {
    firstMap.events.add(["boundschange", "wheel", "sizechange", "marginchange"], function (e) {
      secondMap.setCenter(firstMap.getCenter(), firstMap.getZoom());
    });
    firstMap.events.add(["actiontick"], function (e) {
      var tickParser = e.get('tick');
      secondMap.setGlobalPixelCenter(tickParser.globalPixelCenter);
    });
  }

  ////////////////
  // FILE SELECT - codedrops
  ////////////////

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