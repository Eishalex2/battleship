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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/components/gameboard.js");

var Player = function Player() {
  var myBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var attack = function attack(row, column, board) {
    return board.receiveAttack(row, column);
  };
  var placeShips = function placeShips(shipsPlacedArray) {
    shipsPlacedArray.forEach(function (object) {
      myBoard.placeShip(object.ship, object.row, object.column, object.orientation);
    });
  };
  var getMyBoard = function getMyBoard() {
    return myBoard;
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
  var clearMyBoard = function clearMyBoard() {
    myBoard.clearBoard();
  };
  return {
    clearMyBoard: clearMyBoard,
    getMyBoard: getMyBoard,
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
/* harmony import */ var _visibleBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visibleBoard */ "./src/visibleBoard.js");
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
      // this is no longer going to work
      this.player.attack(row, column, this.computerBoard);
      var isHit = this.computerBoard.showBoard()[row][column] === 'hit';
      _visibleBoard__WEBPACK_IMPORTED_MODULE_2__["default"].displayMoveResult(row, column, 'computer-board', isHit);
    }
  }, {
    key: "startGame",
    value: function startGame(shipsArray) {
      // clear the boards
      this.computer.clearMyBoard();
      this.player.clearMyBoard();

      // have the player place their ships
      this.player.placeShips(shipsArray);

      // enemy places their ships

      // show the boards
      _visibleBoard__WEBPACK_IMPORTED_MODULE_2__["default"].createPlayerBoard(this.player.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_2__["default"].createOpponentBoard(this.computerBoard);

      // take turns and play the game
    }
  }]);
  return Gameplay;
}(); // const game = () => {
//   const player = Player();
//   const playerBoard = gameboard();
//   const opponent = Player();
//   const enemyBoard = gameboard();
//   const startGame = (ships) => {
//     // reset
//     playerBoard.clearBoard();
//     enemyBoard.clearBoard();
//     createBoard('place-ships-board', playerBoard);
//   }
//   const playerMove = (row, column) => {
//     player.attack(row, column, enemyBoard);
//     const isHit = enemyBoard.showBoard()[row][column] === 'hit';
//     displayMoveResult(row, column, 'computer-board', isHit);
//     // need to check if all ships are sunk
//   }
//   const computerMove = () => {
//     const coords = opponent.chooseRandomCoord(playerBoard);
//     opponent.attack(coords[0], coords[1], playerBoard);
//     const isHit = playerBoard.showBoard()[coords[0]][coords[1]] === 'hit';
//     displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
//     // also need to check if all ships are sunk
//   }
//   return {
//     startGame,
//     playerMove,
//     computerMove
//   }
// }
_defineProperty(Gameplay, "player", (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])());
_defineProperty(Gameplay, "computer", (0,_components_player__WEBPACK_IMPORTED_MODULE_1__["default"])());


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
/* harmony import */ var _components_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ship */ "./src/components/ship.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var rotateBtn = document.getElementById('rotate');
var startBtn = document.getElementById('start');
var enemyCells = document.querySelectorAll('#computer-board .cell');
var placeShipsContainer = document.getElementById('place-ships-container');
var mainBoardsContainer = document.getElementById('board-container');
var availableShips = function availableShips() {
  var carrier = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](5);
  var battleship = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](4);
  var cruiser = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](3);
  var submarine = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](3);
  var destroyer = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"](2);
  return [carrier, battleship, cruiser, submarine, destroyer];
};
var Listeners = /*#__PURE__*/function () {
  function Listeners() {
    _classCallCheck(this, Listeners);
  }
  _createClass(Listeners, null, [{
    key: "eventListeners",
    value: function eventListeners() {
      var _this = this;
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].createBoard('place-ships-board');
      rotateBtn.addEventListener('click', function () {
        _this.rotateShip();
      });
      startBtn.addEventListener('click', function () {
        _this.startGame();
      });
      this.addPlaceShipListeners();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      console.log(this.shipsPlaced);
      _gameplay__WEBPACK_IMPORTED_MODULE_0__["default"].startGame(this.shipsPlaced);
      this.reset();
      this.addAttackListeners();
      placeShipsContainer.classList.add('hidden');
      mainBoardsContainer.classList.remove('hidden');
      // hide the place ships board
      // show the main boards
    }
  }, {
    key: "addPlaceShipListeners",
    value: function addPlaceShipListeners() {
      var _this2 = this;
      var cells = document.querySelectorAll('#place-ships-board .cell');
      cells.forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          var row = e.target.dataset.row;
          var column = e.target.dataset.column;
          if (_this2.shipIndex < 5 && _this2.isLegalShipPlacement(_this2.ships[_this2.shipIndex].length, row, column)) {
            _this2.placeShip(row, column);
          }
        });
      });
    }
  }, {
    key: "addAttackListeners",
    value: function addAttackListeners() {
      enemyCells.forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          if (e.target.textContent === '') {
            _gameplay__WEBPACK_IMPORTED_MODULE_0__["default"].playerMove(e.target.dataset.row, e.target.dataset.column);
          }
        });
      });
    }
  }, {
    key: "placeShip",
    value: function placeShip(row, column) {
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].placeShip(this.ships[this.shipIndex].length, row, column, this.orientation);
      var shipsInfoObject = {
        "ship": this.ships[this.shipIndex],
        "row": Number(row),
        "column": Number(column),
        "orientation": this.orientation
      };
      this.shipsPlaced.push(shipsInfoObject);
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
      if (this.orientation === 'vert') {
        if (Number(row) + length - 1 > 9) return false;
        var _flag = false;
        for (var _i = Number(row); _i < Number(row) + length; _i++) {
          if (!_flag) {
            _flag = _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(_i, column);
          }
        }
        return !_flag;
      }
    }
  }, {
    key: "rotateShip",
    value: function rotateShip() {
      this.orientation = this.orientation === 'horiz' ? 'vert' : 'horiz';
    }
  }, {
    key: "reset",
    value: function reset() {
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].createBoard('place-ships-board');
      this.orientation = 'horiz';
      this.shipIndex = 0;
      this.shipsPlaced = [];
      this.addPlaceShipListeners();
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
          if (board && board.showBoard()[row][column] !== '') {
            cell.classList.add('ship');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxDQUFDN0YsR0FBRyxDQUFDaUcsUUFBUSxDQUFDLENBQUMsRUFBRXZGLE1BQU0sQ0FBQ3VGLFFBQVEsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLENBQUM7TUFDbEYsT0FBT3BCLElBQUksQ0FBQ0wsU0FBUyxDQUFDMEIsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN4QztFQUFDO0VBQUEsT0FBQWpFLEVBQUE7QUFBQTs7Ozs7OztVQzlESDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEM2QixrREFBUyxDQUFDQyxjQUFjLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZXBsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pID0+IHtcclxuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gIT09IHNoaXApIHtcclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gc2hpcDtcclxuXHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93ICsgMV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHthbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc1BsYWNlZEFycmF5KSA9PiB7XHJcbiAgICBzaGlwc1BsYWNlZEFycmF5LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBteUJvYXJkLnBsYWNlU2hpcChvYmplY3Quc2hpcCwgb2JqZWN0LnJvdywgb2JqZWN0LmNvbHVtbiwgb2JqZWN0Lm9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TXlCb2FyZCA9ICgpID0+IG15Qm9hcmRcclxuXHJcbiAgY29uc3QgY2hvb3NlUmFuZG9tQ29vcmQgPSAoYm9hcmQpID0+IHtcclxuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl07XHJcblxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gJ21pc3MnIHx8IGJvYXJkQ2VsbCA9PT0gJ2hpdCcpIHtcclxuICAgICAgY2hvb3NlUmFuZG9tQ29vcmQoKTtcclxuICAgIH0gXHJcblxyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck15Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7Y2xlYXJNeUJvYXJkLCBnZXRNeUJvYXJkLCBwbGFjZVNoaXBzLCBhdHRhY2ssIGNob29zZVJhbmRvbUNvb3JkfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IHtcclxuICBzdGF0aWMgcGxheWVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgLy8gdGhpcyBpcyBubyBsb25nZXIgZ29pbmcgdG8gd29ya1xyXG4gICAgdGhpcy5wbGF5ZXIuYXR0YWNrKHJvdywgY29sdW1uLCB0aGlzLmNvbXB1dGVyQm9hcmQpO1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLmNvbXB1dGVyQm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcblxyXG4gICAgLy8gc2hvdyB0aGUgYm9hcmRzXHJcbiAgICBVSS5jcmVhdGVQbGF5ZXJCb2FyZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuY3JlYXRlT3Bwb25lbnRCb2FyZCh0aGlzLmNvbXB1dGVyQm9hcmQpO1xyXG5cclxuICAgIC8vIHRha2UgdHVybnMgYW5kIHBsYXkgdGhlIGdhbWVcclxuICB9XHJcbn1cclxuXHJcbi8vIGNvbnN0IGdhbWUgPSAoKSA9PiB7XHJcbi8vICAgY29uc3QgcGxheWVyID0gUGxheWVyKCk7XHJcbi8vICAgY29uc3QgcGxheWVyQm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbi8vICAgY29uc3Qgb3Bwb25lbnQgPSBQbGF5ZXIoKTtcclxuLy8gICBjb25zdCBlbmVteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4vLyAgIGNvbnN0IHN0YXJ0R2FtZSA9IChzaGlwcykgPT4ge1xyXG4vLyAgICAgLy8gcmVzZXRcclxuLy8gICAgIHBsYXllckJvYXJkLmNsZWFyQm9hcmQoKTtcclxuLy8gICAgIGVuZW15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG4vLyAgICAgY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJywgcGxheWVyQm9hcmQpO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgY29uc3QgcGxheWVyTW92ZSA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4vLyAgICAgcGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgZW5lbXlCb2FyZCk7XHJcbi8vICAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuLy8gICAgIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbi8vICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xyXG4vLyAgIH1cclxuXHJcbi8vICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKCkgPT4ge1xyXG4vLyAgICAgY29uc3QgY29vcmRzID0gb3Bwb25lbnQuY2hvb3NlUmFuZG9tQ29vcmQocGxheWVyQm9hcmQpO1xyXG4vLyAgICAgb3Bwb25lbnQuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCBwbGF5ZXJCb2FyZCk7XHJcbi8vICAgICBjb25zdCBpc0hpdCA9IHBsYXllckJvYXJkLnNob3dCb2FyZCgpW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gJ2hpdCc7XHJcbi8vICAgICBkaXNwbGF5TW92ZVJlc3VsdChjb29yZHNbMF0udG9TdHJpbmcoKSwgY29vcmRzWzFdLnRvU3RyaW5nKCksICdwbGF5ZXItYm9hcmQnLCBpc0hpdCk7XHJcbi8vICAgICAvLyBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXHJcbi8vICAgfVxyXG5cclxuLy8gICByZXR1cm4ge1xyXG4vLyAgICAgc3RhcnRHYW1lLFxyXG4vLyAgICAgcGxheWVyTW92ZSxcclxuLy8gICAgIGNvbXB1dGVyTW92ZVxyXG4vLyAgIH1cclxuLy8gfSIsImltcG9ydCBHYW1lcGxheSBmcm9tICcuL2dhbWVwbGF5J1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2NvbXBvbmVudHMvc2hpcFwiO1xyXG5cclxuY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdGF0ZScpO1xyXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG5jb25zdCBlbmVteUNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuXHJcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdGF0ZVNoaXAoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2hpcHNQbGFjZWQpO1xyXG4gICAgR2FtZXBsYXkuc3RhcnRHYW1lKHRoaXMuc2hpcHNQbGFjZWQpO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW5lcnMoKTtcclxuICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgLy8gaGlkZSB0aGUgcGxhY2Ugc2hpcHMgYm9hcmRcclxuICAgIC8vIHNob3cgdGhlIG1haW4gYm9hcmRzXHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1ICYmIHRoaXMuaXNMZWdhbFNoaXBQbGFjZW1lbnQodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbikpIHtcclxuICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkQXR0YWNrTGlzdGVuZXJzKCkge1xyXG4gICAgZW5lbXlDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgIEdhbWVwbGF5LnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBVSS5wbGFjZVNoaXAodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbiwgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICBjb25zdCBzaGlwc0luZm9PYmplY3QgPSB7XHJcbiAgICAgIFwic2hpcFwiOiB0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XSxcclxuICAgICAgXCJyb3dcIjogTnVtYmVyKHJvdyksXHJcbiAgICAgIFwiY29sdW1uXCI6IE51bWJlcihjb2x1bW4pLFxyXG4gICAgICBcIm9yaWVudGF0aW9uXCI6IHRoaXMub3JpZW50YXRpb25cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHNQbGFjZWQucHVzaChzaGlwc0luZm9PYmplY3QpO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggKz0gMTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0xlZ2FsU2hpcFBsYWNlbWVudChsZW5ndGgsIHJvdywgY29sdW1uKSB7XHJcbiAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIGNlbGxzIGhhcyBhIHNoaXAgaW4gaXRcclxuXHJcbiAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgICAgaWYgKE51bWJlcihjb2x1bW4pICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IGNlbGxzIGFscmVhZHkgaGFzIGEgc2hpcCBpbiBpdFxyXG4gICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihjb2x1bW4pOyBpIDwgTnVtYmVyKGNvbHVtbikgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChyb3csIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgIGlmIChOdW1iZXIocm93KSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gTnVtYmVyKHJvdyk7IGkgPCBOdW1iZXIocm93KSArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKGksIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJvdGF0ZVNoaXAoKSB7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6JyA/ICd2ZXJ0JyA6ICdob3Jpeic7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVzZXQoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5zaGlwc1BsYWNlZCA9IFtdO1xyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjcmVhdGVCb2FyZChpZCwgYm9hcmQgPSBudWxsKSB7XHJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uICA9IGNvbHVtbjtcclxuICAgICAgICBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dICE9PSAnJykge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVBsYXllckJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdwbGF5ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlT3Bwb25lbnRCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgnY29tcHV0ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmluZENlbGwocm93LCBjb2x1bW4sIGlkKSB7XHJcbiAgICBsZXQgcGlja2VkO1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtpZH0gLmNlbGxgKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgaWYgKGNlbGwuZGF0YXNldC5yb3cgPT09IHJvdyAmJiBjZWxsLmRhdGFzZXQuY29sdW1uID09PSBjb2x1bW4pIHtcclxuICAgICAgICBwaWNrZWQgPSBjZWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwaWNrZWQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sIGlkLCBpc0hpdCkge1xyXG4gICAgY29uc3QgcGlja2VkID0gdGhpcy5maW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpO1xyXG5cclxuICAgIGlmIChpc0hpdCkge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdPJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24gPSAnaG9yaXonKSB7XHJcbiAgICBsZXQgY2hvaWNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKHJvdywgKE51bWJlcihjb2x1bW4pICsgaSkudG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbCgoTnVtYmVyKHJvdykgKyBpKS50b1N0cmluZygpLCBjb2x1bW4sICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNob2ljZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29udGFpbnNTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5maW5kQ2VsbChyb3cudG9TdHJpbmcoKSwgY29sdW1uLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgcmV0dXJuIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJyk7XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IExpc3RlbmVycyBmcm9tICcuL2xpc3RlbmVycyc7XHJcblxyXG5MaXN0ZW5lcnMuZXZlbnRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOlsiZ2FtZWJvYXJkIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsImNsZWFyQm9hcmQiLCJzaGlwcyIsInNob3dCb2FyZCIsInBsYWNlU2hpcCIsInNoaXAiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsInB1c2giLCJpIiwibGVuZ3RoIiwiYWxsU3VuayIsImV2ZXJ5IiwiaXNTdW5rIiwicmVjZWl2ZUF0dGFjayIsImNvbHVtbiIsImJvYXJkQ2VsbCIsIl90eXBlb2YiLCJoaXQiLCJQbGF5ZXIiLCJteUJvYXJkIiwiYXR0YWNrIiwicGxhY2VTaGlwcyIsInNoaXBzUGxhY2VkQXJyYXkiLCJmb3JFYWNoIiwib2JqZWN0IiwiZ2V0TXlCb2FyZCIsImNob29zZVJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2xlYXJNeUJvYXJkIiwiU2hpcCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJVSSIsIkdhbWVwbGF5Iiwia2V5IiwidmFsdWUiLCJwbGF5ZXJNb3ZlIiwicGxheWVyIiwiY29tcHV0ZXJCb2FyZCIsImlzSGl0IiwiZGlzcGxheU1vdmVSZXN1bHQiLCJzdGFydEdhbWUiLCJzaGlwc0FycmF5IiwiY29tcHV0ZXIiLCJjcmVhdGVQbGF5ZXJCb2FyZCIsImNyZWF0ZU9wcG9uZW50Qm9hcmQiLCJkZWZhdWx0Iiwicm90YXRlQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0QnRuIiwiZW5lbXlDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGFjZVNoaXBzQ29udGFpbmVyIiwibWFpbkJvYXJkc0NvbnRhaW5lciIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwiTGlzdGVuZXJzIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicm90YXRlU2hpcCIsImFkZFBsYWNlU2hpcExpc3RlbmVycyIsImNvbnNvbGUiLCJsb2ciLCJzaGlwc1BsYWNlZCIsInJlc2V0IiwiYWRkQXR0YWNrTGlzdGVuZXJzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiX3RoaXMyIiwiY2VsbHMiLCJjZWxsIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJzaGlwSW5kZXgiLCJpc0xlZ2FsU2hpcFBsYWNlbWVudCIsInRleHRDb250ZW50Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiZmxhZyIsImNvbnRhaW5zU2hpcCIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJjaG9pY2UiLCJ0b1N0cmluZyIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==