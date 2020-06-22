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

  var inputTimeInOutChangeHandler = function () {
    if (inputTimeIn.options.selectedIndex !== inputTimeOut.options.selectedIndex) {
      inputTimeOut.setCustomValidity('Время выезда должно совподать с временем заезда');
    } else {
      inputTimeOut.setCustomValidity('');
    }
  };

  var inputGuestsRoomsChangeHandler = function () {
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

  var init = function () {
    inputTitle.addEventListener('invalid', function () {
      inputInvalidHandler(inputTitle);
    });
    inputPrice.addEventListener('invalid', function () {
      inputInvalidHandler(inputPrice);
    });
    inputTitle.addEventListener('input', inputTitleInputHandler);
    inputType.addEventListener('input', inputTypeChangeHandler);
    inputTimeIn.addEventListener('input', inputTimeInOutChangeHandler);
    inputTimeOut.addEventListener('input', inputTimeInOutChangeHandler);
    inputGuestNumber.addEventListener('input', inputGuestsRoomsChangeHandler);
    inputRoomNumber.addEventListener('input', inputGuestsRoomsChangeHandler);
  };

  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var inputType = document.querySelector('#type');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputRoomNumber = document.querySelector('#room_number');
  var inputGuestNumber = document.querySelector('#capacity');

  init();
  inputGuestsRoomsChangeHandler();
})();
