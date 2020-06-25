'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;

  var load = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          loadHandler(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено — 404';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content;
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButtonClose = errorElement.querySelector('.error__button--close');
    var errorButtonRefresh = errorElement.querySelector('.error__button--refresh');

    errorMessage.textContent = message;

    document.body.appendChild(errorElement);

    var errorDiv = document.querySelector('.error');

    var errorButtonClickHandler = function (evt) {
      if (evt.target.matches('.error__button--refresh')) {
        location.reload();
      }
      errorDiv.remove();

      document.removeEventListener('keydown', popupEscPressHandler);
    };

    var popupEscPressHandler = function (evt) {
      if (evt.key === 'Escape') {
        errorDiv.remove();

        document.removeEventListener('keydown', popupEscPressHandler);
      }
    };

    errorButtonClose.addEventListener('click', errorButtonClickHandler);
    errorButtonRefresh.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var successHandler = function (loadData) {
    window.data = loadData;
  };

  window.backend = {
    load: load,
    successHandler: successHandler
  };

  load(successHandler, errorHandler);
})();

