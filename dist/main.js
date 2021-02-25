/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resevation/src/mainpage.js":
/*!************************************!*\
  !*** ./resevation/src/mainpage.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\nconsole.log(\"mainpage.js\");\r\n\r\n// import server from \"../../server.js\";\r\n\r\nconst API_ENDPOINT = \"http://localhost:8080\";\r\n\r\nconst api = {\r\n  fetchCategory: () => {\r\n    return fetch(`${API_ENDPOINT}/reservation/api/categories`).then((res) =>\r\n      res.json()\r\n    );\r\n  },\r\n  fetchDisplayinfos: (categoryId, start) => {\r\n    return fetch(\r\n      `${API_ENDPOINT}/reservation/api/displayinfos?categoryId=${categoryId}&start=${start}`\r\n    ).then((res) => res.json());\r\n  },\r\n};\r\n\r\n// api.fetchDisplayinfos(1, 1);\r\n\r\nfunction savePreference(arr) {\r\n  const filterString = JSON.stringify([...arr]);\r\n  sessionStorage.setItem(\"로그\", filterString);\r\n}\r\n\r\nfunction retrivePreferences() {\r\n  const preferenses = JSON.parse(sessionStorage.getItem(\"로그\"));\r\n  return preferenses;\r\n}\r\n\r\nlet filters = new Map();\r\n\r\nfunction addFilters(filters, key, value) {\r\n  filters.set(key, value);\r\n}\r\n\r\nfunction deleteFilters(filters, key) {\r\n  filters.delete(key);\r\n}\r\n\r\nfunction request(options) {\r\n  console.log(\">>> request: in\", options);\r\n\r\n  fetch(`${API_ENDPOINT}/reservation/kafka/publish`, options).then((data) => {\r\n    if (!data.ok) {\r\n      delay *= 2;\r\n      console.log(\"error!!!!!!!!\");\r\n      // throw Error(data.status);\r\n    }\r\n    arr = [];\r\n    sessionStorage.clear();\r\n    return data;\r\n  });\r\n}\r\n\r\nlet time;\r\nlet arr = [];\r\n\r\nconst target = document.getElementsByClassName(\"event\");\r\ntarget[0].addEventListener(\"click\", function (event) {\r\n  console.log(\">>>> event\", event);\r\n\r\n  const update = {\r\n    영역: event.target.classList[0],\r\n    키워드: event.target.innerText,\r\n  };\r\n\r\n  arr.push(update);\r\n  savePreference(arr);\r\n\r\n  setInterval(() => {\r\n    const options = {\r\n      method: \"POST\",\r\n      header: {\r\n        \"Access-Control-Allow-Origin\": \"*\",\r\n        \"Content-Type\": \"application/json\",\r\n      },\r\n      body: JSON.stringify(JSON.parse(sessionStorage.getItem(\"로그\"))),\r\n    };\r\n    console.log(\r\n      \">>>> request: before\",\r\n      options,\r\n      sessionStorage.getItem(\"로그\")\r\n    );\r\n    request(options);\r\n  }, 20000);\r\n});\r\n\n\n//# sourceURL=webpack://reservation/./resevation/src/mainpage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resevation/src/mainpage.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;