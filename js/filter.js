'use strict';

(function () {
  var selectType = document.querySelector('#housing-type');
  var selectPrice = document.querySelector('#housing-price');
  var selectRooms = document.querySelector('#housing-rooms');
  var selectGuests = document.querySelector('#housing-guests');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox');

  window.filter = {
    selectType: selectType,
    selectPrice: selectPrice,
    selectRooms: selectRooms,
    selectGuests: selectGuests,
    mapCheckboxes: mapCheckboxes
  };
})();
