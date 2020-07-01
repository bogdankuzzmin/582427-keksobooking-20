'use strict';

(function () {
  var filterByType = function (type) {
    window.filter.currentData = window.data.
      filter(function (pin) {
        return pin.offer.type === type;
      });

    window.card.deleteCard();

    window.pin.renderPins(window.filter.currentData);
  };

  var filterByTypeHandler = function (evt) {
    switch (evt.target.value) {
      case 'palace':
        filterByType('palace');
        break;
      case 'flat':
        filterByType('flat');
        break;
      case 'house':
        filterByType('house');
        break;
      case 'bungalo':
        filterByType('bungalo');
        break;
      case 'any':
        window.filter.currentData = window.data;
        window.pin.renderPins(window.data);
        window.card.deleteCard();
        break;
    }
  };

  var selectType = document.querySelector('#housing-type');
  var selectPrice = document.querySelector('#housing-price');
  var selectRooms = document.querySelector('#housing-rooms');
  var selectGuests = document.querySelector('#housing-guests');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox');

  selectType.addEventListener('change', filterByTypeHandler);

  window.filter = {
    selectType: selectType,
    selectPrice: selectPrice,
    selectRooms: selectRooms,
    selectGuests: selectGuests,
    mapCheckboxes: mapCheckboxes,
    currentData: []
  };
})();
