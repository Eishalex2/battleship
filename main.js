/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/gameboard.js":
/*!*************************************!*\
  !*** ./src/components/gameboard.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/components/ship.js");
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
  var availableShips = function availableShips() {
    var carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](5);
    var battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4);
    var cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    var submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    var destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2);
    return [carrier, battleship, cruiser, submarine, destroyer];
  };
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
          board[row + _i][col] = ship;
        }
      }
    }
  };
  var randomShipPlacement = function randomShipPlacement() {
    var randomShips = availableShips();
    var orientations = ['horiz', 'vert'];
    randomShips.forEach(function (object) {
      var row;
      var column;
      var orientation;
      var flag;
      function getRandom() {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
        orientation = orientations[Math.floor(Math.random()) * 2];
        if (orientation === 'horiz' && column + object.length - 1 > 9) {
          getRandom();
        }
        if (orientation === 'vert' && row + object.length - 1 > 0) {
          getRandom();
        }
        // false = no ship
        flag = false;
        if (orientation === 'horiz') {
          for (var i = column; i < column + object.length; i++) {
            if (!flag) {
              flag = board[row][i] !== '';
            }
          }
          if (flag) {
            getRandom();
          }
        }
        if (orientation === 'vert') {
          for (var _i2 = row; _i2 < row + object.length; _i2++) {
            if (!flag) {
              flag = board[_i2][column] !== '';
            }
          }
          if (flag) {
            getRandom();
          }
        }
      }
      getRandom();
      console.log(orientation);
      placeShip(object, row, column, orientation);
    });
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
    randomShipPlacement: randomShipPlacement,
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
    board.receiveAttack(row, column);
    return board.showBoard()[row][column] === 'hit';
  };
  var placeShips = function placeShips(shipsPlacedArray) {
    shipsPlacedArray.forEach(function (object) {
      myBoard.placeShip(object.ship, object.row, object.column, object.orientation);
    });
  };
  var placeShipsRandomly = function placeShipsRandomly() {
    myBoard.randomShipPlacement();
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
    placeShipsRandomly: placeShipsRandomly,
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
/* harmony import */ var _components_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/player */ "./src/components/player.js");
/* harmony import */ var _visibleBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visibleBoard */ "./src/visibleBoard.js");
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
      var isHit = this.player.attack(row, column, this.computer.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].displayMoveResult(row, column, 'computer-board', isHit);
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
      this.computer.placeShipsRandomly();

      // show the boards
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].createPlayerBoard(this.player.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].createOpponentBoard(this.computer.getMyBoard());

      // take turns and play the game
    }
  }]);
  return Gameplay;
}();
_defineProperty(Gameplay, "player", (0,_components_player__WEBPACK_IMPORTED_MODULE_0__["default"])());
_defineProperty(Gameplay, "computer", (0,_components_player__WEBPACK_IMPORTED_MODULE_0__["default"])());


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
      _gameplay__WEBPACK_IMPORTED_MODULE_0__["default"].startGame(this.shipsPlaced);
      this.addAttackListeners();
      placeShipsContainer.classList.add('hidden');
      mainBoardsContainer.classList.remove('hidden');
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
      var enemyCells = document.querySelectorAll('#computer-board .cell');
      enemyCells.forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          console.log('attack listener fired');
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
    value: function placeShip(length, row, column, orientation) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixJQUFNOEQsSUFBSSxHQUFHLElBQUksQ0FBQ2lCLFFBQVEsQ0FBQzFGLEdBQUcsQ0FBQzhGLFFBQVEsQ0FBQyxDQUFDLEVBQUVuRixNQUFNLENBQUNtRixRQUFRLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixDQUFDO01BQ2xGLE9BQU9yQixJQUFJLENBQUNOLFNBQVMsQ0FBQzRCLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDeEM7RUFBQztFQUFBLE9BQUF2RCxFQUFBO0FBQUE7Ozs7Ozs7VUM5REg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDb0Isa0RBQVMsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcbiAgXHJcbiAgICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxyXG4gIH0gXHJcblxyXG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pID0+IHtcclxuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gIT09IHNoaXApIHtcclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gc2hpcDtcclxuXHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByYW5kb21TaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmFuZG9tU2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3JpeicsICd2ZXJ0J107XHJcblxyXG4gICAgcmFuZG9tU2hpcHMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2x1bW47XHJcbiAgICAgIGxldCBvcmllbnRhdGlvbjtcclxuICAgICAgbGV0IGZsYWc7XHJcbiAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbSgpIHtcclxuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpICogMl07XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonICYmIChjb2x1bW4gKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSB7XHJcbiAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAndmVydCcgJiYgKHJvdyArIG9iamVjdC5sZW5ndGggLSAxKSA+IDApIHtcclxuICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gY29sdW1uOyBpIDwgY29sdW1uICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbcm93XVtpXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAndmVydCcpIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3cgKyBvYmplY3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICAgICAgZmxhZyA9IChib2FyZFtpXVtjb2x1bW5dICE9PSAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgY29uc29sZS5sb2cob3JpZW50YXRpb24pO1xyXG4gICAgICBwbGFjZVNoaXAob2JqZWN0LCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtyYW5kb21TaGlwUGxhY2VtZW50LCBhbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiB7XHJcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuXHJcbiAgICByZXR1cm4gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoc2hpcHNQbGFjZWRBcnJheSkgPT4ge1xyXG4gICAgc2hpcHNQbGFjZWRBcnJheS5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgbXlCb2FyZC5wbGFjZVNoaXAob2JqZWN0LnNoaXAsIG9iamVjdC5yb3csIG9iamVjdC5jb2x1bW4sIG9iamVjdC5vcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TXlCb2FyZCA9ICgpID0+IG15Qm9hcmRcclxuXHJcbiAgY29uc3QgY2hvb3NlUmFuZG9tQ29vcmQgPSAoYm9hcmQpID0+IHtcclxuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl07XHJcblxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gJ21pc3MnIHx8IGJvYXJkQ2VsbCA9PT0gJ2hpdCcpIHtcclxuICAgICAgY2hvb3NlUmFuZG9tQ29vcmQoKTtcclxuICAgIH0gXHJcblxyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck15Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7cGxhY2VTaGlwc1JhbmRvbWx5LCBjbGVhck15Qm9hcmQsIGdldE15Qm9hcmQsIHBsYWNlU2hpcHMsIGF0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IHtcclxuICBzdGF0aWMgcGxheWVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLnBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIHRoaXMuY29tcHV0ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIC8vIHRha2UgdHVybnMgYW5kIHBsYXkgdGhlIGdhbWVcclxuXHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuXHJcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdGF0ZVNoaXAoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSgpIHtcclxuICAgIEdhbWVwbGF5LnN0YXJ0R2FtZSh0aGlzLnNoaXBzUGxhY2VkKTtcclxuICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuZXJzKCk7XHJcbiAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFkZFBsYWNlU2hpcExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BsYWNlLXNoaXBzLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgcm93IH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IHsgY29sdW1uIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGlmICh0aGlzLnNoaXBJbmRleCA8IDUgJiYgdGhpcy5pc0xlZ2FsU2hpcFBsYWNlbWVudCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uKSkge1xyXG4gICAgICAgICAgdGhpcy5wbGFjZVNoaXAocm93LCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRBdHRhY2tMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBlbmVteUNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBlbmVteUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2F0dGFjayBsaXN0ZW5lciBmaXJlZCcpO1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgIEdhbWVwbGF5LnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBVSS5wbGFjZVNoaXAodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbiwgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICBjb25zdCBzaGlwc0luZm9PYmplY3QgPSB7XHJcbiAgICAgIFwic2hpcFwiOiB0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XSxcclxuICAgICAgXCJyb3dcIjogTnVtYmVyKHJvdyksXHJcbiAgICAgIFwiY29sdW1uXCI6IE51bWJlcihjb2x1bW4pLFxyXG4gICAgICBcIm9yaWVudGF0aW9uXCI6IHRoaXMub3JpZW50YXRpb25cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHNQbGFjZWQucHVzaChzaGlwc0luZm9PYmplY3QpO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggKz0gMTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0xlZ2FsU2hpcFBsYWNlbWVudChsZW5ndGgsIHJvdywgY29sdW1uKSB7XHJcbiAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIGNlbGxzIGhhcyBhIHNoaXAgaW4gaXRcclxuXHJcbiAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgICAgaWYgKE51bWJlcihjb2x1bW4pICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IGNlbGxzIGFscmVhZHkgaGFzIGEgc2hpcCBpbiBpdFxyXG4gICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihjb2x1bW4pOyBpIDwgTnVtYmVyKGNvbHVtbikgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChyb3csIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgIGlmIChOdW1iZXIocm93KSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gTnVtYmVyKHJvdyk7IGkgPCBOdW1iZXIocm93KSArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKGksIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJvdGF0ZVNoaXAoKSB7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6JyA/ICd2ZXJ0JyA6ICdob3Jpeic7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVzZXQoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5zaGlwc1BsYWNlZCA9IFtdO1xyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjcmVhdGVCb2FyZChpZCwgYm9hcmQgPSBudWxsKSB7XHJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uICA9IGNvbHVtbjtcclxuICAgICAgICBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dICE9PSAnJykge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVBsYXllckJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdwbGF5ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlT3Bwb25lbnRCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgnY29tcHV0ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmluZENlbGwocm93LCBjb2x1bW4sIGlkKSB7XHJcbiAgICBsZXQgcGlja2VkO1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtpZH0gLmNlbGxgKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgaWYgKGNlbGwuZGF0YXNldC5yb3cgPT09IHJvdyAmJiBjZWxsLmRhdGFzZXQuY29sdW1uID09PSBjb2x1bW4pIHtcclxuICAgICAgICBwaWNrZWQgPSBjZWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwaWNrZWQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sIGlkLCBpc0hpdCkge1xyXG4gICAgY29uc3QgcGlja2VkID0gdGhpcy5maW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpO1xyXG5cclxuICAgIGlmIChpc0hpdCkge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdPJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pIHtcclxuICAgIGxldCBjaG9pY2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwocm93LCAoTnVtYmVyKGNvbHVtbikgKyBpKS50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKChOdW1iZXIocm93KSArIGkpLnRvU3RyaW5nKCksIGNvbHVtbiwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH1cclxuICAgICAgY2hvaWNlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb250YWluc1NoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmZpbmRDZWxsKHJvdy50b1N0cmluZygpLCBjb2x1bW4udG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICByZXR1cm4gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTGlzdGVuZXJzIGZyb20gJy4vbGlzdGVuZXJzJztcclxuXHJcbkxpc3RlbmVycy5ldmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZWJvYXJkIiwiY3JlYXRlQm9hcmQiLCJib2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsImNsZWFyQm9hcmQiLCJzaGlwcyIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hvd0JvYXJkIiwicGxhY2VTaGlwIiwic2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwicHVzaCIsImkiLCJsZW5ndGgiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiZmxhZyIsImdldFJhbmRvbSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJhbGxTdW5rIiwiZXZlcnkiLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwiYm9hcmRDZWxsIiwiX3R5cGVvZiIsImhpdCIsIlBsYXllciIsIm15Qm9hcmQiLCJhdHRhY2siLCJwbGFjZVNoaXBzIiwic2hpcHNQbGFjZWRBcnJheSIsInBsYWNlU2hpcHNSYW5kb21seSIsImdldE15Qm9hcmQiLCJjaG9vc2VSYW5kb21Db29yZCIsImNsZWFyTXlCb2FyZCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJVSSIsIkdhbWVwbGF5Iiwia2V5IiwidmFsdWUiLCJwbGF5ZXJNb3ZlIiwiaXNIaXQiLCJwbGF5ZXIiLCJjb21wdXRlciIsImRpc3BsYXlNb3ZlUmVzdWx0Iiwic3RhcnRHYW1lIiwic2hpcHNBcnJheSIsImNyZWF0ZVBsYXllckJvYXJkIiwiY3JlYXRlT3Bwb25lbnRCb2FyZCIsImRlZmF1bHQiLCJyb3RhdGVCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3RhcnRCdG4iLCJwbGFjZVNoaXBzQ29udGFpbmVyIiwibWFpbkJvYXJkc0NvbnRhaW5lciIsIkxpc3RlbmVycyIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdGF0ZVNoaXAiLCJhZGRQbGFjZVNoaXBMaXN0ZW5lcnMiLCJzaGlwc1BsYWNlZCIsImFkZEF0dGFja0xpc3RlbmVycyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIl90aGlzMiIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsInNoaXBJbmRleCIsImlzTGVnYWxTaGlwUGxhY2VtZW50IiwiZW5lbXlDZWxscyIsInRleHRDb250ZW50Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiY29udGFpbnNTaGlwIiwicmVzZXQiLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImZpbmRDZWxsIiwicGlja2VkIiwiY29uY2F0IiwiY2hvaWNlIiwidG9TdHJpbmciLCJjb250YWlucyJdLCJzb3VyY2VSb290IjoiIn0=