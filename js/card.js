'use strict';

(function () {
  var renderCardFeatures = function (arr, block) {
    var fragment = document.createDocumentFragment();

    block.innerHTML = '';

    if (arr) {
      arr.forEach(function (it) {
        var cardFeatureIteam = document.createElement('li');

        cardFeatureIteam.classList.add('popup__feature', 'popup__feature--' + it);

        fragment.appendChild(cardFeatureIteam);
      });
    }

    return fragment;
  };

  var renderCardPhotos = function (arr, block) {
    var fragment = document.createDocumentFragment();

    block.innerHTML = '';

    if (arr) {
      arr.forEach(function (it) {
        var cardPhotoIteam = document.createElement('img');

        cardPhotoIteam.classList.add('popup__photo');
        cardPhotoIteam.src = it;
        cardPhotoIteam.alt = 'фото квартиры';
        cardPhotoIteam.width = 45;
        cardPhotoIteam.height = 40;

        fragment.appendChild(cardPhotoIteam);
      });
    }

    return fragment;
  };

  var renderCard = function (adv) {
    var cardTemplate = document.getElementById('card').content;
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
    if (!cardFeatures.querySelector('li')) {
      cardFeatures.remove();
    }
    cardDescription.textContent = adv.offer.description;
    cardPhotos.appendChild(renderCardPhotos(adv.offer.photos, cardPhotos));
    if (!cardPhotos.querySelector('img')) {
      cardPhotos.remove();
    }
    cardAvatar.src = adv.author.avatar;

    return cardElement;
  };

  var addCard = function (mapPinId, currentData) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    mapFiltersContainer.before(renderCard(currentData[mapPinId]));
  };

  var deleteCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
      window.pin.deleteActiveClass();
    }

    document.removeEventListener('click', window.map.cardClickHandler);
    document.removeEventListener('keydown', window.map.cardPresEsckHandler);
  };

  window.card = {
    add: addCard,
    delete: deleteCard
  };
})();
