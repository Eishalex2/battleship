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
  var chooseRandomCoord = function chooseRandomCoord(board) {
    var row = Math.floor(Math.random() * 10);
    var column = Math.floor(Math.random() * 10);
    var boardCell = board.showBoard()[row][column];
    if (boardCell === 'miss' || boardCell === 'hit') {
      chooseRandomCoord();
    }
    return [row, column];
  };
  return {
    attack: attack,
    chooseRandomCoord: chooseRandomCoord
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

  var computerMove = function computerMove() {
    var coords = opponent.chooseRandomCoord(playerBoard);
    opponent.attack(coords[0], coords[1], playerBoard);
    var isHit = playerBoard.showBoard()[coords[0]][coords[1]] === 'hit';
    (0,_visibleBoard__WEBPACK_IMPORTED_MODULE_3__.displayMoveResult)(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
    // also need to check if all ships are sunk
  };

  return {
    startGame: startGame,
    playerMove: playerMove,
    computerMove: computerMove
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
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUMsTUFBTSxFQUFFa0MsRUFBRSxFQUFFSixLQUFLLEVBQUU7RUFDakQsSUFBTWdCLE1BQU0sR0FBR0QsWUFBWSxDQUFDOUMsR0FBRyxFQUFFQyxNQUFNLEVBQUVrQyxFQUFFLENBQUM7RUFFNUMsSUFBSUosS0FBSyxFQUFFO0lBQ1RnQixNQUFNLENBQUNOLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUMzQkssTUFBTSxDQUFDSyxXQUFXLEdBQUcsR0FBRztFQUMxQixDQUFDLE1BQU07SUFDTEwsTUFBTSxDQUFDTixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDNUJLLE1BQU0sQ0FBQ0ssV0FBVyxHQUFHLEdBQUc7RUFDMUI7QUFDRjs7Ozs7OztVQ3RDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEI7QUFFMUIsSUFBTUMsTUFBTSxHQUFHN0IsaURBQUksQ0FBQyxDQUFDO0FBRXJCNkIsTUFBTSxDQUFDeEIsU0FBUyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCBzdGFydCwgZW5kKSA9PiB7XHJcbiAgICBjb25zdCByb3dTdGFydCA9IHN0YXJ0WzBdO1xyXG4gICAgY29uc3Qgcm93RW5kID0gZW5kWzBdO1xyXG4gICAgY29uc3QgY29sdW1uU3RhcnQgPSBzdGFydFsxXTtcclxuICAgIGNvbnN0IGNvbHVtbkVuZCA9IGVuZFsxXTtcclxuICAgIGNvbnN0IHtsZW5ndGh9ID0gc2hpcDtcclxuXHJcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgLy8gaG9yaXpvbnRhbFxyXG4gICAgaWYgKHJvd1N0YXJ0ID09PSByb3dFbmQpIHtcclxuICAgICAgZm9yIChsZXQgaT1jb2x1bW5TdGFydDsgaSA8IGNvbHVtblN0YXJ0K2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYm9hcmRbcm93U3RhcnRdW2ldID0gc2hpcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gdmVydGljYWxcclxuICAgIGVsc2UgaWYgKGNvbHVtblN0YXJ0ID09PSBjb2x1bW5FbmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHJvd1N0YXJ0OyBpIDwgcm93U3RhcnQgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJvYXJkW2ldW2NvbHVtblN0YXJ0XSA9IHNoaXA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2FsbFN1bmssIGNsZWFyQm9hcmQsIHNob3dCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiY29uc3QgUGxheWVyID0gKCkgPT4ge1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuXHJcbiAgY29uc3QgY2hvb3NlUmFuZG9tQ29vcmQgPSAoYm9hcmQpID0+IHtcclxuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl07XHJcblxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gJ21pc3MnIHx8IGJvYXJkQ2VsbCA9PT0gJ2hpdCcpIHtcclxuICAgICAgY2hvb3NlUmFuZG9tQ29vcmQoKTtcclxuICAgIH0gXHJcblxyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2F0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9jb21wb25lbnRzL3BsYXllclwiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXBcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIGRpc3BsYXlNb3ZlUmVzdWx0IH0gZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjYXJyaWVyLFxyXG4gICAgYmF0dGxlc2hpcCxcclxuICAgIGNydWlzZXIsXHJcbiAgICBzdWJtYXJpbmUsXHJcbiAgICBkZXN0cm95ZXJcclxuICB9XHJcbn1cclxuY29uc3QgZ2FtZSA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBvcHBvbmVudCA9IFBsYXllcigpO1xyXG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgLy8gcmVzZXRcclxuICAgIHBsYXllckJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICAgIGVuZW15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgIGNyZWF0ZUJvYXJkKFwicGxheWVyLWJvYXJkXCIsIHBsYXllckJvYXJkKTtcclxuICAgIGNyZWF0ZUJvYXJkKFwiY29tcHV0ZXItYm9hcmRcIiwgZW5lbXlCb2FyZCk7ICAgIFxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxheWVyTW92ZSA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgcGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgZW5lbXlCb2FyZCk7XHJcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICAgIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29vcmRzID0gb3Bwb25lbnQuY2hvb3NlUmFuZG9tQ29vcmQocGxheWVyQm9hcmQpO1xyXG4gICAgb3Bwb25lbnQuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCBwbGF5ZXJCb2FyZCk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHBsYXllckJvYXJkLnNob3dCb2FyZCgpW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gJ2hpdCc7XHJcbiAgICBkaXNwbGF5TW92ZVJlc3VsdChjb29yZHNbMF0udG9TdHJpbmcoKSwgY29vcmRzWzFdLnRvU3RyaW5nKCksICdwbGF5ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICAvLyBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhcnRHYW1lLFxyXG4gICAgcGxheWVyTW92ZSxcclxuICAgIGNvbXB1dGVyTW92ZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJjb25zdCBjcmVhdGVCb2FyZCA9IChpZCwgYm9hcmQ9bnVsbCkgPT4ge1xyXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09IFwibWlzc1wiKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSBcImhpdFwiKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgfVxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQXR0YWNrZWQocm93LCBjb2x1bW4sIGlkKSB7XHJcbiAgbGV0IHBpY2tlZDtcclxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGlmIChjZWxsLmRhdGFzZXQucm93ID09PSByb3cgJiYgY2VsbC5kYXRhc2V0LmNvbHVtbiA9PT0gY29sdW1uKSB7XHJcbiAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHBpY2tlZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sIGlkLCBpc0hpdCkge1xyXG4gIGNvbnN0IHBpY2tlZCA9IGZpbmRBdHRhY2tlZChyb3csIGNvbHVtbiwgaWQpO1xyXG5cclxuICBpZiAoaXNIaXQpIHtcclxuICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdPJztcclxuICB9IGVsc2Uge1xyXG4gICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdYJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUJvYXJkICwgZGlzcGxheU1vdmVSZXN1bHQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG5jb25zdCBteUdhbWUgPSBnYW1lKCk7XHJcblxyXG5teUdhbWUuc3RhcnRHYW1lKCk7Il0sIm5hbWVzIjpbImdhbWVib2FyZCIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJBcnJheSIsIm1hcCIsImZpbGwiLCJjbGVhckJvYXJkIiwic2hpcHMiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlwIiwic3RhcnQiLCJlbmQiLCJyb3dTdGFydCIsInJvd0VuZCIsImNvbHVtblN0YXJ0IiwiY29sdW1uRW5kIiwibGVuZ3RoIiwicHVzaCIsImkiLCJhbGxTdW5rIiwiZXZlcnkiLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sdW1uIiwiYm9hcmRDZWxsIiwiX3R5cGVvZiIsImhpdCIsIlBsYXllciIsImF0dGFjayIsImNob29zZVJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiU2hpcCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJkaXNwbGF5TW92ZVJlc3VsdCIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiZ2FtZSIsInBsYXllciIsInBsYXllckJvYXJkIiwib3Bwb25lbnQiLCJlbmVteUJvYXJkIiwic3RhcnRHYW1lIiwicGxheWVyTW92ZSIsImlzSGl0IiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNlbGwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsImZpbmRBdHRhY2tlZCIsInBpY2tlZCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmNhdCIsImZvckVhY2giLCJ0ZXh0Q29udGVudCIsIm15R2FtZSJdLCJzb3VyY2VSb290IjoiIn0=