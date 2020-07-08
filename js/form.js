'use strict';

(function () {
  var inputInvalidHandler = function (element) {
    if (element.validity.valueMissing) {
      element.setCustomValidity('Обязательное поле');
    } else if (element.validity.tooShort) {
      element.setCustomValidity('Минимальное значение - ' + element.minLength + ' симв.');
    } else if (element.validity.tooLong) {
      element.setCustomValidity('Максимальное значение - ' + element.maxLength + ' симв.');
    } else if (element.validity.rangeUnderflow) {
      element.setCustomValidity('Минимальная цена состоявляет - ' + element.min + ' руб.');
    } else if (element.validity.rangeOverflow) {
      element.setCustomValidity('Максимальная цена состоявляет - ' + element.max + ' руб.');
    } else {
      element.setCustomValidity('');
    }
  };

  var inputInvalidTitleHandler = function () {
    inputInvalidHandler(inputTitle);
  };

  var inputInvalidPriceHandler = function () {
    inputInvalidHandler(inputPrice);
  };

  var inputTitleInputHandler = function () {
    var valueLength = inputTitle.value.length;

    inputTitle.reportValidity();

    if (valueLength < inputTitle.minLength) {
      inputTitle.setCustomValidity('Нужно ввести еще ' + (inputTitle.minLength - valueLength) + ' симв.');
    } else if (valueLength > inputTitle.maxLength) {
      inputTitle.setCustomValidity('Нужно удалить лишние ' + (valueLength - inputTitle.maxLength) + ' симв.');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  var inputTypeChangeHandler = function () {
    inputPrice.setAttribute('min', window.main.PRICES_FOR_TYPES[inputType.value]);
    inputPrice.setAttribute('placeholder', window.main.PRICES_FOR_TYPES[inputType.value]);
  };

  // var inputTimeInOutChangeHandler = function () {
  //   if (inputTimeIn.options.selectedIndex !== inputTimeOut.options.selectedIndex) {
  //     inputTimeOut.setCustomValidity('Время выезда должно совподать с временем заезда');
  //   } else {
  //     inputTimeOut.setCustomValidity('');
  //   }
  // };

  var inputTimeInChangeHandler = function () {
    inputTimeOut.value = inputTimeIn.value;
  };

  var inputTimeOutChangeHandler = function () {
    inputTimeIn.value = inputTimeOut.value;

  };

  var inputGuestsRoomsChange = function () {
    if (inputGuestNumber.value === '0' && inputRoomNumber.value !== window.main.ROOMS[3]) {
      inputGuestNumber.setCustomValidity('Для ' + '"' + inputGuestNumber.options[3].label + '"' + ' допустимое значение: ' + '"' + inputRoomNumber.options[3].label + '"');
    } else if (inputRoomNumber.value === window.main.ROOMS[3] && inputGuestNumber.value !== '0') {
      inputGuestNumber.setCustomValidity('Для ' + '"' + inputRoomNumber.options[3].label + '"' + ' допустимое значение: ' + '"' + inputGuestNumber.options[3].label + '"');
    } else if (inputGuestNumber.value > inputRoomNumber.value) {
      inputGuestNumber.setCustomValidity('Количество гостей не должно привышать количество комнат');
    } else {
      inputGuestNumber.setCustomValidity('');
    }
  };

  var inputRoomsChangeHandler = function () {
    inputGuestsRoomsChange();
  };

  var inputGuestsChangeHandler = function () {
    inputGuestsRoomsChange();
  };

  var toggleInputsSelects = function (value) {
    window.main.toggleElement(adFormFieldsets, value);
    window.main.toggleElement(mapFilters, value);
    window.main.toggleElement(mapFeatures, value);
  };

  var submitHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adForm), window.backend.successHandler, window.backend.errorHandler);
  };

  var cleanForm = function () {
    inputTitle.value = '';
    inputType.value = 'flat';
    inputPrice.value = '';
    inputPrice.setAttribute('placeholder', '1000');
    inputRoomNumber.value = '1';
    inputGuestNumber.value = '3';
    inputDescription.value = '';
    inputTimeIn.value = '12:00';
    inputTimeOut.value = '12:00';
    inputCheckboxes.forEach(function (element) {
      element.checked = false;
    });

    window.filter.selectType.value = 'any';
    window.filter.selectPrice.value = 'any';
    window.filter.selectRooms.value = 'any';
    window.filter.selectGuests.value = 'any';
    window.filter.filterFeatures.forEach(function (element) {
      element.checked = false;
    });
  };

  var resetHandler = function (evt) {
    evt.preventDefault();
    window.map.setPageInactive();
  };

  var checkValidityTemplate = function (element) {
    if (element.checkValidity() === false) {
      element.style.border = '2px solid red';

      element.addEventListener('change', function () {
        if (element.checkValidity() === false) {
          element.style.border = '2px solid red';
        } else {
          element.style.border = '1px solid #d9d9d3';
        }
      });
    }
  };

  var checkValidityHandler = function () {
    checkValidityTemplate(inputPrice);
    checkValidityTemplate(inputTitle);
    checkValidityTemplate(inputGuestNumber);
    checkValidityTemplate(inputRoomNumber);
  };


  var init = function () {
    inputTitle.addEventListener('invalid', inputInvalidTitleHandler);
    inputPrice.addEventListener('input', inputInvalidPriceHandler);
    inputTitle.addEventListener('input', inputTitleInputHandler);
    inputType.addEventListener('input', inputTypeChangeHandler);
    inputTimeIn.addEventListener('input', inputTimeInChangeHandler);
    inputTimeOut.addEventListener('input', inputTimeOutChangeHandler);
    inputGuestNumber.addEventListener('input', inputGuestsChangeHandler);
    inputRoomNumber.addEventListener('input', inputRoomsChangeHandler);
    adForm.addEventListener('submit', submitHandler);
    adSubmit.addEventListener('click', checkValidityHandler);
    adForm.addEventListener('reset', resetHandler);
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelectorAll('.map__features');
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var inputType = document.querySelector('#type');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputRoomNumber = document.querySelector('#room_number');
  var inputGuestNumber = document.querySelector('#capacity');
  var inputDescription = document.querySelector('#description');
  var inputCheckboxes = document.querySelectorAll('.feature__checkbox');
  var adSubmit = document.querySelector('.ad-form__submit');

  init();
  inputGuestsRoomsChange();
  toggleInputsSelects(true);

  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    mapFilters: mapFilters,
    mapFeatures: mapFeatures,
    toggleInputsSelects: toggleInputsSelects,
    cleanForm: cleanForm
  };
})();
