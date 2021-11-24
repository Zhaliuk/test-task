$( document ).ready( function() {
	/* - - - - - - - - - - - - - -       init inputmask       - - - - - - - - - - - - - - - */
	$( '[type="tel"]' ).inputmask( '(999) 999-9999' );
	/* - - - - - - - - - - - - - -       init select2       - - - - - - - - - - - - - - - */
	$( '.js-select' ).select2({
		language: 'uk',
		width: '100%',
		minimumResultsForSearch: -1
	}).on( 'select2:select', function( e ) {
		if ( e.params.data.text === '' ) {
			$( e.target ).removeClass( 'filled' );
		} else {
			$( e.target ).addClass( 'filled' );
		}
	});
	/* - - - - - - - - - - - - - -       input validate       - - - - - - - - - - - - - - - */
	function setInput() {
		$( 'input:not(.btn):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="reset"])' ).each( function() {
			if ( $( this ).val() !== '' ) {
				$( this ).addClass( 'filled' );
			}
		});
	}
	setInput();

	$( 'input' ).on( 'input', function() {
		if ( $( this ).val() !== '' ) {
			$( this ).addClass( 'filled' );
		} else {
			$( this ).removeClass( 'filled' );
		}
	});

	$( document ).on( 'click', '.form-error', function() {
		const $parent = $( this ).closest( '.form-group' );
		$parent.find( 'input, textarea' ).removeClass( 'filled' ).val( '' );
	});
	/* - - - - - - - - - - - - - -       language select      - - - - - - - - - - - - - - - */
	$('.language').on('click', function (e){
		$(this).toggleClass('active');
	})
	$(document).mouseup(function (e) { // событие клика по веб-документу
		var div = $(".language"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			$(".language").removeClass('active');
		}
	});
	/* - - - - - - - - - - - - - -       header-fixed      - - - - - - - - - - - - - - - */
	let headerOffset = $('.header-site').offset().top;
	let headerHeight = $('.header-site').height();
	$(window).scroll(function (e) {
		headerHeight = $('.header-site').height();
		const scrolled = $(this).scrollTop();
		if (scrolled > headerOffset) {
			if (!$('.header-site').hasClass('header--transparent')) {
				$('.wrapper').css('padding-top', `${headerHeight}px`);
			}
			$('.header-site').addClass('header--fixed');
		} else if (scrolled <= headerOffset) {
			if (!$('.header-site').hasClass('header--transparent')) {
				$('.wrapper').css('padding-top', `0px`);
			}
			$('.header-site').removeClass('header--fixed');
		}
	});
	/* - - - - - - - - - - - - - -       mobile-menu     - - - - - - - - - - - - - - - */

	$(".js-toggle-nav").click(function () {
		$("body").toggleClass("overflow__hidden");
		$(".wrapper").toggleClass("overflow__layout");
		$(this).toggleClass("open");
		$(".mobile-menu").toggleClass("open");
	});
	$(".mobile-menu__close").on("click", function () {
		$(".mobile-menu").toggleClass("open");
		$("body").toggleClass("overflow__hidden");
		$(".wrapper").toggleClass("overflow__layout");
	});
	$(document).mouseup(function (e) { // событие клика по веб-документу
		var div = $(".mobile-menu"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			$(".mobile-menu").removeClass('open');
			$("body").removeClass('overflow__hidden');
			$(".wrapper").removeClass('overflow__layout');
		}
	});
});
