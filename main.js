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
    var carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]('carrier', 5);
    var battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]('battleship', 4);
    var cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]('cruiser', 3);
    var submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]('submarine', 3);
    var destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]('destroyer', 2);
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
  var previousMoves = [];
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
var Ship = /*#__PURE__*/_createClass(function Ship(name, length) {
  var _this = this;
  _classCallCheck(this, Ship);
  _defineProperty(this, "hitCount", 0);
  _defineProperty(this, "hit", function () {
    _this.hitCount += 1;
  });
  _defineProperty(this, "isSunk", function () {
    return _this.hitCount >= _this.length;
  });
  this.name = name;
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
var availableShips = function availableShips() {
  var carrier = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"]('carrier', 5);
  var battleship = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"]('battleship', 4);
  var cruiser = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"]('cruiser', 3);
  var submarine = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"]('submarine', 3);
  var destroyer = new _components_ship__WEBPACK_IMPORTED_MODULE_2__["default"]('destroyer', 2);
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
      shipName.textContent = "Place your ".concat(this.ships[this.shipIndex].name);
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
      if (this.shipIndex < 5) {
        shipName.textContent = "Place your ".concat(this.ships[this.shipIndex].name);
      } else {
        shipName.textContent = 'Press start';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEMrQixrREFBUyxDQUFDQyxjQUFjLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZXBsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGxldCBib2FyZDtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBsZXQgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHNoaXBzID0gW107XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCgnY2FycmllcicsIDUpO1xyXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKCdiYXR0bGVzaGlwJywgNCk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoJ2NydWlzZXInLCAzKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKCdzdWJtYXJpbmUnLCAzKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKCdkZXN0cm95ZXInLCAyKTtcclxuICBcclxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbiAgfVxyXG5cclxuICBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdICE9PSBzaGlwKSB7XHJcbiAgICAgIHNoaXBzLnB1c2goc2hpcCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IHNoaXA7XHJcblxyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9BZGphY2VudFNoaXBzID0gKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgLy8gZGlhZ29uYWxzIGFyZSBhbGxvd2VkXHJcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgaWYgKGNvbCA+IDAgJiYgYm9hcmRbcm93XVtjb2wgLSAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAocm93ID4gMCAmJiBib2FyZFtyb3cgLSAxXVtjb2wgKyBpXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIGlmIChyb3cgPCA5ICYmIGJvYXJkW3JvdyArIDFdW2NvbCArIGldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgoY29sICsgc2hpcC5sZW5ndGgpIDwgMTAgJiYgYm9hcmRbcm93XVtjb2wgKyBzaGlwLmxlbmd0aF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyb3cgPiAwICYmIGJvYXJkW3JvdyAtIDFdW2NvbF0gIT09ICcnKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2wgPiAwICYmIGJvYXJkW3JvdyArIGldW2NvbCAtIDFdICE9PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoY29sIDwgOSAmJiBib2FyZFtyb3cgKyBpXVtjb2wgKyAxXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChyb3cgKyBzaGlwLmxlbmd0aCkgPCAxMCAmJiBib2FyZFtyb3cgKyBzaGlwLmxlbmd0aF1bY29sXSAhPT0gJycpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhbmRvbVNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXonLCAndmVydCddO1xyXG5cclxuICAgIHJhbmRvbVNoaXBzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sdW1uO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb247XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgb2ZmIGJvYXJkXHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonICYmIChjb2x1bW4gKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSBjb250aW51ZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0JyAmJiAocm93ICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbl0gPT09ICcnICYmIChub0FkamFjZW50U2hpcHMob2JqZWN0LCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pKSkgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBsYWNlU2hpcChvYmplY3QsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE51bVJlbWFpbmluZyA9ICgpID0+IFxyXG4gICAgLy8gZm9yIGVhY2ggc2hpcCBpbiB0aGUgc2hpcHMgYXJyYXksIGNoZWNrIGlmIGl0J3Mgc3VuayBvciBub3QuIElmXHJcbiAgICAvLyBpdCdzIG5vdCBzdW5rLCBhZGQgb25lIHRvIHRoZSBjb3VudC5cclxuICAgICBzaGlwcy5yZWR1Y2UoKHRvdGFsLCBzaGlwKSA9PiB7XHJcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xyXG4gICAgICAgIHRvdGFsICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfSwgMCk7XHJcbiAgXHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge2dldE51bVJlbWFpbmluZywgcmFuZG9tU2hpcFBsYWNlbWVudCwgYWxsU3VuaywgY2xlYXJCb2FyZCwgc2hvd0JvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IG15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgbGV0IHByZXZpb3VzTW92ZXMgPSBbXTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4ge1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gJ2hpdCc7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzID0gKHNoaXBzUGxhY2VkQXJyYXkpID0+IHtcclxuICAgIHNoaXBzUGxhY2VkQXJyYXkuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIG15Qm9hcmQucGxhY2VTaGlwKG9iamVjdC5zaGlwLCBvYmplY3Qucm93LCBvYmplY3QuY29sdW1uLCBvYmplY3Qub3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzUmFuZG9tbHkgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE15Qm9hcmQgPSAoKSA9PiBteUJvYXJkXHJcblxyXG4gIGNvbnN0IG1vdmVNYWRlID0gKHJvdywgY29sdW1uKSA9PiBwcmV2aW91c01vdmVzLnNvbWUobW92ZSA9PiBtb3ZlWzBdID09PSByb3cgJiYgbW92ZVsxXSA9PT0gY29sdW1uKVxyXG5cclxuICBjb25zdCBjaG9vc2VSYW5kb21Db29yZCA9ICgpID0+IHtcclxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBsZXQgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIHdoaWxlIChtb3ZlTWFkZShyb3csIGNvbHVtbikpIHtcclxuICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHByZXZpb3VzTW92ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcclxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJNeUJvYXJkID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5jbGVhckJvYXJkKCk7XHJcbiAgICBwcmV2aW91c01vdmVzID0gW107XHJcbiAgfVxyXG5cclxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IG15Qm9hcmQuYWxsU3VuaygpXHJcblxyXG4gIGNvbnN0IGdldFJlbWFpbmluZ1NoaXBzID0gKCkgPT4gbXlCb2FyZC5nZXROdW1SZW1haW5pbmcoKVxyXG5cclxuICByZXR1cm4ge2dldFJlbWFpbmluZ1NoaXBzLCBnYW1lT3ZlciwgcGxhY2VTaGlwc1JhbmRvbWx5LCBjbGVhck15Qm9hcmQsIGdldE15Qm9hcmQsIHBsYWNlU2hpcHMsIGF0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuXHJcbi8vIGNyZWF0ZSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSB7XHJcbiAgc3RhdGljIHBsYXllciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgY29tcHV0ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIHBsYXllck1vdmUocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5wbGF5ZXIuYXR0YWNrKHJvdywgY29sdW1uLCB0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5kaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgJ2NvbXB1dGVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHModGhpcy5jb21wdXRlci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkucGxheWVyV2lucygpOyAgICAgLy8gcGxheWVyIGhhcyB3b25cclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlck1vdmUoKSB7XHJcbiAgICBjb25zdCBjb29yZHMgPSB0aGlzLmNvbXB1dGVyLmNob29zZVJhbmRvbUNvb3JkKHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMuY29tcHV0ZXIuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ1BsYXllclNoaXBzKHRoaXMucGxheWVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gICAgaWYgKHRoaXMucGxheWVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkuY29tcHV0ZXJXaW5zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIFVJLnNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nUGxheWVyU2hpcHModGhpcy5wbGF5ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcbmNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZXknKTtcclxuY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhY2Utc2hpcHMtY29udGFpbmVyIGgyJyk7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKCdjYXJyaWVyJywgNSk7XHJcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKCdiYXR0bGVzaGlwJywgNCk7XHJcbiAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKCdjcnVpc2VyJywgMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoJ3N1Ym1hcmluZScsIDMpO1xyXG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKCdkZXN0cm95ZXInLCAyKTtcclxuXHJcbiAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbmVycyB7XHJcbiAgc3RhdGljIG9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuXHJcbiAgc3RhdGljIHNoaXBJbmRleCA9IDA7XHJcblxyXG4gIHN0YXRpYyBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuICBzdGF0aWMgc2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG5cclxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuXHJcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucm90YXRlU2hpcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheUFnYWluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAga2V5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSgpIHtcclxuICAgIEdhbWVwbGF5LnN0YXJ0R2FtZSh0aGlzLnNoaXBzUGxhY2VkKTtcclxuICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIGtleS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFkZFBsYWNlU2hpcExpc3RlbmVycygpIHtcclxuICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHt0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5uYW1lfWA7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1ICYmIHRoaXMuaXNMZWdhbFNoaXBQbGFjZW1lbnQodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbikpIHtcclxuICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkQXR0YWNrTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZW5lbXlDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpO1xyXG4gICAgZW5lbXlDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgIEdhbWVwbGF5LnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBVSS5wbGFjZVNoaXAodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbiwgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICBjb25zdCBzaGlwc0luZm9PYmplY3QgPSB7XHJcbiAgICAgIFwic2hpcFwiOiB0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XSxcclxuICAgICAgXCJyb3dcIjogTnVtYmVyKHJvdyksXHJcbiAgICAgIFwiY29sdW1uXCI6IE51bWJlcihjb2x1bW4pLFxyXG4gICAgICBcIm9yaWVudGF0aW9uXCI6IHRoaXMub3JpZW50YXRpb25cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHNQbGFjZWQucHVzaChzaGlwc0luZm9PYmplY3QpO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggKz0gMTtcclxuICAgIGlmICh0aGlzLnNoaXBJbmRleCA8IDUpIHtcclxuICAgICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3RoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLm5hbWV9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gJ1ByZXNzIHN0YXJ0JztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNMZWdhbFNoaXBQbGFjZW1lbnQobGVuZ3RoLCByb3csIGNvbHVtbikge1xyXG4gICAgcm93ID0gTnVtYmVyKHJvdyk7XHJcbiAgICBjb2x1bW4gPSBOdW1iZXIoY29sdW1uKTtcclxuICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICBpZiAoY29sdW1uICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIC8vIGNoZWNrIGFkamFjZW50IGNlbGxzXHJcbiAgICAgIGlmIChjb2x1bW4gPiAwICYmIFVJLmNvbnRhaW5zU2hpcChyb3csIGNvbHVtbiAtIDEpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocm93ID4gMCAmJiBVSS5jb250YWluc1NoaXAocm93IC0gMSwgY29sdW1uICsgaSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAocm93IDwgOSAmJiBVSS5jb250YWluc1NoaXAocm93ICsgMSwgY29sdW1uICsgaSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoKGNvbHVtbiArIGxlbmd0aCkgPCAxMCAmJiBVSS5jb250YWluc1NoaXAocm93LCBjb2x1bW4gKyBsZW5ndGgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IGNlbGxzIGFscmVhZHkgaGFzIGEgc2hpcCBpbiBpdFxyXG4gICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvbHVtbjsgaSA8IGNvbHVtbiArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKHJvdywgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydCcpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgICAgaWYgKHJvdyArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAvLyBjaGVjayBhZGphY2VudCBjZWxsc1xyXG4gICAgICBpZiAocm93ID4gMCAmJiBVSS5jb250YWluc1NoaXAocm93IC0gMSwgY29sdW1uKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNvbHVtbiA+IDAgJiYgVUkuY29udGFpbnNTaGlwKHJvdyArIGksIGNvbHVtbiAtIDEpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGNvbHVtbiA8IDkgJiYgVUkuY29udGFpbnNTaGlwKHJvdyArIGksIGNvbHVtbiArIDEpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKChyb3cgKyBsZW5ndGgpIDwgMTAgJiYgVUkuY29udGFpbnNTaGlwKHJvdyArIGxlbmd0aCwgY29sdW1uKSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YXJnZXQgY2VsbHMgYWxyZWFkeSBoYXMgYSBzaGlwIGluIGl0XHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPCByb3cgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChpLCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJvdGF0ZVNoaXAoKSB7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6JyA/ICd2ZXJ0JyA6ICdob3Jpeic7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVzZXQoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuICAgIHRoaXMuc2hpcEluZGV4ID0gMDtcclxuICAgIHRoaXMuc2hpcHNQbGFjZWQgPSBbXTtcclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcclxuICBzdGF0aWMgY3JlYXRlQm9hcmQoaWQsIGJvYXJkID0gbnVsbCkge1xyXG4gICAgZm9yKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiAgPSBjb2x1bW47XHJcbiAgICAgICAgaWYgKGJvYXJkICYmIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSAhPT0gJycpIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVQbGF5ZXJCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgncGxheWVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZU9wcG9uZW50Qm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ2NvbXB1dGVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCkge1xyXG4gICAgbGV0IHBpY2tlZDtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7aWR9IC5jZWxsYCk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGlmIChjZWxsLmRhdGFzZXQucm93ID09PSByb3cgJiYgY2VsbC5kYXRhc2V0LmNvbHVtbiA9PT0gY29sdW1uKSB7XHJcbiAgICAgICAgcGlja2VkID0gY2VsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGlja2VkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCBpZCwgaXNIaXQpIHtcclxuICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMuZmluZENlbGwocm93LCBjb2x1bW4sIGlkKTtcclxuXHJcbiAgICBpZiAoaXNIaXQpIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnTyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSB7XHJcbiAgICBsZXQgY2hvaWNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKHJvdywgKE51bWJlcihjb2x1bW4pICsgaSkudG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbCgoTnVtYmVyKHJvdykgKyBpKS50b1N0cmluZygpLCBjb2x1bW4sICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNob2ljZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29udGFpbnNTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5maW5kQ2VsbChyb3cudG9TdHJpbmcoKSwgY29sdW1uLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgcmV0dXJuIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxheWVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnWW91IHdpbiEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyhudW0pIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItc2hpcHMnKS50ZXh0Q29udGVudCA9IGBTaGlwcyBSZW1haW5pbmc6ICR7bnVtfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHMobnVtKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItc2hpcHMnKS50ZXh0Q29udGVudCA9IGBTaGlwcyBSZW1haW5pbmc6ICR7bnVtfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJXaW5zKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IC53aW5uZXInKS50ZXh0Q29udGVudCA9ICdDb21wdXRlciB3aW5zISc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IExpc3RlbmVycyBmcm9tICcuL2xpc3RlbmVycyc7XHJcblxyXG5MaXN0ZW5lcnMuZXZlbnRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOlsiU2hpcCIsImdhbWVib2FyZCIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJBcnJheSIsIm1hcCIsImZpbGwiLCJzaGlwcyIsImNsZWFyQm9hcmQiLCJhdmFpbGFibGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInNob3dCb2FyZCIsInBsYWNlU2hpcCIsInNoaXAiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsInB1c2giLCJpIiwibGVuZ3RoIiwibm9BZGphY2VudFNoaXBzIiwicmFuZG9tU2hpcFBsYWNlbWVudCIsInJhbmRvbVNoaXBzIiwib3JpZW50YXRpb25zIiwiZm9yRWFjaCIsIm9iamVjdCIsImNvbHVtbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdldE51bVJlbWFpbmluZyIsInJlZHVjZSIsInRvdGFsIiwiaXNTdW5rIiwiYWxsU3VuayIsImV2ZXJ5IiwicmVjZWl2ZUF0dGFjayIsImJvYXJkQ2VsbCIsIl90eXBlb2YiLCJoaXQiLCJQbGF5ZXIiLCJteUJvYXJkIiwicHJldmlvdXNNb3ZlcyIsImF0dGFjayIsInBsYWNlU2hpcHMiLCJzaGlwc1BsYWNlZEFycmF5IiwicGxhY2VTaGlwc1JhbmRvbWx5IiwiZ2V0TXlCb2FyZCIsIm1vdmVNYWRlIiwic29tZSIsIm1vdmUiLCJjaG9vc2VSYW5kb21Db29yZCIsImNsZWFyTXlCb2FyZCIsImdhbWVPdmVyIiwiZ2V0UmVtYWluaW5nU2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJuYW1lIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJoaXRDb3VudCIsIlVJIiwiR2FtZXBsYXkiLCJrZXkiLCJ2YWx1ZSIsInBsYXllck1vdmUiLCJpc0hpdCIsInBsYXllciIsImNvbXB1dGVyIiwiZGlzcGxheU1vdmVSZXN1bHQiLCJzaG93UmVtYWluaW5nQ29tcHV0ZXJTaGlwcyIsInBsYXllcldpbnMiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJzaG93UmVtYWluaW5nUGxheWVyU2hpcHMiLCJjb21wdXRlcldpbnMiLCJzdGFydEdhbWUiLCJzaGlwc0FycmF5IiwiY3JlYXRlUGxheWVyQm9hcmQiLCJjcmVhdGVPcHBvbmVudEJvYXJkIiwiZGVmYXVsdCIsInJvdGF0ZUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydEJ0biIsInBsYXlBZ2FpbkJ0biIsInBsYWNlU2hpcHNDb250YWluZXIiLCJtYWluQm9hcmRzQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsInNoaXBOYW1lIiwiTGlzdGVuZXJzIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicm90YXRlU2hpcCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicmVzZXQiLCJhZGRQbGFjZVNoaXBMaXN0ZW5lcnMiLCJzaGlwc1BsYWNlZCIsImFkZEF0dGFja0xpc3RlbmVycyIsIl90aGlzMiIsImNvbmNhdCIsInNoaXBJbmRleCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImlzTGVnYWxTaGlwUGxhY2VtZW50IiwiZW5lbXlDZWxscyIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJzaGlwc0luZm9PYmplY3QiLCJOdW1iZXIiLCJjb250YWluc1NoaXAiLCJmbGFnIiwiaWQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJmaW5kQ2VsbCIsInBpY2tlZCIsImNob2ljZSIsIm51bSJdLCJzb3VyY2VSb290IjoiIn0=