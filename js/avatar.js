'use strict';

(function () {
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var setBackgroundImg = function (chooser, preview, reader) {
    preview.style.backgroundPosition = 'center';
    preview.style.backgroundSize = 'contain';
    preview.style.backgroundRepeat = 'no-repeat';

    reader.addEventListener('load', function () {
      preview.style.backgroundImage = 'url(' + reader.result + ')';
    });
  };

  var showPreview = function (chooser, preview) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        if (preview.src) {
          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });
        } else {
          setBackgroundImg(chooser, preview, reader);
        }

        reader.readAsDataURL(file);
      }
    });

  };

  showPreview(avatarChooser, avatarPreview);
  showPreview(photoChooser, photoPreview);

  window.avatar = {
    preview: avatarPreview,
    photoPreview: photoPreview
  };

})();
