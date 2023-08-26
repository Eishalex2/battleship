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
  var board;
  var createBoard = function createBoard() {
    board = _toConsumableArray(Array(10)).map(function () {
      return Array(10).fill("");
    });
    return board;
  };
  var ships = [];
  var clearBoard = function clearBoard() {
    board = _toConsumableArray(Array(10)).map(function () {
      return Array(10).fill("");
    });
    ships = [];
    return board;
  };
  var availableShips = function availableShips() {
    var carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](5);
    var battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4);
    var cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    var submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    var destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2);
    return [carrier, battleship, cruiser, submarine, destroyer];
  };
  board = createBoard();
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
  var noAdjacentShips = function noAdjacentShips(ship, row, col, orientation) {
    // diagonals are allowed
    if (orientation === 'horiz') {
      if (col > 0 && board[row][col - 1] !== '') return false;
      for (var i = 0; i < ship.length; i++) {
        if (row > 0 && board[row - 1][col + i] !== '') return false;
        if (row < 9 && board[row + 1][col + i] !== '') return false;
      }
      if (col + ship.length < 10 && board[row][col + ship.length] !== '') return false;
    } else {
      if (row > 0 && board[row - 1][col] !== '') return false;
      for (var _i2 = 0; _i2 < ship.length; _i2++) {
        if (col > 0 && board[row + _i2][col - 1] !== '') return false;
        if (col < 9 && board[row + _i2][col + 1] !== '') return false;
      }
      if (row + ship.length < 10 && board[row + ship.length][col] !== '') return false;
    }
    return true;
  };
  var randomShipPlacement = function randomShipPlacement() {
    var randomShips = availableShips();
    var orientations = ['horiz', 'vert'];
    randomShips.forEach(function (object) {
      var row;
      var column;
      var orientation;
      while (true) {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
        orientation = orientations[Math.floor(Math.random() * 2)];
        // check if off board
        if (orientation === 'horiz' && column + object.length - 1 > 9) continue;
        if (orientation === 'vert' && row + object.length - 1 > 9) continue;
        if (board[row][column] === '' && noAdjacentShips(object, row, column, orientation)) break;
      }
      placeShip(object, row, column, orientation);
    });
  };
  var getNumRemaining = function getNumRemaining() {
    return (
      // for each ship in the ships array, check if it's sunk or not. If
      // it's not sunk, add one to the count.
      ships.reduce(function (total, ship) {
        if (!ship.isSunk()) {
          total += 1;
        }
        return total;
      }, 0)
    );
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
    getNumRemaining: getNumRemaining,
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
      chooseRandomCoord(board);
    }
    return [row, column];
  };
  var clearMyBoard = function clearMyBoard() {
    myBoard.clearBoard();
  };
  var gameOver = function gameOver() {
    return myBoard.allSunk();
  };
  var getRemainingShips = function getRemainingShips() {
    return myBoard.getNumRemaining();
  };
  return {
    getRemainingShips: getRemainingShips,
    gameOver: gameOver,
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
      var _this = this;
      var isHit = this.player.attack(row, column, this.computer.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].displayMoveResult(row, column, 'computer-board', isHit);
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].showRemainingComputerShips(this.computer.getRemainingShips());
      if (this.computer.gameOver()) {
        _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].playerWins(); // player has won
      }

      setTimeout(function () {
        _this.computerMove();
      }, 300);
    }
  }, {
    key: "computerMove",
    value: function computerMove() {
      var coords = this.computer.chooseRandomCoord(this.player.getMyBoard());
      var isHit = this.computer.attack(coords[0], coords[1], this.player.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].showRemainingPlayerShips(this.player.getRemainingShips());
      if (this.player.gameOver()) {
        _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].computerWins();
        // computer has won
      }
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
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].showRemainingComputerShips(this.computer.getRemainingShips());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].showRemainingPlayerShips(this.player.getRemainingShips());
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
var playAgainBtn = document.getElementById('play-again');
var placeShipsContainer = document.getElementById('place-ships-container');
var mainBoardsContainer = document.getElementById('board-container');
var key = document.querySelector('.key');
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

      // having some trouble with resetting and playing a new game. Need
      // to reset the main boards. They aren't clearing properly
      startBtn.addEventListener('click', function () {
        document.getElementById('player-board').textContent = '';
        document.getElementById('computer-board').textContent = '';
        _this.startGame();
      });
      playAgainBtn.addEventListener('click', function () {
        placeShipsContainer.classList.remove('hidden');
        document.getElementById('end-game-popup').classList.remove('show');
        mainBoardsContainer.classList.add('hidden');
        key.classList.add('hidden');
      });
      this.addPlaceShipListeners();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      _gameplay__WEBPACK_IMPORTED_MODULE_0__["default"].startGame(this.shipsPlaced);
      this.addAttackListeners();
      this.reset();
      placeShipsContainer.classList.add('hidden');
      mainBoardsContainer.classList.remove('hidden');
      key.classList.remove('hidden');
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
          if (document.getElementById('end-game-popup').classList.contains('show')) {
            e.preventDefault();
          } else if (e.target.textContent === '') {
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
      document.getElementById('place-ships-board').textContent = '';
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
        picked.classList.remove('ship');
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
  }, {
    key: "playerWins",
    value: function playerWins() {
      document.querySelector('div .winner').textContent = 'You win!';
      document.getElementById('end-game-popup').classList.add('show');
      document.querySelectorAll('#computer-board .cell').forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          e.preventDefault();
        });
      });
    }
  }, {
    key: "showRemainingPlayerShips",
    value: function showRemainingPlayerShips(num) {
      document.querySelector('.player-ships').textContent = "Ships Remaining: ".concat(num);
    }
  }, {
    key: "showRemainingComputerShips",
    value: function showRemainingComputerShips(num) {
      document.querySelector('.computer-ships').textContent = "Ships Remaining: ".concat(num);
    }
  }, {
    key: "computerWins",
    value: function computerWins() {
      document.querySelector('div .winner').textContent = 'Computer wins!';
      document.getElementById('end-game-popup').classList.add('show');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Zpc2libGVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgbGV0IGJvYXJkO1xyXG5cclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGxldCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBjbGVhckJvYXJkID0gKCkgPT4ge1xyXG4gICAgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgc2hpcHMgPSBbXTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGF2YWlsYWJsZVNoaXBzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuICBcclxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbiAgfSBcclxuXHJcbiAgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xyXG5cclxuICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiBib2FyZDtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSAhPT0gc2hpcCkge1xyXG4gICAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBzaGlwO1xyXG5cclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IG5vQWRqYWNlbnRTaGlwcyA9IChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pID0+IHtcclxuICAgIC8vIGRpYWdvbmFscyBhcmUgYWxsb3dlZFxyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIGlmIChjb2wgPiAwICYmIGJvYXJkW3Jvd11bY29sIC0gMV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1bY29sICsgaV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBpZiAocm93IDwgOSAmJiBib2FyZFtyb3cgKyAxXVtjb2wgKyBpXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoKGNvbCArIHNoaXAubGVuZ3RoKSA8IDEwICYmIGJvYXJkW3Jvd11bY29sICsgc2hpcC5sZW5ndGhdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2xdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY29sID4gMCAmJiBib2FyZFtyb3cgKyBpXVtjb2wgLSAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNvbCA8IDkgJiYgYm9hcmRbcm93ICsgaV1bY29sICsgMV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocm93ICsgc2hpcC5sZW5ndGgpIDwgMTAgJiYgYm9hcmRbcm93ICsgc2hpcC5sZW5ndGhdW2NvbF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhbmRvbVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByYW5kb21TaGlwcyA9IGF2YWlsYWJsZVNoaXBzKCk7XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbnMgPSBbJ2hvcml6JywgJ3ZlcnQnXTtcclxuXHJcbiAgICByYW5kb21TaGlwcy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgbGV0IHJvdztcclxuICAgICAgbGV0IGNvbHVtbjtcclxuICAgICAgbGV0IG9yaWVudGF0aW9uO1xyXG4gICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIG9mZiBib2FyZFxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6JyAmJiAoY29sdW1uICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkgY29udGludWU7XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAndmVydCcgJiYgKHJvdyArIG9iamVjdC5sZW5ndGggLSAxKSA+IDkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2x1bW5dID09PSAnJyAmJiAobm9BZGphY2VudFNoaXBzKG9iamVjdCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSkpIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwbGFjZVNoaXAob2JqZWN0LCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXROdW1SZW1haW5pbmcgPSAoKSA9PiBcclxuICAgIC8vIGZvciBlYWNoIHNoaXAgaW4gdGhlIHNoaXBzIGFycmF5LCBjaGVjayBpZiBpdCdzIHN1bmsgb3Igbm90LiBJZlxyXG4gICAgLy8gaXQncyBub3Qgc3VuaywgYWRkIG9uZSB0byB0aGUgY291bnQuXHJcbiAgICAgc2hpcHMucmVkdWNlKCh0b3RhbCwgc2hpcCkgPT4ge1xyXG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcclxuICAgICAgICB0b3RhbCArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b3RhbDtcclxuICAgIH0sIDApO1xyXG4gIFxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtnZXROdW1SZW1haW5pbmcsIHJhbmRvbVNoaXBQbGFjZW1lbnQsIGFsbFN1bmssIGNsZWFyQm9hcmQsIHNob3dCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuICBjb25zdCBteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IGF0dGFjayA9IChyb3csIGNvbHVtbiwgYm9hcmQpID0+IHtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xyXG5cclxuICAgIHJldHVybiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09ICdoaXQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc1BsYWNlZEFycmF5KSA9PiB7XHJcbiAgICBzaGlwc1BsYWNlZEFycmF5LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBteUJvYXJkLnBsYWNlU2hpcChvYmplY3Quc2hpcCwgb2JqZWN0LnJvdywgb2JqZWN0LmNvbHVtbiwgb2JqZWN0Lm9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRNeUJvYXJkID0gKCkgPT4gbXlCb2FyZFxyXG5cclxuICBjb25zdCBjaG9vc2VSYW5kb21Db29yZCA9IChib2FyZCkgPT4ge1xyXG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXTtcclxuXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSAnbWlzcycgfHwgYm9hcmRDZWxsID09PSAnaGl0Jykge1xyXG4gICAgICBjaG9vc2VSYW5kb21Db29yZChib2FyZCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJNeUJvYXJkID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5jbGVhckJvYXJkKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IG15Qm9hcmQuYWxsU3VuaygpXHJcblxyXG4gIGNvbnN0IGdldFJlbWFpbmluZ1NoaXBzID0gKCkgPT4gbXlCb2FyZC5nZXROdW1SZW1haW5pbmcoKVxyXG5cclxuICByZXR1cm4ge2dldFJlbWFpbmluZ1NoaXBzLCBnYW1lT3ZlciwgcGxhY2VTaGlwc1JhbmRvbWx5LCBjbGVhck15Qm9hcmQsIGdldE15Qm9hcmQsIHBsYWNlU2hpcHMsIGF0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IHtcclxuICBzdGF0aWMgcGxheWVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLnBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIHRoaXMuY29tcHV0ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nQ29tcHV0ZXJTaGlwcyh0aGlzLmNvbXB1dGVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gICAgaWYgKHRoaXMuY29tcHV0ZXIuZ2FtZU92ZXIoKSkge1xyXG4gICAgICBVSS5wbGF5ZXJXaW5zKCk7ICAgICAvLyBwbGF5ZXIgaGFzIHdvblxyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY29tcHV0ZXJNb3ZlKCk7XHJcbiAgICB9LCAzMDApO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyTW92ZSgpIHtcclxuICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMuY29tcHV0ZXIuY2hvb3NlUmFuZG9tQ29vcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5jb21wdXRlci5hdHRhY2soY29vcmRzWzBdLCBjb29yZHNbMV0sIHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5kaXNwbGF5TW92ZVJlc3VsdChjb29yZHNbMF0udG9TdHJpbmcoKSwgY29vcmRzWzFdLnRvU3RyaW5nKCksICdwbGF5ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nUGxheWVyU2hpcHModGhpcy5wbGF5ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIuZ2FtZU92ZXIoKSkge1xyXG4gICAgICBVSS5jb21wdXRlcldpbnMoKTtcclxuICAgICAgLy8gY29tcHV0ZXIgaGFzIHdvblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZShzaGlwc0FycmF5KSB7XHJcbiAgICAvLyBjbGVhciB0aGUgYm9hcmRzXHJcbiAgICB0aGlzLmNvbXB1dGVyLmNsZWFyTXlCb2FyZCgpO1xyXG4gICAgdGhpcy5wbGF5ZXIuY2xlYXJNeUJvYXJkKCk7XHJcblxyXG4gICAgLy8gaGF2ZSB0aGUgcGxheWVyIHBsYWNlIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLnBsYXllci5wbGFjZVNoaXBzKHNoaXBzQXJyYXkpO1xyXG5cclxuICAgIC8vIGVuZW15IHBsYWNlcyB0aGVpciBzaGlwc1xyXG4gICAgdGhpcy5jb21wdXRlci5wbGFjZVNoaXBzUmFuZG9tbHkoKTtcclxuXHJcbiAgICAvLyBzaG93IHRoZSBib2FyZHNcclxuICAgIFVJLmNyZWF0ZVBsYXllckJvYXJkKHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5jcmVhdGVPcHBvbmVudEJvYXJkKHRoaXMuY29tcHV0ZXIuZ2V0TXlCb2FyZCgpKTtcclxuXHJcbiAgICBVSS5zaG93UmVtYWluaW5nQ29tcHV0ZXJTaGlwcyh0aGlzLmNvbXB1dGVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ1BsYXllclNoaXBzKHRoaXMucGxheWVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gIH1cclxufSIsImltcG9ydCBHYW1lcGxheSBmcm9tICcuL2dhbWVwbGF5J1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2NvbXBvbmVudHMvc2hpcFwiO1xyXG5cclxuY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdGF0ZScpO1xyXG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xyXG5jb25zdCBwbGF5QWdhaW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1hZ2FpbicpO1xyXG5jb25zdCBwbGFjZVNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXBzLWNvbnRhaW5lcicpO1xyXG5jb25zdCBtYWluQm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xyXG5jb25zdCBrZXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcua2V5Jyk7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuXHJcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdGF0ZVNoaXAoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGhhdmluZyBzb21lIHRyb3VibGUgd2l0aCByZXNldHRpbmcgYW5kIHBsYXlpbmcgYSBuZXcgZ2FtZS4gTmVlZFxyXG4gICAgLy8gdG8gcmVzZXQgdGhlIG1haW4gYm9hcmRzLiBUaGV5IGFyZW4ndCBjbGVhcmluZyBwcm9wZXJseVxyXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheUFnYWluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgIG1haW5Cb2FyZHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgIGtleS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKCkge1xyXG4gICAgR2FtZXBsYXkuc3RhcnRHYW1lKHRoaXMuc2hpcHNQbGFjZWQpO1xyXG4gICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAga2V5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcGxhY2Utc2hpcHMtYm9hcmQgLmNlbGwnKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyByb3cgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcEluZGV4IDwgNSAmJiB0aGlzLmlzTGVnYWxTaGlwUGxhY2VtZW50KHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4pKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYWNlU2hpcChyb3csIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZEF0dGFja0xpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGVuZW15Q2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29tcHV0ZXItYm9hcmQgLmNlbGwnKTtcclxuICAgIGVuZW15Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICBHYW1lcGxheS5wbGF5ZXJNb3ZlKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgVUkucGxhY2VTaGlwKHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4sIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgY29uc3Qgc2hpcHNJbmZvT2JqZWN0ID0ge1xyXG4gICAgICBcInNoaXBcIjogdGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0sXHJcbiAgICAgIFwicm93XCI6IE51bWJlcihyb3cpLFxyXG4gICAgICBcImNvbHVtblwiOiBOdW1iZXIoY29sdW1uKSxcclxuICAgICAgXCJvcmllbnRhdGlvblwiOiB0aGlzLm9yaWVudGF0aW9uXHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkLnB1c2goc2hpcHNJbmZvT2JqZWN0KTtcclxuICAgIHRoaXMuc2hpcEluZGV4ICs9IDE7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNMZWdhbFNoaXBQbGFjZW1lbnQobGVuZ3RoLCByb3csIGNvbHVtbikge1xyXG4gICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChOdW1iZXIoY29sdW1uKSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBOdW1iZXIoY29sdW1uKTsgaSA8IE51bWJlcihjb2x1bW4pICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAocm93LCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICBpZiAoTnVtYmVyKHJvdykgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihyb3cpOyBpIDwgTnVtYmVyKHJvdykgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChpLCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJvdGF0ZVNoaXAoKSB7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6JyA/ICd2ZXJ0JyA6ICdob3Jpeic7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVzZXQoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuICAgIHRoaXMuc2hpcEluZGV4ID0gMDtcclxuICAgIHRoaXMuc2hpcHNQbGFjZWQgPSBbXTtcclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcclxuICBzdGF0aWMgY3JlYXRlQm9hcmQoaWQsIGJvYXJkID0gbnVsbCkge1xyXG4gICAgZm9yKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiAgPSBjb2x1bW47XHJcbiAgICAgICAgaWYgKGJvYXJkICYmIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSAhPT0gJycpIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVQbGF5ZXJCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgncGxheWVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZU9wcG9uZW50Qm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ2NvbXB1dGVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCkge1xyXG4gICAgbGV0IHBpY2tlZDtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7aWR9IC5jZWxsYCk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGlmIChjZWxsLmRhdGFzZXQucm93ID09PSByb3cgJiYgY2VsbC5kYXRhc2V0LmNvbHVtbiA9PT0gY29sdW1uKSB7XHJcbiAgICAgICAgcGlja2VkID0gY2VsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGlja2VkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCBpZCwgaXNIaXQpIHtcclxuICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMuZmluZENlbGwocm93LCBjb2x1bW4sIGlkKTtcclxuXHJcbiAgICBpZiAoaXNIaXQpIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnTyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSB7XHJcbiAgICBsZXQgY2hvaWNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKHJvdywgKE51bWJlcihjb2x1bW4pICsgaSkudG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbCgoTnVtYmVyKHJvdykgKyBpKS50b1N0cmluZygpLCBjb2x1bW4sICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNob2ljZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29udGFpbnNTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5maW5kQ2VsbChyb3cudG9TdHJpbmcoKSwgY29sdW1uLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgcmV0dXJuIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxheWVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnWW91IHdpbiEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyhudW0pIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItc2hpcHMnKS50ZXh0Q29udGVudCA9IGBTaGlwcyBSZW1haW5pbmc6ICR7bnVtfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHMobnVtKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItc2hpcHMnKS50ZXh0Q29udGVudCA9IGBTaGlwcyBSZW1haW5pbmc6ICR7bnVtfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJXaW5zKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IC53aW5uZXInKS50ZXh0Q29udGVudCA9ICdDb21wdXRlciB3aW5zISc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IExpc3RlbmVycyBmcm9tICcuL2xpc3RlbmVycyc7XHJcblxyXG5MaXN0ZW5lcnMuZXZlbnRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOlsiU2hpcCIsImdhbWVib2FyZCIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJBcnJheSIsIm1hcCIsImZpbGwiLCJzaGlwcyIsImNsZWFyQm9hcmQiLCJhdmFpbGFibGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInNob3dCb2FyZCIsInBsYWNlU2hpcCIsInNoaXAiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsInB1c2giLCJpIiwibGVuZ3RoIiwibm9BZGphY2VudFNoaXBzIiwicmFuZG9tU2hpcFBsYWNlbWVudCIsInJhbmRvbVNoaXBzIiwib3JpZW50YXRpb25zIiwiZm9yRWFjaCIsIm9iamVjdCIsImNvbHVtbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdldE51bVJlbWFpbmluZyIsInJlZHVjZSIsInRvdGFsIiwiaXNTdW5rIiwiYWxsU3VuayIsImV2ZXJ5IiwicmVjZWl2ZUF0dGFjayIsImJvYXJkQ2VsbCIsIl90eXBlb2YiLCJoaXQiLCJQbGF5ZXIiLCJteUJvYXJkIiwiYXR0YWNrIiwicGxhY2VTaGlwcyIsInNoaXBzUGxhY2VkQXJyYXkiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJnZXRNeUJvYXJkIiwiY2hvb3NlUmFuZG9tQ29vcmQiLCJjbGVhck15Qm9hcmQiLCJnYW1lT3ZlciIsImdldFJlbWFpbmluZ1NoaXBzIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJoaXRDb3VudCIsIlVJIiwiR2FtZXBsYXkiLCJrZXkiLCJ2YWx1ZSIsInBsYXllck1vdmUiLCJpc0hpdCIsInBsYXllciIsImNvbXB1dGVyIiwiZGlzcGxheU1vdmVSZXN1bHQiLCJzaG93UmVtYWluaW5nQ29tcHV0ZXJTaGlwcyIsInBsYXllcldpbnMiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJzaG93UmVtYWluaW5nUGxheWVyU2hpcHMiLCJjb21wdXRlcldpbnMiLCJzdGFydEdhbWUiLCJzaGlwc0FycmF5IiwiY3JlYXRlUGxheWVyQm9hcmQiLCJjcmVhdGVPcHBvbmVudEJvYXJkIiwiZGVmYXVsdCIsInJvdGF0ZUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydEJ0biIsInBsYXlBZ2FpbkJ0biIsInBsYWNlU2hpcHNDb250YWluZXIiLCJtYWluQm9hcmRzQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsIkxpc3RlbmVycyIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdGF0ZVNoaXAiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImFkZFBsYWNlU2hpcExpc3RlbmVycyIsInNoaXBzUGxhY2VkIiwiYWRkQXR0YWNrTGlzdGVuZXJzIiwicmVzZXQiLCJfdGhpczIiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJzaGlwSW5kZXgiLCJpc0xlZ2FsU2hpcFBsYWNlbWVudCIsImVuZW15Q2VsbHMiLCJjb250YWlucyIsInByZXZlbnREZWZhdWx0Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiZmxhZyIsImNvbnRhaW5zU2hpcCIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJjaG9pY2UiLCJudW0iXSwic291cmNlUm9vdCI6IiJ9