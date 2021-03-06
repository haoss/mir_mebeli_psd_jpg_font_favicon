'use strict'

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $('ol.list li').each(function(){
    $(this).prepend('<span class="span">' + ($(this).index() + 1) + '</span>');
  });



  headerLinks();
  mobileMenu();
  mainCarousel();
  aboutCarousel();
  aboutCarouselTop();

  $('a[href^="#"].anchor, a[href^="."].anchor').click( function(e){
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
    }
  });

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function headerLinks(){
  var headerPhone = $('.header__phone'),
      headerTime = $('.header__time');
  var btn = $('.header__navigation-button');
  var navMobile = $('.header__navigation-mobile');
  var footerBtn = $('.footer__navigation-button');
  var footerNavMobile = $('.footer__navigation-mobile');

  // header
  headerPhone.on('click', function(e){
    e.stopPropagation();
    $(this).toggleClass('is-active');
    headerTime.removeClass('is-active');
    navMobile.removeClass('is-active');
  });
  // headerTime.on('click', function(e){
  //   e.stopPropagation();
  //   $(this).toggleClass('is-active');
  //   headerPhone.removeClass('is-active');
  //   navMobile.removeClass('is-active');
  // });

  $(document).on('click', function(){

    if (headerPhone.hasClass('is-active')) {
      setTimeout(function(){
        headerPhone.removeClass('is-active');
      }, 500)
    }
    if (headerTime.hasClass('is-active')) {
      setTimeout(function(){
        headerTime.removeClass('is-active');
      }, 500)
    }
    if (navMobile.hasClass('is-active')) {
      setTimeout(function(){
        navMobile.removeClass('is-active');
      }, 500)
    }
    if (footerNavMobile.hasClass('is-active')) {
      setTimeout(function(){
        footerNavMobile.removeClass('is-active');
      }, 500)
    }

  });
}

function mobileMenu() {
  var headerPhone = $('.header__phone'),
      headerTime = $('.header__time');
  var ul = $('.header__navigation-ul');
  var footerUl = $('.footer__navigation-ul');
  var btn = $('.header__navigation-button');
  var ulMobile = $('.header__navigation-popup');
  var footerUlMobile = $('.footer__navigation-popup');
  var navMobile = $('.header__navigation-mobile');
  var navPopup = $('.header__navigation-popup');
  var footerBtn = $('.footer__navigation-button');
  var footerNavMobile = $('.footer__navigation-mobile');

  ul.clone().appendTo(ulMobile);
  footerUl.clone().appendTo(footerUlMobile);

  btn.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    navMobile.toggleClass('is-active');
    headerPhone.removeClass('is-active');
    headerTime.removeClass('is-active');
    footerNavMobile.removeClass('is-active');
  });

  footerBtn.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    footerNavMobile.toggleClass('is-active');
    navMobile.removeClass('is-active');
  });

  navPopup.on('click', function(e){
    e.stopPropagation();
  })
}

function mainCarousel(){
  $('.main-slider__carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000
  });
}

function aboutCarousel(){
  $('.about__carousel-wrapper').slick({
    infinite: true,
    centerMode: true,
    centerPadding: '285px',
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          centerPadding: '235px'
        }
      },
      {
        breakpoint: 991,
        settings: {
          centerPadding: '180px'
        }
      },
      {
        breakpoint: 767,
        settings: {
          centerMode: false,
          centerPadding: '0px',
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
}

function aboutCarouselTop(){
  $('.about__top-carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000
  });
}
