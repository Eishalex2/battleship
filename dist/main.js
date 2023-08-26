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
  var placeShip = function placeShip(length, row, col, orientation) {
    if (_typeof(board[row][col]) !== 'object') {
      var ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
      ships.push(ship);
      board[row][col] = ship;
      if (orientation === 'horiz') {
        for (var i = 1; i < length; i++) {
          board[row][col + i] = ship;
        }
      } else {
        for (var _i = 1; _i < length; _i++) {
          board[row + _i][col] = ship;
        }
      }
    }
  };
  var noAdjacentShips = function noAdjacentShips(length, row, col, orientation) {
    // diagonals are allowed
    if (orientation === 'horiz') {
      if (col > 0 && board[row][col - 1] !== '') return false;
      for (var i = 0; i < length; i++) {
        if (row > 0 && board[row - 1][col + i] !== '') return false;
        if (row < 9 && board[row + 1][col + i] !== '') return false;
      }
      if (col + length < 10 && board[row][col + length] !== '') return false;
    } else {
      if (row > 0 && board[row - 1][col] !== '') return false;
      for (var _i2 = 0; _i2 < length; _i2++) {
        if (col > 0 && board[row + _i2][col - 1] !== '') return false;
        if (col < 9 && board[row + _i2][col + 1] !== '') return false;
      }
      if (row + length < 10 && board[row + length][col] !== '') return false;
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
        if (board[row][column] === '' && noAdjacentShips(object.length, row, column, orientation)) break;
      }
      placeShip(object.length, row, column, orientation);
    });
  };
  var getNumRemaining = function getNumRemaining() {
    return (
      // for each ship in the ships array, check if it's sunk or not. If
      // it's not sunk, add one to the count.
      ships.reduce(function (total, ship) {
        if (ship.isSunk()) {
          // console.log(ship.name);
        }
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
  var previousMoves = [];
  var attack = function attack(row, column, board) {
    board.receiveAttack(row, column);
    return board.showBoard()[row][column] === 'hit';
  };
  var placeShips = function placeShips(shipsPlacedArray) {
    shipsPlacedArray.forEach(function (object) {
      myBoard.placeShip(object.shipLength, object.row, object.column, object.orientation);
    });
  };
  var placeShipsRandomly = function placeShipsRandomly() {
    myBoard.randomShipPlacement();
  };
  var getMyBoard = function getMyBoard() {
    return myBoard;
  };
  var moveMade = function moveMade(row, column) {
    return previousMoves.some(function (move) {
      return move[0] === row && move[1] === column;
    });
  };
  var chooseRandomCoord = function chooseRandomCoord() {
    var row = Math.floor(Math.random() * 10);
    var column = Math.floor(Math.random() * 10);
    while (moveMade(row, column)) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }
    previousMoves.push([row, column]);
    return [row, column];
  };
  var clearMyBoard = function clearMyBoard() {
    myBoard.clearBoard();
    console.log(myBoard.showBoard());
    previousMoves = [];
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
var shipName = document.querySelector('#place-ships-container h2');
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
        document.getElementById('player-board').textContent = '';
        document.getElementById('computer-board').textContent = '';
        _this.startGame();
      });
      playAgainBtn.addEventListener('click', function () {
        placeShipsContainer.classList.remove('hidden');
        document.getElementById('end-game-popup').classList.remove('show');
        document.querySelector('div .winner').textContent = '';
        mainBoardsContainer.classList.add('hidden');
        key.classList.add('hidden');
        _this.reset();
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
      // shipName.textContent = `Place your ${this.ships[this.shipIndex].name}`;
      var cells = document.querySelectorAll('#place-ships-board .cell');
      cells.forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          var row = e.target.dataset.row;
          var column = e.target.dataset.column;
          if (_this2.shipIndex < 5 && _this2.isLegalShipPlacement(_this2.shipLengths[_this2.shipIndex], row, column)) {
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
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].placeShip(this.shipLengths[this.shipIndex], row, column, this.orientation);
      var shipsInfoObject = {
        "shipLength": this.shipLengths[this.shipIndex],
        "row": Number(row),
        "column": Number(column),
        "orientation": this.orientation
      };
      this.shipsPlaced.push(shipsInfoObject);
      this.shipIndex += 1;
      // if (this.shipIndex < 5) {
      //   shipName.textContent = `Place your ${this.ships[this.shipIndex].name}`;
      // } else {
      //   shipName.textContent = 'Press start';
      // }
    }
  }, {
    key: "isLegalShipPlacement",
    value: function isLegalShipPlacement(length, row, column) {
      row = Number(row);
      column = Number(column);
      // check if ship goes out of bounds
      if (this.orientation === 'horiz') {
        // check if ship goes out of bounds
        if (column + length - 1 > 9) return false;

        // check adjacent cells
        if (column > 0 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row, column - 1)) return false;
        for (var i = 0; i < length; i++) {
          if (row > 0 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row - 1, column + i)) return false;
          if (row < 9 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row + 1, column + i)) return false;
        }
        if (column + length < 10 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row, column + length)) return false;
        // check if any of the target cells already has a ship in it
        // false = no ship
        var flag = false;
        for (var _i = column; _i < column + length; _i++) {
          if (!flag) {
            flag = _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row, _i);
          }
        }
        return !flag;
      }
      if (this.orientation === 'vert') {
        // check if ship goes out of bounds
        if (row + length - 1 > 9) return false;

        // check adjacent cells
        if (row > 0 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row - 1, column)) return false;
        for (var _i2 = 0; _i2 < length; _i2++) {
          if (column > 0 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row + _i2, column - 1)) return false;
          if (column < 9 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row + _i2, column + 1)) return false;
        }
        if (row + length < 10 && _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(row + length, column)) return false;

        // check if any of the target cells already has a ship in it
        var _flag = false;
        for (var _i3 = row; _i3 < row + length; _i3++) {
          if (!_flag) {
            _flag = _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].containsShip(_i3, column);
          }
        }
        return !_flag;
      }
      return true;
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
_defineProperty(Listeners, "shipLengths", [5, 4, 3, 3, 2]);
_defineProperty(Listeners, "shipIndex", 0);
_defineProperty(Listeners, "shipsPlaced", []);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNNLFdBQVcsR0FBRyxnQkFBZ0I7TUFDcEVaLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLFNBQVMsQ0FBQ0UsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNqRTtFQUFDO0VBQUEsT0FBQXRDLEVBQUE7QUFBQTs7Ozs7OztVQ3RGSDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEMrQixrREFBUyxDQUFDQyxjQUFjLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZXBsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGxldCBib2FyZDtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBsZXQgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHNoaXBzID0gW107XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcbiAgXHJcbiAgICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxyXG4gIH1cclxuXHJcbiAgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xyXG5cclxuICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiBib2FyZDtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKGxlbmd0aCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mKGJvYXJkW3Jvd11bY29sXSkgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChsZW5ndGgpO1xyXG4gICAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBzaGlwO1xyXG5cclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9BZGphY2VudFNoaXBzID0gKGxlbmd0aCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICAvLyBkaWFnb25hbHMgYXJlIGFsbG93ZWRcclxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICBpZiAoY29sID4gMCAmJiBib2FyZFtyb3ddW2NvbCAtIDFdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2wgKyBpXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIGlmIChyb3cgPCA5ICYmIGJvYXJkW3JvdyArIDFdW2NvbCArIGldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgoY29sICsgbGVuZ3RoKSA8IDEwICYmIGJvYXJkW3Jvd11bY29sICsgbGVuZ3RoXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1bY29sXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2wgPiAwICYmIGJvYXJkW3JvdyArIGldW2NvbCAtIDFdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY29sIDwgOSAmJiBib2FyZFtyb3cgKyBpXVtjb2wgKyAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChyb3cgKyBsZW5ndGgpIDwgMTAgJiYgYm9hcmRbcm93ICsgbGVuZ3RoXVtjb2xdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCByYW5kb21TaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmFuZG9tU2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3JpeicsICd2ZXJ0J107XHJcblxyXG4gICAgcmFuZG9tU2hpcHMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2x1bW47XHJcbiAgICAgIGxldCBvcmllbnRhdGlvbjtcclxuICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIG9yaWVudGF0aW9uID0gb3JpZW50YXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcclxuICAgICAgICAvLyBjaGVjayBpZiBvZmYgYm9hcmRcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicgJiYgKGNvbHVtbiArIG9iamVjdC5sZW5ndGggLSAxKSA+IDkpIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnICYmIChyb3cgKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sdW1uXSA9PT0gJycgJiYgKG5vQWRqYWNlbnRTaGlwcyhvYmplY3QubGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pKSkgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBsYWNlU2hpcChvYmplY3QubGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXROdW1SZW1haW5pbmcgPSAoKSA9PiBcclxuICAgIC8vIGZvciBlYWNoIHNoaXAgaW4gdGhlIHNoaXBzIGFycmF5LCBjaGVjayBpZiBpdCdzIHN1bmsgb3Igbm90LiBJZlxyXG4gICAgLy8gaXQncyBub3Qgc3VuaywgYWRkIG9uZSB0byB0aGUgY291bnQuXHJcbiAgICAgc2hpcHMucmVkdWNlKCh0b3RhbCwgc2hpcCkgPT4ge1xyXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNoaXAubmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XHJcbiAgICAgICAgdG90YWwgKz0gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWw7XHJcbiAgICB9LCAwKTtcclxuICBcclxuXHJcbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcclxuICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmRbcm93XVtjb2x1bW5dO1xyXG4gICAgLy8gYWxyZWFkeSBndWVzc2VkXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSBcIm1pc3NcIiB8fCBib2FyZENlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgcmV0dXJuIFwiQWxyZWFkeSBndWVzc2VkLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaXAgaGFzIGJlZW4gaGl0XHJcbiAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwiaGl0XCI7XHJcbiAgICAgIGlmIChhbGxTdW5rKCkpIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNoaXAgaGFzIG5vdCBiZWVuIGhpdFxyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1pc3NcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7Z2V0TnVtUmVtYWluaW5nLCByYW5kb21TaGlwUGxhY2VtZW50LCBhbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBsZXQgcHJldmlvdXNNb3ZlcyA9IFtdO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiB7XHJcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuICAgIHJldHVybiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09ICdoaXQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc1BsYWNlZEFycmF5KSA9PiB7XHJcbiAgICBzaGlwc1BsYWNlZEFycmF5LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBteUJvYXJkLnBsYWNlU2hpcChvYmplY3Quc2hpcExlbmd0aCwgb2JqZWN0LnJvdywgb2JqZWN0LmNvbHVtbiwgb2JqZWN0Lm9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRNeUJvYXJkID0gKCkgPT4gbXlCb2FyZFxyXG5cclxuICBjb25zdCBtb3ZlTWFkZSA9IChyb3csIGNvbHVtbikgPT4gcHJldmlvdXNNb3Zlcy5zb21lKG1vdmUgPT4gbW92ZVswXSA9PT0gcm93ICYmIG1vdmVbMV0gPT09IGNvbHVtbilcclxuXHJcbiAgY29uc3QgY2hvb3NlUmFuZG9tQ29vcmQgPSAoKSA9PiB7XHJcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgbGV0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICB3aGlsZSAobW92ZU1hZGUocm93LCBjb2x1bW4pKSB7XHJcbiAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgfSBcclxuXHJcbiAgICBwcmV2aW91c01vdmVzLnB1c2goW3JvdywgY29sdW1uXSk7XHJcbiAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyTXlCb2FyZCA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG4gICAgY29uc29sZS5sb2cobXlCb2FyZC5zaG93Qm9hcmQoKSk7XHJcbiAgICBwcmV2aW91c01vdmVzID0gW107XHJcbiAgfVxyXG5cclxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IG15Qm9hcmQuYWxsU3VuaygpXHJcblxyXG4gIGNvbnN0IGdldFJlbWFpbmluZ1NoaXBzID0gKCkgPT4gbXlCb2FyZC5nZXROdW1SZW1haW5pbmcoKVxyXG5cclxuICByZXR1cm4ge2dldFJlbWFpbmluZ1NoaXBzLCBnYW1lT3ZlciwgcGxhY2VTaGlwc1JhbmRvbWx5LCBjbGVhck15Qm9hcmQsIGdldE15Qm9hcmQsIHBsYWNlU2hpcHMsIGF0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IHtcclxuICBzdGF0aWMgcGxheWVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLnBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIHRoaXMuY29tcHV0ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nQ29tcHV0ZXJTaGlwcyh0aGlzLmNvbXB1dGVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gICAgaWYgKHRoaXMuY29tcHV0ZXIuZ2FtZU92ZXIoKSkge1xyXG4gICAgICBVSS5wbGF5ZXJXaW5zKCk7ICAgICAvLyBwbGF5ZXIgaGFzIHdvblxyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY29tcHV0ZXJNb3ZlKCk7XHJcbiAgICB9LCAzMDApO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyTW92ZSgpIHtcclxuICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMuY29tcHV0ZXIuY2hvb3NlUmFuZG9tQ29vcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5jb21wdXRlci5hdHRhY2soY29vcmRzWzBdLCBjb29yZHNbMV0sIHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5kaXNwbGF5TW92ZVJlc3VsdChjb29yZHNbMF0udG9TdHJpbmcoKSwgY29vcmRzWzFdLnRvU3RyaW5nKCksICdwbGF5ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nUGxheWVyU2hpcHModGhpcy5wbGF5ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIuZ2FtZU92ZXIoKSkge1xyXG4gICAgICBVSS5jb21wdXRlcldpbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdGFydEdhbWUoc2hpcHNBcnJheSkge1xyXG4gICAgLy8gY2xlYXIgdGhlIGJvYXJkc1xyXG4gICAgdGhpcy5jb21wdXRlci5jbGVhck15Qm9hcmQoKTtcclxuICAgIHRoaXMucGxheWVyLmNsZWFyTXlCb2FyZCgpO1xyXG5cclxuICAgIC8vIGhhdmUgdGhlIHBsYXllciBwbGFjZSB0aGVpciBzaGlwc1xyXG4gICAgdGhpcy5wbGF5ZXIucGxhY2VTaGlwcyhzaGlwc0FycmF5KTtcclxuXHJcbiAgICAvLyBlbmVteSBwbGFjZXMgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMuY29tcHV0ZXIucGxhY2VTaGlwc1JhbmRvbWx5KCk7XHJcblxyXG4gICAgLy8gc2hvdyB0aGUgYm9hcmRzXHJcbiAgICBVSS5jcmVhdGVQbGF5ZXJCb2FyZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuY3JlYXRlT3Bwb25lbnRCb2FyZCh0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcblxyXG4gICAgVUkuc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHModGhpcy5jb21wdXRlci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIFVJLnNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyh0aGlzLnBsYXllci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi9nYW1lcGxheSdcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXBcIjtcclxuXHJcbmNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUnKTtcclxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYWdhaW4nKTtcclxuY29uc3QgcGxhY2VTaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwcy1jb250YWluZXInKTtcclxuY29uc3QgbWFpbkJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcclxuY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmtleScpO1xyXG5jb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZS1zaGlwcy1jb250YWluZXIgaDInKTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgc3RhdGljIHNoaXBJbmRleCA9IDA7XHJcblxyXG4gIHN0YXRpYyBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuXHJcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucm90YXRlU2hpcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheUFnYWluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAga2V5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSgpIHtcclxuICAgIEdhbWVwbGF5LnN0YXJ0R2FtZSh0aGlzLnNoaXBzUGxhY2VkKTtcclxuICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIGtleS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFkZFBsYWNlU2hpcExpc3RlbmVycygpIHtcclxuICAgIC8vIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHt0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5uYW1lfWA7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1ICYmIHRoaXMuaXNMZWdhbFNoaXBQbGFjZW1lbnQodGhpcy5zaGlwTGVuZ3Roc1t0aGlzLnNoaXBJbmRleF0sIHJvdywgY29sdW1uKSkge1xyXG4gICAgICAgICAgdGhpcy5wbGFjZVNoaXAocm93LCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRBdHRhY2tMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBlbmVteUNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBlbmVteUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSAnJykge1xyXG4gICAgICAgICAgR2FtZXBsYXkucGxheWVyTW92ZShlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIFVJLnBsYWNlU2hpcCh0aGlzLnNoaXBMZW5ndGhzW3RoaXMuc2hpcEluZGV4XSwgcm93LCBjb2x1bW4sIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgY29uc3Qgc2hpcHNJbmZvT2JqZWN0ID0ge1xyXG4gICAgICBcInNoaXBMZW5ndGhcIjogdGhpcy5zaGlwTGVuZ3Roc1t0aGlzLnNoaXBJbmRleF0sXHJcbiAgICAgIFwicm93XCI6IE51bWJlcihyb3cpLFxyXG4gICAgICBcImNvbHVtblwiOiBOdW1iZXIoY29sdW1uKSxcclxuICAgICAgXCJvcmllbnRhdGlvblwiOiB0aGlzLm9yaWVudGF0aW9uXHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkLnB1c2goc2hpcHNJbmZvT2JqZWN0KTtcclxuICAgIHRoaXMuc2hpcEluZGV4ICs9IDE7XHJcbiAgICAvLyBpZiAodGhpcy5zaGlwSW5kZXggPCA1KSB7XHJcbiAgICAvLyAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHt0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5uYW1lfWA7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICBzaGlwTmFtZS50ZXh0Q29udGVudCA9ICdQcmVzcyBzdGFydCc7XHJcbiAgICAvLyB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzTGVnYWxTaGlwUGxhY2VtZW50KGxlbmd0aCwgcm93LCBjb2x1bW4pIHtcclxuICAgIHJvdyA9IE51bWJlcihyb3cpO1xyXG4gICAgY29sdW1uID0gTnVtYmVyKGNvbHVtbik7XHJcbiAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgICAgaWYgKGNvbHVtbiArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAvLyBjaGVjayBhZGphY2VudCBjZWxsc1xyXG4gICAgICBpZiAoY29sdW1uID4gMCAmJiBVSS5jb250YWluc1NoaXAocm93LCBjb2x1bW4gLSAxKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHJvdyA+IDAgJiYgVUkuY29udGFpbnNTaGlwKHJvdyAtIDEsIGNvbHVtbiArIGkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHJvdyA8IDkgJiYgVUkuY29udGFpbnNTaGlwKHJvdyArIDEsIGNvbHVtbiArIGkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKChjb2x1bW4gKyBsZW5ndGgpIDwgMTAgJiYgVUkuY29udGFpbnNTaGlwKHJvdywgY29sdW1uICsgbGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb2x1bW47IGkgPCBjb2x1bW4gKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChyb3csIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChyb3cgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgLy8gY2hlY2sgYWRqYWNlbnQgY2VsbHNcclxuICAgICAgaWYgKHJvdyA+IDAgJiYgVUkuY29udGFpbnNTaGlwKHJvdyAtIDEsIGNvbHVtbikpIHJldHVybiBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb2x1bW4gPiAwICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyBpLCBjb2x1bW4gLSAxKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChjb2x1bW4gPCA5ICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyBpLCBjb2x1bW4gKyAxKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgocm93ICsgbGVuZ3RoKSA8IDEwICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyBsZW5ndGgsIGNvbHVtbikpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IGNlbGxzIGFscmVhZHkgaGFzIGEgc2hpcCBpbiBpdFxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAoaSwgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyByb3RhdGVTaGlwKCkge1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicgPyAndmVydCcgOiAnaG9yaXonO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlc2V0KCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXBzLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcbiAgICB0aGlzLnNoaXBJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkID0gW107XHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XHJcbiAgc3RhdGljIGNyZWF0ZUJvYXJkKGlkLCBib2FyZCA9IG51bGwpIHtcclxuICAgIGZvcihsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gID0gY29sdW1uO1xyXG4gICAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBpY2tlZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgICBjb25zdCBwaWNrZWQgPSB0aGlzLmZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gICAgaWYgKGlzSGl0KSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbikge1xyXG4gICAgbGV0IGNob2ljZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbChyb3csIChOdW1iZXIoY29sdW1uKSArIGkpLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwoKE51bWJlcihyb3cpICsgaSkudG9TdHJpbmcoKSwgY29sdW1uLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfVxyXG4gICAgICBjaG9pY2UuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRhaW5zU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZmluZENlbGwocm93LnRvU3RyaW5nKCksIGNvbHVtbi50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYXllcldpbnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYgLndpbm5lcicpLnRleHRDb250ZW50ID0gJ1lvdSB3aW4hJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzaG93UmVtYWluaW5nUGxheWVyU2hpcHMobnVtKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNoaXBzJykudGV4dENvbnRlbnQgPSBgU2hpcHMgUmVtYWluaW5nOiAke251bX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKG51bSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLXNoaXBzJykudGV4dENvbnRlbnQgPSBgU2hpcHMgUmVtYWluaW5nOiAke251bX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgd2lucyEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuTGlzdGVuZXJzLmV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lYm9hcmQiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiQXJyYXkiLCJtYXAiLCJmaWxsIiwic2hpcHMiLCJjbGVhckJvYXJkIiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJsZW5ndGgiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsIl90eXBlb2YiLCJzaGlwIiwicHVzaCIsImkiLCJub0FkamFjZW50U2hpcHMiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0TnVtUmVtYWluaW5nIiwicmVkdWNlIiwidG90YWwiLCJpc1N1bmsiLCJhbGxTdW5rIiwiZXZlcnkiLCJyZWNlaXZlQXR0YWNrIiwiYm9hcmRDZWxsIiwiaGl0IiwiUGxheWVyIiwibXlCb2FyZCIsInByZXZpb3VzTW92ZXMiLCJhdHRhY2siLCJwbGFjZVNoaXBzIiwic2hpcHNQbGFjZWRBcnJheSIsInNoaXBMZW5ndGgiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJnZXRNeUJvYXJkIiwibW92ZU1hZGUiLCJzb21lIiwibW92ZSIsImNob29zZVJhbmRvbUNvb3JkIiwiY2xlYXJNeUJvYXJkIiwiY29uc29sZSIsImxvZyIsImdhbWVPdmVyIiwiZ2V0UmVtYWluaW5nU2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImhpdENvdW50IiwiVUkiLCJHYW1lcGxheSIsImtleSIsInZhbHVlIiwicGxheWVyTW92ZSIsImlzSGl0IiwicGxheWVyIiwiY29tcHV0ZXIiLCJkaXNwbGF5TW92ZVJlc3VsdCIsInNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzIiwicGxheWVyV2lucyIsInNldFRpbWVvdXQiLCJjb21wdXRlck1vdmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsInNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyIsImNvbXB1dGVyV2lucyIsInN0YXJ0R2FtZSIsInNoaXBzQXJyYXkiLCJjcmVhdGVQbGF5ZXJCb2FyZCIsImNyZWF0ZU9wcG9uZW50Qm9hcmQiLCJkZWZhdWx0Iiwicm90YXRlQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0QnRuIiwicGxheUFnYWluQnRuIiwicGxhY2VTaGlwc0NvbnRhaW5lciIsIm1haW5Cb2FyZHNDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwic2hpcE5hbWUiLCJMaXN0ZW5lcnMiLCJldmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3RhdGVTaGlwIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXNldCIsImFkZFBsYWNlU2hpcExpc3RlbmVycyIsInNoaXBzUGxhY2VkIiwiYWRkQXR0YWNrTGlzdGVuZXJzIiwiX3RoaXMyIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic2hpcEluZGV4IiwiaXNMZWdhbFNoaXBQbGFjZW1lbnQiLCJzaGlwTGVuZ3RocyIsImVuZW15Q2VsbHMiLCJjb250YWlucyIsInByZXZlbnREZWZhdWx0Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiY29udGFpbnNTaGlwIiwiZmxhZyIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJjaG9pY2UiLCJudW0iXSwic291cmNlUm9vdCI6IiJ9