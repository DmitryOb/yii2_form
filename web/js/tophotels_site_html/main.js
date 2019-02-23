jQuery(document).ready(function () {

//Подсказки для полей
    $('.bth__inp.js-stop-label').on('focus', function () {
        $(this).addClass('focus');
        $(this).next('.bth__inp-lbl').hide();
    });


    $('.bth__inp.js-stop-label').on('blur', function () {
        if ($(this).val().trim() !== '') {
            $(this).next('.bth__inp-lbl').hide();
        } else {

            $(this).next('.bth__inp-lbl').show();
        }
    });

    $('.js-label').on('focus', function () {
        $(this).next('.bth__inp-lbl').addClass('active');
        $(this).closest('.js-show-saggest').next().show();
    });

    $('.js-label').on('blur', function () {
        if ($(this).val().trim() === '') {
            $(this).next('.bth__inp-lbl').removeClass('active');
            $(this).closest('.js-show-saggest').next().hide();
        }
    });


    $('.js-label').on('change', function () {
        $('.js-label').each(function () {
            if ($(this).val().length) {
                $(this).next('.bth__inp-lbl').addClass('active');
            }
        });
    });

    $('.js-label').change();

    $('.bth__inp-block.long textarea').on('focus', function () {
        $(this).closest('.bth__inp-block.long').addClass('active');
    });
    $('.bth__inp-block.long textarea').on('blur', function () {
        $(this).closest('.bth__inp-block.long').removeClass('active');
    });

});

$(document).on('click', '.js-modal-close', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});

$('#customform').on('afterValidate', function(event, message){
    var valid = true
    for (k in message){
        if (message[k].length)
            valid = false;
    }
    if (valid)
        $('.bth__loader').addClass('bth__loader--animate');
});
$('#select_tour_form').on('beforeSubmit', function(event, message){
    if ($('#current_step').val()=='step1')
        return false;
    else
        return true;
})
$('#select_tour_form').on('afterValidate', function(event, message){
    var valid = true;
    $(this).find('input').removeClass('error');
    for (k in message){
        // если у поля ошибка
        if (message[k].length){
            if (k!='extendedform-concrete_hotel_title_1'){
                console.log(message[k])
                valid = false;
                $('#'+k).addClass('error');
                $('[name="ExtendedForm['+k.split('-')[1]+']"]').addClass('error');
                $('[name="ExtendedForm['+k.split('-')[1]+']"]').nextAll('span').text(message[k]);
            } else {
                console.log(message[k])
                $('#concrete_hotel_title_hint').show();
                $('#concrete_hotel_title_hint').text(message[k]);
                valid = false;
                $('#'+k).addClass('error');
                $('[name="ExtendedForm['+k.split('-')[1]+']"]').addClass('error');
            }
        }
    }
    if (valid && $('#current_step').val()=='step1'){
        formDataCompile();
        return false;
    }
    else if (valid && $('#current_step').val()=='step2'){
        $('#current_step').val($('#current_step').attr('order_id'));
        $('button[name="first_form_step2"]').addClass('bth__loader--animate');
        return true;
    }
    else {
        return true;
    }
    
})
// собираем данные из формы, компануем и отправляем аяксом
function formDataCompile(){
    var range = document.querySelector('#extendedform-range').value;
    var nights = document.querySelector('#bookingform-durationrange').value;
    var peoples = document.querySelector('#extendedform-peoples').value;
    var budget = document.querySelector('#extendedform-budget').value;
    var request = document.querySelector('#extendedform-request').value;
    // турпакет
    if ($(document.querySelector('#type-1')).prop('checked')){
        var country = $('.tourpack_control:visible').eq(0).find('input[id*="tourpack_direct_country"]').val();
        var city = $('.tourpack_control:visible').eq(0).find('input[id*="tourpack_direct_city"]').val();
        var direction = country + '/' + city + '/-';
        // один
        if ($('.tourpack_control:visible').length==1){
            var flyfromcity = $('.tourpack_control:visible').eq(0).find('input[id*="tourpack_flyfromcity"]').val();
            var flyfromcitystring = 'Город вылета(' + flyfromcity + ')';
            var parameters = 'Параметры(';
            $('.tourpack_control:visible').eq(0).find('.parameters input:checked').each(function(i,e){
                parameters+= e.value + '|';
            })
            parameters = parameters.slice(0, -1);
            parameters += ')';

            var summString = flyfromcitystring + '/' + parameters;
            if (request.length)
                request += '/' + summString;
            else
                request = summString;
        }
        // несколько
        else {
            var flyfromcity = 'Город вылета(' +  $('.tourpack_control:visible').eq(0).find('input[id*="tourpack_flyfromcity"]').val() + ')';
            var parameters = 'Параметры(';
            $('.tourpack_control:visible').eq(0).find('.parameters input:checked').each(function(i,e){
                parameters+= e.value + '|';
            })
            parameters = parameters.slice(0, -1) + ')';
            var summString = country+ '(' + city + '):' + flyfromcity + '/' + parameters;
            if (request.length)
                request += '. ' + summString + '.';
            else
                request = summString +'#';
            if ($('.tourpack_control:visible').eq(1).length){
                var country = $('.tourpack_control:visible').eq(1).find('input[id*="tourpack_direct_country"]').val();
                var city = $('.tourpack_control:visible').eq(1).find('input[id*="tourpack_direct_city"]').val();
                var flyfromcity = 'Город вылета(' +  $('.tourpack_control:visible').eq(1).find('input[id*="tourpack_flyfromcity"]').val() + ')';
                var parameters = 'Параметры(';
                $('.tourpack_control:visible').eq(1).find('.parameters input:checked').each(function(i,e){
                    parameters+= e.value + '|';
                })
                parameters = parameters.slice(0, -1) + ')';
                var summString = country+ '(' + city + '):' + flyfromcity + '/' + parameters;
                request += summString +'#';
                    if ($('.tourpack_control:visible').eq(2).length){
                        var country = $('.tourpack_control:visible').eq(2).find('input[id*="tourpack_direct_country"]').val();
                        var city = $('.tourpack_control:visible').eq(2).find('input[id*="tourpack_direct_city"]').val();
                        var flyfromcity = 'Город вылета(' +  $('.tourpack_control:visible').eq(2).find('input[id*="tourpack_flyfromcity"]').val() + ')';
                        var parameters = 'Параметры(';
                        $('.tourpack_control:visible').eq(2).find('.parameters input:checked').each(function(i,e){
                            parameters+= e.value + '|';
                        })
                        parameters = parameters.slice(0, -1) + ')';
                        var summString = country+ '(' + city + '):' + flyfromcity + '/' + parameters;
                        request += summString;
                    }
            }
        }
    }
    // конкретный отель
    else {
        var block = $('.tour-selection__hotel-cut:visible').eq(0).closest('.choosed_hotel');
        var country = block.find('span.country').text();
        var city = block.find('span.city').text();
        var hotel = $('.tour-selection__hotel-cut:visible').eq(0).val();
        var category = starFormat(block.find('span.category').text());
        if (category)
            category = '/' + category;
        var direction = country + '/' + city + '/' + hotel + category;
        // один
        var flyfromcitystring = 'Город вылета(' +  $('input[name="concrete_hotel"]').val() + ')';
        var eating = 'Питание(' + $('input[name="concrete_hotel_eating"]').val() + ')';
        var summString = flyfromcitystring + '/' + eating + '#';
        if (request.length)
            request += '/' + summString;
        else
            request = summString;
        // несколько
        if ($('.tour-selection__hotel-cut:visible').eq(1).length && $('.tour-selection__hotel-cut:visible').eq(1).val()) {
            var block2 = $('.tour-selection__hotel-cut:visible').eq(1).closest('.choosed_hotel');
            var country = block2.find('span.country').text();
            var city = block2.find('span.city').text();
            var category2 = starFormat(block2.find('span.category').text());
            if (category2)
                category2 = '/' + category2;
            var hotel = $('.tour-selection__hotel-cut:visible').eq(1).val();
            var summString = country + '/' + city + '/' + hotel + category2 + '#';
            request+= summString;
            if ($('.tour-selection__hotel-cut:visible').eq(2).length && $('.tour-selection__hotel-cut:visible').eq(2).val()){
                var block3 = $('.tour-selection__hotel-cut:visible').eq(2).closest('.choosed_hotel');
                var country = block3.find('span.country').text();
                var city = block3.find('span.city').text();
                var category3 = starFormat(block3.find('span.category').text());
                if (category3)
                    category3 = '/' + category3; 
                var hotel = $('.tour-selection__hotel-cut:visible').eq(2).val();
                var summString = country + '/' + city + '/' + hotel + category3 + '#';
                request+= summString;
            }
        }
    }

    var data = {
        direction: direction,
        request: request,
        range: range,
        nights: nights,
        peoples: peoples,
        budget: budget,
        type: $('input[name="ExtendedForm[type]"]:checked').val(),
    };
    $('button[name="first_form"]').addClass('bth__loader--animate');
    $.ajax({
        url: urlExt,
        data: data,
        success: function(id){
            $('#current_step').val('step2').attr('order_id', id);
            $('#step2').show();
            $('button[name="first_form"]').hide();
            $('#step1_extendedform').hide();
        },
        error: function (){
            console.log('ajax error');
            $('button[name="first_form"]').removeClass('bth__loader--animate');
        }
    });
}
$('#step2 input').on('change keyup', function(){
    if ($(this).val())
        $(this).removeClass('error');
})

function starFormat(str){
    switch (str){
        case '5*':
            return '5 звезд';
            break;
        case '4*':
            return '4 звезды';
            break;
        case '3*':
            return '3 звезды';
            break;
        case '2*':
            return '2 звезды';
            break;
        case '1*':
            return '1 звезда';
            break;
    }
}