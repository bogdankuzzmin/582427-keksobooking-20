'use strict';

(function () {
  // var URL_LOAD = 'js/1';
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
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
          error = '404 — Ничего не найдено';
          break;
        case 500:
          error = 'Ошибка на стороне сервера';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      window.backend.load = {
        statusLoad: xhr.status,
        statusTextLoad: xhr.statusText
      };

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

  var save = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          successHandler(xhr.response);
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
        case 500:
          error = 'Ошибка на стороне сервера';
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

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var getElementFromTemplate = function (tagName, message) {
    var mainDOM = document.querySelector('main');
    var getTemplate = document.querySelector('#' + tagName).content;
    var getElement = getTemplate.cloneNode(true);
    var getBtn = getElement.querySelector('.' + tagName + '__button');
    var getMessage = getElement.querySelector('.' + tagName + '__message');

    if (getMessage.matches('.error__message')) {
      getMessage.textContent = message;
    }

    mainDOM.appendChild(getElement);

    var messageDiv = document.querySelector('.' + tagName);

    var getBtnClickHandler = function () {
      messageDiv.remove();

      document.removeEventListener('click', popupClickHandler);
      document.removeEventListener('keydown', popupEscPressHandler);
    };

    var popupClickHandler = function (evt) {
      if (evt.target.matches('.' + tagName)) {
        messageDiv.remove();

        if (tagName === 'success') {
          window.map.setPageInactive();
        }

        document.removeEventListener('click', popupClickHandler);
        document.removeEventListener('keydown', popupEscPressHandler);
      }
    };

    var popupEscPressHandler = function (evt) {
      if (evt.key === 'Escape') {
        messageDiv.remove();

        if (tagName === 'success') {
          window.map.setPageInactive();
        }

        document.removeEventListener('click', popupClickHandler);
        document.removeEventListener('keydown', popupEscPressHandler);
      }
    };

    document.addEventListener('click', popupClickHandler);
    document.addEventListener('keydown', popupEscPressHandler);
    if (getBtn) {
      getBtn.addEventListener('click', getBtnClickHandler);
    }
  };

  var successHandler = function () {
    getElementFromTemplate('success');
  };

  var errorHandler = function (message) {
    getElementFromTemplate('error', message);
  };

  var saveDataHandler = function (loadData) {
    var data = [];

    loadData.forEach(function (it) {
      if (it.offer) {
        data.push(it);
      }
    });

    window.data = data;
    window.filter.currentData = data;
  };

  window.backend = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    save: save,
    load: load
  };

  load(saveDataHandler, errorHandler);
})();

