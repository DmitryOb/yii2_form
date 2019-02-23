$(function () {
	"use strict";
	$.fn.durationSelect = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.durationSelect');
			return false;
		}
	};

	var defaults = {
		min: 1,
		max: 28,
		rowLength: 7
	};

	var methods = {
		init: function (options) {
			return this.each(function () {
				var $e = $(this);
				var settings = $.extend({}, defaults, options || {});

				var rows = Math.ceil(settings.max / settings.rowLength);
				var html = '';
				for (var q = 0; q < rows; ++q) {
					html += '<div class="form-durability__select-row">\n';
					var max = Math.min((1 + q) * settings.rowLength, settings.max);
					for (var i = 1 + q * settings.rowLength; i <= max; ++i) {
						html +=
							'<div data-d="' + i + '" class="form-durability__select-item js-dn-cell">'
							+ '<span>'+i+'</span>'+'</div>\n';
					}
					html += '</div>\n';
				}
				var obj = $(
					'<div class="js-dn-block">' +
					'  <div class="order__inp js-dn-text"></div>' +

					'     <div class="form-durability__select js-dn-dd">' +
					'      <div class="form-durability__select-row closechrist">\n' +
					'      <span>КОЛИЧЕСТВО НОЧЕЙ</span>' +
					'      <i class="formDirections__bottom-close form-durability__link js-dn-hide">'+'</i>' +
					'      </div>\n' +
					'      <div class="form-durability__durability">\n' +
						  	html +
					'      </div>\n' +
					'     </div>\n' +

					'</div>\n'
				);
				var dropDown = obj.find('.js-dn-dd');
				var inputValue = {
					from: 7,
					to: 14,
					inSelectMode: false
				};

				obj
					.on('click', '.js-dn-text', function () {
						var dd = obj.find('.js-dn-dd');
						if (dd.css('display') === 'none') {
							obj.find('.js-dn-dd').show();
						} else {
							methods.hide.apply($e);
						}
					})
					.on('click', '.js-dn-hide', function () {
						methods.hide.apply($e);
					})
					.on('click', '.js-dn-cell', function () {
						obj.find('.js-dn-cell.start').removeClass('start');
						obj.find('.js-dn-cell.end').removeClass('end');
						if (inputValue.inSelectMode) {
							var to = $(this).data('d');
							if (to < inputValue.from) {
								inputValue.to = inputValue.from;
								inputValue.from = to;
							} else {
								inputValue.to = to;
							}
							obj.find('.js-dn-cell[data-d=' + inputValue.from + ']').addClass('start');
							obj.find('.js-dn-cell[data-d=' + inputValue.to + ']').addClass('end');
							inputValue.inSelectMode = false;
						} else {
							inputValue.from = inputValue.to = $(this).data('d');
							$(this).addClass('start end');
							inputValue.inSelectMode = true;
						}
						methods.refresh.apply($e);
					})
					.on('mouseenter', '.js-dn-cell', function () {
						if (!inputValue.inSelectMode) {
							return;
						}
						var from = inputValue.from;
						var to = $(this).data('d');
						if (from > to) {
							from = to;
							to = inputValue.from;
						}
						obj.find('.js-dn-cell.start').removeClass('start');
						obj.find('.js-dn-cell.end').removeClass('end');
						obj.find('.js-dn-cell[data-d=' + from + ']').addClass('start');
						obj.find('.js-dn-cell[data-d=' + to + ']').addClass('end');
						methods.refresh.apply($e);
					});

				$e.after(obj);
				$e.data('durationSelect', {
					settings: settings,
					value: inputValue,
					select: obj
				});
				$e.hide();

				obj.find('.js-dn-cell[data-d=' + inputValue.from + ']').addClass('start');
				obj.find('.js-dn-cell[data-d=' + inputValue.to + ']').addClass('end');
				methods.refresh.apply($e);

				$(document).click(function (e) {
					if (dropDown.is(":visible") && !$(e.target).closest(obj).length) {
						dropDown.hide();
					}
				});
			});
		},

		refresh: function () {
			var $e = this,
				inputValue = this.data('durationSelect').value,
				select = this.data('durationSelect').select;
			// Устанавливаем значение в исходное поле
			$e.val(inputValue.from === inputValue.to ? inputValue.from : inputValue.from + '-' + inputValue.to);
			// Обновляем текст в отображаемом поле
			select.find('.js-dn-text').text(
				(inputValue.from === inputValue.to ? inputValue.from : inputValue.from + '-' + inputValue.to) +
				' ' + plural(['ночь', 'ночи', 'ночей'], inputValue.to)
			);
			var started = false;
			select.find('.js-dn-cell').removeClass('selected').each(function (i, cell) {
				cell = $(cell);
				if (!started && cell.hasClass('start')) {
					started = true;
				}
				if (started) {
					if (cell.hasClass('end')) {
						return false;
					} else {
						cell.addClass('selected');
					}
				}
			})
		},

		hide: function () {
			var $e = this,
				inputValue = this.data('durationSelect').value,
				select = this.data('durationSelect').select;
			if (inputValue.inSelectMode) {
				select.find('.js-dn-cell.start').removeClass('start');
				select.find('.js-dn-cell.end').removeClass('end');
				select.find('.js-dn-cell[data-d=' + inputValue.from + ']').addClass('start');
				select.find('.js-dn-cell[data-d=' + inputValue.to + ']').addClass('end');
				methods.refresh.apply($e);
				inputValue.inSelectMode = false;
			}
			select.find('.js-dn-dd').hide();

			return this;
		},

		value: function () {
			return this.data('durationSelect').value;
		},

		destroy: function () {
			this.data('durationSelect').select.remove();
			this.removeData('durationSelect');
			return this;
		},

		data: function () {
			return this.data('durationSelect');
		}
	};

	function plural(rules, input) {
		// noinspection EqualityComparisonWithCoercionJS
		if (parseInt(input) != input) {
			return input;
		}

		var num = parseInt(input) % 100;
		var digit = num % 10;

		var ending = 0;
		if (num === 1 || (num > 20 && digit === 1)) {
			ending = 0;
		} else if (num > 1 && num < 5 || (num > 20 && digit > 1 && digit < 5)) {
			ending = 1;
		} else {
			ending = 2;
		}

		rules = typeof rules === 'string' ? rules.split('|') : rules;
		return rules[ending].replace('#', input);
	}
});

$(document).ready(function(){
	"use strict";
	// Пребывание (дней/ночей)
	$('#bookingform-durationrange').durationSelect();
})