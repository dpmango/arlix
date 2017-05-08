$(document).ready(function(){

  const _window = $(window);
  const _document = $(document);


 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

  // HAMBURGER
  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $('.navi').toggleClass('active');
  });

  // if something was clicked - hide mobile menu
  $('.navi__list a').on('click', function(){
    setTimeout(function(){
      $('.hamburger').removeClass('is-active');
      $('.navi').removeClass('active');
    }, 500);
  });

  // PRELOADER
  var preloaderVisible = true

  function showPreloader(bg){
    var bg = bg || $('.section--home').css('background-image')

    if (bg) {
      var src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
      var $img = $('<img>').attr('src', src).on('load', function() {
        // set delay, so users with fast connection can see preloader :)
        setTimeout(function(){
          $('.preloader').addClass('ready');
          preloaderVisible = false
          clearInterval(timerId);
        }, 1500)
        });
    }
  }

  // showPreloader( $('.section--home').css('background-image') );

  if ( preloaderVisible ){
    appendLetters();
    timerId = setInterval(function() {
      appendLetters()
    }, 450);
  } else {
    clearInterval(timerId);
  }

  // LOGO ANIMATION
  function appendLetters(){
    function appendA(){
      var letter = $('<div class="header__logo__ajs">a</div>').insertBefore('.header__logo__main');
      setTimeout(function(){
        letter.remove();
      },1800);
    }
    function appendX(){
      var letter =  $('<div class="header__logo__xjs">x</div>').insertAfter('.header__logo__main');

      setTimeout(function(){
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
  $('.header__logo').on('mouseenter', function(){
    appendLetters();
    timerId = setInterval(function() {
      appendLetters()
    }, 450);
  });

  $('.header__logo').on('mouseleave', function(){
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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          draggable: true,
          verticalSwiping: true,
          swipe: true,
          touchMove: true,
          fade: false,
          vertical: true
        }
      }
    ]
  });

  // CHECK SAVED STATE
  if(window.location.hash) {
    var hash = window.location.hash.substring(1);

    // if modal
    if ( hash.match("^modal") ){
      // open modal
      $('.app').addClass('tilt');
      $('#'+ hash).addClass('active');

      // set slide also

      if ( hash.indexOf('modalPortfolio') == 0 ){
        // wait for modal image load
        showPreloader( $('#'+ hash).find('.modal__content img').attr('src') );

        $('.js-slick-sections').slick('slickGoTo', 2 );
        $('.navi__list a:nth-child(3)').siblings().removeClass('active');
        $('.navi__list a:nth-child(3)').addClass('active');

      } else if ( hash.match("^modalAbout") ) {
        showPreloader();

        $('.js-slick-sections').slick('slickGoTo', 1 );
        $('.navi__list a:nth-child(2)').siblings().removeClass('active');
        $('.navi__list a:nth-child(2)').addClass('active');
      }

    } else {
      // if section

      showPreloader();

      $('.navi__list a').each(function(i, val){
        if ( $(this).data('hash') == hash ){
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          $('.js-slick-sections').slick('slickGoTo', $(this).data('section') );
        }
      });
      // refactor - why does the callback for section is not fired on slickGoTo??
      if ( hash == "about" ){
        $('.about-control').addClass('animate');
      }
      if ( hash == "contacts" ){
        $('.app').addClass('section-3');
      }
    }
  } else {
    showPreloader();
  }

  // SLICK SECTIONS CALLBACK
  $('.js-slick-sections').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.navi__list a').each(function(i,val){
      if ( $(val).data('section') == nextSlide ){
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });

    // about animation
    if ( nextSlide == 1 ){
      $('.about-control').addClass('animate');
    } else {
      $('.about-control').removeClass('animate');
    }

    // append class
    $('.app').removeClass('section-0').removeClass('section-1').removeClass('section-2').removeClass('section-3');
    $('.app').addClass('section-'+nextSlide+'');

  });

  // SLICK NAVIGATION
  $('.navi__list').on('click', 'a', function(e){
    // url actions
    var loc = window.location.href;

    // get params from clicked element
    var hash = $(this).data('hash');
    var section = $(this).data('section');

    $('.js-slick-sections').slick('slickGoTo', section );

    // save state
    window.location.hash = hash;

  });

  // SLICK ABOUT
  var _owlAbout = $('.js-slick-about')

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

  function owlAboutInitialized(){
    addSwipeEventsForAnimation();
  }

  // custom triggers on swipe
  function addSwipeEventsForAnimation() {
    var targetEl = document.querySelector('.section--about');
    var hamEvents = new Hammer( targetEl , {});

    hamEvents.on("swiperight", function(){
      console.log('swipe right');
      _owlAbout.trigger('prev.owl.carousel');
    });
    hamEvents.on("swipeleft", function(){
      console.log('swipe left');
      _owlAbout.trigger('next.owl.carousel');
    });

    _owlAbout.on('drag.owl.carousel',function(){
      _owlAbout.trigger('translated.owl.carousel');
    });
  }

  // about navigation
  $('.about-control').on('click', '.about-control__item', function(e){
    _owlAbout.trigger('to.owl.carousel', $(this).data('about'));
  });


  $('.js-slick-about').on('changed.owl.carousel', function(event){
    var nextSlide = event.page.index;
    $('.about-control__item').each(function(i,val){
      if ( $(val).data('about') == nextSlide ){
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
    event.stopPropagation();
  });



  // handle logo click
  $('.header__logo').on('click', function(e){
    $('.navi__list a').siblings().removeClass('active');
    $('.navi__list a:first-child').addClass('active');

    $('.js-slick-sections').slick('slickGoTo', 0);
  });


  //////////
  // MODAL
  //////////

  $("a[href^='#modal']").on('click', function(e){
    var targetModal = $(this).attr('href');
    $('.app').addClass('tilt');
    $(targetModal).addClass('active');

    window.location.hash = targetModal;

    e.preventDefault();
  });

  // close modal
  $('.ico-close').on('click', function(){
    $('.app').removeClass('tilt');
    $(this).closest('.modal').removeClass('active');

    // update hash on close
    window.location.hash = $('.navi__list a').data('hash');
  });


  ////////////////
  // YANDEX MAPS
  ////////////////
  ymaps.ready(init);

  var myMap, myMap2, myPlacemark, synchroListeners;
  var coors = [55.747115, 37.539078];
  var mapsZoom = 16;

  // Инициализируем карты
  function init(){
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

  function synchronizeMaps (firstMap, secondMap) {
    firstMap.events.add(["boundschange", "wheel", "sizechange", "marginchange"], function (e) {
      secondMap.setCenter(firstMap.getCenter(), firstMap.getZoom());
    })
    firstMap.events.add(["actiontick"], function (e) {
      var tickParser = e.get('tick')
      secondMap.setGlobalPixelCenter(tickParser.globalPixelCenter)
    });

  }


  ////////////////
  // FILE SELECT - codedrops
  ////////////////

  var inputs = document.querySelectorAll( '.inputfile' );
  Array.prototype.forEach.call( inputs, function( input )
  {
  	var label	 = input.nextElementSibling,
  		labelVal = label.innerHTML;

  	input.addEventListener( 'change', function( e )
  	{
  		var fileName = '';
  		if( this.files && this.files.length > 1 )
  			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
  		else
  			fileName = e.target.value.split( '\\' ).pop();

  		if( fileName )
  			label.innerHTML = fileName;
  		else
  			label.innerHTML = labelVal;
  	});
  });

});
