'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var setPageActive = function () {
    var mapPins = document.querySelector('.map__pins');

    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.main.toggleElements(window.form.adFormFieldsets, false);
    window.pin.renderPins();
    mapPinMain.removeEventListener('mousedown', mapPinMainActiveHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainActiveHandler);
    mapPins.addEventListener('click', mapCardOpenHandler);
  };

  var setValueAddressInput = function (valueX, valueY) {
    var addressInput = document.querySelector('#address');
    var positionX = Math.floor(valueX);
    var positionY = Math.floor(valueY);

    addressInput.value = positionX + ', ' + positionY;
    addressInput.readOnly = true;
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
        mapCard.remove();
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

  mapPinMain.addEventListener('mousedown', mapPinMainActiveHandler);
  mapPinMain.addEventListener('keydown', mapPinMainActiveHandler);

  window.map = {
    map: map,
    setValueAddressInput: setValueAddressInput
  };

  setValueAddressInput(mapPinMain.offsetLeft + (window.main.MAP_PIN_MAIN_WIDTH / 2), (mapPinMain.offsetTop + window.main.MAP_PIN_MAIN_HEIGHT / 2));
})();
