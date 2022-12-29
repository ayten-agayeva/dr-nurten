$(document).ready(() => {
	//tabs
	$("body").on("click", ".tabs[data-target] > *:not(.active)", function (e) {
		e.preventDefault();
		const tab_parent = $(this).closest(".tabs"),
			target = tab_parent.attr("data-target");
		if (tab_parent.length > 0 && target) {
			const tab = $(this),
				tabs = tab_parent.find(">*"),
				index = tabs.index(tab);

			$(target).each(function () {
				const content = $(this).find(">*");
				content.removeClass("active");
				content.eq(index).addClass("active");
			});

			tabs.removeClass("active");
			tab.addClass("active");
		}
	});

	$("[data-match-height]").each(function () {
		$(this).find($(this).attr("data-match-height")).matchHeight();
	});

	if($('.blog .slider').length>0){
		const servicesSlider = tns({
			container: '.blog .slider',
			edgePadding: 15,
			center:true,
			items: 1.3,
			gutter: 15,
			controls:false,
			nav:false,
			controlsText:["",""],
			loop:false,
			responsive: {
				550: {
					gutter: 30,
					edgePadding:0,
					items: 4,
					center:false,
				}
			}
		});
	}

	if ($(".gallery .slider").length) {
		tns({
			container: ".gallery .slider",
			items: 1,
			gutter: 15,
			controlsText: ["", ""],
			nav: false,
			loop: false,
			controls: true,
			responsive: {
				550: {
					items: 4,
					gutter: 30,
					controls: true,
				},
			},
		});
	}

	$( ".services .item .img" ).each(function() {
		var attr = $(this).attr('data-image-src');
	  
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('-webkit-mask', 'url('+attr+')');
			$(this).css('mask', 'url('+attr+')');
		}
	  
	  });

	$(window).scroll(function () {
		if ($(window).scrollTop() > 60) {
			$(".back-to-top").addClass("show");
			$(".header-wrap").addClass("fixed");
		} else {
			$(".back-to-top").removeClass("show");
			$(".header-wrap").removeClass("fixed");
		}
	});
	$(".back-to-top").on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "200");
	});

	const media = window.matchMedia("(max-width: 991px)");
	mobileSupport(media);
	media.addListener(mobileSupport);
});

$.is_mobile = false;
const mobileSupport = (media) => {
	if (media.matches) {
		$.is_mobile = true;
		if ($(".menu-overlay .menu").length)
			$(".menu-overlay .sticky").unstick();

		if (!$(".mobile-menu nav").length) {
			$("#header .lang").clone().appendTo(".mobile-menu .header");
			$("#header nav").clone().appendTo(".mobile-menu");
			$("#header .track-btn").clone().appendTo(".mobile-menu");
			$("#footer .social").clone().appendTo(".mobile-menu");
			$(".mobile-menu nav > ul > li:has(ul) a").click(function () {
				$(this).parent().toggleClass("active");
				$(".mobile-menu").toggleClass("nav_open");
			});
			$(".mobile-menu .close").click(function (e) {
				e.preventDefault();
				$(".mobile-menu nav li.active").removeClass("active");
				$(".mobile-menu").removeClass("nav_open active");
				setTimeout(() => $(".mobile-menu").removeClass("animate"), 400);
				$("body").removeClass("disable_scroll");
			});
			$(".open-mobile-menu").click(function () {
				$(".mobile-menu").toggleClass("animate");
				setTimeout(() => $(".mobile-menu").toggleClass("active"), 10);
				$("body").addClass("disable_scroll");
			});
			$(".mobile-menu nav li .nav-link").click(function () {
				$(".mobile-menu").removeClass("nav_open active");
				setTimeout(() => $(".mobile-menu").toggleClass("animate"), 400);
				$("body").toggleClass("disable_scroll");
			});
		}

		$("[data-mobile-pos]").each(function () {
			const pos = $(this).attr("data-mobile-pos").split(",");
			const elem = $(this)
				.clone()
				.removeClass("hidden-xs")
				.removeAttr("data-mobile-pos")
				.addClass("cfm");
			if (pos[0] == "after") elem.insertAfter(pos[1]);
			else elem.insertBefore(pos[1]);
		});

		$(document).trigger("mobile_on");
	} else {
		$.is_mobile = false;

		if ($(".menu-overlay .menu").length)
			$(".menu-overlay .sticky").sticky({
				topSpacing: 105,
				zIndex: 2,
				bottomSpacing: $("#footer").outerHeight() + 400,
			});

		$(".cfm").remove();
		$(document).trigger("mobile_off");
	}
};

$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });
  