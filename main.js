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
    allSunk: allSunk,
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
    (0,_visibleBoard__WEBPACK_IMPORTED_MODULE_3__.createBoard)("player-board", playerBoard);
    (0,_visibleBoard__WEBPACK_IMPORTED_MODULE_3__.createBoard)("computer-board", enemyBoard);
  };
  var playerMove = function playerMove(row, column) {
    player.attack(row, column, enemyBoard);
    var isHit = enemyBoard.showBoard()[row][column] === 'hit';
    (0,_visibleBoard__WEBPACK_IMPORTED_MODULE_3__.displayMoveResult)(row, column, 'computer-board', isHit);

    // need to check if all ships are sunk
  };

  return {
    startGame: startGame,
    playerMove: playerMove
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBoard: function() { return /* binding */ createBoard; },
/* harmony export */   displayMoveResult: function() { return /* binding */ displayMoveResult; }
/* harmony export */ });
var createBoard = function createBoard(id) {
  var board = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.column = column;
      if (board && board.showBoard()[row][column] === "miss") {
        cell.classList.add('miss');
      } else if (board && board.showBoard()[row][column] === "hit") {
        cell.classList.add('hit');
      }
      document.getElementById(id).appendChild(cell);
    }
  }
};
function findAttacked(row, column, id) {
  var picked;
  var cells = document.querySelectorAll("#".concat(id, " .cell"));
  cells.forEach(function (cell) {
    if (cell.dataset.row === row && cell.dataset.column === column) {
      picked = cell;
    }
  });
  return picked;
}
function displayMoveResult(row, column, id, isHit) {
  var picked = findAttacked(row, column, id);
  if (isHit) {
    picked.classList.add('hit');
    picked.textContent = 'O';
  } else {
    picked.classList.add('miss');
    picked.textContent = 'X';
  }
}


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
myGame.playerMove("1", "2");
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04wQjtBQUUxQixJQUFNQyxNQUFNLEdBQUcxQixpREFBSSxDQUFDLENBQUM7QUFFckIwQixNQUFNLENBQUNyQixTQUFTLENBQUMsQ0FBQztBQUVsQnFCLE1BQU0sQ0FBQ3BCLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgY29uc3Qgcm93U3RhcnQgPSBzdGFydFswXTtcclxuICAgIGNvbnN0IHJvd0VuZCA9IGVuZFswXTtcclxuICAgIGNvbnN0IGNvbHVtblN0YXJ0ID0gc3RhcnRbMV07XHJcbiAgICBjb25zdCBjb2x1bW5FbmQgPSBlbmRbMV07XHJcbiAgICBjb25zdCB7bGVuZ3RofSA9IHNoaXA7XHJcblxyXG4gICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgIC8vIGhvcml6b250YWxcclxuICAgIGlmIChyb3dTdGFydCA9PT0gcm93RW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGk9Y29sdW1uU3RhcnQ7IGkgPCBjb2x1bW5TdGFydCtsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJvYXJkW3Jvd1N0YXJ0XVtpXSA9IHNoaXA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHZlcnRpY2FsXHJcbiAgICBlbHNlIGlmIChjb2x1bW5TdGFydCA9PT0gY29sdW1uRW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSByb3dTdGFydDsgaSA8IHJvd1N0YXJ0ICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBib2FyZFtpXVtjb2x1bW5TdGFydF0gPSBzaGlwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHthbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4gYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbilcclxuXHJcbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gKGJvYXJkKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VSYW5kb21Db29yZCgpIHtcclxuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl07XHJcblxyXG4gICAgICBpZiAoYm9hcmRDZWxsID09PSAnbWlzcycgfHwgYm9hcmRDZWxsID09PSAnaGl0Jykge1xyXG4gICAgICAgIGNob29zZVJhbmRvbUNvb3JkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2hvb3NlUmFuZG9tQ29vcmQoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7YXR0YWNrLCByYW5kb21BdHRhY2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9jb21wb25lbnRzL3BsYXllclwiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXBcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIGRpc3BsYXlNb3ZlUmVzdWx0IH0gZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXJyaWVyLFxyXG4gICAgYmF0dGxlc2hpcCxcclxuICAgIGNydWlzZXIsXHJcbiAgICBzdWJtYXJpbmUsXHJcbiAgICBkZXN0cm95ZXJcclxuICB9XHJcbn1cclxuY29uc3QgZ2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBvcHBvbmVudCA9IFBsYXllcigpO1xyXG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgLy8gcmVzZXRcclxuICAgIHBsYXllckJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICAgIGVuZW15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgIGNyZWF0ZUJvYXJkKFwicGxheWVyLWJvYXJkXCIsIHBsYXllckJvYXJkKTtcclxuICAgIGNyZWF0ZUJvYXJkKFwiY29tcHV0ZXItYm9hcmRcIiwgZW5lbXlCb2FyZCk7ICAgIFxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxheWVyTW92ZSA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgcGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgZW5lbXlCb2FyZCk7XHJcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICAgIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcblxyXG4gICAgLy8gbmVlZCB0byBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHN1bmtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGFydEdhbWUsXHJcbiAgICBwbGF5ZXJNb3ZlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lOyIsImNvbnN0IGNyZWF0ZUJvYXJkID0gKGlkLCBib2FyZD1udWxsKSA9PiB7XHJcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbjtcclxuICAgICAgaWYgKGJvYXJkICYmIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgfSBlbHNlIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09IFwiaGl0XCIpIHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRBdHRhY2tlZChyb3csIGNvbHVtbiwgaWQpIHtcclxuICBsZXQgcGlja2VkO1xyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7aWR9IC5jZWxsYCk7XHJcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgaWYgKGNlbGwuZGF0YXNldC5yb3cgPT09IHJvdyAmJiBjZWxsLmRhdGFzZXQuY29sdW1uID09PSBjb2x1bW4pIHtcclxuICAgICAgcGlja2VkID0gY2VsbDtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gcGlja2VkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgY29uc3QgcGlja2VkID0gZmluZEF0dGFja2VkKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gIGlmIChpc0hpdCkge1xyXG4gICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlQm9hcmQgLCBkaXNwbGF5TW92ZVJlc3VsdCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnYW1lIGZyb20gXCIuL2dhbWVcIjtcclxuXHJcbmNvbnN0IG15R2FtZSA9IGdhbWUoKTtcclxuXHJcbm15R2FtZS5zdGFydEdhbWUoKTtcclxuXHJcbm15R2FtZS5wbGF5ZXJNb3ZlKFwiMVwiLFwiMlwiKTsiXSwibmFtZXMiOlsiZ2FtZWJvYXJkIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsImNsZWFyQm9hcmQiLCJzaGlwcyIsInNob3dCb2FyZCIsInBsYWNlU2hpcCIsInNoaXAiLCJzdGFydCIsImVuZCIsInJvd1N0YXJ0Iiwicm93RW5kIiwiY29sdW1uU3RhcnQiLCJjb2x1bW5FbmQiLCJsZW5ndGgiLCJwdXNoIiwiaSIsImFsbFN1bmsiLCJldmVyeSIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJyb3ciLCJjb2x1bW4iLCJib2FyZENlbGwiLCJfdHlwZW9mIiwiaGl0IiwiUGxheWVyIiwiYXR0YWNrIiwicmFuZG9tQXR0YWNrIiwiY2hvb3NlUmFuZG9tQ29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJTaGlwIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJoaXRDb3VudCIsImRpc3BsYXlNb3ZlUmVzdWx0IiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJnYW1lIiwicGxheWVyIiwicGxheWVyQm9hcmQiLCJvcHBvbmVudCIsImVuZW15Qm9hcmQiLCJzdGFydEdhbWUiLCJwbGF5ZXJNb3ZlIiwiaXNIaXQiLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNlbGwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsImZpbmRBdHRhY2tlZCIsInBpY2tlZCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmNhdCIsImZvckVhY2giLCJ0ZXh0Q29udGVudCIsIm15R2FtZSJdLCJzb3VyY2VSb290IjoiIn0=