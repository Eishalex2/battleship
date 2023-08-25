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
        orientation = orientations[Math.floor(Math.random() * 2)];
        if (orientation === 'horiz' && column + object.length - 1 > 9) {
          getRandom();
        }
        if (orientation === 'vert' && row + object.length - 1 > 9) {
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
        flag = false;
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
            console.log('attack conditional ran');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFFcEM4QixrREFBUyxDQUFDQyxjQUFjLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZXBsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGxldCBib2FyZDtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBsZXQgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHNoaXBzID0gW107XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcbiAgXHJcbiAgICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxyXG4gIH0gXHJcblxyXG4gIGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pID0+IHtcclxuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gIT09IHNoaXApIHtcclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gc2hpcDtcclxuXHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByYW5kb21TaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmFuZG9tU2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3JpeicsICd2ZXJ0J107XHJcblxyXG4gICAgcmFuZG9tU2hpcHMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2x1bW47XHJcbiAgICAgIGxldCBvcmllbnRhdGlvbjtcclxuICAgICAgbGV0IGZsYWc7XHJcbiAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbSgpIHtcclxuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonICYmIChjb2x1bW4gKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSB7XHJcbiAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAndmVydCcgJiYgKHJvdyArIG9iamVjdC5sZW5ndGggLSAxKSA+IDkpIHtcclxuICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gY29sdW1uOyBpIDwgY29sdW1uICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbcm93XVtpXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICBmbGFnID0gKGJvYXJkW2ldW2NvbHVtbl0gIT09ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGdldFJhbmRvbSgpO1xyXG5cclxuICAgICAgcGxhY2VTaGlwKG9iamVjdCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TnVtUmVtYWluaW5nID0gKCkgPT4gXHJcbiAgICAvLyBmb3IgZWFjaCBzaGlwIGluIHRoZSBzaGlwcyBhcnJheSwgY2hlY2sgaWYgaXQncyBzdW5rIG9yIG5vdC4gSWZcclxuICAgIC8vIGl0J3Mgbm90IHN1bmssIGFkZCBvbmUgdG8gdGhlIGNvdW50LlxyXG4gICAgIHNoaXBzLnJlZHVjZSgodG90YWwsIHNoaXApID0+IHtcclxuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XHJcbiAgICAgICAgdG90YWwgKz0gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG90YWw7XHJcbiAgICB9LCAwKTtcclxuICBcclxuXHJcbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcclxuICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmRbcm93XVtjb2x1bW5dO1xyXG4gICAgLy8gYWxyZWFkeSBndWVzc2VkXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSBcIm1pc3NcIiB8fCBib2FyZENlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgcmV0dXJuIFwiQWxyZWFkeSBndWVzc2VkLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaXAgaGFzIGJlZW4gaGl0XHJcbiAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwiaGl0XCI7XHJcbiAgICAgIGlmIChhbGxTdW5rKCkpIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNoaXAgaGFzIG5vdCBiZWVuIGhpdFxyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1pc3NcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7Z2V0TnVtUmVtYWluaW5nLCByYW5kb21TaGlwUGxhY2VtZW50LCBhbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiB7XHJcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuXHJcbiAgICByZXR1cm4gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoc2hpcHNQbGFjZWRBcnJheSkgPT4ge1xyXG4gICAgc2hpcHNQbGFjZWRBcnJheS5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgbXlCb2FyZC5wbGFjZVNoaXAob2JqZWN0LnNoaXAsIG9iamVjdC5yb3csIG9iamVjdC5jb2x1bW4sIG9iamVjdC5vcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TXlCb2FyZCA9ICgpID0+IG15Qm9hcmRcclxuXHJcbiAgY29uc3QgY2hvb3NlUmFuZG9tQ29vcmQgPSAoYm9hcmQpID0+IHtcclxuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl07XHJcblxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gJ21pc3MnIHx8IGJvYXJkQ2VsbCA9PT0gJ2hpdCcpIHtcclxuICAgICAgY2hvb3NlUmFuZG9tQ29vcmQoYm9hcmQpO1xyXG4gICAgfSBcclxuXHJcbiAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyTXlCb2FyZCA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiBteUJvYXJkLmFsbFN1bmsoKVxyXG5cclxuICBjb25zdCBnZXRSZW1haW5pbmdTaGlwcyA9ICgpID0+IG15Qm9hcmQuZ2V0TnVtUmVtYWluaW5nKClcclxuXHJcbiAgcmV0dXJuIHtnZXRSZW1haW5pbmdTaGlwcywgZ2FtZU92ZXIsIHBsYWNlU2hpcHNSYW5kb21seSwgY2xlYXJNeUJvYXJkLCBnZXRNeUJvYXJkLCBwbGFjZVNoaXBzLCBhdHRhY2ssIGNob29zZVJhbmRvbUNvb3JkfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuXHJcbi8vIGNyZWF0ZSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSB7XHJcbiAgc3RhdGljIHBsYXllciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgY29tcHV0ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIHBsYXllck1vdmUocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5wbGF5ZXIuYXR0YWNrKHJvdywgY29sdW1uLCB0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5kaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgJ2NvbXB1dGVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHModGhpcy5jb21wdXRlci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkucGxheWVyV2lucygpOyAgICAgLy8gcGxheWVyIGhhcyB3b25cclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlck1vdmUoKSB7XHJcbiAgICBjb25zdCBjb29yZHMgPSB0aGlzLmNvbXB1dGVyLmNob29zZVJhbmRvbUNvb3JkKHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMuY29tcHV0ZXIuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgVUkuc2hvd1JlbWFpbmluZ1BsYXllclNoaXBzKHRoaXMucGxheWVyLmdldFJlbWFpbmluZ1NoaXBzKCkpO1xyXG4gICAgaWYgKHRoaXMucGxheWVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkuY29tcHV0ZXJXaW5zKCk7XHJcbiAgICAgIC8vIGNvbXB1dGVyIGhhcyB3b25cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdGFydEdhbWUoc2hpcHNBcnJheSkge1xyXG4gICAgLy8gY2xlYXIgdGhlIGJvYXJkc1xyXG4gICAgdGhpcy5jb21wdXRlci5jbGVhck15Qm9hcmQoKTtcclxuICAgIHRoaXMucGxheWVyLmNsZWFyTXlCb2FyZCgpO1xyXG5cclxuICAgIC8vIGhhdmUgdGhlIHBsYXllciBwbGFjZSB0aGVpciBzaGlwc1xyXG4gICAgdGhpcy5wbGF5ZXIucGxhY2VTaGlwcyhzaGlwc0FycmF5KTtcclxuXHJcbiAgICAvLyBlbmVteSBwbGFjZXMgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMuY29tcHV0ZXIucGxhY2VTaGlwc1JhbmRvbWx5KCk7XHJcblxyXG4gICAgLy8gc2hvdyB0aGUgYm9hcmRzXHJcbiAgICBVSS5jcmVhdGVQbGF5ZXJCb2FyZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuY3JlYXRlT3Bwb25lbnRCb2FyZCh0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcblxyXG4gICAgVUkuc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHModGhpcy5jb21wdXRlci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIFVJLnNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyh0aGlzLnBsYXllci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi9nYW1lcGxheSdcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXBcIjtcclxuXHJcbmNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUnKTtcclxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYWdhaW4nKTtcclxuY29uc3QgcGxhY2VTaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwcy1jb250YWluZXInKTtcclxuY29uc3QgbWFpbkJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcclxuY29uc3Qga2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmtleScpO1xyXG5cclxuXHJcbmNvbnN0IGF2YWlsYWJsZVNoaXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG5cclxuICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXJzIHtcclxuICBzdGF0aWMgb3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG5cclxuICBzdGF0aWMgc2hpcEluZGV4ID0gMDtcclxuXHJcbiAgc3RhdGljIHNoaXBzUGxhY2VkID0gW107XHJcblxyXG4gIHN0YXRpYyBzaGlwcyA9IGF2YWlsYWJsZVNoaXBzKCk7XHJcblxyXG4gIHN0YXRpYyBldmVudExpc3RlbmVycygpIHtcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG5cclxuICAgIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5yb3RhdGVTaGlwKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBoYXZpbmcgc29tZSB0cm91YmxlIHdpdGggcmVzZXR0aW5nIGFuZCBwbGF5aW5nIGEgbmV3IGdhbWUuIE5lZWRcclxuICAgIC8vIHRvIHJlc2V0IHRoZSBtYWluIGJvYXJkcy4gVGhleSBhcmVuJ3QgY2xlYXJpbmcgcHJvcGVybHlcclxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgdGhpcy5zdGFydEdhbWUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBsYXlBZ2FpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgcGxhY2VTaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICBrZXkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSgpIHtcclxuICAgIEdhbWVwbGF5LnN0YXJ0R2FtZSh0aGlzLnNoaXBzUGxhY2VkKTtcclxuICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIGtleS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFkZFBsYWNlU2hpcExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BsYWNlLXNoaXBzLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgcm93IH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IHsgY29sdW1uIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGlmICh0aGlzLnNoaXBJbmRleCA8IDUgJiYgdGhpcy5pc0xlZ2FsU2hpcFBsYWNlbWVudCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uKSkge1xyXG4gICAgICAgICAgdGhpcy5wbGFjZVNoaXAocm93LCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRBdHRhY2tMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBlbmVteUNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBlbmVteUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnYXR0YWNrIGNvbmRpdGlvbmFsIHJhbicpO1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gJycpIHtcclxuICAgICAgICAgIEdhbWVwbGF5LnBsYXllck1vdmUoZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBVSS5wbGFjZVNoaXAodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbiwgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICBjb25zdCBzaGlwc0luZm9PYmplY3QgPSB7XHJcbiAgICAgIFwic2hpcFwiOiB0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XSxcclxuICAgICAgXCJyb3dcIjogTnVtYmVyKHJvdyksXHJcbiAgICAgIFwiY29sdW1uXCI6IE51bWJlcihjb2x1bW4pLFxyXG4gICAgICBcIm9yaWVudGF0aW9uXCI6IHRoaXMub3JpZW50YXRpb25cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHNQbGFjZWQucHVzaChzaGlwc0luZm9PYmplY3QpO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggKz0gMTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc0xlZ2FsU2hpcFBsYWNlbWVudChsZW5ndGgsIHJvdywgY29sdW1uKSB7XHJcbiAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIGNlbGxzIGhhcyBhIHNoaXAgaW4gaXRcclxuXHJcbiAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgICAgaWYgKE51bWJlcihjb2x1bW4pICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFyZ2V0IGNlbGxzIGFscmVhZHkgaGFzIGEgc2hpcCBpbiBpdFxyXG4gICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihjb2x1bW4pOyBpIDwgTnVtYmVyKGNvbHVtbikgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChyb3csIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgIGlmIChOdW1iZXIocm93KSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gTnVtYmVyKHJvdyk7IGkgPCBOdW1iZXIocm93KSArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKGksIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJvdGF0ZVNoaXAoKSB7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6JyA/ICd2ZXJ0JyA6ICdob3Jpeic7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVzZXQoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuICAgIHRoaXMuc2hpcEluZGV4ID0gMDtcclxuICAgIHRoaXMuc2hpcHNQbGFjZWQgPSBbXTtcclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcclxuICBzdGF0aWMgY3JlYXRlQm9hcmQoaWQsIGJvYXJkID0gbnVsbCkge1xyXG4gICAgZm9yKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiAgPSBjb2x1bW47XHJcbiAgICAgICAgaWYgKGJvYXJkICYmIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSAhPT0gJycpIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVQbGF5ZXJCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgncGxheWVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZU9wcG9uZW50Qm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ2NvbXB1dGVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCkge1xyXG4gICAgbGV0IHBpY2tlZDtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7aWR9IC5jZWxsYCk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGlmIChjZWxsLmRhdGFzZXQucm93ID09PSByb3cgJiYgY2VsbC5kYXRhc2V0LmNvbHVtbiA9PT0gY29sdW1uKSB7XHJcbiAgICAgICAgcGlja2VkID0gY2VsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGlja2VkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCBpZCwgaXNIaXQpIHtcclxuICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMuZmluZENlbGwocm93LCBjb2x1bW4sIGlkKTtcclxuXHJcbiAgICBpZiAoaXNIaXQpIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnTyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSB7XHJcbiAgICBsZXQgY2hvaWNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKHJvdywgKE51bWJlcihjb2x1bW4pICsgaSkudG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbCgoTnVtYmVyKHJvdykgKyBpKS50b1N0cmluZygpLCBjb2x1bW4sICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNob2ljZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29udGFpbnNTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5maW5kQ2VsbChyb3cudG9TdHJpbmcoKSwgY29sdW1uLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgcmV0dXJuIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxheWVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnWW91IHdpbiEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyhudW0pIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItc2hpcHMnKS50ZXh0Q29udGVudCA9IGBTaGlwcyBSZW1haW5pbmc6ICR7bnVtfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHMobnVtKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXItc2hpcHMnKS50ZXh0Q29udGVudCA9IGBTaGlwcyBSZW1haW5pbmc6ICR7bnVtfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJXaW5zKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IC53aW5uZXInKS50ZXh0Q29udGVudCA9ICdDb21wdXRlciB3aW5zISc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IExpc3RlbmVycyBmcm9tICcuL2xpc3RlbmVycyc7XHJcblxyXG5MaXN0ZW5lcnMuZXZlbnRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOlsiU2hpcCIsImdhbWVib2FyZCIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJBcnJheSIsIm1hcCIsImZpbGwiLCJzaGlwcyIsImNsZWFyQm9hcmQiLCJhdmFpbGFibGVTaGlwcyIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInNob3dCb2FyZCIsInBsYWNlU2hpcCIsInNoaXAiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsInB1c2giLCJpIiwibGVuZ3RoIiwicmFuZG9tU2hpcFBsYWNlbWVudCIsInJhbmRvbVNoaXBzIiwib3JpZW50YXRpb25zIiwiZm9yRWFjaCIsIm9iamVjdCIsImNvbHVtbiIsImZsYWciLCJnZXRSYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZXROdW1SZW1haW5pbmciLCJyZWR1Y2UiLCJ0b3RhbCIsImlzU3VuayIsImFsbFN1bmsiLCJldmVyeSIsInJlY2VpdmVBdHRhY2siLCJib2FyZENlbGwiLCJfdHlwZW9mIiwiaGl0IiwiUGxheWVyIiwibXlCb2FyZCIsImF0dGFjayIsInBsYWNlU2hpcHMiLCJzaGlwc1BsYWNlZEFycmF5IiwicGxhY2VTaGlwc1JhbmRvbWx5IiwiZ2V0TXlCb2FyZCIsImNob29zZVJhbmRvbUNvb3JkIiwiY2xlYXJNeUJvYXJkIiwiZ2FtZU92ZXIiLCJnZXRSZW1haW5pbmdTaGlwcyIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJVSSIsIkdhbWVwbGF5Iiwia2V5IiwidmFsdWUiLCJwbGF5ZXJNb3ZlIiwiaXNIaXQiLCJwbGF5ZXIiLCJjb21wdXRlciIsImRpc3BsYXlNb3ZlUmVzdWx0Iiwic2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHMiLCJwbGF5ZXJXaW5zIiwic2V0VGltZW91dCIsImNvbXB1dGVyTW92ZSIsImNvb3JkcyIsInRvU3RyaW5nIiwic2hvd1JlbWFpbmluZ1BsYXllclNoaXBzIiwiY29tcHV0ZXJXaW5zIiwic3RhcnRHYW1lIiwic2hpcHNBcnJheSIsImNyZWF0ZVBsYXllckJvYXJkIiwiY3JlYXRlT3Bwb25lbnRCb2FyZCIsImRlZmF1bHQiLCJyb3RhdGVCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3RhcnRCdG4iLCJwbGF5QWdhaW5CdG4iLCJwbGFjZVNoaXBzQ29udGFpbmVyIiwibWFpbkJvYXJkc0NvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJMaXN0ZW5lcnMiLCJldmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3RhdGVTaGlwIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJhZGRQbGFjZVNoaXBMaXN0ZW5lcnMiLCJzaGlwc1BsYWNlZCIsImFkZEF0dGFja0xpc3RlbmVycyIsInJlc2V0IiwiX3RoaXMyIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic2hpcEluZGV4IiwiaXNMZWdhbFNoaXBQbGFjZW1lbnQiLCJlbmVteUNlbGxzIiwiY29udGFpbnMiLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJzaGlwc0luZm9PYmplY3QiLCJOdW1iZXIiLCJjb250YWluc1NoaXAiLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImZpbmRDZWxsIiwicGlja2VkIiwiY29uY2F0IiwiY2hvaWNlIiwibnVtIl0sInNvdXJjZVJvb3QiOiIifQ==