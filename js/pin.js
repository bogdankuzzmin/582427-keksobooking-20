'use strict';

(function () {
  var renderPins = function () {
    var mapPins = document.querySelector('.map__pins');

    var renderPin = function (adv, index) {
      var pinTemplate = document.getElementById('pin').content;
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

    for (var i = 0; i < window.advertisementsArr.length; i++) {
      fragment.appendChild(renderPin(window.advertisementsArr[i], i));
    }

    mapPins.appendChild(fragment);
  };

  window.renderPins = renderPins;
})();
