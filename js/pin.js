'use strict';

(function () {
  var renderPins = function (dataPins) {
    var mapPins = document.querySelector('.map__pins');
    var pinTemplate = document.getElementById('pin').content;


    var renderPin = function (adv, index) {
      var pinElement = pinTemplate.cloneNode(true);
      var pin = pinElement.querySelector('.map__pin');
      var pinAvatar = pinElement.querySelector('img');

      pin.style.left = adv.location.x + 'px';
      pin.style.marginLeft = (-window.main.MAP_PIN_WIDTH / 2) + 'px';
      pin.style.top = adv.location.y + 'px';
      pin.style.marginTop = -window.main.MAP_PIN_HEIGHT + 'px';
      pinAvatar.src = adv.author.avatar;
      pinAvatar.alt = adv.offer.title;
      pin.dataset.advId = index;

      return pinElement;
    };

    var fragment = document.createDocumentFragment();
    var takeNumber = dataPins.length > window.main.MAX_PINS ? window.main.MAX_PINS : dataPins.length;

    deletePins();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(dataPins[i], i));
    }

    mapPins.appendChild(fragment);
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var deleteActivePinClass = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < allPins.length; i++) {
      if (allPins[i].classList.contains('map__pin--active')) {
        allPins[i].classList.remove('map__pin--active');
        break;
      }
    }
  };

  window.pin = {
    render: renderPins,
    delete: deletePins,
    deleteActiveClass: deleteActivePinClass
  };
})();
