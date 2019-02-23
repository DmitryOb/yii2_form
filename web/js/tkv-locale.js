"use strict";

var $tkvLocale = {
    /**
     * Локализация чисел
     * @param d
     * @param label ['день','дней','дня']
     * @returns {string}
     */
    number: function(d, label) {
        if (d >= 10 && d <= 20) return d + ' ' + label[1];

        switch (d % 10) {
            case 1: return d + ' ' + label[0];
            case 2:
            case 3:
            case 4:
                return d + ' ' + label[2];
            case 0:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return d + ' ' + label[1];
        }
    },

    /**
     * Локализация чисел
     * @param d
     * @param label ['день','дней','дня']
     * @param tpl строка вида %num %label
     * @returns {string}
     */
    numberCustom: function(d, label, tpl) {
        if (d >= 10 && d <= 20) return tpl.replace('%num', d).replace('%label', label[1]);

        switch (d % 10) {
            case 1: return tpl.replace('%num', d).replace('%label', label[0]);
            case 2:
            case 3:
            case 4:
                return tpl.replace('%num', d).replace('%label', label[2]);
            case 0:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return tpl.replace('%num', d).replace('%label', label[1]);
        }
    },

    day: function(d) {
        return $tkvLocale.number(d, ['день','дней','дня']);
    },

    night: function(d) {
        return $tkvLocale.number(d, ['ночь','ночей','ночи']);
    },

    age: function(d) {
        return $tkvLocale.number(d, ['год','лет','года']);
    },

    tour: function(d) {
        return $tkvLocale.number(d, ['тур','туров','тура']);
    },

    guests: function(d) {
        return $tkvLocale.number(d, ['гость','гостей','гостя']);
    },

    adults: function(d) {
        return $tkvLocale.number(d, ['взрослый','взрослых','взрослых']);
    },

    children: function(d) {
        return $tkvLocale.number(d, ['ребенок','детей','детей']);
    },

    hotels: function(d) {
        return $tkvLocale.number(d, ['отель','отелей','отеля']);
    },

    foundWord: function(d) {
        return (d === 1) ? 'Найден' : 'Найдено';
    },

    country: function(d) {
        return $tkvLocale.number(d, ['страна','стран','страны']);
    },

    operator: function(d) {
        return $tkvLocale.number(d, ['оператор','операторов','оператора']);
    },

    people: function(d) {
        switch (d) {
            case 1: return 'на одного'; break;
            case 2: return 'на двоих'; break;
            case 3: return 'на троих'; break;
            case 4: return 'на четверых'; break;
            case 5: return 'на пятерых'; break;
            case 6: return 'на шестерых'; break;
            case 7: return 'на семерых'; break;
            case 8: return 'на восьмерых';break;
            case 9: return 'на девятерых'; break;
            case 10: return 'на десятерых'; break;
            default: return 'на ' + d + ' чел.'; break;
        }
    }
};

