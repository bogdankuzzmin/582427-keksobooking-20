'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mapPinMainY = (mapPinMain.offsetTop - shift.y);
        var mapPinMainX = (mapPinMain.offsetLeft - shift.x);

        if (mapPinMainX + window.main.MAP_PIN_MAIN_WIDTH / 2 <= 0 ||
            mapPinMainX + window.main.MAP_PIN_MAIN_WIDTH / 2 >= window.map.map.offsetWidth ||
            mapPinMainY + window.main.MAP_PIN_MAIN_HEIGHT + window.main.MAP_PIN_MAIN_POINTER_HEIGHT <= window.main.Y_MIN ||
            mapPinMainY + window.main.MAP_PIN_MAIN_HEIGHT + window.main.MAP_PIN_MAIN_POINTER_HEIGHT >= window.main.Y_MAX) {
          shift.x = 0;
          shift.y = 0;
        }

        mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';

        window.map.setValueAddressInput((mapPinMainX + window.main.MAP_PIN_MAIN_WIDTH / 2), (mapPinMainY + window.main.MAP_PIN_MAIN_HEIGHT + window.main.MAP_PIN_MAIN_POINTER_HEIGHT));
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  });
})();
