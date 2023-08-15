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
  var placeShip = function placeShip(ship, row, col, orientation) {
    if (board[row][col] !== ship) {
      ships.push(ship);
      board[row][col] = ship;
      if (orientation === 'horiz') {
        for (var i = 1; i < ship.length; i++) {
          board[row][col + i] = ship;
        }
      } else {
        for (var _i = 1; _i < ship.length; _i++) {
          board[row + 1][col] = ship;
        }
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
  var placeShips = function placeShips(shipsArray, board) {
    shipsArray.forEach(function (length) {
      board.placeShip(length);
    });
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
    placeShips: placeShips,
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Gameplay; }
/* harmony export */ });
/* harmony import */ var _components_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboard */ "./src/components/gameboard.js");
/* harmony import */ var _components_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/player */ "./src/components/player.js");
/* harmony import */ var _components_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ship */ "./src/components/ship.js");
/* harmony import */ var _visibleBoard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./visibleBoard */ "./src/visibleBoard.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





// create players and gameboards
var Gameplay = /*#__PURE__*/function () {
  function Gameplay() {
    _classCallCheck(this, Gameplay);
  }
  _createClass(Gameplay, null, [{
    key: "playerMove",
    value: function playerMove(row, column) {
      this.player.attack(row, column, this.computerBoard);
      var isHit = this.computerBoard.showBoard()[row][column] === 'hit';
      _visibleBoard__WEBPACK_IMPORTED_MODULE_3__["default"].displayMoveResult(row, column, 'computer-board', isHit);
    }
  }]);
  return Gameplay;
}();
_defineProperty(Gameplay, "player", (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])());
_defineProperty(Gameplay, "playerBoard", (0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])());
_defineProperty(Gameplay, "opponent", (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])());
_defineProperty(Gameplay, "computerBoard", (0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])());

var game = function game() {
  var player = (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var playerBoard = (0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var opponent = (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var enemyBoard = (0,_components_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var startGame = function startGame(ships) {
    // reset
    playerBoard.clearBoard();
    enemyBoard.clearBoard();
    createBoard('place-ships-board', playerBoard);
  };
  var playerMove = function playerMove(row, column) {
    player.attack(row, column, enemyBoard);
    var isHit = enemyBoard.showBoard()[row][column] === 'hit';
    displayMoveResult(row, column, 'computer-board', isHit);
    // need to check if all ships are sunk
  };

  var computerMove = function computerMove() {
    var coords = opponent.chooseRandomCoord(playerBoard);
    opponent.attack(coords[0], coords[1], playerBoard);
    var isHit = playerBoard.showBoard()[coords[0]][coords[1]] === 'hit';
    displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
    // also need to check if all ships are sunk
  };

  return {
    startGame: startGame,
    playerMove: playerMove,
    computerMove: computerMove
  };
};

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Listeners; }
/* harmony export */ });
/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameplay */ "./src/gameplay.js");
/* harmony import */ var _visibleBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visibleBoard */ "./src/visibleBoard.js");
/* harmony import */ var _components_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/player */ "./src/components/player.js");
/* harmony import */ var _components_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ship */ "./src/components/ship.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var availableShips = function availableShips() {
  var carrier = new _components_ship__WEBPACK_IMPORTED_MODULE_3__["default"](5);
  var battleship = new _components_ship__WEBPACK_IMPORTED_MODULE_3__["default"](4);
  var cruiser = new _components_ship__WEBPACK_IMPORTED_MODULE_3__["default"](3);
  var submarine = new _components_ship__WEBPACK_IMPORTED_MODULE_3__["default"](3);
  var destroyer = new _components_ship__WEBPACK_IMPORTED_MODULE_3__["default"](2);
  return [carrier, battleship, cruiser, submarine, destroyer];
};
var Listeners = /*#__PURE__*/function () {
  function Listeners() {
    _classCallCheck(this, Listeners);
  }
  _createClass(Listeners, null, [{
    key: "eventListeners",
    value: function eventListeners() {
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].createBoard('place-ships-board');
      this.addPlaceShipListeners();
    }
  }, {
    key: "addPlaceShipListeners",
    value: function addPlaceShipListeners() {
      var _this = this;
      var cells = document.querySelectorAll('#place-ships-board .cell');
      cells.forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          var row = e.target.dataset.row;
          var column = e.target.dataset.column;
          var currentShip = _this.ships[_this.shipsIndex];
          if (_this.shipIndex < 5) {
            _this.placeShip(row, column);
          }
        });
      });
    }
  }, {
    key: "placeShip",
    value: function placeShip(row, column) {
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].placeShip(this.ships[this.shipIndex].length, row, column, this.orientation);
      this.shipsPlaced.push(this.ships[this.shipIndex]);
      this.shipIndex += 1;
    }
  }]);
  return Listeners;
}(); // function listeners() {
//   const orientation = 'horiz';
//   const availableShips = () => {
//     const carrier = new Ship(5);
//     const battleship = new Ship(4);
//     const cruiser = new Ship(3);
//     const submarine = new Ship(3);
//     const destroyer = new Ship(2);
//     return [carrier, battleship, cruiser, submarine, destroyer]
//   }
//   let shipIndex = 0;
//   const shipsPlaced = [];
//   function addListeners() {
//     createBoard('#place-ships-board');
//     function placeShip(row, column) {
//       placeShipVisible(availableShips()[shipIndex].length, row, column, orientation);
//       shipsPlaced.push(availableShips()[shipIndex]);
//       shipIndex += 1;
//     }
//     function addPlaceShipListeners() {
//       document.querySelectorAll('#place-ships-board .cell').forEach((cell) => {
//         cell.addEventListener('click', (e) => {
//           const {row} = e.target.dataset;
//           const {column} = e.target.dataset;
//           const currentShip = availableShips()[shipIndex];
//           if (shipIndex < 5) {
//             placeShip(row, column);
//           }
//         });
//       });
//     }
//     return {addPlaceShipListeners}
//   }
//   return {addListeners}
// }
// function addListeners() {
// // start game
//   const myGame = game();
//   myGame.startGame();
// // attack event listeners
//   document.querySelectorAll('#computer-board .cell').forEach((cell) => {
//     cell.addEventListener('click', (e) => {
//       if (e.target.textContent === '') {
//         myGame.playerMove(e.target.dataset.row, e.target.dataset.column);
//       }
//     });
//   });
// }
// function controller() {
//   const orientation = 'horiz';
//   const shipLengths = [5, 4, 3, 3, 2];
//   const shipsPlaced = [];
// }
_defineProperty(Listeners, "orientation", 'horiz');
_defineProperty(Listeners, "shipIndex", 0);
_defineProperty(Listeners, "shipsPlaced", []);
_defineProperty(Listeners, "ships", availableShips());


/***/ }),

/***/ "./src/visibleBoard.js":
/*!*****************************!*\
  !*** ./src/visibleBoard.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UI; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);
  }
  _createClass(UI, null, [{
    key: "createBoard",
    value: function createBoard(id) {
      var board = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      for (var row = 0; row < 10; row++) {
        for (var column = 0; column < 10; column++) {
          var cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.column = column;
          if (board && board.showBoard()[row][column] === 'miss') {
            cell.classList.add('miss');
          } else if (board && board.showBoard()[row][column] === 'hit') {
            cell.classList.add('hit');
          }
          document.getElementById(id).appendChild(cell);
        }
      }
    }
  }, {
    key: "createPlayerBoard",
    value: function createPlayerBoard(board) {
      this.createBoard('player-board', board);
    }
  }, {
    key: "createOpponentBoard",
    value: function createOpponentBoard(board) {
      this.createBoard('computer-board', board);
    }
  }, {
    key: "findCell",
    value: function findCell(row, column, id) {
      var picked;
      var cells = document.querySelectorAll("#".concat(id, " .cell"));
      cells.forEach(function (cell) {
        if (cell.dataset.row === row && cell.dataset.column === column) {
          picked = cell;
          console.log(picked);
        }
      });
      return picked;
    }
  }, {
    key: "displayMoveResult",
    value: function displayMoveResult(row, column, id, isHit) {
      var picked = this.findCell(row, column, id);
      if (isHit) {
        picked.classList.add('hit');
        picked.textContent = 'O';
      } else {
        picked.classList.add('miss');
        picked.textContent = 'X';
      }
    }
  }, {
    key: "placeShip",
    value: function placeShip(length, row, column) {
      var orientation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'horiz';
      var choice;
      for (var i = 0; i < length; i++) {
        if (orientation === 'horiz') {
          choice = this.findCell(row, (Number(column) + i).toString(), 'place-ships-board');
        } else {
          choice = this.findCell((Number(row) + i).toString(), column, 'place-ships-board');
        }
        choice.classList.add('ship');
      }
    }
  }]);
  return UI;
}();


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

_listeners__WEBPACK_IMPORTED_MODULE_0__["default"].eventListeners();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQUE1QyxFQUFBO0FBQUE7Ozs7Ozs7VUM1REg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDd0Isa0RBQVMsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdICE9PSBzaGlwKSB7XHJcbiAgICAgIHNoaXBzLnB1c2goc2hpcCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IHNoaXA7XHJcblxyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3JvdyArIDFdW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcclxuICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmRbcm93XVtjb2x1bW5dO1xyXG4gICAgLy8gYWxyZWFkeSBndWVzc2VkXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSBcIm1pc3NcIiB8fCBib2FyZENlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgcmV0dXJuIFwiQWxyZWFkeSBndWVzc2VkLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaXAgaGFzIGJlZW4gaGl0XHJcbiAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwiaGl0XCI7XHJcbiAgICAgIGlmIChhbGxTdW5rKCkpIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNoaXAgaGFzIG5vdCBiZWVuIGhpdFxyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1pc3NcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7YWxsU3VuaywgY2xlYXJCb2FyZCwgc2hvd0JvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDsiLCJjb25zdCBQbGF5ZXIgPSAoKSA9PiB7XHJcblxyXG4gIGNvbnN0IGF0dGFjayA9IChyb3csIGNvbHVtbiwgYm9hcmQpID0+IGJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzID0gKHNoaXBzQXJyYXksIGJvYXJkKSA9PiB7XHJcbiAgICBzaGlwc0FycmF5LmZvckVhY2goKGxlbmd0aCkgPT4ge1xyXG4gICAgICBib2FyZC5wbGFjZVNoaXAobGVuZ3RoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCBjaG9vc2VSYW5kb21Db29yZCA9IChib2FyZCkgPT4ge1xyXG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXTtcclxuXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSAnbWlzcycgfHwgYm9hcmRDZWxsID09PSAnaGl0Jykge1xyXG4gICAgICBjaG9vc2VSYW5kb21Db29yZCgpO1xyXG4gICAgfSBcclxuXHJcbiAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7cGxhY2VTaGlwcywgYXR0YWNrLCBjaG9vc2VSYW5kb21Db29yZH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgfVxyXG4gIFxyXG4gIGhpdENvdW50ID0gMDtcclxuXHJcbiAgaGl0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5oaXRDb3VudCArPSAxO1xyXG4gIH1cclxuICBcclxuICBpc1N1bmsgPSAoKSA9PiB0aGlzLmhpdENvdW50ID49IHRoaXMubGVuZ3RoXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2NvbXBvbmVudHMvc2hpcFwiO1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXBsYXkge1xyXG4gIHN0YXRpYyBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIHBsYXllckJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIHN0YXRpYyBvcHBvbmVudCA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgdGhpcy5wbGF5ZXIuYXR0YWNrKHJvdywgY29sdW1uLCB0aGlzLmNvbXB1dGVyQm9hcmQpO1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLmNvbXB1dGVyQm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xyXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IG9wcG9uZW50ID0gUGxheWVyKCk7XHJcbiAgY29uc3QgZW5lbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBzdGFydEdhbWUgPSAoc2hpcHMpID0+IHtcclxuICAgIC8vIHJlc2V0XHJcbiAgICBwbGF5ZXJCb2FyZC5jbGVhckJvYXJkKCk7XHJcbiAgICBlbmVteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICAgIGNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcsIHBsYXllckJvYXJkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYXllck1vdmUgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIHBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIGVuZW15Qm9hcmQpO1xyXG4gICAgY29uc3QgaXNIaXQgPSBlbmVteUJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gJ2hpdCc7XHJcbiAgICBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgJ2NvbXB1dGVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgLy8gbmVlZCB0byBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHN1bmtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXB1dGVyTW92ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvb3JkcyA9IG9wcG9uZW50LmNob29zZVJhbmRvbUNvb3JkKHBsYXllckJvYXJkKTtcclxuICAgIG9wcG9uZW50LmF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgcGxheWVyQm9hcmQpO1xyXG4gICAgY29uc3QgaXNIaXQgPSBwbGF5ZXJCb2FyZC5zaG93Qm9hcmQoKVtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09ICdoaXQnO1xyXG4gICAgZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgLy8gYWxzbyBuZWVkIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXJ0R2FtZSxcclxuICAgIHBsYXllck1vdmUsXHJcbiAgICBjb21wdXRlck1vdmVcclxuICB9XHJcbn0iLCJpbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi9nYW1lcGxheSdcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2NvbXBvbmVudHMvc2hpcFwiO1xyXG5cclxuXHJcbmNvbnN0IGF2YWlsYWJsZVNoaXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG5cclxuICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXJzIHtcclxuICBzdGF0aWMgb3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG5cclxuICBzdGF0aWMgc2hpcEluZGV4ID0gMDtcclxuXHJcbiAgc3RhdGljIHNoaXBzUGxhY2VkID0gW107XHJcblxyXG4gIHN0YXRpYyBzaGlwcyA9IGF2YWlsYWJsZVNoaXBzKCk7XHJcblxyXG4gIHN0YXRpYyBldmVudExpc3RlbmVycygpIHtcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG5cclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHRoaXMuc2hpcHNbdGhpcy5zaGlwc0luZGV4XTtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1KSB7XHJcbiAgICAgICAgICB0aGlzLnBsYWNlU2hpcChyb3csIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgVUkucGxhY2VTaGlwKHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4sIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgdGhpcy5zaGlwc1BsYWNlZC5wdXNoKHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdKTtcclxuICAgIHRoaXMuc2hpcEluZGV4ICs9IDE7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gZnVuY3Rpb24gbGlzdGVuZXJzKCkge1xyXG4vLyAgIGNvbnN0IG9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuXHJcbi8vICAgY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbi8vICAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbi8vICAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbi8vICAgICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbi8vICAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuLy8gICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG4gIFxyXG4vLyAgICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxuLy8gICB9XHJcblxyXG4vLyAgIGxldCBzaGlwSW5kZXggPSAwO1xyXG5cclxuLy8gICBjb25zdCBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuLy8gICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XHJcbi8vICAgICBjcmVhdGVCb2FyZCgnI3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4vLyAgICAgZnVuY3Rpb24gcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbi8vICAgICAgIHBsYWNlU2hpcFZpc2libGUoYXZhaWxhYmxlU2hpcHMoKVtzaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcclxuLy8gICAgICAgc2hpcHNQbGFjZWQucHVzaChhdmFpbGFibGVTaGlwcygpW3NoaXBJbmRleF0pO1xyXG4vLyAgICAgICBzaGlwSW5kZXggKz0gMTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBmdW5jdGlvbiBhZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKSB7XHJcbi8vICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuLy8gICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuLy8gICAgICAgICAgIGNvbnN0IHtyb3d9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuLy8gICAgICAgICAgIGNvbnN0IHtjb2x1bW59ID0gZS50YXJnZXQuZGF0YXNldDtcclxuLy8gICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gYXZhaWxhYmxlU2hpcHMoKVtzaGlwSW5kZXhdO1xyXG4vLyAgICAgICAgICAgaWYgKHNoaXBJbmRleCA8IDUpIHtcclxuLy8gICAgICAgICAgICAgcGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgfSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIHthZGRQbGFjZVNoaXBMaXN0ZW5lcnN9XHJcbi8vICAgfVxyXG4vLyAgIHJldHVybiB7YWRkTGlzdGVuZXJzfVxyXG4vLyB9XHJcblxyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcclxuLy8gLy8gc3RhcnQgZ2FtZVxyXG4vLyAgIGNvbnN0IG15R2FtZSA9IGdhbWUoKTtcclxuLy8gICBteUdhbWUuc3RhcnRHYW1lKCk7XHJcblxyXG4vLyAvLyBhdHRhY2sgZXZlbnQgbGlzdGVuZXJzXHJcbi8vICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4vLyAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbi8vICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuLy8gICAgICAgICBteUdhbWUucGxheWVyTW92ZShlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gICB9KTtcclxuLy8gfVxyXG5cclxuLy8gZnVuY3Rpb24gY29udHJvbGxlcigpIHtcclxuLy8gICBjb25zdCBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcbi8vICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcbi8vICAgY29uc3Qgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcblxyXG4vLyB9IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjcmVhdGVCb2FyZChpZCwgYm9hcmQgPSBudWxsKSB7XHJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uICA9IGNvbHVtbjtcclxuICAgICAgICBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnbWlzcycpIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGlja2VkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGlja2VkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCBpZCwgaXNIaXQpIHtcclxuICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMuZmluZENlbGwocm93LCBjb2x1bW4sIGlkKTtcclxuXHJcbiAgICBpZiAoaXNIaXQpIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnTyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uID0gJ2hvcml6Jykge1xyXG4gICAgbGV0IGNob2ljZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbChyb3csIChOdW1iZXIoY29sdW1uKSArIGkpLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwoKE51bWJlcihyb3cpICsgaSkudG9TdHJpbmcoKSwgY29sdW1uLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfVxyXG4gICAgICBjaG9pY2UuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgfVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuTGlzdGVuZXJzLmV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbImdhbWVib2FyZCIsImNyZWF0ZUJvYXJkIiwiYm9hcmQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJBcnJheSIsIm1hcCIsImZpbGwiLCJjbGVhckJvYXJkIiwic2hpcHMiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlwIiwicm93IiwiY29sIiwib3JpZW50YXRpb24iLCJwdXNoIiwiaSIsImxlbmd0aCIsImFsbFN1bmsiLCJldmVyeSIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJjb2x1bW4iLCJib2FyZENlbGwiLCJfdHlwZW9mIiwiaGl0IiwiUGxheWVyIiwiYXR0YWNrIiwicGxhY2VTaGlwcyIsInNoaXBzQXJyYXkiLCJmb3JFYWNoIiwiY2hvb3NlUmFuZG9tQ29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJTaGlwIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJoaXRDb3VudCIsIlVJIiwiR2FtZXBsYXkiLCJrZXkiLCJ2YWx1ZSIsInBsYXllck1vdmUiLCJwbGF5ZXIiLCJjb21wdXRlckJvYXJkIiwiaXNIaXQiLCJkaXNwbGF5TW92ZVJlc3VsdCIsImRlZmF1bHQiLCJnYW1lIiwicGxheWVyQm9hcmQiLCJvcHBvbmVudCIsImVuZW15Qm9hcmQiLCJzdGFydEdhbWUiLCJjb21wdXRlck1vdmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiTGlzdGVuZXJzIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRQbGFjZVNoaXBMaXN0ZW5lcnMiLCJjZWxscyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJjdXJyZW50U2hpcCIsInNoaXBzSW5kZXgiLCJzaGlwSW5kZXgiLCJzaGlwc1BsYWNlZCIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVQbGF5ZXJCb2FyZCIsImNyZWF0ZU9wcG9uZW50Qm9hcmQiLCJmaW5kQ2VsbCIsInBpY2tlZCIsImNvbmNhdCIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0Q29udGVudCIsImNob2ljZSIsIk51bWJlciJdLCJzb3VyY2VSb290IjoiIn0=