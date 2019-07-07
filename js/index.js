'use strict';

//Global variables
var userName='';
var currentUser = '';

//User login and interaction with local storage
var form = document.getElementById('userLogin');

var addUser = function(event) {
  event.preventDefault();
  var userEntry = event.target.userName.value;
  if (localStorage.userEntry) {
    userName = localStorage.userEntry;
    currentUser = userName;
  } else {
    userName = event.target.userName.value;
    currentUser = userName;
    localStorage.setItem('Current', currentUser);
    localStorage.setItem(`'${userName}'`, userName);
  }
  window.location.href='./home.html';
};

form.addEventListener('submit', addUser);


