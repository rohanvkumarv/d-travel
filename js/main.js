(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate WOW.js
    new WOW().init();


    // Sticky Navbar on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Bind tab-switching links and scroll-active nav on page load
    $(function () {
        bindTabLinks();
        bindNavActiveOnScroll();
    });


    // Switch to the correct services tab when a [data-tab] link is clicked
    function bindTabLinks() {
        $(document).on('click', 'a[data-tab]', function (e) {
            e.preventDefault();
            var tabId = $(this).data('tab');
            var $target = $('#' + tabId);
            var $tabBtn = $('[data-bs-target="#' + tabId + '"]');

            // Close mobile nav if open
            var $navCollapse = $('#navbarCollapse');
            if ($navCollapse.hasClass('show')) {
                $navCollapse.collapse('hide');
            }

            // Activate the Bootstrap pill tab
            if ($tabBtn.length) {
                var tab = new bootstrap.Tab($tabBtn[0]);
                tab.show();
            }

            // Smooth scroll to #features section
            var $featuresSection = $('#features');
            if ($featuresSection.length) {
                $('html, body').animate({
                    scrollTop: $featuresSection.offset().top - 80
                }, 700, 'easeInOutExpo');
            }
        });
    }


    // Highlight active nav link while scrolling
    function bindNavActiveOnScroll() {
        var sections = ['about', 'features', 'destinations', 'contact'];

        $(window).on('scroll.navactive', function () {
            var scrollPos = $(this).scrollTop() + 100;

            // Remove active from all nav links
            $(document).find('.navbar-nav .nav-link').removeClass('active');

            // If near top, highlight Home
            if (scrollPos < 200) {
                $(document).find('.navbar-nav .nav-link[href="#"]').addClass('active');
                return;
            }

            // Check each section
            sections.forEach(function (id) {
                var $section = $('#' + id);
                if ($section.length) {
                    var top = $section.offset().top - 120;
                    var bottom = top + $section.outerHeight();
                    if (scrollPos >= top && scrollPos < bottom) {
                        $(document).find('.navbar-nav .nav-link[href="#' + id + '"]').addClass('active');
                    }
                }
            });
        });
    }

})(jQuery);
