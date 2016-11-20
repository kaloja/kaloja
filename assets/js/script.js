/* Full width image
============================================================================ */

function fullImg() {
  var full = document.querySelectorAll('.full');
  for (var i = 0; i < full.length; i++) {
    full[i].classList.add('full-loaded');
    full[i].parentElement.classList.add('img-wrapper');
    var height = full[i].offsetHeight;
    full[i].parentElement.style.height = height + 'px';
  };
};

addEvent('load', window, fullImg);
addEvent('resize', window, fullImg);





/* Polyfill for event handlers
============================================================================ */

function addEvent(event, elem, func) {
  if (elem.addEventListener) { // W3C DOM
    elem.addEventListener(event, func, false);
  }

  else if (elem.attachEvent) { // IE DOM
    elem.attachEvent('on'+event, func);
  }
  
  else { // Not much to do
    elem[event] = func;
  }
};





/* Menu for small screens
============================================================================ */

(function() {
	var headerNavBtn = document.querySelector('.header-nav__btn');

	function toggle(obj) {
		var elem = document.querySelector(obj);
		elem.classList.toggle('site-nav--open');
	};

	function rotate(obj) {
		var elem = document.querySelector(obj);
		elem.classList.toggle('header-nav--rotate');
	};

	addEvent('click', headerNavBtn, function(e) {
		e.preventDefault();
		toggle('.site-nav');
		rotate('.header-nav__toggle');
	});

	var link = document.querySelectorAll('.site-nav__link');
	for (var i = 0; i < link.length; i++) {
		var links = link[i];
		var closeNavList = document.querySelector('.site-nav');
		var removeRotate = document.querySelector('.header-nav__toggle');

		addEvent('click', links, function() {
			closeNavList.classList.remove('site-nav--open');
			removeRotate.classList.remove('header-nav--rotate');
		});
	};
})();





/* Ajax request
============================================================================ */

function ajax(url, callback, message) {
  var XHR = null;
  
  if (XMLHttpRequest) {
    XHR = new XMLHttpRequest();
  } else {
    XHR = new ActiveXObject("Microsoft.XMLHTTP"); 
  }

  XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 || XHR.readyState == "complete") {
      if (XHR.status == 200) {
        callback(XHR); 
      } else {
        alert('Fel på servern');
      }
    }
  }

  XHR.open("POST", url, true);
  XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  XHR.send(message);
};





/* Ajax contact form
============================================================================ */

(function() {
  // Get the form
  var form = document.getElementById('ajax-contact');

  // Eventlistener for the form
	addEvent('submit', form, ajaxContact);

	// Submit form with Ajax
	function ajaxContact(e) {
		e.preventDefault();
		var name = document.getElementsByName('name')[0].value;
		var email = document.getElementsByName('email')[0].value;
		var message = document.getElementsByName('message')[0].value;
		ajax('portfolio/wp-content/themes/kaloja/contact.php', cbAjaxContact, 'name=' + name + '&email=' + email + '&message=' + message);
	}

	// Callback form
  function cbAjaxContact(obj) {
    var result = obj.responseText;
    if(result.error) {
      var cbMessage = document.getElementById('callback-message').innerHTML = result;
    } else {
      var name = document.getElementsByName('name')[0].value = '';
      var email = document.getElementsByName('email')[0].value = '';
      var message = document.getElementsByName('message')[0].value = '';
      var cbMessage = document.getElementById('callback-message').innerHTML = result;
    }
  }
})();