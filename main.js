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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDOEIsa0RBQVMsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBsZXQgYm9hcmQ7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgbGV0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICBzaGlwcyA9IFtdO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxuICB9IFxyXG5cclxuICBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdICE9PSBzaGlwKSB7XHJcbiAgICAgIHNoaXBzLnB1c2goc2hpcCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IHNoaXA7XHJcblxyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9BZGphY2VudFNoaXBzID0gKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgLy8gZGlhZ29uYWxzIGFyZSBhbGxvd2VkXHJcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgaWYgKGNvbCA+IDAgJiYgYm9hcmRbcm93XVtjb2wgLSAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2wgKyBpXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIGlmIChyb3cgPCA5ICYmIGJvYXJkW3JvdyArIDFdW2NvbCArIGldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgoY29sICsgc2hpcC5sZW5ndGgpIDwgMTAgJiYgYm9hcmRbcm93XVtjb2wgKyBzaGlwLmxlbmd0aF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyb3cgPiAwICYmIGJvYXJkW3JvdyAtIDFdW2NvbF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2wgPiAwICYmIGJvYXJkW3JvdyArIGldW2NvbCAtIDFdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY29sIDwgOSAmJiBib2FyZFtyb3cgKyBpXVtjb2wgKyAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChyb3cgKyBzaGlwLmxlbmd0aCkgPCAxMCAmJiBib2FyZFtyb3cgKyBzaGlwLmxlbmd0aF1bY29sXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhbmRvbVNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXonLCAndmVydCddO1xyXG5cclxuICAgIHJhbmRvbVNoaXBzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sdW1uO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb247XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgb2ZmIGJvYXJkXHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonICYmIChjb2x1bW4gKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSBjb250aW51ZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0JyAmJiAocm93ICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbl0gPT09ICcnICYmIChub0FkamFjZW50U2hpcHMob2JqZWN0LCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pKSkgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBsYWNlU2hpcChvYmplY3QsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE51bVJlbWFpbmluZyA9ICgpID0+IFxyXG4gICAgLy8gZm9yIGVhY2ggc2hpcCBpbiB0aGUgc2hpcHMgYXJyYXksIGNoZWNrIGlmIGl0J3Mgc3VuayBvciBub3QuIElmXHJcbiAgICAvLyBpdCdzIG5vdCBzdW5rLCBhZGQgb25lIHRvIHRoZSBjb3VudC5cclxuICAgICBzaGlwcy5yZWR1Y2UoKHRvdGFsLCBzaGlwKSA9PiB7XHJcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xyXG4gICAgICAgIHRvdGFsICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfSwgMCk7XHJcbiAgXHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2dldE51bVJlbWFpbmluZywgcmFuZG9tU2hpcFBsYWNlbWVudCwgYWxsU3VuaywgY2xlYXJCb2FyZCwgc2hvd0JvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IG15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4ge1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gJ2hpdCc7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzID0gKHNoaXBzUGxhY2VkQXJyYXkpID0+IHtcclxuICAgIHNoaXBzUGxhY2VkQXJyYXkuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIG15Qm9hcmQucGxhY2VTaGlwKG9iamVjdC5zaGlwLCBvYmplY3Qucm93LCBvYmplY3QuY29sdW1uLCBvYmplY3Qub3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzUmFuZG9tbHkgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE15Qm9hcmQgPSAoKSA9PiBteUJvYXJkXHJcblxyXG4gIGNvbnN0IGNob29zZVJhbmRvbUNvb3JkID0gKGJvYXJkKSA9PiB7XHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dO1xyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09ICdtaXNzJyB8fCBib2FyZENlbGwgPT09ICdoaXQnKSB7XHJcbiAgICAgIGNob29zZVJhbmRvbUNvb3JkKGJvYXJkKTtcclxuICAgIH0gXHJcblxyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck15Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4gbXlCb2FyZC5hbGxTdW5rKClcclxuXHJcbiAgY29uc3QgZ2V0UmVtYWluaW5nU2hpcHMgPSAoKSA9PiBteUJvYXJkLmdldE51bVJlbWFpbmluZygpXHJcblxyXG4gIHJldHVybiB7Z2V0UmVtYWluaW5nU2hpcHMsIGdhbWVPdmVyLCBwbGFjZVNoaXBzUmFuZG9tbHksIGNsZWFyTXlCb2FyZCwgZ2V0TXlCb2FyZCwgcGxhY2VTaGlwcywgYXR0YWNrLCBjaG9vc2VSYW5kb21Db29yZH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgfVxyXG4gIFxyXG4gIGhpdENvdW50ID0gMDtcclxuXHJcbiAgaGl0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5oaXRDb3VudCArPSAxO1xyXG4gIH1cclxuICBcclxuICBpc1N1bmsgPSAoKSA9PiB0aGlzLmhpdENvdW50ID49IHRoaXMubGVuZ3RoXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9jb21wb25lbnRzL3BsYXllclwiO1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXBsYXkge1xyXG4gIHN0YXRpYyBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBwbGF5ZXJNb3ZlKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMucGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgdGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sICdjb21wdXRlci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIFVJLnNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBpZiAodGhpcy5jb21wdXRlci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLnBsYXllcldpbnMoKTsgICAgIC8vIHBsYXllciBoYXMgd29uXHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jb21wdXRlck1vdmUoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJNb3ZlKCkge1xyXG4gICAgY29uc3QgY29vcmRzID0gdGhpcy5jb21wdXRlci5jaG9vc2VSYW5kb21Db29yZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLmNvbXB1dGVyLmF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgdGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KGNvb3Jkc1swXS50b1N0cmluZygpLCBjb29yZHNbMV0udG9TdHJpbmcoKSwgJ3BsYXllci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIFVJLnNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyh0aGlzLnBsYXllci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIGlmICh0aGlzLnBsYXllci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLmNvbXB1dGVyV2lucygpO1xyXG4gICAgICAvLyBjb21wdXRlciBoYXMgd29uXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIFVJLnNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nUGxheWVyU2hpcHModGhpcy5wbGF5ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcbmNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZXknKTtcclxuXHJcblxyXG5jb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuXHJcbiAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbmVycyB7XHJcbiAgc3RhdGljIG9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuXHJcbiAgc3RhdGljIHNoaXBJbmRleCA9IDA7XHJcblxyXG4gIHN0YXRpYyBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuICBzdGF0aWMgc2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG5cclxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuXHJcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucm90YXRlU2hpcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaGF2aW5nIHNvbWUgdHJvdWJsZSB3aXRoIHJlc2V0dGluZyBhbmQgcGxheWluZyBhIG5ldyBnYW1lLiBOZWVkXHJcbiAgICAvLyB0byByZXNldCB0aGUgbWFpbiBib2FyZHMuIFRoZXkgYXJlbid0IGNsZWFyaW5nIHByb3Blcmx5XHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAga2V5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdGFydEdhbWUoKSB7XHJcbiAgICBHYW1lcGxheS5zdGFydEdhbWUodGhpcy5zaGlwc1BsYWNlZCk7XHJcbiAgICB0aGlzLmFkZEF0dGFja0xpc3RlbmVycygpO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gICAgcGxhY2VTaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIG1haW5Cb2FyZHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICBrZXkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1ICYmIHRoaXMuaXNMZWdhbFNoaXBQbGFjZW1lbnQodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbikpIHtcclxuICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkQXR0YWNrTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZW5lbXlDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpO1xyXG4gICAgZW5lbXlDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgIEdhbWVwbGF5LnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBVSS5wbGFjZVNoaXAodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbiwgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICBjb25zdCBzaGlwc0luZm9PYmplY3QgPSB7XHJcbiAgICAgIFwic2hpcFwiOiB0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XSxcclxuICAgICAgXCJyb3dcIjogTnVtYmVyKHJvdyksXHJcbiAgICAgIFwiY29sdW1uXCI6IE51bWJlcihjb2x1bW4pLFxyXG4gICAgICBcIm9yaWVudGF0aW9uXCI6IHRoaXMub3JpZW50YXRpb25cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHNQbGFjZWQucHVzaChzaGlwc0luZm9PYmplY3QpO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggKz0gMTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0xlZ2FsU2hpcFBsYWNlbWVudChsZW5ndGgsIHJvdywgY29sdW1uKSB7XHJcbiAgICByb3cgPSBOdW1iZXIocm93KTtcclxuICAgIGNvbHVtbiA9IE51bWJlcihjb2x1bW4pO1xyXG4gICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChjb2x1bW4gKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgLy8gY2hlY2sgYWRqYWNlbnQgY2VsbHNcclxuICAgICAgaWYgKGNvbHVtbiA+IDAgJiYgVUkuY29udGFpbnNTaGlwKHJvdywgY29sdW1uIC0gMSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChyb3cgPiAwICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgLSAxLCBjb2x1bW4gKyBpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChyb3cgPCA5ICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgKyAxLCBjb2x1bW4gKyBpKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgoY29sdW1uICsgbGVuZ3RoKSA8IDEwICYmIFVJLmNvbnRhaW5zU2hpcChyb3csIGNvbHVtbiArIGxlbmd0aCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YXJnZXQgY2VsbHMgYWxyZWFkeSBoYXMgYSBzaGlwIGluIGl0XHJcbiAgICAgIC8vIGZhbHNlID0gbm8gc2hpcFxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gY29sdW1uOyBpIDwgY29sdW1uICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAocm93LCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICBpZiAocm93ICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGFkamFjZW50IGNlbGxzXHJcbiAgICAgIGlmIChyb3cgPiAwICYmIFVJLmNvbnRhaW5zU2hpcChyb3cgLSAxLCBjb2x1bW4pKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoY29sdW1uID4gMCAmJiBVSS5jb250YWluc1NoaXAocm93ICsgaSwgY29sdW1uIC0gMSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoY29sdW1uIDwgOSAmJiBVSS5jb250YWluc1NoaXAocm93ICsgaSwgY29sdW1uICsgMSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoKHJvdyArIGxlbmd0aCkgPCAxMCAmJiBVSS5jb250YWluc1NoaXAocm93ICsgbGVuZ3RoLCBjb2x1bW4pKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKGksIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcm90YXRlU2hpcCgpIHtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonID8gJ3ZlcnQnIDogJ2hvcml6JztcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZXNldCgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwcy1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5zaGlwc1BsYWNlZCA9IFtdO1xyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjcmVhdGVCb2FyZChpZCwgYm9hcmQgPSBudWxsKSB7XHJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uICA9IGNvbHVtbjtcclxuICAgICAgICBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dICE9PSAnJykge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVBsYXllckJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdwbGF5ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlT3Bwb25lbnRCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgnY29tcHV0ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmluZENlbGwocm93LCBjb2x1bW4sIGlkKSB7XHJcbiAgICBsZXQgcGlja2VkO1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtpZH0gLmNlbGxgKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgaWYgKGNlbGwuZGF0YXNldC5yb3cgPT09IHJvdyAmJiBjZWxsLmRhdGFzZXQuY29sdW1uID09PSBjb2x1bW4pIHtcclxuICAgICAgICBwaWNrZWQgPSBjZWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwaWNrZWQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sIGlkLCBpc0hpdCkge1xyXG4gICAgY29uc3QgcGlja2VkID0gdGhpcy5maW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpO1xyXG5cclxuICAgIGlmIChpc0hpdCkge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdPJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pIHtcclxuICAgIGxldCBjaG9pY2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwocm93LCAoTnVtYmVyKGNvbHVtbikgKyBpKS50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKChOdW1iZXIocm93KSArIGkpLnRvU3RyaW5nKCksIGNvbHVtbiwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH1cclxuICAgICAgY2hvaWNlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb250YWluc1NoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmZpbmRDZWxsKHJvdy50b1N0cmluZygpLCBjb2x1bW4udG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICByZXR1cm4gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGF5ZXJXaW5zKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IC53aW5uZXInKS50ZXh0Q29udGVudCA9ICdZb3Ugd2luISc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29tcHV0ZXItYm9hcmQgLmNlbGwnKS5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2hvd1JlbWFpbmluZ1BsYXllclNoaXBzKG51bSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1zaGlwcycpLnRleHRDb250ZW50ID0gYFNoaXBzIFJlbWFpbmluZzogJHtudW19YDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzaG93UmVtYWluaW5nQ29tcHV0ZXJTaGlwcyhudW0pIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1zaGlwcycpLnRleHRDb250ZW50ID0gYFNoaXBzIFJlbWFpbmluZzogJHtudW19YDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlcldpbnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYgLndpbm5lcicpLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIHdpbnMhJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTGlzdGVuZXJzIGZyb20gJy4vbGlzdGVuZXJzJztcclxuXHJcbkxpc3RlbmVycy5ldmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsInNoaXBzIiwiY2xlYXJCb2FyZCIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hvd0JvYXJkIiwicGxhY2VTaGlwIiwic2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwicHVzaCIsImkiLCJsZW5ndGgiLCJub0FkamFjZW50U2hpcHMiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2V0TnVtUmVtYWluaW5nIiwicmVkdWNlIiwidG90YWwiLCJpc1N1bmsiLCJhbGxTdW5rIiwiZXZlcnkiLCJyZWNlaXZlQXR0YWNrIiwiYm9hcmRDZWxsIiwiX3R5cGVvZiIsImhpdCIsIlBsYXllciIsIm15Qm9hcmQiLCJhdHRhY2siLCJwbGFjZVNoaXBzIiwic2hpcHNQbGFjZWRBcnJheSIsInBsYWNlU2hpcHNSYW5kb21seSIsImdldE15Qm9hcmQiLCJjaG9vc2VSYW5kb21Db29yZCIsImNsZWFyTXlCb2FyZCIsImdhbWVPdmVyIiwiZ2V0UmVtYWluaW5nU2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImhpdENvdW50IiwiVUkiLCJHYW1lcGxheSIsImtleSIsInZhbHVlIiwicGxheWVyTW92ZSIsImlzSGl0IiwicGxheWVyIiwiY29tcHV0ZXIiLCJkaXNwbGF5TW92ZVJlc3VsdCIsInNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzIiwicGxheWVyV2lucyIsInNldFRpbWVvdXQiLCJjb21wdXRlck1vdmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsInNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyIsImNvbXB1dGVyV2lucyIsInN0YXJ0R2FtZSIsInNoaXBzQXJyYXkiLCJjcmVhdGVQbGF5ZXJCb2FyZCIsImNyZWF0ZU9wcG9uZW50Qm9hcmQiLCJkZWZhdWx0Iiwicm90YXRlQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0YXJ0QnRuIiwicGxheUFnYWluQnRuIiwicGxhY2VTaGlwc0NvbnRhaW5lciIsIm1haW5Cb2FyZHNDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiTGlzdGVuZXJzIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicm90YXRlU2hpcCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiYWRkUGxhY2VTaGlwTGlzdGVuZXJzIiwic2hpcHNQbGFjZWQiLCJhZGRBdHRhY2tMaXN0ZW5lcnMiLCJyZXNldCIsIl90aGlzMiIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsInNoaXBJbmRleCIsImlzTGVnYWxTaGlwUGxhY2VtZW50IiwiZW5lbXlDZWxscyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJzaGlwc0luZm9PYmplY3QiLCJOdW1iZXIiLCJjb250YWluc1NoaXAiLCJmbGFnIiwiaWQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJmaW5kQ2VsbCIsInBpY2tlZCIsImNvbmNhdCIsImNob2ljZSIsIm51bSJdLCJzb3VyY2VSb290IjoiIn0=