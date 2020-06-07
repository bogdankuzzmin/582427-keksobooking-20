'use strict';

var PIN_NUMBERS = 8;

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
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

var PRICE_MIN = 10000;
var PRICE_MAX = 50000;

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArr = function (arr) {
  var randomArr = [];

  arr.forEach(function (element) {
    if (getRandomNumber(0, 1) === 1) {
      randomArr.push(element);
    }
  });

  return randomArr;
};

var mapPins = document.querySelector('.map__pins');
var mapPinsWidth = mapPins.offsetWidth;

var getAdvertisement = function (index) {
  var locationX = getRandomNumber(0, mapPinsWidth);
  var locationY = getRandomNumber(Y_MIN, Y_MAX);
  var advertisement = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: 'строка, заголовок предложения',
      adress: locationX + ', ' + locationY,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomElement(TYPE),
      rooms: getRandomElement(ROOMS),
      guests: getRandomElement(GUESTS),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: getRandomArr(FEATURES),
      description: 'строка с описанием',
      photos: getRandomArr(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  return advertisement;
};

var getAdvertisements = function () {
  var advertisementsArr = [];

  for (var i = 0; i < PIN_NUMBERS; i++) {
    advertisementsArr.push(getAdvertisement(i));
  }

  return advertisementsArr;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.getElementById('pin').content;

var renderPin = function (adv) {
  var pinElement = pinTemplate.cloneNode(true);
  var pin = pinElement.querySelector('.map__pin');
  var pinAvatar = pinElement.querySelector('img');

  pin.style.left = adv.location.x + 'px';
  pin.style.top = adv.location.y + 'px';
  pinAvatar.src = adv.author.avatar;
  pinAvatar.alt = adv.offer.title;

  return pinElement;
};


var addPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisementsArr.length; i++) {
    fragment.appendChild(renderPin(advertisementsArr[i]));
  }

  mapPins.appendChild(fragment);
};

var advertisementsArr = getAdvertisements();
addPins();
