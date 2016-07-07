jQuery(document).ready(function($) {

    'use-strict';

    //useful var
    var $window = $(window);
    var mainMenuHeight = $('#ro-main-menu').height();

    /* Active smoothScroll when use mouse wheel on window */
    function ROsmoothScroll() {
        if (navigator.appVersion.indexOf("Mac") === -1) {
            $('body').append("<script src='vendors/smooth-scroll/SmoothScroll.js'></script>");
        }
    }
    ROsmoothScroll();

    /* Make easing scroll when click a link in page */
    function ROEasingMoving() {
        var $root = $('html, body');
        $('.ro-easing-link-group a , .ro-easing-link').on('click', function() {
            var href = $.attr(this, 'href');
            $root.animate({
                scrollTop: ($(href).offset().top - mainMenuHeight)
            }, 500, function() {
                window.location.hash = href;
            });
            return false;
        });
    }
    ROEasingMoving();

    /* Active jquery date picker */
    function RODatePicker() {
        $('#ro-date-picker').datepicker();
    }
    RODatePicker();

    /* Make video scale like background-size:cover */
    function ROVideoCover(VideoRatio) {
        $('.ro-video-bg-wrapper').each(function() {
            var $this = $(this);
            if ($this.height() * VideoRatio > $this.width())
                $(this).addClass('ro-video-h');
            else
                $(this).removeClass('ro-video-h');
            $(window).on('resize', function() {
                if ($this.height() * VideoRatio > $this.width())
                    $this.addClass('ro-video-h');
                else
                    $this.removeClass('ro-video-h');
            });
        });
    }
    ROVideoCover(16 / 9);

    /* Open the hide menu */
    function ROOpenMenu() {
        $('#ro-hamburger').on('click', function() {
            $('body').toggleClass('ro-menu-opened');
        });

        $('#ro-main-menu-content .ro-easing-link-group a').on('click', function() {
            setTimeout(function() {
                $('body').removeClass('ro-menu-opened');
            }, 500);
            /* Act on the event */
        });
    }
    ROOpenMenu();

    /* Menu fixed */
    function ROMenuFixed() {

        if ($window.scrollTop() >= $('#ro-main > header').outerHeight() - mainMenuHeight) {
            $('body').addClass('ro-menu-fixed');
        } else {
            $('body').removeClass('ro-menu-fixed');
        }

        $window.on('scroll', function() {
            if ($window.scrollTop() >= $('#ro-main > header').outerHeight() - mainMenuHeight) {
                $('body').addClass('ro-menu-fixed');
            } else {
                $('body').removeClass('ro-menu-fixed');
            }
        });
    }
    ROMenuFixed();

    /* Make Home background slider */
    function ROHomeSlider() {
        $('#ro-home-background-slider').flexslider({
            animationSpeed: 700,
            directionNav: false,
            controlNav: false
        });
    }
    ROHomeSlider();


    function ROResponsiveHomeSlider() {
        var $container = $('#ro-home-slider-wrapper');
        var $slider = $('#ro-home-background-slider');
        var ratio = $slider.width() / $slider.height();
        if ($window.width() / $window.height() < ratio) {
            $container.width($window.height() * ratio);
        }

        $window.on('resize', function() {
            if ($window.width() / $window.height() < ratio) {
                $container.width($window.height() * ratio);
            } else {
                $container.width('100%');
            }
        });
    }
    ROResponsiveHomeSlider();

    /*fancybox for gallery*/

    function ROfancybox() {
        $('a.ro-gallery-group').fancybox();
    }
    ROfancybox();

    /* Active testimonial slider */
    function ROTestimonalSlider() {
        $('#ro-testimonial-slider').flexslider({
            animationSpeed: 700,
            animation: "slide",
            itemMargin: 30,
            directionNav: false
        });
    }
    ROTestimonalSlider();

    /* Control action of Membership pricing table */
    function ROMembership() {
        $('#ro-membership-table .ro-membership-item .ro-button').on('click', function() {
            $('#ro-membership-table .ro-membership-item').removeClass('ro-active');
            $(this).parents('.ro-membership-item').addClass('ro-active');
            return false;
        });
    }
    ROMembership();

    /* Combo direction */
    function ROMenuCombo() {
        var numberCombo = $('#ro-menu-nav>ul>li').length;
        $('.ro-combo-prev').on('click', function() {
            var thisEq = $(this).parents('.tab-pane').index();
            $('#ro-menu-nav li:eq(' + (thisEq - 1) + ') a').tab('show');
            return false;
        });
        $('.ro-combo-next').on('click', function() {
            var thisEq = $(this).parents('.tab-pane').index();
            $('#ro-menu-nav li:eq(' + ((thisEq + 1) % numberCombo) + ') a').tab('show');
            return false;
        });
    }
    ROMenuCombo();

    /* Main function to confif parameter of Diamond Menu */
    function RODiamond($DiamondArea) {
        var DiamondSquare = 360;
        var GridColMax = 5;
        var GridCol = Math.min(Math.floor($DiamondArea.width() / DiamondSquare), GridColMax);
        var GridColOld = GridCol;

        RODiamondSort($DiamondArea, GridCol, DiamondSquare);
        $(window).on('resize', function() {
            GridCol = Math.floor($DiamondArea.width() / DiamondSquare);
            if (GridCol !== GridColOld) {
                RODiamondSort($DiamondArea, GridCol, DiamondSquare);
                GridColOld = GridCol;
            }
        });
    }
    RODiamond($('.ro-diamond-area'));

    /* Sort the diamond in diamond menu */
    function RODiamondSort($DiamondArea, GridCol, DiamondSquare) {
        var $DiamondList = $DiamondArea.children('.ro-diamond-area-inner').children('.ro-diamond-block');
        $DiamondArea.children('.ro-diamond-area-inner').attr('data-ngrid', GridCol);
        var $Diamond = [];
        for (var i = 0; i < $DiamondList.length; i++) {
            $Diamond[i] = $DiamondList.eq(i);
        }
        var HaftDiamondSquare = DiamondSquare / 2;
        var BestY = 0;

        if (GridCol > 1) {

            for (i = 0; i < $Diamond.length; i++) {
                var ThisLeft = (parseInt($Diamond[i].attr('data-x' + GridCol) , 10) || 0) * HaftDiamondSquare;
                var ThisTop = (parseInt($Diamond[i].attr('data-y' + GridCol) , 10) || 0) * HaftDiamondSquare ;
                var ThisSize = (parseInt($Diamond[i].attr('data-diamond-size') , 10) || 1) * DiamondSquare;
                $Diamond[i].css({
                    transform: 'translate(' + ThisLeft + 'px ,' + ThisTop + 'px)'
                });


                if (ThisTop + ThisSize > BestY) {
                    BestY = ThisTop + ThisSize;
                }
            }

            $DiamondArea.children('.ro-diamond-area-inner').css({
                width: DiamondSquare * GridCol + 'px',
                height: BestY + 'px'
            });
        } else {
            $DiamondList.css('transform', 'none');
            $DiamondArea.children('.ro-diamond-area-inner').css({
                width: 'auto',
                height: 'auto'
            });
        }
    }

    /**
     * HTML5shiv
     */
    window.html5 = {
        'shivCSS': true
    };

});