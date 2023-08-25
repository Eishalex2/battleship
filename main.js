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
  var hasAdjacentShips = function hasAdjacentShips(ship, row, col, orientation) {
    // may not be testing the adjacent square
    if (orientation === 'horiz') {
      // check sides
      for (var i = col - 1; i < ship.length + col + 1; i++) {
        if (i < 0) continue;
        if (i > 9) break;
        if (row > 0 && board[row - 1][i] !== '') return true;
      }
      for (var _i2 = col - 1; _i2 < ship.length + col + 1; _i2++) {
        if (_i2 < 0) continue;
        if (_i2 > 9) break;
        if (row < 9 && board[row + 1][_i2] !== '') return true;
      }
      // check left and right cells
      if (col > 0 && board[row][col - 1] !== '') return true;
      if (col < 9 && board[row][col + 1] !== '') return true;
    }
    if (orientation === 'vert') {
      // check sides
      for (var _i3 = row - 1; _i3 < ship.length + row + 1; _i3++) {
        if (_i3 < 0) continue;
        if (_i3 > 9) break;
        if (col > 0 && board[col - 1][_i3] !== '') return true;
      }
      for (var _i4 = row - 1; _i4 < ship.length + row + 1; _i4++) {
        if (_i4 < 0) continue;
        if (_i4 > 9) break;
        if (col < 9 && board[col + 1][_i4] !== '') return true;
      }

      // check top and bottom cells
      if (row > 0 && board[row - 1][col] !== '') return true;
      if (row < 9 && board[row + 1][col] !== '') return true;
    }
    return false;
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
        if (hasAdjacentShips(object, row, column, orientation)) {
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
          for (var _i5 = row; _i5 < row + object.length; _i5++) {
            if (!flag) {
              flag = board[_i5][column] !== '';
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
    console.log(myBoard.showBoard());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2pFO0VBQUM7RUFBQSxPQUFBckMsRUFBQTtBQUFBOzs7Ozs7O1VDdEZIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vQztBQUVwQzhCLGtEQUFTLENBQUNDLGNBQWMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Zpc2libGVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgbGV0IGJvYXJkO1xyXG5cclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGxldCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBjbGVhckJvYXJkID0gKCkgPT4ge1xyXG4gICAgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgc2hpcHMgPSBbXTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGF2YWlsYWJsZVNoaXBzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuICBcclxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbiAgfSBcclxuXHJcbiAgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xyXG5cclxuICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiBib2FyZDtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSAhPT0gc2hpcCkge1xyXG4gICAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBzaGlwO1xyXG5cclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGhhc0FkamFjZW50U2hpcHMgPSAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICAvLyBtYXkgbm90IGJlIHRlc3RpbmcgdGhlIGFkamFjZW50IHNxdWFyZVxyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIC8vIGNoZWNrIHNpZGVzXHJcbiAgICAgIGZvciAobGV0IGkgPSBjb2wgLSAxOyBpIDwgc2hpcC5sZW5ndGggKyBjb2wgKyAxOyBpKyspIHtcclxuICAgICAgICBpZiAoaSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmIChpID4gOSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1baV0gIT09ICcnKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gY29sIC0gMTsgaSA8IHNoaXAubGVuZ3RoICsgY29sICsgMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICBpZiAoaSA+IDkpIGJyZWFrO1xyXG4gICAgICAgIGlmIChyb3cgPCA5ICYmIGJvYXJkW3JvdyArIDFdW2ldICE9PSAnJykgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY2hlY2sgbGVmdCBhbmQgcmlnaHQgY2VsbHNcclxuICAgICAgaWYgKGNvbCA+IDAgJiYgYm9hcmRbcm93XVtjb2wgLSAxXSAhPT0gJycpIHJldHVybiB0cnVlO1xyXG4gICAgICBpZiAoY29sIDwgOSAmJiBib2FyZFtyb3ddW2NvbCArIDFdICE9PSAnJykgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAndmVydCcpIHtcclxuICAgICAgLy8gY2hlY2sgc2lkZXNcclxuICAgICAgZm9yIChsZXQgaSA9IHJvdyAtIDE7IGkgPCBzaGlwLmxlbmd0aCArIHJvdyArIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChpIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgaWYgKGkgPiA5KSBicmVhaztcclxuICAgICAgICBpZiAoY29sID4gMCAmJiBib2FyZFtjb2wgLSAxXVtpXSAhPT0gJycpIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSByb3cgLSAxOyBpIDwgc2hpcC5sZW5ndGggKyByb3cgKyAxOyBpKyspIHtcclxuICAgICAgICBpZiAoaSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmIChpID4gOSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGNvbCA8IDkgJiYgYm9hcmRbY29sICsgMV1baV0gIT09ICcnKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2hlY2sgdG9wIGFuZCBib3R0b20gY2VsbHNcclxuICAgICAgaWYgKHJvdyA+IDAgJiYgYm9hcmRbcm93IC0gMV1bY29sXSAhPT0gJycpIHJldHVybiB0cnVlO1xyXG4gICAgICBpZiAocm93IDwgOSAmJiBib2FyZFtyb3cgKyAxXVtjb2xdICE9PSAnJykgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhbmRvbVNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXonLCAndmVydCddO1xyXG5cclxuICAgIHJhbmRvbVNoaXBzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sdW1uO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb247XHJcbiAgICAgIGxldCBmbGFnO1xyXG4gICAgICBmdW5jdGlvbiBnZXRSYW5kb20oKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6JyAmJiAoY29sdW1uICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkge1xyXG4gICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnICYmIChyb3cgKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSB7XHJcbiAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNBZGphY2VudFNoaXBzKG9iamVjdCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSkge1xyXG4gICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZhbHNlID0gbm8gc2hpcFxyXG4gICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSBjb2x1bW47IGkgPCBjb2x1bW4gKyBvYmplY3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICAgICAgZmxhZyA9IChib2FyZFtyb3ddW2ldICE9PSAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbaV1bY29sdW1uXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZ2V0UmFuZG9tKCk7XHJcblxyXG4gICAgICBwbGFjZVNoaXAob2JqZWN0LCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXROdW1SZW1haW5pbmcgPSAoKSA9PiBcclxuICAgIC8vIGZvciBlYWNoIHNoaXAgaW4gdGhlIHNoaXBzIGFycmF5LCBjaGVjayBpZiBpdCdzIHN1bmsgb3Igbm90LiBJZlxyXG4gICAgLy8gaXQncyBub3Qgc3VuaywgYWRkIG9uZSB0byB0aGUgY291bnQuXHJcbiAgICAgc2hpcHMucmVkdWNlKCh0b3RhbCwgc2hpcCkgPT4ge1xyXG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcclxuICAgICAgICB0b3RhbCArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b3RhbDtcclxuICAgIH0sIDApO1xyXG4gIFxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtnZXROdW1SZW1haW5pbmcsIHJhbmRvbVNoaXBQbGFjZW1lbnQsIGFsbFN1bmssIGNsZWFyQm9hcmQsIHNob3dCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuICBjb25zdCBteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IGF0dGFjayA9IChyb3csIGNvbHVtbiwgYm9hcmQpID0+IHtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xyXG5cclxuICAgIHJldHVybiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09ICdoaXQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc1BsYWNlZEFycmF5KSA9PiB7XHJcbiAgICBzaGlwc1BsYWNlZEFycmF5LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBteUJvYXJkLnBsYWNlU2hpcChvYmplY3Quc2hpcCwgb2JqZWN0LnJvdywgb2JqZWN0LmNvbHVtbiwgb2JqZWN0Lm9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XHJcbiAgICBjb25zb2xlLmxvZyhteUJvYXJkLnNob3dCb2FyZCgpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE15Qm9hcmQgPSAoKSA9PiBteUJvYXJkXHJcblxyXG4gIGNvbnN0IGNob29zZVJhbmRvbUNvb3JkID0gKGJvYXJkKSA9PiB7XHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dO1xyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09ICdtaXNzJyB8fCBib2FyZENlbGwgPT09ICdoaXQnKSB7XHJcbiAgICAgIGNob29zZVJhbmRvbUNvb3JkKGJvYXJkKTtcclxuICAgIH0gXHJcblxyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck15Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4gbXlCb2FyZC5hbGxTdW5rKClcclxuXHJcbiAgY29uc3QgZ2V0UmVtYWluaW5nU2hpcHMgPSAoKSA9PiBteUJvYXJkLmdldE51bVJlbWFpbmluZygpXHJcblxyXG4gIHJldHVybiB7Z2V0UmVtYWluaW5nU2hpcHMsIGdhbWVPdmVyLCBwbGFjZVNoaXBzUmFuZG9tbHksIGNsZWFyTXlCb2FyZCwgZ2V0TXlCb2FyZCwgcGxhY2VTaGlwcywgYXR0YWNrLCBjaG9vc2VSYW5kb21Db29yZH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgfVxyXG4gIFxyXG4gIGhpdENvdW50ID0gMDtcclxuXHJcbiAgaGl0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5oaXRDb3VudCArPSAxO1xyXG4gIH1cclxuICBcclxuICBpc1N1bmsgPSAoKSA9PiB0aGlzLmhpdENvdW50ID49IHRoaXMubGVuZ3RoXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9jb21wb25lbnRzL3BsYXllclwiO1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXBsYXkge1xyXG4gIHN0YXRpYyBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBwbGF5ZXJNb3ZlKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMucGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgdGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sICdjb21wdXRlci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIFVJLnNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBpZiAodGhpcy5jb21wdXRlci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLnBsYXllcldpbnMoKTsgICAgIC8vIHBsYXllciBoYXMgd29uXHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jb21wdXRlck1vdmUoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJNb3ZlKCkge1xyXG4gICAgY29uc3QgY29vcmRzID0gdGhpcy5jb21wdXRlci5jaG9vc2VSYW5kb21Db29yZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLmNvbXB1dGVyLmF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgdGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KGNvb3Jkc1swXS50b1N0cmluZygpLCBjb29yZHNbMV0udG9TdHJpbmcoKSwgJ3BsYXllci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIFVJLnNob3dSZW1haW5pbmdQbGF5ZXJTaGlwcyh0aGlzLnBsYXllci5nZXRSZW1haW5pbmdTaGlwcygpKTtcclxuICAgIGlmICh0aGlzLnBsYXllci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLmNvbXB1dGVyV2lucygpO1xyXG4gICAgICAvLyBjb21wdXRlciBoYXMgd29uXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIFVJLnNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKHRoaXMuY29tcHV0ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgICBVSS5zaG93UmVtYWluaW5nUGxheWVyU2hpcHModGhpcy5wbGF5ZXIuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcbmNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZXknKTtcclxuXHJcblxyXG5jb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuXHJcbiAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbmVycyB7XHJcbiAgc3RhdGljIG9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuXHJcbiAgc3RhdGljIHNoaXBJbmRleCA9IDA7XHJcblxyXG4gIHN0YXRpYyBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuICBzdGF0aWMgc2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG5cclxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuXHJcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucm90YXRlU2hpcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaGF2aW5nIHNvbWUgdHJvdWJsZSB3aXRoIHJlc2V0dGluZyBhbmQgcGxheWluZyBhIG5ldyBnYW1lLiBOZWVkXHJcbiAgICAvLyB0byByZXNldCB0aGUgbWFpbiBib2FyZHMuIFRoZXkgYXJlbid0IGNsZWFyaW5nIHByb3Blcmx5XHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAga2V5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdGFydEdhbWUoKSB7XHJcbiAgICBHYW1lcGxheS5zdGFydEdhbWUodGhpcy5zaGlwc1BsYWNlZCk7XHJcbiAgICB0aGlzLmFkZEF0dGFja0xpc3RlbmVycygpO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gICAgcGxhY2VTaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIG1haW5Cb2FyZHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICBrZXkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1ICYmIHRoaXMuaXNMZWdhbFNoaXBQbGFjZW1lbnQodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbikpIHtcclxuICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkQXR0YWNrTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZW5lbXlDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpO1xyXG4gICAgZW5lbXlDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2F0dGFjayBjb25kaXRpb25hbCByYW4nKTtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICBHYW1lcGxheS5wbGF5ZXJNb3ZlKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgVUkucGxhY2VTaGlwKHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4sIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgY29uc3Qgc2hpcHNJbmZvT2JqZWN0ID0ge1xyXG4gICAgICBcInNoaXBcIjogdGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0sXHJcbiAgICAgIFwicm93XCI6IE51bWJlcihyb3cpLFxyXG4gICAgICBcImNvbHVtblwiOiBOdW1iZXIoY29sdW1uKSxcclxuICAgICAgXCJvcmllbnRhdGlvblwiOiB0aGlzLm9yaWVudGF0aW9uXHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkLnB1c2goc2hpcHNJbmZvT2JqZWN0KTtcclxuICAgIHRoaXMuc2hpcEluZGV4ICs9IDE7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNMZWdhbFNoaXBQbGFjZW1lbnQobGVuZ3RoLCByb3csIGNvbHVtbikge1xyXG4gICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSBjZWxscyBoYXMgYSBzaGlwIGluIGl0XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChOdW1iZXIoY29sdW1uKSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBOdW1iZXIoY29sdW1uKTsgaSA8IE51bWJlcihjb2x1bW4pICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAocm93LCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICBpZiAoTnVtYmVyKHJvdykgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihyb3cpOyBpIDwgTnVtYmVyKHJvdykgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChpLCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyByb3RhdGVTaGlwKCkge1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicgPyAndmVydCcgOiAnaG9yaXonO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlc2V0KCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXBzLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcbiAgICB0aGlzLnNoaXBJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkID0gW107XHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XHJcbiAgc3RhdGljIGNyZWF0ZUJvYXJkKGlkLCBib2FyZCA9IG51bGwpIHtcclxuICAgIGZvcihsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gID0gY29sdW1uO1xyXG4gICAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBpY2tlZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgICBjb25zdCBwaWNrZWQgPSB0aGlzLmZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gICAgaWYgKGlzSGl0KSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbikge1xyXG4gICAgbGV0IGNob2ljZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbChyb3csIChOdW1iZXIoY29sdW1uKSArIGkpLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwoKE51bWJlcihyb3cpICsgaSkudG9TdHJpbmcoKSwgY29sdW1uLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfVxyXG4gICAgICBjaG9pY2UuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRhaW5zU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZmluZENlbGwocm93LnRvU3RyaW5nKCksIGNvbHVtbi50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYXllcldpbnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYgLndpbm5lcicpLnRleHRDb250ZW50ID0gJ1lvdSB3aW4hJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzaG93UmVtYWluaW5nUGxheWVyU2hpcHMobnVtKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNoaXBzJykudGV4dENvbnRlbnQgPSBgU2hpcHMgUmVtYWluaW5nOiAke251bX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dSZW1haW5pbmdDb21wdXRlclNoaXBzKG51bSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXB1dGVyLXNoaXBzJykudGV4dENvbnRlbnQgPSBgU2hpcHMgUmVtYWluaW5nOiAke251bX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiAud2lubmVyJykudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgd2lucyEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuTGlzdGVuZXJzLmV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lYm9hcmQiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiQXJyYXkiLCJtYXAiLCJmaWxsIiwic2hpcHMiLCJjbGVhckJvYXJkIiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlwIiwicm93IiwiY29sIiwib3JpZW50YXRpb24iLCJwdXNoIiwiaSIsImxlbmd0aCIsImhhc0FkamFjZW50U2hpcHMiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiZmxhZyIsImdldFJhbmRvbSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdldE51bVJlbWFpbmluZyIsInJlZHVjZSIsInRvdGFsIiwiaXNTdW5rIiwiYWxsU3VuayIsImV2ZXJ5IiwicmVjZWl2ZUF0dGFjayIsImJvYXJkQ2VsbCIsIl90eXBlb2YiLCJoaXQiLCJQbGF5ZXIiLCJteUJvYXJkIiwiYXR0YWNrIiwicGxhY2VTaGlwcyIsInNoaXBzUGxhY2VkQXJyYXkiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJjb25zb2xlIiwibG9nIiwiZ2V0TXlCb2FyZCIsImNob29zZVJhbmRvbUNvb3JkIiwiY2xlYXJNeUJvYXJkIiwiZ2FtZU92ZXIiLCJnZXRSZW1haW5pbmdTaGlwcyIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJVSSIsIkdhbWVwbGF5Iiwia2V5IiwidmFsdWUiLCJwbGF5ZXJNb3ZlIiwiaXNIaXQiLCJwbGF5ZXIiLCJjb21wdXRlciIsImRpc3BsYXlNb3ZlUmVzdWx0Iiwic2hvd1JlbWFpbmluZ0NvbXB1dGVyU2hpcHMiLCJwbGF5ZXJXaW5zIiwic2V0VGltZW91dCIsImNvbXB1dGVyTW92ZSIsImNvb3JkcyIsInRvU3RyaW5nIiwic2hvd1JlbWFpbmluZ1BsYXllclNoaXBzIiwiY29tcHV0ZXJXaW5zIiwic3RhcnRHYW1lIiwic2hpcHNBcnJheSIsImNyZWF0ZVBsYXllckJvYXJkIiwiY3JlYXRlT3Bwb25lbnRCb2FyZCIsImRlZmF1bHQiLCJyb3RhdGVCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3RhcnRCdG4iLCJwbGF5QWdhaW5CdG4iLCJwbGFjZVNoaXBzQ29udGFpbmVyIiwibWFpbkJvYXJkc0NvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJMaXN0ZW5lcnMiLCJldmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3RhdGVTaGlwIiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJhZGRQbGFjZVNoaXBMaXN0ZW5lcnMiLCJzaGlwc1BsYWNlZCIsImFkZEF0dGFja0xpc3RlbmVycyIsInJlc2V0IiwiX3RoaXMyIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic2hpcEluZGV4IiwiaXNMZWdhbFNoaXBQbGFjZW1lbnQiLCJlbmVteUNlbGxzIiwiY29udGFpbnMiLCJwcmV2ZW50RGVmYXVsdCIsInNoaXBzSW5mb09iamVjdCIsIk51bWJlciIsImNvbnRhaW5zU2hpcCIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJjaG9pY2UiLCJudW0iXSwic291cmNlUm9vdCI6IiJ9