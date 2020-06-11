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

var PRICE_MIN = 10000;
var PRICE_MAX = 50000;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

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

var getAdvertisements = function () {
  var advertisementsArr = [];

  for (var i = 0; i < PIN_NUMBERS; i++) {
    var locationX = getRandomInteger(0 + (MAP_PIN_WIDTH / 2), mapPinsWidth - (MAP_PIN_WIDTH / 2));
    var locationY = getRandomInteger(Y_MIN, Y_MAX);

    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'строка, заголовок предложения',
        adress: locationX + ', ' + locationY,
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
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

    advertisementsArr.push(advertisement);
  }

  return advertisementsArr;
};

var renderPins = function () {
  var renderPin = function (adv) {
    var pinElement = pinTemplate.cloneNode(true);
    var pin = pinElement.querySelector('.map__pin');
    var pinAvatar = pinElement.querySelector('img');

    pin.style.left = adv.location.x + 'px';
    pin.style.marginLeft = (-MAP_PIN_WIDTH / 2) + 'px';
    pin.style.top = adv.location.y + 'px';
    pin.style.marginTop = -MAP_PIN_HEIGHT + 'px';
    pinAvatar.src = adv.author.avatar;
    pinAvatar.alt = adv.offer.title;

    return pinElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisementsArr.length; i++) {
    fragment.appendChild(renderPin(advertisementsArr[i]));
  }

  mapPins.appendChild(fragment);
};

var addCard = function () {
  var renderCard = function (adv) {
    var renderCardFeatures = function (arr, block) {
      var fragment = document.createDocumentFragment();

      block.innerHTML = '';

      for (var i = 0; i < arr.length; i++) {
        var cardFeatureIteam = document.createElement('li');

        cardFeatureIteam.classList.add('popup__feature', 'popup__feature--' + arr[i]);

        fragment.appendChild(cardFeatureIteam);
      }

      return fragment;
    };

    var renderCardPhotos = function (arr, block) {
      var fragment = document.createDocumentFragment();

      block.innerHTML = '';

      for (var i = 0; i < arr.length; i++) {
        var cardPhotoIteam = document.createElement('img');

        cardPhotoIteam.classList.add('popup__photo');
        cardPhotoIteam.src = adv.offer.photos[i];
        cardPhotoIteam.alt = 'фото квартиры';
        cardPhotoIteam.width = 45;

        fragment.appendChild(cardPhotoIteam);
      }

      return fragment;
    };

    var cardElement = cardTemplate.cloneNode(true);

    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAdress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardRoomAndGuests = cardElement.querySelector('.popup__text--capacity');
    var cardCheckinAndCheckout = cardElement.querySelector('.popup__text--time');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    cardTitle.textContent = adv.offer.title;
    cardAdress.textContent = adv.offer.adress;
    cardPrice.textContent = adv.offer.price + '₽/ночь';
    cardType.textContent = TYPE_TO_RU[adv.offer.type];
    cardRoomAndGuests.textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
    cardCheckinAndCheckout.textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    cardFeatures.appendChild(renderCardFeatures(adv.offer.features, cardFeatures));
    cardDescription.textContent = adv.offer.description;
    cardPhotos.appendChild(renderCardPhotos(adv.offer.photos, cardPhotos));
    cardAvatar.src = adv.author.avatar;

    return cardElement;
  };

  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(advertisementsArr[5]));
  mapFilters.before(fragment);
};

var pinTemplate = document.getElementById('pin').content;
var cardTemplate = document.getElementById('card').content;

var mapFilters = document.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var mapPinsWidth = mapPins.offsetWidth;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var advertisementsArr = getAdvertisements();

renderPins();
addCard();
