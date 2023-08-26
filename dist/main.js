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
      shipName.textContent = "Place your ".concat(this.shipNames[this.shipIndex]);
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
      if (this.shipIndex < 5) {
        shipName.textContent = "Place your ".concat(this.shipNames[this.shipIndex]);
      } else {
        shipName.textContent = 'Press Start';
      }
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
_defineProperty(Listeners, "shipNames", ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer']);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxHQUFHLEVBQUU7TUFDbkMvQyxRQUFRLENBQUNNLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQ00sV0FBVyx1QkFBQVMsTUFBQSxDQUF1QjBCLEdBQUcsQ0FBRTtJQUNqRjtFQUFDO0lBQUFwRSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBTSwyQkFBa0M2RCxHQUFHLEVBQUU7TUFDckMvQyxRQUFRLENBQUNNLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDTSxXQUFXLHVCQUFBUyxNQUFBLENBQXVCMEIsR0FBRyxDQUFFO0lBQ25GO0VBQUM7SUFBQXBFLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFhLGFBQUEsRUFBc0I7TUFDcEJPLFFBQVEsQ0FBQ00sYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDTSxXQUFXLEdBQUcsZ0JBQWdCO01BQ3BFWixRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDWSxTQUFTLENBQUNFLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDakU7RUFBQztFQUFBLE9BQUF0QyxFQUFBO0FBQUE7Ozs7Ozs7VUN0Rkg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDK0Isa0RBQVMsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBsZXQgYm9hcmQ7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgbGV0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICBzaGlwcyA9IFtdO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxuICB9XHJcblxyXG4gIGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgaWYgKHR5cGVvZihib2FyZFtyb3ddW2NvbF0pICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gc2hpcDtcclxuXHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IG5vQWRqYWNlbnRTaGlwcyA9IChsZW5ndGgsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgLy8gZGlhZ29uYWxzIGFyZSBhbGxvd2VkXHJcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgaWYgKGNvbCA+IDAgJiYgYm9hcmRbcm93XVtjb2wgLSAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1bY29sICsgaV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBpZiAocm93IDwgOSAmJiBib2FyZFtyb3cgKyAxXVtjb2wgKyBpXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoKGNvbCArIGxlbmd0aCkgPCAxMCAmJiBib2FyZFtyb3ddW2NvbCArIGxlbmd0aF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyb3cgPiAwICYmIGJvYXJkW3JvdyAtIDFdW2NvbF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY29sID4gMCAmJiBib2FyZFtyb3cgKyBpXVtjb2wgLSAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNvbCA8IDkgJiYgYm9hcmRbcm93ICsgaV1bY29sICsgMV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocm93ICsgbGVuZ3RoKSA8IDEwICYmIGJvYXJkW3JvdyArIGxlbmd0aF1bY29sXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhbmRvbVNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXonLCAndmVydCddO1xyXG5cclxuICAgIHJhbmRvbVNoaXBzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sdW1uO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb247XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgb2ZmIGJvYXJkXHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonICYmIChjb2x1bW4gKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSBjb250aW51ZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0JyAmJiAocm93ICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbl0gPT09ICcnICYmIChub0FkamFjZW50U2hpcHMob2JqZWN0Lmxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSkpIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwbGFjZVNoaXAob2JqZWN0Lmxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TnVtUmVtYWluaW5nID0gKCkgPT4gXHJcbiAgICAvLyBmb3IgZWFjaCBzaGlwIGluIHRoZSBzaGlwcyBhcnJheSwgY2hlY2sgaWYgaXQncyBzdW5rIG9yIG5vdC4gSWZcclxuICAgIC8vIGl0J3Mgbm90IHN1bmssIGFkZCBvbmUgdG8gdGhlIGNvdW50LlxyXG4gICAgIHNoaXBzLnJlZHVjZSgodG90YWwsIHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzaGlwLm5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xyXG4gICAgICAgIHRvdGFsICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfSwgMCk7XHJcbiAgXHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2dldE51bVJlbWFpbmluZywgcmFuZG9tU2hpcFBsYWNlbWVudCwgYWxsU3VuaywgY2xlYXJCb2FyZCwgc2hvd0JvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IG15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgbGV0IHByZXZpb3VzTW92ZXMgPSBbXTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4ge1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcbiAgICByZXR1cm4gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoc2hpcHNQbGFjZWRBcnJheSkgPT4ge1xyXG4gICAgc2hpcHNQbGFjZWRBcnJheS5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgbXlCb2FyZC5wbGFjZVNoaXAob2JqZWN0LnNoaXBMZW5ndGgsIG9iamVjdC5yb3csIG9iamVjdC5jb2x1bW4sIG9iamVjdC5vcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TXlCb2FyZCA9ICgpID0+IG15Qm9hcmRcclxuXHJcbiAgY29uc3QgbW92ZU1hZGUgPSAocm93LCBjb2x1bW4pID0+IHByZXZpb3VzTW92ZXMuc29tZShtb3ZlID0+IG1vdmVbMF0gPT09IHJvdyAmJiBtb3ZlWzFdID09PSBjb2x1bW4pXHJcblxyXG4gIGNvbnN0IGNob29zZVJhbmRvbUNvb3JkID0gKCkgPT4ge1xyXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGxldCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgd2hpbGUgKG1vdmVNYWRlKHJvdywgY29sdW1uKSkge1xyXG4gICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIH0gXHJcblxyXG4gICAgcHJldmlvdXNNb3Zlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck15Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICAgIGNvbnNvbGUubG9nKG15Qm9hcmQuc2hvd0JvYXJkKCkpO1xyXG4gICAgcHJldmlvdXNNb3ZlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiBteUJvYXJkLmFsbFN1bmsoKVxyXG5cclxuICBjb25zdCBnZXRSZW1haW5pbmdTaGlwcyA9ICgpID0+IG15Qm9hcmQuZ2V0TnVtUmVtYWluaW5nKClcclxuXHJcbiAgcmV0dXJuIHtnZXRSZW1haW5pbmdTaGlwcywgZ2FtZU92ZXIsIHBsYWNlU2hpcHNSYW5kb21seSwgY2xlYXJNeUJvYXJkLCBnZXRNeUJvYXJkLCBwbGFjZVNoaXBzLCBhdHRhY2ssIGNob29zZVJhbmRvbUNvb3JkfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuXHJcbi8vIGNyZWF0ZSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSB7XHJcbiAgc3RhdGljIHBsYXllciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgY29tcHV0ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIHBsYXllck1vdmUocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5wbGF5ZXIuYXR0YWNrKHJvdywgY29sdW1uLCB0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5kaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgJ2NvbXB1dGVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHModGhpcy5jb21wdXRlci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkucGxheWVyV2lucygpOyAgICAgLy8gcGxheWVyIGhhcyB3b25cclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlck1vdmUoKSB7XHJcbiAgICBjb25zdCBjb29yZHMgPSB0aGlzLmNvbXB1dGVyLmNob29zZVJhbmRvbUNvb3JkKHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMuY29tcHV0ZXIuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ1BsYXllclNoaXBzKHRoaXMucGxheWVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gICAgaWYgKHRoaXMucGxheWVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkuY29tcHV0ZXJXaW5zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIFVJLnNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nUGxheWVyU2hpcHModGhpcy5wbGF5ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcbmNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZXknKTtcclxuY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhY2Utc2hpcHMtY29udGFpbmVyIGgyJyk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXJzIHtcclxuICBzdGF0aWMgb3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG5cclxuICBzdGF0aWMgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBOYW1lcyA9IFsnQ2FycmllcicsICdCYXR0bGVzaGlwJywgJ0NydWlzZXInLCAnU3VibWFyaW5lJywgJ0Rlc3Ryb3llciddXHJcblxyXG4gIHN0YXRpYyBldmVudExpc3RlbmVycygpIHtcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG5cclxuICAgIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5yb3RhdGVTaGlwKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IC53aW5uZXInKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICBrZXkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKCkge1xyXG4gICAgR2FtZXBsYXkuc3RhcnRHYW1lKHRoaXMuc2hpcHNQbGFjZWQpO1xyXG4gICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAga2V5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCkge1xyXG4gICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3RoaXMuc2hpcE5hbWVzW3RoaXMuc2hpcEluZGV4XX1gO1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcGxhY2Utc2hpcHMtYm9hcmQgLmNlbGwnKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyByb3cgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcEluZGV4IDwgNSAmJiB0aGlzLmlzTGVnYWxTaGlwUGxhY2VtZW50KHRoaXMuc2hpcExlbmd0aHNbdGhpcy5zaGlwSW5kZXhdLCByb3csIGNvbHVtbikpIHtcclxuICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkQXR0YWNrTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZW5lbXlDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpO1xyXG4gICAgZW5lbXlDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgIEdhbWVwbGF5LnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBVSS5wbGFjZVNoaXAodGhpcy5zaGlwTGVuZ3Roc1t0aGlzLnNoaXBJbmRleF0sIHJvdywgY29sdW1uLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgIGNvbnN0IHNoaXBzSW5mb09iamVjdCA9IHtcclxuICAgICAgXCJzaGlwTGVuZ3RoXCI6IHRoaXMuc2hpcExlbmd0aHNbdGhpcy5zaGlwSW5kZXhdLFxyXG4gICAgICBcInJvd1wiOiBOdW1iZXIocm93KSxcclxuICAgICAgXCJjb2x1bW5cIjogTnVtYmVyKGNvbHVtbiksXHJcbiAgICAgIFwib3JpZW50YXRpb25cIjogdGhpcy5vcmllbnRhdGlvblxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwc1BsYWNlZC5wdXNoKHNoaXBzSW5mb09iamVjdCk7XHJcbiAgICB0aGlzLnNoaXBJbmRleCArPSAxO1xyXG4gICAgaWYgKHRoaXMuc2hpcEluZGV4IDwgNSkge1xyXG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7dGhpcy5zaGlwTmFtZXNbdGhpcy5zaGlwSW5kZXhdfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaGlwTmFtZS50ZXh0Q29udGVudCA9ICdQcmVzcyBTdGFydCc7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzTGVnYWxTaGlwUGxhY2VtZW50KGxlbmd0aCwgcm93LCBjb2x1bW4pIHtcclxuICAgIHJvdyA9IE51bWJlcihyb3cpO1xyXG4gICAgY29sdW1uID0gTnVtYmVyKGNvbHVtbik7XHJcbiAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgICAgaWYgKGNvbHVtbiArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAvLyBjaGVjayBhZGphY2VudCBjZWxsc1xyXG4gICAgICBpZiAoY29sdW1uID4gMCAmJiBVSS5jb250YWluc1NoaXAocm93LCBjb2x1bW4gLSAxKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHJvdyA+IDAgJiYgVUkuY29udGFpbnNTaGlwKHJvdyAtIDEsIGNvbHVtbiArIGkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHJvdyA8IDkgJiYgVUkuY29udGFpbnNTaGlwKHJvdyArIDEsIGNvbHVtbiArIGkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKChjb2x1bW4gKyBsZW5ndGgpIDwgMTAgJiYgVUkuY29udGFpbnNTaGlwKHJvdywgY29sdW1uICsgbGVuZ3RoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb2x1bW47IGkgPCBjb2x1bW4gKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChyb3csIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChyb3cgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgLy8gY2hlY2sgYWRqYWNlbnQgY2VsbHNcclxuICAgICAgaWYgKHJvdyA+IDAgJiYgVUkuY29udGFpbnNTaGlwKHJvdyAtIDEsIGNvbHVtbikpIHJldHVybiBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb2x1bW4gPiAwICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyBpLCBjb2x1bW4gLSAxKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChjb2x1bW4gPCA5ICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyBpLCBjb2x1bW4gKyAxKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgocm93ICsgbGVuZ3RoKSA8IDEwICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyBsZW5ndGgsIGNvbHVtbikpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IGNlbGxzIGFscmVhZHkgaGFzIGEgc2hpcCBpbiBpdFxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAoaSwgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyByb3RhdGVTaGlwKCkge1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicgPyAndmVydCcgOiAnaG9yaXonO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlc2V0KCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXBzLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcbiAgICB0aGlzLnNoaXBJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkID0gW107XHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XHJcbiAgc3RhdGljIGNyZWF0ZUJvYXJkKGlkLCBib2FyZCA9IG51bGwpIHtcclxuICAgIGZvcihsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gID0gY29sdW1uO1xyXG4gICAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBpY2tlZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgICBjb25zdCBwaWNrZWQgPSB0aGlzLmZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gICAgaWYgKGlzSGl0KSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbikge1xyXG4gICAgbGV0IGNob2ljZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbChyb3csIChOdW1iZXIoY29sdW1uKSArIGkpLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwoKE51bWJlcihyb3cpICsgaSkudG9TdHJpbmcoKSwgY29sdW1uLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfVxyXG4gICAgICBjaG9pY2UuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRhaW5zU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZmluZENlbGwocm93LnRvU3RyaW5nKCksIGNvbHVtbi50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYXllcldpbnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYgLndpbm5lcicpLnRleHRDb250ZW50ID0gJ1lvdSB3aW4hJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzaG93UmVtYWluaW5nUGxheWVyU2hpcHMobnVtKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNoaXBzJykudGV4dENvbnRlbnQgPSBgU2hpcHMgUmVtYWluaW5nOiAke251bX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKG51bSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLXNoaXBzJykudGV4dENvbnRlbnQgPSBgU2hpcHMgUmVtYWluaW5nOiAke251bX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgd2lucyEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuTGlzdGVuZXJzLmV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lYm9hcmQiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiQXJyYXkiLCJtYXAiLCJmaWxsIiwic2hpcHMiLCJjbGVhckJvYXJkIiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJsZW5ndGgiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsIl90eXBlb2YiLCJzaGlwIiwicHVzaCIsImkiLCJub0FkamFjZW50U2hpcHMiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0TnVtUmVtYWluaW5nIiwicmVkdWNlIiwidG90YWwiLCJpc1N1bmsiLCJhbGxTdW5rIiwiZXZlcnkiLCJyZWNlaXZlQXR0YWNrIiwiYm9hcmRDZWxsIiwiaGl0IiwiUGxheWVyIiwibXlCb2FyZCIsInByZXZpb3VzTW92ZXMiLCJhdHRhY2siLCJwbGFjZVNoaXBzIiwic2hpcHNQbGFjZWRBcnJheSIsInNoaXBMZW5ndGgiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJnZXRNeUJvYXJkIiwibW92ZU1hZGUiLCJzb21lIiwibW92ZSIsImNob29zZVJhbmRvbUNvb3JkIiwiY2xlYXJNeUJvYXJkIiwiY29uc29sZSIsImxvZyIsImdhbWVPdmVyIiwiZ2V0UmVtYWluaW5nU2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImhpdENvdW50IiwiVUkiLCJHYW1lcGxheSIsImtleSIsInZhbHVlIiwicGxheWVyTW92ZSIsImlzSGl0IiwicGxheWVyIiwiY29tcHV0ZXIiLCJkaXNwbGF5TW92ZVJlc3VsdCIsInNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzIiwicGxheWVyV2lucyIsInNldFRpbWVvdXQiLCJjb21wdXRlck1vdmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsInNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyIsImNvbXB1dGVyV2lucyIsInN0YXJ0R2FtZSIsInNoaXBzQXJyYXkiLCJjcmVhdGVQbGF5ZXJCb2FyZCIsImNyZWF0ZU9wcG9uZW50Qm9hcmQiLCJkZWZhdWx0Iiwicm90YXRlQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0QnRuIiwicGxheUFnYWluQnRuIiwicGxhY2VTaGlwc0NvbnRhaW5lciIsIm1haW5Cb2FyZHNDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwic2hpcE5hbWUiLCJMaXN0ZW5lcnMiLCJldmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3RhdGVTaGlwIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXNldCIsImFkZFBsYWNlU2hpcExpc3RlbmVycyIsInNoaXBzUGxhY2VkIiwiYWRkQXR0YWNrTGlzdGVuZXJzIiwiX3RoaXMyIiwiY29uY2F0Iiwic2hpcE5hbWVzIiwic2hpcEluZGV4IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaXNMZWdhbFNoaXBQbGFjZW1lbnQiLCJzaGlwTGVuZ3RocyIsImVuZW15Q2VsbHMiLCJjb250YWlucyIsInByZXZlbnREZWZhdWx0Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiY29udGFpbnNTaGlwIiwiZmxhZyIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjaG9pY2UiLCJudW0iXSwic291cmNlUm9vdCI6IiJ9