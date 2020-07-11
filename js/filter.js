'use strict';

(function () {
  var filterByType = function (it) {
    if (selectType.value !== 'any') {
      return it.offer.type === selectType.value;
    }

    return it;
  };

  var filterByPrice = function (it) {
    switch (selectPrice.value) {
      case 'middle':
        return it.offer.price >= priceValue.middle.min && it.offer.price < priceValue.middle.max;
      case 'low':
        return it.offer.price >= priceValue.low.min && it.offer.price < priceValue.low.max;
      case 'high':
        return it.offer.price >= priceValue.high.min && it.offer.price < priceValue.high.max;
      default:
        return it;
    }
  };

  var fitlerByRooms = function (it) {
    if (selectRooms.value !== 'any') {
      return it.offer.rooms === Number(selectRooms.value);
    }

    return it;
  };

  var filterByGuests = function (it) {
    if (selectGuests.value !== 'any') {
      return it.offer.guests === Number(selectGuests.value);
    }

    return it;
  };

  var filterByFeatures = function (it) {
    var selectFeatures = Array.from(filters.querySelectorAll('input:checked'));
    return selectFeatures.every(function (item) {
      return it.offer.features.some(function (feature) {
        return feature === item.value;
      });
    });
  };

  var filtersChangeHandler = function () {
    var filterData = window.data.filter(function (it) {
      return filterByType(it)
        && filterByPrice(it)
        && fitlerByRooms(it)
        && filterByGuests(it)
        && filterByFeatures(it);
    });

    window.filter.currentData = filterData;

    updatePins(filterData);
  };

  var updatePins = window.debounce(function (data) {
    window.card.deleteCard();
    window.pin.renderPins(data);
  });

  var filters = document.querySelector('.map__filters');
  var selectType = document.querySelector('#housing-type');
  var selectPrice = document.querySelector('#housing-price');
  var selectRooms = document.querySelector('#housing-rooms');
  var selectGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelectorAll('.map__checkbox');

  var priceValue = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  filters.addEventListener('change', filtersChangeHandler);

  window.filter = {
    selectType: selectType,
    selectPrice: selectPrice,
    selectRooms: selectRooms,
    selectGuests: selectGuests,
    filterFeatures: filterFeatures,
    currentData: []
  };
})();

