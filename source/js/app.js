var nav = document.querySelector('.nav');
var navButton = nav.querySelector('.nav__button');
var formFeedback = document.querySelector('.form');
var popupValid = document.querySelector('.popup--valid');
var popupInvalid = document.querySelector('.popup--invalid');

//nav
nav.classList.remove('nav--nojs');

navButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  nav.classList.toggle('nav--closed');
});

//modal
if (formFeedback) {
  var userFirstName = formFeedback.querySelector('.form__input[name="first-name"]');
  var userLastName = formFeedback.querySelector('.form__input[name="last-name"]');
  var userPhone = formFeedback.querySelector('.form__input[name="user-tel"]');
  var userEmail = formFeedback.querySelector('.form__input[name="user-email"]');
  var popupClose = document.querySelectorAll('.button__popup-close');

  formFeedback.addEventListener('submit', function (evt) {
    if (!userFirstName.value ||
        !userLastName.value ||
        !userPhone.value ||
        !userEmail.value) {
          evt.preventDefault();
          popupInvalid.classList.remove('popup--show');
          popupInvalid.classList.add('popup--show');
        } else {
          popupValid.classList.remove('popup--show');
          popupValid.classList.add('popup--show');
        }
  });

  for (var i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      popupValid.classList.remove('popup--show');
      popupInvalid.classList.remove('popup--show');
    })
  }
}
