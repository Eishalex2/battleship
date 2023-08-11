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

/***/ "./src/gameplay.js":
/*!*************************!*\
  !*** ./src/gameplay.js ***!
  \*************************/
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

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay */ "./src/gameplay.js");

function addListeners() {
  // start game
  var myGame = (0,_gameplay__WEBPACK_IMPORTED_MODULE_0__["default"])();
  myGame.startGame();
  document.querySelectorAll('#computer-board .cell').forEach(function (cell) {
    cell.addEventListener('click', function (e) {
      if (e.target.textContent === '') {
        myGame.playerMove(e.target.dataset.row, e.target.dataset.column);
      }
    });
  });
  // attack event listeners
}

/* harmony default export */ __webpack_exports__["default"] = (addListeners);

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
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");

(0,_listeners__WEBPACK_IMPORTED_MODULE_0__["default"])();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnVDO0FBRXZDVCxzREFBWSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgY29uc3Qgcm93U3RhcnQgPSBzdGFydFswXTtcclxuICAgIGNvbnN0IHJvd0VuZCA9IGVuZFswXTtcclxuICAgIGNvbnN0IGNvbHVtblN0YXJ0ID0gc3RhcnRbMV07XHJcbiAgICBjb25zdCBjb2x1bW5FbmQgPSBlbmRbMV07XHJcbiAgICBjb25zdCB7bGVuZ3RofSA9IHNoaXA7XHJcblxyXG4gICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgIC8vIGhvcml6b250YWxcclxuICAgIGlmIChyb3dTdGFydCA9PT0gcm93RW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGk9Y29sdW1uU3RhcnQ7IGkgPCBjb2x1bW5TdGFydCtsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJvYXJkW3Jvd1N0YXJ0XVtpXSA9IHNoaXA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHZlcnRpY2FsXHJcbiAgICBlbHNlIGlmIChjb2x1bW5TdGFydCA9PT0gY29sdW1uRW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSByb3dTdGFydDsgaSA8IHJvd1N0YXJ0ICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBib2FyZFtpXVtjb2x1bW5TdGFydF0gPSBzaGlwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHthbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4gYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcblxyXG4gIGNvbnN0IGNob29zZVJhbmRvbUNvb3JkID0gKGJvYXJkKSA9PiB7XHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dO1xyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09ICdtaXNzJyB8fCBib2FyZENlbGwgPT09ICdoaXQnKSB7XHJcbiAgICAgIGNob29zZVJhbmRvbUNvb3JkKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHthdHRhY2ssIGNob29zZVJhbmRvbUNvb3JkfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUJvYXJkLCBkaXNwbGF5TW92ZVJlc3VsdCB9IGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmNvbnN0IGF2YWlsYWJsZVNoaXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2FycmllcixcclxuICAgIGJhdHRsZXNoaXAsXHJcbiAgICBjcnVpc2VyLFxyXG4gICAgc3VibWFyaW5lLFxyXG4gICAgZGVzdHJveWVyXHJcbiAgfVxyXG59XHJcbmNvbnN0IGdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCk7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgb3Bwb25lbnQgPSBQbGF5ZXIoKTtcclxuICBjb25zdCBlbmVteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgIC8vIHJlc2V0XHJcbiAgICBwbGF5ZXJCb2FyZC5jbGVhckJvYXJkKCk7XHJcbiAgICBlbmVteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuXHJcbiAgICBjcmVhdGVCb2FyZChcInBsYXllci1ib2FyZFwiLCBwbGF5ZXJCb2FyZCk7XHJcbiAgICBjcmVhdGVCb2FyZChcImNvbXB1dGVyLWJvYXJkXCIsIGVuZW15Qm9hcmQpOyAgICBcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYXllck1vdmUgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIHBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIGVuZW15Qm9hcmQpO1xyXG4gICAgY29uc3QgaXNIaXQgPSBlbmVteUJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gJ2hpdCc7XHJcbiAgICBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgJ2NvbXB1dGVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgLy8gbmVlZCB0byBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHN1bmtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXB1dGVyTW92ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvb3JkcyA9IG9wcG9uZW50LmNob29zZVJhbmRvbUNvb3JkKHBsYXllckJvYXJkKTtcclxuICAgIG9wcG9uZW50LmF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgcGxheWVyQm9hcmQpO1xyXG4gICAgY29uc3QgaXNIaXQgPSBwbGF5ZXJCb2FyZC5zaG93Qm9hcmQoKVtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09ICdoaXQnO1xyXG4gICAgZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgLy8gYWxzbyBuZWVkIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXJ0R2FtZSxcclxuICAgIHBsYXllck1vdmUsXHJcbiAgICBjb21wdXRlck1vdmVcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IGdhbWUgZnJvbSBcIi4vZ2FtZXBsYXlcIjtcclxuXHJcbmZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcclxuICAvLyBzdGFydCBnYW1lXHJcbiAgICBjb25zdCBteUdhbWUgPSBnYW1lKCk7XHJcbiAgICBteUdhbWUuc3RhcnRHYW1lKCk7XHJcblxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSAnJykge1xyXG4gICAgICAgICAgbXlHYW1lLnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgLy8gYXR0YWNrIGV2ZW50IGxpc3RlbmVyc1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWRkTGlzdGVuZXJzOyIsImNvbnN0IGNyZWF0ZUJvYXJkID0gKGlkLCBib2FyZD1udWxsKSA9PiB7XHJcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbjtcclxuICAgICAgaWYgKGJvYXJkICYmIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgfSBlbHNlIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09IFwiaGl0XCIpIHtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRBdHRhY2tlZChyb3csIGNvbHVtbiwgaWQpIHtcclxuICBsZXQgcGlja2VkO1xyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7aWR9IC5jZWxsYCk7XHJcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgaWYgKGNlbGwuZGF0YXNldC5yb3cgPT09IHJvdyAmJiBjZWxsLmRhdGFzZXQuY29sdW1uID09PSBjb2x1bW4pIHtcclxuICAgICAgcGlja2VkID0gY2VsbDtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gcGlja2VkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgY29uc3QgcGlja2VkID0gZmluZEF0dGFja2VkKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gIGlmIChpc0hpdCkge1xyXG4gICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlQm9hcmQgLCBkaXNwbGF5TW92ZVJlc3VsdCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBhZGRMaXN0ZW5lcnMgZnJvbSBcIi4vbGlzdGVuZXJzXCI7XHJcblxyXG5hZGRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOlsiZ2FtZWJvYXJkIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsImNsZWFyQm9hcmQiLCJzaGlwcyIsInNob3dCb2FyZCIsInBsYWNlU2hpcCIsInNoaXAiLCJzdGFydCIsImVuZCIsInJvd1N0YXJ0Iiwicm93RW5kIiwiY29sdW1uU3RhcnQiLCJjb2x1bW5FbmQiLCJsZW5ndGgiLCJwdXNoIiwiaSIsImFsbFN1bmsiLCJldmVyeSIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJyb3ciLCJjb2x1bW4iLCJib2FyZENlbGwiLCJfdHlwZW9mIiwiaGl0IiwiUGxheWVyIiwiYXR0YWNrIiwiY2hvb3NlUmFuZG9tQ29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJTaGlwIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJoaXRDb3VudCIsImRpc3BsYXlNb3ZlUmVzdWx0IiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJnYW1lIiwicGxheWVyIiwicGxheWVyQm9hcmQiLCJvcHBvbmVudCIsImVuZW15Qm9hcmQiLCJzdGFydEdhbWUiLCJwbGF5ZXJNb3ZlIiwiaXNIaXQiLCJjb21wdXRlck1vdmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsImFkZExpc3RlbmVycyIsIm15R2FtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJjZWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJ0ZXh0Q29udGVudCIsImRhdGFzZXQiLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwiZmluZEF0dGFja2VkIiwicGlja2VkIiwiY2VsbHMiLCJjb25jYXQiXSwic291cmNlUm9vdCI6IiJ9