'use strict';

(function () {
  var checkPriceTitleForInvalidity = function (element) {
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
    checkPriceTitleForInvalidity(inputTitle);
  };

  var inputInvalidPriceHandler = function () {
    checkPriceTitleForInvalidity(inputPrice);
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

  var inputPriceInputHandler = function () {
    var valuePrice = Number(inputPrice.value);

    inputPrice.reportValidity();

    if (valuePrice < inputPrice.min) {
      inputPrice.setCustomValidity('Нужно доплатить ' + (inputPrice.min - valuePrice) + ' руб.');
    } else if (valuePrice > inputPrice.max) {
      inputPrice.setCustomValidity('Вы переплатили ' + (valuePrice - inputPrice.max) + ' руб.');
    } else {
      inputPrice.setCustomValidity('');
    }
  };

  var inputTypeChangeHandler = function () {
    inputPrice.setAttribute('min', window.main.PRICE_FOR_TYPE[inputType.value]);
    inputPrice.setAttribute('placeholder', window.main.PRICE_FOR_TYPE[inputType.value]);
  };

  var inputTimeInChangeHandler = function () {
    inputTimeOut.value = inputTimeIn.value;
  };

  var inputTimeOutChangeHandler = function () {
    inputTimeIn.value = inputTimeOut.value;
  };

  var checkRoomsGuestsForChanging = function () {
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
    checkRoomsGuestsForChanging();
  };

  var inputGuestsChangeHandler = function () {
    checkRoomsGuestsForChanging();
  };

  var toggleElementDisabled = function (elements, value) {
    elements.forEach(function (it) {
      it.disabled = value;
    });
  };

  var toggleElementChecked = function (elements, value) {
    elements.forEach(function (it) {
      it.checked = value;
    });
  };

  var toggleInputsSelects = function (value) {
    toggleElementDisabled(adFormFieldsets, value);
    toggleElementDisabled(mapFilters, value);
    toggleElementDisabled(mapFeatures, value);
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.xhrTemplate('POST', new FormData(adForm), window.backend.URL_SAVE, window.backend.successHandler, window.backend.errorHandler);
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
    toggleElementChecked(inputCheckboxes, false);

    window.filter.selectType.value = 'any';
    window.filter.selectPrice.value = 'any';
    window.filter.selectRooms.value = 'any';
    window.filter.selectGuests.value = 'any';
    toggleElementChecked(window.filter.checkboxFeatures, false);

    window.avatar.preview.src = 'img/muffin-grey.svg';
    window.avatar.photoPreview.style.backgroundImage = 'none';
  };

  var resetHandler = function (evt) {
    evt.preventDefault();
    window.map.setPageInactive();
  };

  var checkValidityTemplate = function (element) {
    if (element.checkValidity() === false) {
      element.style.border = '2px solid red';

      element.addEventListener('change', function () {
        element.style.border = element.checkValidity() ? '1px solid #d9d9d3' : '2px solid red';
      });
    }
  };

  var checkValidityHandler = function () {
    checkValidityTemplate(inputPrice);
    checkValidityTemplate(inputTitle);
    checkValidityTemplate(inputGuestNumber);
  };


  var init = function () {
    inputTitle.addEventListener('invalid', inputInvalidTitleHandler);
    inputPrice.addEventListener('invalid', inputInvalidPriceHandler);
    inputTitle.addEventListener('input', inputTitleInputHandler);
    inputPrice.addEventListener('input', inputPriceInputHandler);
    inputType.addEventListener('input', inputTypeChangeHandler);
    inputTimeIn.addEventListener('change', inputTimeInChangeHandler);
    inputTimeOut.addEventListener('change', inputTimeOutChangeHandler);
    inputGuestNumber.addEventListener('change', inputGuestsChangeHandler);
    inputRoomNumber.addEventListener('change', inputRoomsChangeHandler);
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

  checkRoomsGuestsForChanging();
  toggleInputsSelects(true);
  init();

  window.form = {
    main: adForm,
    toggleInputsSelects: toggleInputsSelects,
    clean: cleanForm
  };
})();
