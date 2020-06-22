'use strict';

var PIN_NUMBERS = 8;

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_TO_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var ROOMS = ['1', '2', '3', '100'];
var GUESTS = ['1', '2', '3'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var Y_MIN = 130;
var Y_MAX = 630;

var PRICE_MIN = 0;
var PRICE_MAX = 1000000;

var PRICES_FOR_TYPES = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65;
var MAP_PIN_MAIN_POINTER_HEIGHT = 22;

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

var setValueAddressInput = function (valueY) {
  var addressInput = document.querySelector('#address');
  var positionX = Math.floor(mapPinMain.offsetLeft + (MAP_PIN_MAIN_WIDTH / 2));
  var positionY = Math.floor(mapPinMain.offsetTop + valueY);

  addressInput.value = positionX + ', ' + positionY;
  addressInput.readOnly = true;
};

var setPageActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toggleElements(adFormFieldsets, false);
  window.renderPins();
  setValueAddressInput(MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_POINTER_HEIGHT);
  mapPinMain.removeEventListener('mousedown', mapPinMainActiveHandler);
  mapPinMain.removeEventListener('keydown', mapPinMainActiveHandler);
  mapPins.addEventListener('click', mapCardOpenHandler);
};

var mapPinMainActiveHandler = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    setPageActive();
  }
};

var mapCardOpenHandler = function (evt) {
  var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
  var mapCard = document.querySelector('.map__card');

  if (mapPin) {
    if (mapCard) {
      document.querySelector('.map__card').remove();
    }

    var mapPinId = mapPin.dataset.advId;
    window.addCard(mapPinId);
    var mapCardClose = document.querySelector('.popup__close');

    mapCardClose.addEventListener('click', mapCardCloseHandler);
    document.addEventListener('keydown', mapCardCloseHandler);
  }
};

var mapCardCloseHandler = function (evt) {
  var mapCard = document.querySelector('.map__card');

  if (evt.target.matches('.popup__close')) {

    mapCard.remove();
  } else if (evt.key === 'Escape') {

    mapCard.remove();
  }
  document.removeEventListener('keydown', mapCardCloseHandler);
};

var init = function () {
  mapPinMain.addEventListener('mousedown', mapPinMainActiveHandler);
  mapPinMain.addEventListener('keydown', mapPinMainActiveHandler);
};

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

toggleElements(adFormFieldsets, true);
setValueAddressInput(MAP_PIN_MAIN_HEIGHT / 2);
init();

window.main = {
  PIN_NUMBERS: PIN_NUMBERS,
  TYPE: TYPE,
  TYPE_TO_RU: TYPE_TO_RU,
  ROOMS: ROOMS,
  GUESTS: GUESTS,
  CHECKIN: CHECKIN,
  CHECKOUT: CHECKOUT,
  FEATURES: FEATURES,
  PHOTOS: PHOTOS,
  Y_MIN: Y_MIN,
  Y_MAX: Y_MAX,
  PRICE_MIN: PRICE_MIN,
  PRICE_MAX: PRICE_MAX,
  PRICES_FOR_TYPES: PRICES_FOR_TYPES,
  MAP_PIN_WIDTH: MAP_PIN_WIDTH,
  MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
  MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
  MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
  MAP_PIN_MAIN_POINTER_HEIGHT: MAP_PIN_MAIN_POINTER_HEIGHT,
  getRandomElement: getRandomElement,
  getRandomArr: getRandomArr,
  getRandomInteger: getRandomInteger
};
