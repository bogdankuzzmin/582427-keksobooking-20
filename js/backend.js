'use strict';

(function () {
  // Apis from html academy, the URL changes when starts a new course.
  // var URL_LOAD = 'https://27.javascript.pages.academy/keksobooking/data';

  var URL_LOAD = 'https://keksobooking-e1878-default-rtdb.firebaseio.com/data.json';
  var URL_SAVE = 'https://27.javascript.pages.academy/keksobooking'; // TODO: change on firebase
  var TIMEOUT_IN_MS = 10000;

  var statusCode = {
    OK: 200,
    BAD: 400,
    UNAUTHOIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var xhrTemplate = function (method, data, URL, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case statusCode.OK:
          successHandler(xhr.response);
          break;
        case statusCode.BAD:
          error = 'Неверный запрос';
          break;
        case statusCode.UNAUTHOIZED:
          error = 'Пользователь не авторизован';
          break;
        case statusCode.NOT_FOUND:
          error = '404 — Ничего не найдено';
          break;
        case statusCode.INTERNAL_SERVER_ERROR:
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

    xhr.open(method, URL);
    xhr.send(data);
  };

  var getElementFromTemplate = function (tagName, message) {
    var mainDOM = document.querySelector('main');
    var getTemplate = document.querySelector('#' + tagName).content;
    var getElement = getTemplate.cloneNode(true);
    var getButton = getElement.querySelector('.' + tagName + '__button');
    var getMessage = getElement.querySelector('.' + tagName + '__message');

    if (getMessage.matches('.error__message')) {
      getMessage.textContent = message;
    }

    mainDOM.appendChild(getElement);

    var messageDiv = document.querySelector('.' + tagName);

    var buttonClickHandler = function () {
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

    if (getButton) {
      getButton.addEventListener('click', buttonClickHandler);
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
    xhrTemplate: xhrTemplate,
    URL_SAVE: URL_SAVE,
    statusCode: statusCode
  };

  xhrTemplate('GET', null, URL_LOAD, saveDataHandler, errorHandler);
})();
