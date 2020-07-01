'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var setPageActive = function () {
    var mapPins = document.querySelector('.map__pins');
    if (window.backend.load.statusLoad === 200) {
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.form.toggleInputsSelects(false);
      window.pin.renderPins(window.data);
      // window.updatePins();

      mapPins.addEventListener('click', mapCardOpenHandler);
      mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainEnterHandler);
    }
    if (window.backend.load.statusLoad === 404) {
      mapPinMain.addEventListener('click', mapPinMainClickErrorHandler);
    }
  };

  var setPageInactive = function () {
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');

    window.form.toggleInputsSelects(true);

    window.pin.deletePins();
    window.card.deleteCard();

    mapPinMain.style.left = window.main.MAP_PIN_MAIN_X + 'px';
    mapPinMain.style.top = window.main.MAP_PIN_MAIN_Y + 'px';
    setValueAddressInput(mapPinMain.offsetLeft + (window.main.MAP_PIN_MAIN_WIDTH / 2), (mapPinMain.offsetTop + window.main.MAP_PIN_MAIN_HEIGHT / 2));
    window.form.cleanForm();

    mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
    mapPinMain.addEventListener('keydown', mapPinMainEnterHandler);
  };

  var setValueAddressInput = function (valueX, valueY) {
    var addressInput = document.querySelector('#address');
    var positionX = Math.floor(valueX);
    var positionY = Math.floor(valueY);

    addressInput.value = positionX + ', ' + positionY;
    addressInput.readOnly = true;

    window.map.addressInput = addressInput;
  };

  var mapPinMainClickErrorHandler = function () {
    window.backend.errorHandler(window.backend.load.statusLoad + ' — ' + window.backend.load.statusTextLoad);
  };

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      setPageActive();
    }
  };

  var mapPinMainEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
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
      window.card.addCard(mapPinId, window.filter.currentData);
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

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.addEventListener('keydown', mapPinMainEnterHandler);

  window.map = {
    map: map,
    mapPinMain: mapPinMain,
    setValueAddressInput: setValueAddressInput,
    setPageInactive: setPageInactive
  };

  setValueAddressInput(mapPinMain.offsetLeft + (window.main.MAP_PIN_MAIN_WIDTH / 2), (mapPinMain.offsetTop + window.main.MAP_PIN_MAIN_HEIGHT / 2));
})();
