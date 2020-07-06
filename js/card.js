'use strict';

(function () {
  var addCard = function (mapPinId, currentData) {
    var cardTemplate = document.getElementById('card').content;
    var mapFilters = document.querySelector('.map__filters-container');

    var renderCard = function (adv) {
      var renderCardFeatures = function (arr, block) {
        var fragment = document.createDocumentFragment();

        block.innerHTML = '';

        for (var i = 0; i < arr.length; i++) {
          var cardFeatureIteam = document.createElement('li');

          cardFeatureIteam.classList.add('popup__feature', 'popup__feature--' + arr[i]);

          fragment.appendChild(cardFeatureIteam);
        }

        return fragment;
      };

      var renderCardPhotos = function (arr, block) {
        var fragment = document.createDocumentFragment();

        block.innerHTML = '';

        for (var i = 0; i < arr.length; i++) {
          var cardPhotoIteam = document.createElement('img');

          cardPhotoIteam.classList.add('popup__photo');
          cardPhotoIteam.src = adv.offer.photos[i];
          cardPhotoIteam.alt = 'фото квартиры';
          cardPhotoIteam.width = 45;

          fragment.appendChild(cardPhotoIteam);
        }

        return fragment;
      };

      var cardElement = cardTemplate.cloneNode(true);

      var cardTitle = cardElement.querySelector('.popup__title');
      var cardAdress = cardElement.querySelector('.popup__text--address');
      var cardPrice = cardElement.querySelector('.popup__text--price');
      var cardType = cardElement.querySelector('.popup__type');
      var cardRoomAndGuests = cardElement.querySelector('.popup__text--capacity');
      var cardCheckinAndCheckout = cardElement.querySelector('.popup__text--time');
      var cardFeatures = cardElement.querySelector('.popup__features');
      var cardDescription = cardElement.querySelector('.popup__description');
      var cardPhotos = cardElement.querySelector('.popup__photos');
      var cardAvatar = cardElement.querySelector('.popup__avatar');

      cardTitle.textContent = adv.offer.title;
      cardAdress.textContent = adv.offer.adress;
      cardPrice.textContent = adv.offer.price + '₽/ночь';
      cardType.textContent = window.main.TYPE_TO_RU[adv.offer.type];
      cardRoomAndGuests.textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
      cardCheckinAndCheckout.textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
      cardFeatures.appendChild(renderCardFeatures(adv.offer.features, cardFeatures));
      cardDescription.textContent = adv.offer.description;
      cardPhotos.appendChild(renderCardPhotos(adv.offer.photos, cardPhotos));
      cardAvatar.src = adv.author.avatar;

      return cardElement;
    };

    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(currentData[mapPinId]));
    mapFilters.before(fragment);
  };

  var deleteCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
      window.pin.deleteActivePinClass();

    }

    document.removeEventListener('click', window.map.mapCardClickHandler);
    document.removeEventListener('keydown', window.map.mapCardPresEsckHandler);
  };

  window.card = {
    addCard: addCard,
    deleteCard: deleteCard
  };
})();
