/*
Headmove v1.0
by Mattias Haal: http://www.kaloja.se
Copyright 2014 Kaloja
Licensed under the MIT license
http://opensource.org/licenses/MIT
*/

(function() {

	// Declare variables
	var latestScrollY = 0,
		currentScrollY = 0,
		ticking = false,
		delta = 50,
		header = 100;

	// Store recent scroll value
	function onScroll() {
		latestScrollY = window.pageYOffset;
		if (!document.querySelector('.site-nav').classList.contains('site-nav--open')) {
			requestTick();
		}
	}

	// Run animation just once when scrolled
	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}

	// Run the user interface changes of DOM element
	function update() {
		ticking = false;
		if (Math.abs(currentScrollY - latestScrollY) <= delta)
			return;
		if (latestScrollY > currentScrollY && latestScrollY > header) {
			document.querySelector('.header').classList.remove('header--visible');
			document.querySelector('.header').classList.add('header--hidden');
		} else {
			document.querySelector('.header').classList.add('header--visible');
			document.querySelector('.header').classList.remove('header--hidden');
		}
		if (latestScrollY > header) {
			document.querySelector('.header').classList.remove('header--transparent');
		} else {
			document.querySelector('.header').classList.add('header--transparent');
		}
		currentScrollY = latestScrollY;
	}

	// Start the event
	window.addEventListener('scroll', onScroll, false);

})();


// Polyfill for requestAnimationFrame
(function() {

  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };

})();