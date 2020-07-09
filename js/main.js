'use strict';

(function () {
  window.main = {
    MAX_PINS: 5,

    ROOMS: ['1', '2', '3', '100'],

    PRICE_FOR_TYPE: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    },
    TYPE_TO_RU: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },

    PRICE_MIN: 0,
    PRICE_MAX: 1000000,
    Y_MIN: 130,
    Y_MAX: 630,
    MAP_PIN_WIDTH: 50,
    MAP_PIN_HEIGHT: 70,
    MAP_PIN_MAIN_WIDTH: 65,
    MAP_PIN_MAIN_HEIGHT: 65,
    MAP_PIN_MAIN_POINTER_HEIGHT: 16,
    MAP_PIN_MAIN_X: 570,
    MAP_PIN_MAIN_Y: 375
  };
})();


