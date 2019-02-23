$(document).ready(function () {
	// применить чел. в номере
	$('.peopleApply').click(function(){
		var grow = $('.formDirections__lb-uppercase:visible').eq(0).text();
		var small = $('.formDirections__lb-uppercase:visible').eq(1).text();

		var text;
		if (parseInt(small)>0){
			var ages = '';
			var age = [];
			for (i=1;i<=parseInt(small);i++){
				var val = parseInt($('div.js-added-show'+i).find('span').text());
				if (!isNaN(val))
					age.push(val)
			}
			ages = '(' + age.join(',') + ' лет' + ')';
			small = age.length;
			switch (age.length){
				case 1:
					small = age.length+' ребенок';
					break;
				case 2:
					small = age.length+' ребенка';
					break;
				case 3:
					small = age.length+' детей';
					break;
				case 0:
					small = '';
			}
			small = small?(', ' + small + ages):''
			text = grow + small;
		} else {
			text = grow;
		}

		$('input[name*="peoples"]').val(text);
		$(this).closest('.formDirections').hide();
	})
	// бюджет
	$('.budgetApply').click(function(){
		var valuta = $('.formDirections__price-input-bbl').eq(1).text();
		var maxprice = $('#max-price5').val();
		$('input[name*="budget"]').val(maxprice + ' ' + valuta);
	})
	$('input[name*="priceBudgetRangeMin"]').on('change input', function(e){
		var max = Number($('input[name*="priceBudgetRangeMax"]').val());
		var min = Number($('input[name*="priceBudgetRangeMin"]').val());

		if (min>=max){
			$('input[name*="priceBudgetRangeMax"]').val( $(this).val() );
			$('input[name*="priceBudgetRangeMax"]').trigger('change');
		}

		//$('input[name*="priceBudgetRangeMax"]').trigger('change');
		if ( $(this).val()=='500000' )
			$('#opt-price0').val( 'Не важно' )
		else
			$('#opt-price0').val( $(this).val() )
	})
	$('input[name*="priceBudgetRangeMax"]').on('change input', function(e){
		var max = Number($('input[name*="priceBudgetRangeMax"]').val());
		var min = Number($('input[name*="priceBudgetRangeMin"]').val());

		if (max<=min){
			$('input[name*="priceBudgetRangeMin"]').val( $(this).val() );
			if ( $(this).val()=='500000' )
				$('#opt-price0').val( 'Не важно' )
			else
				$('#opt-price0').val( $(this).val() )
		}

		if ( $(this).val()=='500000' )
			$('#max-price5').val( 'Не важно' )	
		else
			$('#max-price5').val( $(this).val() )
	})

	$('.formDirections__bottom-close, .formDirections__close-red, .js-close-formDirections, .formDirections__close-abs').on('click', function (e) {
		if ($(this).attr('id')=='close_arrow_people_in_room' && !$('.js-ages').is(':visible')){
			$('.peopleApply').trigger('click')
			e.stopPropagation();
			$(this).closest('.formDirections').hide();
		} else {
			var container = $(this).closest('.formDirections');
			var isFlyfromCity = container.parent().hasClass('concrete_hotel_fly_from_city') ? true : false;
			var isAddHotel = container.parent().parent().hasClass('concrete_hotel_block_control') ? true : false;
			if (container.find('.formDirections__bottom-item').length && !isFlyfromCity && !isAddHotel){
				container.find('.formDirections__bottom-item').eq(0).show();
				container.find('.formDirections__bottom-item').eq(1).hide();
			} else {
				$(this).closest('.formDirections').hide();
			}
		}
		
	});
	$('.formDirections__SumoSelect ').on('click', 'li.opt', function () {
		$(this).closest('.formDirections').hide();
	});

	// контрол гостей
	$('.formDirections__guest-btn .formDirections__guest-btn-icon').hover(function () {
			$(this).prevAll().addClass('hover-active');
			$(this).nextAll().removeClass('hover-active');
			$(this).addClass('hover-active');
		}
	);
	$('.formDirections__guest-btn').hover(function () {
		},
		function () {
			$('.formDirections__guest-btn-icon').removeClass('hover-active');
		}
	);
	$('.formDirections__guest-btn-icon').on('click', function (event) {
		$(this).prevAll().addClass('selected');
		$(this).nextAll().removeClass('selected');
		if ($(this).parent().hasClass('child') && !event.isTrigger){
			if ($(this).index() === 0 && $(this).is('.selected')) {
				$(this).removeClass('selected');
			} else {
				$(this).addClass('selected');
			}
		} else {
			$(this).addClass('selected');
		}
		// дети
		if ($(this).parent().hasClass('child')){
			var child = $(this).parent().find('i.selected').length;
			switch (child){
				case 1:
					$('.formDirections__lb-uppercase:visible').eq(1).text(child+' ребенок')
					break;
				case 2:
					$('.formDirections__lb-uppercase:visible').eq(1).text(child+' ребенка')
					break;
				case 0:
				case 3:
					$('.formDirections__lb-uppercase:visible').eq(1).text(child+' детей')
					break;
			}
		}
		// взрослые
		else {
			var adult = $(this).parent().find('.selected').length;
			if (adult>1)
				$('.formDirections__lb-uppercase:visible').eq(0).text(adult + ' взрослых')
			else
				$('.formDirections__lb-uppercase:visible').eq(0).text(adult + ' взрослый')
		}
		event.preventDefault();
		event.stopPropagation();
	});
	$('.js-added-show1 ').on('click', function () {
		$('.js-added-show2 ').removeClass('hidden');
	});
	$('.js-added-show2 ').on('click', function () {
		$('.js-added-show3 ').removeClass('hidden');
	});

	// показываем больше взрослых
	$('.js-add-more-adults ').on('click', function () {
		$('.js-hide-adults ').hide();
		$('.js-show-adults ').show();
	});
	$('.js-show-ages').on('click', function () {
		$(this).closest('.formDirections__bottom-item ').hide();
		var numberChild = $(this)[0].classList[0].slice(-1);
		$('.js-ages').attr('child', numberChild);
		$('.js-ages').show();
	});
	$('.formDirections__price-currency--sm').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('.formDirections').find('.formDirections__bottom-item ').show();
		$('.js-ages').hide();
		var child = $('.js-ages').attr('child');
		var val = $(this).find('label').text();
		$('.js-added-show'+child).find('span').text(val);
		$('i.js-added-show'+child).trigger('click');
	});

	// контрол параметров
	$('.js-show-currencys').on('click', function () {
		$(this).closest('.formDirections').find('.js-hide-price-inputs').hide();
		$(this).closest('.formDirections').find('.js-act-currencys').show();
	});
	$('.js-act-currencys .formDirections__price-currency').on('click', function () {
		$(this).closest('.formDirections').find('.js-hide-price-inputs').show();
		$(this).closest('.formDirections__price-wrap').hide();

	});
	$('.formDirections__price-currency').on('click', function () {
		var valCurrency = $(this).find('.formDirections__price-currency-lb .formDirections__price-currency-sign').text();
		$(this).closest('.formDirections').find('.formDirections__price-input-bbl').text(valCurrency);
	});

	$('.formDirections .js-act-country').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').show();
		$(this).closest('.formDirections').find('.js-search-city').hide();
		$(this).closest('.formDirections').find('.js-search-hotels').hide();
		$(this).closest('.formDirections').find('.js-search-stars').hide();
		$(this).closest('.formDirections').find('.js-search-rating').hide();
		$(this).closest('.formDirections').find('.js-search-kid').hide();
		$(this).closest('.formDirections').find('.js-search-other').hide();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});
	$('.formDirections  .js-act-city').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').hide();
		$(this).closest('.formDirections').find('.js-search-city').show();
		$(this).closest('.formDirections').find('.js-search-hotels').hide();
		$(this).closest('.formDirections').find('.js-search-stars').hide();
		$(this).closest('.formDirections').find('.js-search-rating').hide();
		$(this).closest('.formDirections').find('.js-search-kid').hide();
		$(this).closest('.formDirections').find('.js-search-other').hide();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});
	$('.formDirections  .js-act-hotels').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').hide();
		$(this).closest('.formDirections').find('.js-search-city').hide();
		$(this).closest('.formDirections').find('.js-search-hotels').show();
		$(this).closest('.formDirections').find('.js-search-stars').hide();
		$(this).closest('.formDirections').find('.js-search-rating').hide();
		$(this).closest('.formDirections').find('.js-search-kid').hide();
		$(this).closest('.formDirections').find('.js-search-other').hide();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});
	$('.formDirections  .js-act-stars').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').hide();
		$(this).closest('.formDirections').find('.js-search-city').hide();
		$(this).closest('.formDirections').find('.js-search-hotels').hide();
		$(this).closest('.formDirections').find('.js-search-stars').show();
		$(this).closest('.formDirections').find('.js-search-rating').hide();
		$(this).closest('.formDirections').find('.js-search-kid').hide();
		$(this).closest('.formDirections').find('.js-search-other').hide();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});
	$('.formDirections  .js-act-rating').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').hide();
		$(this).closest('.formDirections').find('.js-search-city').hide();
		$(this).closest('.formDirections').find('.js-search-hotels').hide();
		$(this).closest('.formDirections').find('.js-search-stars').hide();
		$(this).closest('.formDirections').find('.js-search-rating').show();
		$(this).closest('.formDirections').find('.js-search-kid').hide();
		$(this).closest('.formDirections').find('.js-search-other').hide();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});
	$('.formDirections  .js-act-kid').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').hide();
		$(this).closest('.formDirections').find('.js-search-city').hide();
		$(this).closest('.formDirections').find('.js-search-hotels').hide();
		$(this).closest('.formDirections').find('.js-search-stars').hide();
		$(this).closest('.formDirections').find('.js-search-rating').hide();
		$(this).closest('.formDirections').find('.js-search-kid').show();
		$(this).closest('.formDirections').find('.js-search-other').hide();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});
	$('.formDirections  .js-act-other').on('click', function () {
		$(this).closest('.formDirections').find('.js-search-country').hide();
		$(this).closest('.formDirections').find('.js-search-city').hide();
		$(this).closest('.formDirections').find('.js-search-hotels').hide();
		$(this).closest('.formDirections').find('.js-search-stars').hide();
		$(this).closest('.formDirections').find('.js-search-rating').hide();
		$(this).closest('.formDirections').find('.js-search-kid').hide();
		$(this).closest('.formDirections').find('.js-search-other').show();
		$(this).closest('.formDirections').find('.formDirections__top-tab').removeClass('active');
		$(this).addClass('active');
	});


	$('.formDirections .formDirections__arr').on('click', function () {
		$(this).closest('.formDirections__city').find('.formDirections__drop-city').toggle();
		$(this).toggleClass('active')
	});

	// парметры отеля показать окно
	$('.js-show-formDirections').on('click', function () {
		if ($(this).parent().hasClass('exception'))
			return;
		$('.form-date + div').addClass('hidden');
		$(this).closest('html').find('.formDirections').hide();
		$(this).next('.formDirections').slideDown();
		$(this).next('.formDirections').show();
		$(this).find('input').removeClass('error');
		$('#concrete_hotel_title_hint').hide();
	});
	// парметры отеля, 1ый контрол
	$('.js-types-search-tours-blocks .tour-selection-wrap-in.first_control .parameters input').change(function(){
		// расположение
		if ($(this).closest('.js-search-country').length){
			checkboxChecker(this)
		}
		checkboxCounter(this)
	})
	// парметры отеля, 2ой контрол
	$('.js-types-search-tours-blocks .tour-selection-wrap-in.second_control .parameters input').change(function(){
		// расположение
		if ($(this).closest('.js-search-country').length){
			checkboxChecker(this)
		}
		checkboxCounter(this)
	})
	// парметры отеля, 3ий контрол
	$('.js-types-search-tours-blocks .tour-selection-wrap-in.third_control .parameters input').change(function(){
		// расположение
		if ($(this).closest('.js-search-country').length){
			checkboxChecker(this)
		}
		checkboxCounter(this)
	})
	$('.js-types-search-tours-blocks .tour-selection-wrap-in.first_control .parameters input').trigger('change');
	$('.js-types-search-tours-blocks .tour-selection-wrap-in.second_control .parameters input').trigger('change');
	$('.js-types-search-tours-blocks .tour-selection-wrap-in.third_control .parameters input').trigger('change');

	// обнуляем оставшиеся 3 группы отличные от той в которой произошел выбор
	function checkboxChecker(el){
		var block = $(el).closest('.formDirections__bottom-blocks');
		var choosedgroup = $(el).closest('.formDirections__cbx-item');
		block.get(0).querySelectorAll('.formDirections__cbx-item').forEach(function(e,i){
			var currentGroup = e;
			var choosedGroup = this.choosedgroup.get(0);
			if (!(currentGroup.isEqualNode(choosedGroup))){
				$(currentGroup).find('input:checked').prop( "checked", false );
			}
		}, {choosedgroup: choosedgroup})
	}
	function checkboxCounter(elem){
		var countChecked = 0;
		$(elem).closest('.tourpack_control').
		find('.parameters input').each(function(i,e){
			if ( $(e).prop('checked') ){
				countChecked++;
			}
		})
		$(elem).closest('.parameters').find('.bth__inp').text(countChecked + ' / 34');
	}

	//конкретный отель
	$('.concrete_hotel_fly_from_city .formDirections__bottom-blocks-cut input').change(function(){
		var choose = $(this).next().find('span').text();
		$('input[name="concrete_hotel"]').val(choose);
	})
	$('input[placeholder="Поиск городов вылета"]').on('change keyup', function(){
		var searchString = this.value.toLowerCase();
		if (searchString.length>=3 || searchString.length==0){
			document.querySelectorAll('.concrete_hotel_fly_from_city .formDirections__bottom-blocks-cut span').forEach(function(e,i){
				var currentCity = $(e).text().toLowerCase();
				if (currentCity.indexOf(this.searchString)>=0){
					$(e).closest('.formDirections__bottom-item').show();
				} else {
					$(e).closest('.formDirections__bottom-item').hide();
				}	
			}, {searchString: searchString})		
		}
	})
	$('.concrete_hotel_eating .formDirections__static-btn').click(function(){
		var arrOfEl = document.querySelectorAll('.concrete_hotel_eating .formDirections input');
		var arrayOfChoosed = [];
		for (i=0;i<(arrOfEl.length);i++){
			var curEl = arrOfEl[i];
			if ($(curEl).prop( "checked"))
				arrayOfChoosed.push($(curEl).val());
		}
		if (arrayOfChoosed.length == 0){
			$('input[name*="concrete_hotel_eating"]').val('Любое')
		} else {
			$('input[name*="concrete_hotel_eating"]').val(arrayOfChoosed.join(', '));
		}
	})
	var chooseHotelRow = $('.concrete_hotel_block_control .formDirections__bottom-blocks-cut .formDirections__bottom-item');
	chooseHotelRow.click(hotelRowClick);
	var searchInput = $('.concrete_hotel_block_control').find('input[placeholder="Поиск отеля"]');
	searchInput.on('keyup change', function(e){
		e.preventDefault();
		var searchString = this.value.toLowerCase();
		// если 0 то скрываем очищаем html
		if (searchString.length==0){
			var cont = $(this).closest('.formDirections__bottom').find('.formDirections__bottom-blocks-cut');
			cont.html('');
		}
		// если больше 3х то тут делаем аякс
		else if (searchString.length>=3){
			var copyOrigUrl = getHotelsUrl;
			copyOrigUrl+='?str='+searchString;
			var self = this;
			$.ajax({
				parent: self,
				url: copyOrigUrl,
				dataType: "json",
				success: function(data){
					drawDropDown(data, self)
				},
				error: function (){
					console.log('ajax error');
				}
			});
		}
	})
	function drawDropDown(data, el){
		var cont = $(el).closest('.formDirections__bottom').find('.formDirections__bottom-blocks-cut');
		cont.html('');
		data.forEach(function(e,i){
			var tmpl = $('#concrete_hotel_drop').clone().attr('id', '');
			var title = e.hotel;
			var category = e.category;
			var resort = e.resor;
			var country = e.country;
			var filename = e.fileName;
			tmpl.find('.formDirections__count').text(resort);
			tmpl.find('.formDirections__cut').text(title);
			tmpl.find('.hint').text(country);
			tmpl.find('.hotel_cat').text(category);
			tmpl.find('.lsfw-flag').css('background-image', 'url(flags/'+filename+')');
			tmpl.appendTo(this.cont);
		}, {cont: cont})
		var chooseHotelRow = $('.concrete_hotel_block_control .formDirections__bottom-blocks-cut .formDirections__bottom-item');
		chooseHotelRow.click(hotelRowClick);
	}


	$('.bth__inp-block .form-date').on('click', function () {
		$('.formDirections').hide();
		$('.bth__sumo-currency .SumoSelect').removeClass('open');
	});


	// Большие контролы
	var windowWidth = Math.max($(window).width(), window.innerWidth);
	if (windowWidth <= 509) {
		// При открытии закрыть табы
		$('.js-formDirections--big-mobile').on('click', function () {
			$('html, body').css('overflow', 'hidden')
		});
		$('.formDirections--big-mobile  .formDirections__top .formDirections__bottom-close, .js-close-formDirections').on('click', function () {
			$('html, body').css('overflow', 'auto')
		});
	}
	$('.bth__ta-resizable').focus(function () {
		$('.bth__ta-resizable-hint').addClass('active');
		$(this).addClass('focus');
	});
	$('.bth__ta-resizable').blur(function () {
		if (!$(this).val()) {
			$('.bth__ta-resizable-hint').removeClass('active');
			$(this).removeClass('focus');
		}
	});
	$('.formDirections_plus-circle').on('click', function () {
		$(this).toggleClass('active');
		$(this).closest('.formDirections__bottom-item').next().toggle()
	});

	$('#yourcity_block').click(function(){
		$(this).next().find('ul.options li').addClass('hidden');
	})

	
});

$(document).on('keyup change', '#step2 input.search-txt', function (e) {
	if ($(this).val()=='')
		$(this).closest('.SumoSelect.open').find('ul.options li').addClass('hidden');		
});

$(document).on('click', function (e) {
	var $target = $(e.target);
	if (!$target.is(".js-show-formDirections") && !$target.closest(".js-show-formDirections").length &&
		!$target.is(".formDirections") && !$target.closest(".formDirections").length) {
		$(".formDirections").hide();
	}
});

function hotelRowClick(){
	$(this).closest('.formDirections__wrap.w100p').find('.formDirections__bottom-close').trigger('click');
	$(this).closest('.formDirections__wrap.w100p').find('input').val('');
	var title = $(this).find('.formDirections__cut').text();
	var category = $(this).find('.hotel_cat').text();
	var country = $(this).find('.hint').text();
	var city = $(this).find('.formDirections__count').text();
	var choosedblock = $(this).closest('.concrete_hotel_block_control').find('.choosed_hotel');
	choosedblock.find('input').val(title);
	choosedblock.find('.category').text(category);
	choosedblock.find('.country').text(country);
	choosedblock.find('.city').text(city);
}