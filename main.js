/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/gameboard.js":
/*!*************************************!*\
  !*** ./src/components/gameboard.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var gameboard = function gameboard() {
  var createBoard = function createBoard() {
    var board = _toConsumableArray(Array(10)).map(function () {
      return Array(10).fill("");
    });
    return board;
  };
  var clearBoard = function clearBoard() {
    var board = _toConsumableArray(Array(10)).map(function () {
      return Array(10).fill("");
    });
    return board;
  };
  var ships = [];
  var board = createBoard();
  var showBoard = function showBoard() {
    return board;
  };
  var placeShip = function placeShip(ship, start, end) {
    var rowStart = start[0];
    var rowEnd = end[0];
    var columnStart = start[1];
    var columnEnd = end[1];
    var length = ship.length;
    ships.push(ship);
    // horizontal
    if (rowStart === rowEnd) {
      for (var i = columnStart; i < columnStart + length; i++) {
        board[rowStart][i] = ship;
      }
    }
    // vertical
    else if (columnStart === columnEnd) {
      for (var _i = rowStart; _i < rowStart + length; _i++) {
        board[_i][columnStart] = ship;
      }
    }
  };
  function allSunk() {
    return ships.every(function (ship) {
      return ship.isSunk();
    });
  }
  var receiveAttack = function receiveAttack(row, column) {
    var boardCell = board[row][column];
    // already guessed
    if (boardCell === "miss" || boardCell === "hit") {
      return "Already guessed. Please try again.";
    }

    // ship has been hit
    if (_typeof(board[row][column]) === "object") {
      board[row][column].hit();
      board[row][column] = "hit";
      if (allSunk()) {
        return "Game Over!";
      }
    } else {
      // ship has not been hit
      board[row][column] = "miss";
    }
  };
  return {
    clearBoard: clearBoard,
    showBoard: showBoard,
    placeShip: placeShip,
    receiveAttack: receiveAttack
  };
};
/* harmony default export */ __webpack_exports__["default"] = (gameboard);

/***/ }),

/***/ "./src/components/player.js":
/*!**********************************!*\
  !*** ./src/components/player.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var Player = function Player() {
  var attack = function attack(row, column, board) {
    return board.receiveAttack(row, column);
  };
  var randomAttack = function randomAttack(board) {
    function chooseRandomCoord() {
      var row = Math.floor(Math.random() * 10);
      var column = Math.floor(Math.random() * 10);
      var boardCell = board.showBoard()[row][column];
      if (boardCell === 'miss' || boardCell === 'hit') {
        chooseRandomCoord();
      } else {
        board.receiveAttack(row, column);
      }
    }
    chooseRandomCoord();
  };
  return {
    attack: attack,
    randomAttack: randomAttack
  };
};
/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/components/ship.js":
/*!********************************!*\
  !*** ./src/components/ship.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Ship = /*#__PURE__*/_createClass(function Ship(length) {
  var _this = this;
  _classCallCheck(this, Ship);
  _defineProperty(this, "hitCount", 0);
  _defineProperty(this, "hit", function () {
    _this.hitCount += 1;
  });
  _defineProperty(this, "isSunk", function () {
    return _this.hitCount >= _this.length;
  });
  this.length = length;
});
/* harmony default export */ __webpack_exports__["default"] = (Ship);

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboard */ "./src/components/gameboard.js");
/* harmony import */ var _components_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/player */ "./src/components/player.js");
/* harmony import */ var _components_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ship */ "./src/components/ship.js");
/* harmony import */ var _visibleBoard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./visibleBoard */ "./src/visibleBoard.js");





// create players and gameboards

var availableShips = function availableShips() {
  var carrier = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](5);
  var battleship = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](4);
  var cruiser = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](3);
  var submarine = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](3);
  var destroyer = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](2);
  return {
    carrier: carrier,
    battleship: battleship,
    cruiser: cruiser,
    submarine: submarine,
    destroyer: destroyer
  };
};
var game = function game() {
  var player = (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var playerBoard = (0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var opponent = (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var enemyBoard = (0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var startGame = function startGame() {
    // reset
    playerBoard.clearBoard();
    enemyBoard.clearBoard();
    (0,_visibleBoard__WEBPACK_IMPORTED_MODULE_3__["default"])("player-board", playerBoard);
    (0,_visibleBoard__WEBPACK_IMPORTED_MODULE_3__["default"])("computer-board", enemyBoard);
  };
  return {
    startGame: startGame
  };
};
/* harmony default export */ __webpack_exports__["default"] = (game);

/***/ }),

/***/ "./src/visibleBoard.js":
/*!*****************************!*\
  !*** ./src/visibleBoard.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var createBoard = function createBoard(id) {
  var board = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      if (board && board.showBoard()[row][column] === "miss") {
        cell.classList.add('miss');
      } else if (board && board.showBoard()[row][column] === "hit") {
        cell.classList.add('hit');
      }
      document.getElementById(id).appendChild(cell);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (createBoard);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");

var myGame = (0,_game__WEBPACK_IMPORTED_MODULE_0__["default"])();
myGame.startGame();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCBzdGFydCwgZW5kKSA9PiB7XHJcbiAgICBjb25zdCByb3dTdGFydCA9IHN0YXJ0WzBdO1xyXG4gICAgY29uc3Qgcm93RW5kID0gZW5kWzBdO1xyXG4gICAgY29uc3QgY29sdW1uU3RhcnQgPSBzdGFydFsxXTtcclxuICAgIGNvbnN0IGNvbHVtbkVuZCA9IGVuZFsxXTtcclxuICAgIGNvbnN0IHtsZW5ndGh9ID0gc2hpcDtcclxuXHJcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgLy8gaG9yaXpvbnRhbFxyXG4gICAgaWYgKHJvd1N0YXJ0ID09PSByb3dFbmQpIHtcclxuICAgICAgZm9yIChsZXQgaT1jb2x1bW5TdGFydDsgaSA8IGNvbHVtblN0YXJ0K2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYm9hcmRbcm93U3RhcnRdW2ldID0gc2hpcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gdmVydGljYWxcclxuICAgIGVsc2UgaWYgKGNvbHVtblN0YXJ0ID09PSBjb2x1bW5FbmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHJvd1N0YXJ0OyBpIDwgcm93U3RhcnQgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJvYXJkW2ldW2NvbHVtblN0YXJ0XSA9IHNoaXA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2NsZWFyQm9hcmQsIHNob3dCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiY29uc3QgUGxheWVyID0gKCkgPT4ge1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKVxyXG5cclxuICBjb25zdCByYW5kb21BdHRhY2sgPSAoYm9hcmQpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNob29zZVJhbmRvbUNvb3JkKCkge1xyXG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXTtcclxuXHJcbiAgICAgIGlmIChib2FyZENlbGwgPT09ICdtaXNzJyB8fCBib2FyZENlbGwgPT09ICdoaXQnKSB7XHJcbiAgICAgICAgY2hvb3NlUmFuZG9tQ29vcmQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjaG9vc2VSYW5kb21Db29yZCgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHthdHRhY2ssIHJhbmRvbUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgfVxyXG4gIFxyXG4gIGhpdENvdW50ID0gMDtcclxuXHJcbiAgaGl0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5oaXRDb3VudCArPSAxO1xyXG4gIH1cclxuICBcclxuICBpc1N1bmsgPSAoKSA9PiB0aGlzLmhpdENvdW50ID49IHRoaXMubGVuZ3RoXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2NvbXBvbmVudHMvc2hpcFwiO1xyXG5pbXBvcnQgY3JlYXRlQm9hcmQgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXJyaWVyLFxyXG4gICAgYmF0dGxlc2hpcCxcclxuICAgIGNydWlzZXIsXHJcbiAgICBzdWJtYXJpbmUsXHJcbiAgICBkZXN0cm95ZXJcclxuICB9XHJcbn1cclxuY29uc3QgZ2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBvcHBvbmVudCA9IFBsYXllcigpO1xyXG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgLy8gcmVzZXRcclxuICAgIHBsYXllckJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICAgIGVuZW15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgIGNyZWF0ZUJvYXJkKFwicGxheWVyLWJvYXJkXCIsIHBsYXllckJvYXJkKTtcclxuICAgIGNyZWF0ZUJvYXJkKFwiY29tcHV0ZXItYm9hcmRcIiwgZW5lbXlCb2FyZCk7ICAgIFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXJ0R2FtZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJjb25zdCBjcmVhdGVCb2FyZCA9IChpZCwgYm9hcmQ9bnVsbCkgPT4ge1xyXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09IFwibWlzc1wiKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSBcImhpdFwiKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgfVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCb2FyZDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG5jb25zdCBteUdhbWUgPSBnYW1lKCk7XHJcblxyXG5teUdhbWUuc3RhcnRHYW1lKCk7Il0sIm5hbWVzIjpbImdhbWVib2FyZCIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJBcnJheSIsIm1hcCIsImZpbGwiLCJjbGVhckJvYXJkIiwic2hpcHMiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlwIiwic3RhcnQiLCJlbmQiLCJyb3dTdGFydCIsInJvd0VuZCIsImNvbHVtblN0YXJ0IiwiY29sdW1uRW5kIiwibGVuZ3RoIiwicHVzaCIsImkiLCJhbGxTdW5rIiwiZXZlcnkiLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sdW1uIiwiYm9hcmRDZWxsIiwiX3R5cGVvZiIsImhpdCIsIlBsYXllciIsImF0dGFjayIsInJhbmRvbUF0dGFjayIsImNob29zZVJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiU2hpcCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJhdmFpbGFibGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsImdhbWUiLCJwbGF5ZXIiLCJwbGF5ZXJCb2FyZCIsIm9wcG9uZW50IiwiZW5lbXlCb2FyZCIsInN0YXJ0R2FtZSIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY2VsbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kQ2hpbGQiLCJteUdhbWUiXSwic291cmNlUm9vdCI6IiJ9