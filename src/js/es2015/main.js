$(document).ready(function(){

  const _window = $(window);
  const _document = $(document);

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

  // PRELOADER
  var $div = $('.section--home');
  var bg = $div.css('background-image');

  if (bg) {
    var src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
    var $img = $('<img>').attr('src', src).on('load', function() {
        $('.preloader').addClass('ready');
      });
  }

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
    fade: true
  });

  // SLICK NAVIGATION
  $('.navi__list').on('click', 'a', function(e){

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $('.js-slick-sections').slick('slickGoTo', $(this).data('section') - 1 );
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
  $('.about-control').on('click', '.about-control__item', function(e){

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $('.js-slick-about').slick('slickGoTo', $(this).data('about') - 1 );
  });

  // handle logo click
  $('.header__logo').on('click', function(e){
    $('.navi__list a').siblings().removeClass('active');
    $('.navi__list a:first-child').addClass('active');

    $('.js-slick-sections').slick('slickGoTo', 0);
  });



  // Masked input
  $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  // YANDEX MAPS
  ymaps.ready(init);
    var myMap,
        myPlacemark;

  function init(){
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

  function init2(){
      myMap2 = new ymaps.Map("map-over", {
          center: [55.76, 37.64],
          zoom: 7
      });
  }
});
