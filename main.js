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
          if (_this.shipIndex < 5 && _this.isLegalShipPlacement(_this.ships[_this.shipIndex].length, row, column)) {
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
  }, {
    key: "isLegalShipPlacement",
    value: function isLegalShipPlacement(length, row, column) {
      // check if any of the cells has a ship in it

      // check if ship goes out of bounds
      if (this.orientation === 'horiz') {
        // check if ship goes out of bounds
        if (Number(column) + length - 1 > 9) return false;

        // check if any of the target cells already has a ship in it
        // false = no ship
        var flag = false;
        for (var i = Number(column); i < Number(column) + length; i++) {
          if (!flag) {
            flag = _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row, i);
          }
        }
        return !flag;
      }

      // return (Number(column) + length - 1) < 10;
      // if (this.orientation === 'vert') return (Number(column) + length - 1) < 10;

      // check if any of the cells has a ship already in it
    }
  }]);
  return Listeners;
}();
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
  }, {
    key: "containsShip",
    value: function containsShip(row, column) {
      var cell = this.findCell(row.toString(), column.toString(), 'place-ships-board');
      return cell.classList.contains('ship');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFcEN3QixrREFBUyxDQUFDQyxjQUFjLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZXBsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pID0+IHtcclxuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gIT09IHNoaXApIHtcclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gc2hpcDtcclxuXHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93ICsgMV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHthbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4gYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoc2hpcHNBcnJheSwgYm9hcmQpID0+IHtcclxuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChsZW5ndGgpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGNob29zZVJhbmRvbUNvb3JkID0gKGJvYXJkKSA9PiB7XHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dO1xyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09ICdtaXNzJyB8fCBib2FyZENlbGwgPT09ICdoaXQnKSB7XHJcbiAgICAgIGNob29zZVJhbmRvbUNvb3JkKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtwbGFjZVNoaXBzLCBhdHRhY2ssIGNob29zZVJhbmRvbUNvb3JkfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuXHJcbi8vIGNyZWF0ZSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSB7XHJcbiAgc3RhdGljIHBsYXllciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyQm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgc3RhdGljIG9wcG9uZW50ID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlckJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIHN0YXRpYyBwbGF5ZXJNb3ZlKHJvdywgY29sdW1uKSB7XHJcbiAgICB0aGlzLnBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIHRoaXMuY29tcHV0ZXJCb2FyZCk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMuY29tcHV0ZXJCb2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09ICdoaXQnO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sICdjb21wdXRlci1ib2FyZCcsIGlzSGl0KTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCk7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgb3Bwb25lbnQgPSBQbGF5ZXIoKTtcclxuICBjb25zdCBlbmVteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0R2FtZSA9IChzaGlwcykgPT4ge1xyXG4gICAgLy8gcmVzZXRcclxuICAgIHBsYXllckJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICAgIGVuZW15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG4gICAgY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJywgcGxheWVyQm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxheWVyTW92ZSA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgcGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgZW5lbXlCb2FyZCk7XHJcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICAgIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29vcmRzID0gb3Bwb25lbnQuY2hvb3NlUmFuZG9tQ29vcmQocGxheWVyQm9hcmQpO1xyXG4gICAgb3Bwb25lbnQuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCBwbGF5ZXJCb2FyZCk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHBsYXllckJvYXJkLnNob3dCb2FyZCgpW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gJ2hpdCc7XHJcbiAgICBkaXNwbGF5TW92ZVJlc3VsdChjb29yZHNbMF0udG9TdHJpbmcoKSwgY29vcmRzWzFdLnRvU3RyaW5nKCksICdwbGF5ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICAvLyBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhcnRHYW1lLFxyXG4gICAgcGxheWVyTW92ZSxcclxuICAgIGNvbXB1dGVyTW92ZVxyXG4gIH1cclxufSIsImltcG9ydCBHYW1lcGxheSBmcm9tICcuL2dhbWVwbGF5J1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuXHJcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFkZFBsYWNlU2hpcExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BsYWNlLXNoaXBzLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgcm93IH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IHsgY29sdW1uIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gdGhpcy5zaGlwc1t0aGlzLnNoaXBzSW5kZXhdO1xyXG4gICAgICAgIGlmICh0aGlzLnNoaXBJbmRleCA8IDUgJiYgdGhpcy5pc0xlZ2FsU2hpcFBsYWNlbWVudCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uKSkge1xyXG4gICAgICAgICAgdGhpcy5wbGFjZVNoaXAocm93LCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIFVJLnBsYWNlU2hpcCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgIHRoaXMuc2hpcHNQbGFjZWQucHVzaCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XSk7XHJcbiAgICB0aGlzLnNoaXBJbmRleCArPSAxO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzTGVnYWxTaGlwUGxhY2VtZW50KGxlbmd0aCwgcm93LCBjb2x1bW4pIHtcclxuICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgY2VsbHMgaGFzIGEgc2hpcCBpbiBpdFxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICBpZiAoTnVtYmVyKGNvbHVtbikgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YXJnZXQgY2VsbHMgYWxyZWFkeSBoYXMgYSBzaGlwIGluIGl0XHJcbiAgICAgIC8vIGZhbHNlID0gbm8gc2hpcFxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gTnVtYmVyKGNvbHVtbik7IGkgPCBOdW1iZXIoY29sdW1uKSArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKHJvdywgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyByZXR1cm4gKE51bWJlcihjb2x1bW4pICsgbGVuZ3RoIC0gMSkgPCAxMDtcclxuICAgIC8vIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydCcpIHJldHVybiAoTnVtYmVyKGNvbHVtbikgKyBsZW5ndGggLSAxKSA8IDEwO1xyXG5cclxuICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgY2VsbHMgaGFzIGEgc2hpcCBhbHJlYWR5IGluIGl0XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjcmVhdGVCb2FyZChpZCwgYm9hcmQgPSBudWxsKSB7XHJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uICA9IGNvbHVtbjtcclxuICAgICAgICBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnbWlzcycpIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBpY2tlZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgICBjb25zdCBwaWNrZWQgPSB0aGlzLmZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gICAgaWYgKGlzSGl0KSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbiA9ICdob3JpeicpIHtcclxuICAgIGxldCBjaG9pY2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwocm93LCAoTnVtYmVyKGNvbHVtbikgKyBpKS50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKChOdW1iZXIocm93KSArIGkpLnRvU3RyaW5nKCksIGNvbHVtbiwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH1cclxuICAgICAgY2hvaWNlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb250YWluc1NoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmZpbmRDZWxsKHJvdy50b1N0cmluZygpLCBjb2x1bW4udG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICByZXR1cm4gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTGlzdGVuZXJzIGZyb20gJy4vbGlzdGVuZXJzJztcclxuXHJcbkxpc3RlbmVycy5ldmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6WyJnYW1lYm9hcmQiLCJjcmVhdGVCb2FyZCIsImJvYXJkIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiQXJyYXkiLCJtYXAiLCJmaWxsIiwiY2xlYXJCb2FyZCIsInNoaXBzIiwic2hvd0JvYXJkIiwicGxhY2VTaGlwIiwic2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwicHVzaCIsImkiLCJsZW5ndGgiLCJhbGxTdW5rIiwiZXZlcnkiLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwiY29sdW1uIiwiYm9hcmRDZWxsIiwiX3R5cGVvZiIsImhpdCIsIlBsYXllciIsImF0dGFjayIsInBsYWNlU2hpcHMiLCJzaGlwc0FycmF5IiwiZm9yRWFjaCIsImNob29zZVJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiU2hpcCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJVSSIsIkdhbWVwbGF5Iiwia2V5IiwidmFsdWUiLCJwbGF5ZXJNb3ZlIiwicGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsImlzSGl0IiwiZGlzcGxheU1vdmVSZXN1bHQiLCJkZWZhdWx0IiwiZ2FtZSIsInBsYXllckJvYXJkIiwib3Bwb25lbnQiLCJlbmVteUJvYXJkIiwic3RhcnRHYW1lIiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJhdmFpbGFibGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsIkxpc3RlbmVycyIsImV2ZW50TGlzdGVuZXJzIiwiYWRkUGxhY2VTaGlwTGlzdGVuZXJzIiwiY2VsbHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiY3VycmVudFNoaXAiLCJzaGlwc0luZGV4Iiwic2hpcEluZGV4IiwiaXNMZWdhbFNoaXBQbGFjZW1lbnQiLCJzaGlwc1BsYWNlZCIsIk51bWJlciIsImZsYWciLCJjb250YWluc1NoaXAiLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwiY3JlYXRlUGxheWVyQm9hcmQiLCJjcmVhdGVPcHBvbmVudEJvYXJkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJ0ZXh0Q29udGVudCIsImNob2ljZSIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==