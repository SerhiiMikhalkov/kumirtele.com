'use strict';
$(document).on('ready', function () {
	
	$(".email-form1, .email-form2").click(function(e) { 
		e.preventDefault();
			//alert($(this).attr('href'));
			
			var url = '/templates/'+$(this).attr('href');
			LoadForm2(url, '', false);
			
		return false;
	});
	
	var method;
	var noop = function () {};
	var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
	var length = methods.length;
	var console = (window.console = window.console || {});
	var contextWindow = $(window);
	var $root = $('html, body');
	while (length--) {
		method = methods[length];
		if (!console[method]) {
			console[method] = noop;
		}
	}
	var list = $('.bg-img');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-image-src');
		list[i].style.backgroundImage = "url('" + src + "')";
		list[i].style.backgroundRepeat = "no-repeat";
		list[i].style.backgroundPosition = "center";
		list[i].style.backgroundSize = "cover";
	}
	var list = $('.bg-color');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-bgcolor');
		list[i].style.backgroundColor = src;
	}
	try {
		$('.clock-countdown').downCount({
			date: $('.site-config').attr('data-date'),
			offset: +10
		});
	} catch (error) {}
	var menuItems = $('.all-menu-wrapper .nav-link');
	var menuIcon = $('.menu-icon, #navMenuIcon');
	var menuBlock = $('.all-menu-wrapper');
	var reactToMenu = $('.page-main, .navbar-sidebar, .page-cover')
	var menuLinks = $(".navbar-mainmenu a, .navbar-sidebar a");
	menuIcon.on('click', function () {
		menuIcon.toggleClass('menu-visible');
		menuBlock.toggleClass('menu-visible');
		menuItems.toggleClass('menu-visible');
		reactToMenu.toggleClass('menu-visible');
		return false;
	});
	menuLinks.on('click', function () {
		menuIcon.removeClass('menu-visible');
		menuBlock.removeClass('menu-visible');
		menuItems.removeClass('menu-visible');
		reactToMenu.removeClass('menu-visible');
		return true;
	});
	new Swiper('.carousel-swiper-beta-demo .swiper-container', {
		pagination: '.carousel-swiper-beta-demo .items-pagination',
		paginationClickable: '.carousel-beta-alpha-demo .items-pagination',
		nextButton: '.carousel-swiper-beta-demo .items-button-next',
		prevButton: '.carousel-swiper-beta-demo .items-button-prev',
		loop: true,
		grabCursor: true,
		centeredSlides: true,
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		slidesPerView: 1,
		spaceBetween: 0,
		breakpoints: {
			1024: {
				slidesPerView: 1,
			},
			800: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			640: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			440: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		}
	});
	var imageList = $('.slide-show .img');
	var imageSlides = [];
	for (var i = 0; i < imageList.length; i++) {
		var src = imageList[i].getAttribute('data-src');
		imageSlides.push({
			src: src
		});
	}
	$('.slide-show').vegas({
		delay: 5000,
		shuffle: true,
		slides: imageSlides,
		animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
	});
	var videoBg = $('.video-container video, .video-container object');
	$('.section .content .anim.anim-wrapped').wrap("<span class='anim-wrapper'></span>");
	var pageSectionDivs = $('.page-fullpage .section');
	var headerLogo = $('.header-top .logo');
	var bodySelector = $('body');
	var sectionSelector = $('.section');
	var headerContainer = $('.hh-header');
	var slideElem = $('.slide');
	var arrowElem = $('.p-footer .arrow-d');
	var pageElem = $('.section');
	var pageSections = [];
	var pageAnchors = [];
	var nextSectionDOM;
	var nextSection;
	var fpnavItem;
	var mainPage = $('#mainpage');
	var sendEmailForm = $('.send_email_form');
	var sendMessageForm = $('.send_message_form');
	var scrollOverflow = true;
	var css3 = true;
	if (contextWindow.width() < 601) {
		scrollOverflow = false;
		css3 = false;
	}
	if (contextWindow.height() < 480) {
		scrollOverflow = false;
		css3 = false;
	}
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function (pageSection, cb) {
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function (err) {
		if (mainPage.width()) {
			mainPage.fullpage({
				menu: '#qmenu',
				anchors: pageAnchors,
				verticalCentered: false,
				css3: css3,
				navigation: true,
				responsiveWidth: 601,
				responsiveHeight: 480,
				scrollOverflow: scrollOverflow,
				scrollOverflowOptions: {
					click: true,
					submit: true,
				},
				normalScrollElements: '.section .scrollable',
				afterRender: function () {
					videoBg.maximage('maxcover');
					var isIE = false || !!document.documentMode;
					if (isIE) {
						var contentColumns = $('.section .content .c-columns');
						contentColumns.height(contextWindow.height())
						for (var i = 0; i < contentColumns.length; i++) {
							if (contentColumns[i].height <= contextWindow.height()) {
								contentColumns[i].style.height = "100vh";
							}
						}
					}
					var newsletterServerUrl = './ajaxserver/serverfile.php';
					var messageServerUrl = './ajaxserver/serverfile.php';
					if (sendEmailForm.attr('action') && (sendEmailForm.attr('action')) != '') {
						newsletterServerUrl = sendEmailForm.attr('action');
					}
					if (sendMessageForm.attr('action') && (sendMessageForm.attr('action') != '')) {
						messageServerUrl = sendMessageForm.attr('action');
					}
					sendEmailForm.initForm({
						serverUrl: newsletterServerUrl,
					});
					sendMessageForm.initForm({
						serverUrl: messageServerUrl,
					});
				},
				afterResize: function () {
					var pluginContainer = $(this);
					$.fn.fullpage.reBuild();
				},
				onLeave: function (index, nextIndex, direction) {
					arrowElem.addClass('gone');
					pageElem.addClass('transition');
					slideElem.removeClass('transition');
					pageElem.removeClass('transition');
				},
				afterLoad: function (anchorLink, index) {
					if ($('.section.active').hasClass('hide-clock')) {
						headerContainer.addClass('gone');
					} else {
						headerContainer.removeClass('gone');
					}
				}
			});
		}
	});
	$('.scrolldown a, .scroll.down').on('click', function () {
		try {
			$.fn.fullpage.moveSectionDown();
		} catch (error) {
			$root.animate({
				scrollTop: window.innerHeight
			}, 400, function () {});
		}
	});
	var scrollHeight = $(document).height() - contextWindow.height();
	contextWindow.on('scroll', function () {
		var scrollpos = $(this).scrollTop();
		var siteHeaderFooter = $('.page-footer, .page-header');
		if (scrollpos > 100) {
			siteHeaderFooter.addClass("scrolled");
		} else {
			siteHeaderFooter.removeClass("scrolled");
		}
	});
	contextWindow.on('load', function () {
		$('#page-loader').addClass('p-hidden');
		$('.section').addClass('anim');
	});
});