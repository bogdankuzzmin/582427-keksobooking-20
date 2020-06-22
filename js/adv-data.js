'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinsWidth = mapPins.offsetWidth;
  var advertisementsArr = [];

  for (var i = 0; i < window.main.PIN_NUMBERS; i++) {
    var locationX = window.main.getRandomInteger(0 + (window.main.MAP_PIN_WIDTH / 2), mapPinsWidth - (window.main.MAP_PIN_WIDTH / 2));
    var locationY = window.main.getRandomInteger(window.main.Y_MIN, window.main.Y_MAX);

    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'строка, заголовок предложения',
        adress: locationX + ', ' + locationY,
        price: window.main.getRandomInteger(window.main.PRICE_MIN, window.main.PRICE_MAX),
        type: window.main.getRandomElement(window.main.TYPE),
        rooms: window.main.getRandomElement(window.main.ROOMS),
        guests: window.main.getRandomElement(window.main.GUESTS),
        checkin: window.main.getRandomElement(window.main.CHECKIN),
        checkout: window.main.getRandomElement(window.main.CHECKOUT),
        features: window.main.getRandomArr(window.main.FEATURES),
        description: 'строка с описанием',
        photos: window.main.getRandomArr(window.main.PHOTOS),
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    advertisementsArr.push(advertisement);
  }

  window.advertisementsArr = advertisementsArr;
})();
