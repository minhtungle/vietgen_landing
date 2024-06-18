'use strict';
var localLocale

class Main {
  constructor() {}
  init() {
    var main = this;
    $(window).on('load', function () {
      main.preLoader();
    });
    $(window).on('scroll', function () {
      /* ----------------------------------------------------------- */
      /*  Fixed header
      /* ----------------------------------------------------------- */
      main.fixedHeader();
      main.counter();
      main.scrollTopBtn();
    });
    $(document).ready(function () {
      // main.changeHeaderTab();
      localLocale = moment();
      main.timeline();
      main.navSearch();
      main.navbarDropdown();
      main.backToTop();
      main.bannerCarouselOne();
      main.bannerCarouselTwo();
      main.pageSlider();
      main.projectShuffle();
      main.testimonialCarousel();
      main.teamCarousel();
      main.mediaPopup();
      main.addDay();
    });
  }
  lienKetMXH(tenTrang = "facebook") {
    var facebook = "https://www.facebook.com/tuyendungnhansucapcaoVN";
    var insta = "https://www.facebook.com/tuyendungnhansucapcaoVN";
    var x = "https://www.facebook.com/tuyendungnhansucapcaoVN";
    if (tenTrang == "facebook") {
      window.open(facebook);
    } else if (tenTrang == "insta") {
      window.open(facebook);
    } else {
      window.open(facebook);
    };
  }
  timeline() {
    var mySwiper = new Swiper(".swiper", {
      autoHeight: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 500,
      direction: "horizontal",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar"
      },
      loop: false,
      effect: "slide",
      spaceBetween: 30,
      on: {
        init: function () {
          $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
          $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
        },
        slideChangeTransitionStart: function () {
          $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
          $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");
        }
      }
    });
    $(".swiper-pagination-custom .swiper-pagination-switch").click(function () {
      mySwiper.slideTo($(this).index());
      $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
      $(this).addClass("active");
    });
  }
  addDay() {
    moment.locale('en'); // default the locale to English
    var hienTai = localLocale.subtract(10, 'days').calendar();
    $('.news .post-item-date').html('<i class="fa fa-clock-o"></i> ' + hienTai);
  }
  // change header tab
  changeHeaderTab() {
    // Lấy các thẻ li chuyển tab
    var $allSiteTabs = $('.navbar li');
    // Hủy active tất cả tab
    $allSiteTabs.removeClass('active');

    // Lấy URL của trang hiện tại
    var currentPageUrl = window.location.href;
    // Tách tên trang từ URL
    var currentPageName = currentPageUrl.split("/").pop().split(".")[0];
    if (currentPageName == "" || currentPageName == "index") {
      $('.navbar li[data-site="trangchu"]').addClass('active');
    } else {
      $.each($allSiteTabs, function () {
        var $thisTab = $(this);
        var dataSite = $thisTab.attr('data-site');
        if (dataSite) {
          var slitIt = dataSite.split('/');
          var kiemTra = slitIt[slitIt.length - 1] == currentPageName;
          // Phần tử cuối là trang hiện tại
          if (kiemTra) {
            // active theo đường dẫn thẻ
            slitIt.map(page => {
              $(`.navbar li[data-site="${page}"]`).addClass('active');
            })
          };
        }
      });
    };
  }

  // Preloader js    
  preLoader() {
    $('.preloader').fadeOut(700);
  }

  // fixedHeader on scroll
  fixedHeader() {
    var headerTopBar = $('.top-bar').outerHeight();
    var headerOneTopSpace = $('.header-one .logo-area').outerHeight();

    var headerOneELement = $('.header-one .site-navigation');
    var headerTwoELement = $('.header-two .site-navigation');

    if ($(window).scrollTop() > headerTopBar + headerOneTopSpace) {
      $(headerOneELement).addClass('navbar-fixed');
      $('.header-one').css('margin-bottom', headerOneELement.outerHeight());
    } else {
      $(headerOneELement).removeClass('navbar-fixed');
      $('.header-one').css('margin-bottom', 0);
    }
    if ($(window).scrollTop() > headerTopBar) {
      $(headerTwoELement).addClass('navbar-fixed');
      $('.header-two').css('margin-bottom', headerTwoELement.outerHeight());
    } else {
      $(headerTwoELement).removeClass('navbar-fixed');
      $('.header-two').css('margin-bottom', 0);
    }
  }

  // Count Up
  counter() {
    var oTop;
    if ($('.counterUp').length !== 0) {
      oTop = $('.counterUp').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.counterUp').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }

  // scroll to top btn show/hide
  scrollTopBtn() {
    var scrollToTop = $('#back-to-top'),
      scroll = $(window).scrollTop();
    if (scroll >= 50) {
      scrollToTop.fadeIn();
    } else {
      scrollToTop.fadeOut();
    }
  }

  // navSearch show/hide
  navSearch() {
    $('.nav-search').on('click', function () {
      $('.search-block').fadeIn(350);
    });
    $('.search-close').on('click', function () {
      $('.search-block').fadeOut(350);
    });
  }

  // navbarDropdown
  navbarDropdown() {
    if ($(window).width() < 992) {
      $('.site-navigation .dropdown-toggle').on('click', function () {
        $(this).siblings('.dropdown-menu').animate({
          height: 'toggle'
        }, 300);
      });

      var navbarHeight = $('.site-navigation').outerHeight();
      $('.site-navigation .navbar-collapse').css('max-height', 'calc(100vh - ' + navbarHeight + 'px)');
    }
  }

  // back to top
  backToTop() {
    $('#back-to-top').on('click', function () {
      $('#back-to-top').tooltip('hide');
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  }

  // banner-carousel
  bannerCarouselOne() {
    $('.banner-carousel.banner-carousel-1').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      speed: 800,
      arrows: true,
      prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
    });
    $('.banner-carousel.banner-carousel-1').slickAnimation();
  }

  // banner Carousel Two
  bannerCarouselTwo() {
    $('#timeline-container .banner-carousel.banner-carousel-2').slick({
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      dots: false,
      speed: 5000,
      arrows: true,
      prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
    });
    $('#timeline-container .banner-carousel.banner-carousel-1').slickAnimation();
  }

  // pageSlider
  pageSlider() {
    $('.page-slider').slick({
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      dots: false,
      speed: 800,
      arrows: true,
      prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
    });
  }

  // Shuffle js filter and masonry
  projectShuffle() {
    if ($('.shuffle-wrapper').length !== 0) {
      var Shuffle = window.Shuffle;
      var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
        itemSelector: '.shuffle-item',
        sizer: '.shuffle-sizer',
        buffer: 1
      });
      $('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
          myShuffle.filter(input.value);
        }
      });
      $('.shuffle-btn-group label').on('click', function () {
        $('.shuffle-btn-group label').removeClass('active');
        $(this).addClass('active');
      });
    }
  }

  // testimonial carousel
  testimonialCarousel() {
    $('.testimonial-slide').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      speed: 600,
      arrows: false
    });
  }

  // team carousel
  teamCarousel() {
    $('.team-slide').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 2,
      arrows: true,
      prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>',
      responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  // media popup
  mediaPopup() {
    $('.gallery-popup').colorbox({
      rel: 'gallery-popup',
      transition: 'slideshow',
      innerHeight: '500'
    });
    $('.popup').colorbox({
      iframe: true,
      innerWidth: 600,
      innerHeight: 400
    });
  }
}
class GoogleSheet {
  constructor() {}
  async dangKyTuVan() {
    var googleSheet = this;
    var thongTinNguoiDangKy = {
      thoiGian: localLocale.subtract(10, 'days').calendar(),
      hoTen: $("#input-hoten", $("#form-dangkytuvan")).val(),
      email: $("#input-email", $("#form-dangkytuvan")).val(),
      chuongTrinhHoc: $("#input-chuongtrinhhoc", $("#form-dangkytuvan")).val(),
      noiDung: $("#input-noidung", $("#form-dangkytuvan")).val(),
    };
    var url = ``;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(thongTinNguoiDangKy)
    })
  }
}
var main = new Main();
main.init();
