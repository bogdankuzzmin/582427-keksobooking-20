'use strict';

(function () {
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomArr = function (arr) {
    var randomArr = [];

    arr.forEach(function (element) {
      if (getRandomInteger(0, 1) === 1) {
        randomArr.push(element);
      }
    });

    return randomArr;
  };

  var toggleElements = function (elements, value) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = value;
    }
  };

  window.main = {
    PIN_NUMBERS: 8,
    TYPE: ['palace', 'flat', 'house', 'bungalo'],
    TYPE_TO_RU: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    ROOMS: ['1', '2', '3', '100'],
    GUESTS: ['1', '2', '3'],
    CHECKIN: ['12:00', '13:00', '14:00'],
    CHECKOUT: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    Y_MIN: 130,
    Y_MAX: 630,
    PRICE_MIN: 0,
    PRICE_MAX: 1000000,
    PRICES_FOR_TYPES: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    },
    MAP_PIN_WIDTH: 50,
    MAP_PIN_HEIGHT: 70,
    MAP_PIN_MAIN_WIDTH: 65,
    MAP_PIN_MAIN_HEIGHT: 65,
    MAP_PIN_MAIN_POINTER_HEIGHT: 16,
    getRandomElement: getRandomElement,
    getRandomArr: getRandomArr,
    getRandomInteger: getRandomInteger,
    toggleElements: toggleElements
  };
})();


