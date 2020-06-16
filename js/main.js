'use strict';

var PIN_NUMBERS = 8;

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
/* var TYPE_TO_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
}; */
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

var getAdvertisements = function () {
  var mapPinsWidth = mapPins.offsetWidth;
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
    var pinTemplate = document.getElementById('pin').content;
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

/* var addCard = function () {
  var cardTemplate = document.getElementById('card').content;
  var mapFilters = document.querySelector('.map__filters-container');

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
}; */

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
  renderPins();
  setValueAddressInput(MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_POINTER_HEIGHT);
  mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.removeEventListener('keydown', mapPinMainKeyDownHandler);
};

var mapPinMainMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    setPageActive();
  }
};

var mapPinMainKeyDownHandler = function (evt) {
  if (evt.key === 'Enter') {
    setPageActive();
  }
};

var inputInvalidHandler = function (element) {
  if (element.validity.valueMissing) {
    element.setCustomValidity('Обязательное поле');
  } else if (element.validity.tooShort) {
    element.setCustomValidity('Минимальное значение - ' + element.minLength + ' симв.');
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Максимальное значение - ' + element.maxLength + ' симв.');
  } else if (element.validity.rangeUnderflow) {
    element.setCustomValidity('Минимальная цена состоявляет - ' + element.min + ' руб.');
  } else if (element.validity.rangeOverflow) {
    element.setCustomValidity('Максимальная цена состоявляет - ' + element.max + ' руб.');
  } else {
    element.setCustomValidity('');
  }
};

var inputTitleInputHandler = function () {
  var valueLength = inputTitle.value.length;

  inputTitle.reportValidity();

  if (valueLength < inputTitle.minLength) {
    inputTitle.setCustomValidity('Нужно ввести еще ' + (inputTitle.minLength - valueLength) + ' симв.');
  } else if (valueLength > inputTitle.maxLength) {
    inputTitle.setCustomValidity('Нужно удалить лишние ' + (valueLength - inputTitle.maxLength) + ' симв.');
  } else {
    inputTitle.setCustomValidity('');
  }
};

var inputTypeChangeHandler = function () {
  inputPrice.setAttribute('min', PRICES_FOR_TYPES[inputType.value]);
  inputPrice.setAttribute('placeholder', PRICES_FOR_TYPES[inputType.value]);
};

var inputTimeInOutChangeHandler = function () {
  if (inputTimeIn.options.selectedIndex !== inputTimeOut.options.selectedIndex) {
    inputTimeOut.setCustomValidity('Время выезда должно совподать с временем заезда');
  } else {
    inputTimeOut.setCustomValidity('');
  }
};

var inputGuestsRoomsChangeHandler = function () {
  if (inputGuestNumber.value === '0' && inputRoomNumber.value !== ROOMS[3]) {
    inputGuestNumber.setCustomValidity('Для ' + '"' + inputGuestNumber.options[3].label + '"' + ' допустимое значение: ' + '"' + inputRoomNumber.options[3].label + '"');
  } else if (inputRoomNumber.value === ROOMS[3] && inputGuestNumber.value !== '0') {
    inputGuestNumber.setCustomValidity('Для ' + '"' + inputRoomNumber.options[3].label + '"' + ' допустимое значение: ' + '"' + inputGuestNumber.options[3].label + '"');
  } else if (inputGuestNumber.value > inputRoomNumber.value) {
    inputGuestNumber.setCustomValidity('Количество гостей не должно привышать количество комнат');
  } else {
    inputGuestNumber.setCustomValidity('');
  }
};

var init = function () {
  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeyDownHandler);
  inputTitle.addEventListener('invalid', function () {
    inputInvalidHandler(inputTitle);
  });
  inputPrice.addEventListener('invalid', function () {
    inputInvalidHandler(inputPrice);
  });
  inputTitle.addEventListener('input', inputTitleInputHandler);
  inputType.addEventListener('input', inputTypeChangeHandler);
  inputTimeIn.addEventListener('input', inputTimeInOutChangeHandler);
  inputTimeOut.addEventListener('input', inputTimeInOutChangeHandler);
  inputGuestNumber.addEventListener('input', inputGuestsRoomsChangeHandler);
  inputRoomNumber.addEventListener('input', inputGuestsRoomsChangeHandler);
};

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

var inputTitle = document.querySelector('#title');
var inputPrice = document.querySelector('#price');
var inputType = document.querySelector('#type');
var inputTimeIn = document.querySelector('#timein');
var inputTimeOut = document.querySelector('#timeout');
var inputRoomNumber = document.querySelector('#room_number');
var inputGuestNumber = document.querySelector('#capacity');

var advertisementsArr = getAdvertisements();

toggleElements(adFormFieldsets, true);
inputGuestsRoomsChangeHandler();
setValueAddressInput(MAP_PIN_MAIN_HEIGHT / 2);
init();
// addCard();


