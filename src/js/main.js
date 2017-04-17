'use strict';

$(document).ready(function () {
  var _this = this;

  var _window = $(window);
  var _document = $(document);

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(_this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // SLICK
  $('.js-slick-sections').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    vertical: true,
    adaptiveHeight: false,
    dots: false,
    arrows: false
  });

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");
});