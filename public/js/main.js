/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var reset = __webpack_require__(1);

	var css = __webpack_require__(2);

	var menu = __webpack_require__(3);
	menu();

	var form = __webpack_require__(4);
	form();

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {

		var menu = document.getElementById('nav');
		var menuBottom = menu.getBoundingClientRect().top + window.pageYOffset;

		window.onscroll = function () {
			if (menu.classList.contains('fixed') && window.pageYOffset < menuBottom) {
				menu.classList.remove('fixed');
			} else if (window.pageYOffset > menuBottom) {
				menu.classList.add('fixed');
			}
		};
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {

			document.forms.contact.onsubmit = function (event) {
					var submit = document.querySelector("input[type='submit']");
					submit.disabled = true;
					submit.value = 'Sending...';

					var form = document.forms.contact;
					var nameForm = form.elements.name.value;
					var mailForm = form.elements.mail.value;
					var contentForm = form.elements.content.value;

					if (window.FormData) {
							event.preventDefault();
							var json = JSON.stringify({
									name: nameForm,
									email: mailForm,
									text: contentForm
							});

							var xhr = new XMLHttpRequest();

							xhr.open('post', "/send", true);

							xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

							xhr.onreadystatechange = function () {
									if (xhr.readyState == 4 && xhr.status == 200) {
											console.log(xhr.responseText);
											submit.value = 'Send';
									}
							};
							xhr.send(json);
					}
			};
	};

/***/ }
/******/ ]);