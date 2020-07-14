'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var setPageActive = function () {
    var mapPins = document.querySelector('.map__pins');

    if (window.backend.load.statusLoad === 200) {
      map.classList.remove('map--faded');
      window.form.main.classList.remove('ad-form--disabled');
      window.form.toggleInputsSelects(false);

      window.filter.currentData = window.data;
      window.pin.render(window.data);

      mapPins.addEventListener('click', mapCardOpenHandler);
      mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainEnterHandler);
    }

    if (window.backend.load.statusLoad === 404) {
      window.backend.errorHandler(window.backend.load.statusLoad + ' — ' + window.backend.load.statusTextLoad);
    }
  };

  var setPageInactive = function () {
    map.classList.add('map--faded');
    window.form.main.classList.add('ad-form--disabled');

    window.form.toggleInputsSelects(true);

    window.pin.delete();
    window.card.delete();
    window.form.clean();

    mapPinMain.style.left = window.main.MAP_PIN_MAIN_X + 'px';
    mapPinMain.style.top = window.main.MAP_PIN_MAIN_Y + 'px';
    setValueAddressInput(mapPinMain.offsetLeft + (window.main.MAP_PIN_MAIN_WIDTH / 2), (mapPinMain.offsetTop + window.main.MAP_PIN_MAIN_HEIGHT / 2));

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

    if (mapPin) {
      window.card.delete();
      window.pin.deleteActiveClass();

      mapPin.classList.add('map__pin--active');
      var mapPinId = mapPin.dataset.advId;
      window.card.add(mapPinId, window.filter.currentData);
      var mapCardClose = document.querySelector('.popup__close');

      mapCardClose.addEventListener('click', mapCardClickHandler);
      document.addEventListener('keydown', mapCardPresEsckHandler);
    }
  };

  var mapCardClickHandler = function () {
    window.card.delete();
  };

  var mapCardPresEsckHandler = function (evt) {
    if (evt.key === 'Escape') {
      window.card.delete();
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.addEventListener('keydown', mapPinMainEnterHandler);

  window.map = {
    class: map,
    setValueAddressInput: setValueAddressInput,
    setPageInactive: setPageInactive,
    cardPresEsckHandler: mapCardPresEsckHandler,
    cardClickHandler: mapCardClickHandler
  };

  setValueAddressInput(mapPinMain.offsetLeft + (window.main.MAP_PIN_MAIN_WIDTH / 2), (mapPinMain.offsetTop + window.main.MAP_PIN_MAIN_HEIGHT / 2));
})();
