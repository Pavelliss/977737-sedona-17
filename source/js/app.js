var nav = document.querySelector(".nav");
var navButton = nav.querySelector(".nav__button");

nav.classList.remove("nav--nojs");

navButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  nav.classList.toggle("nav--closed");
});
