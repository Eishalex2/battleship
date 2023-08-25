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
  return {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBRXBDNEIsa0RBQVMsQ0FBQ0MsY0FBYyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlzaWJsZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBsZXQgYm9hcmQ7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xyXG4gICAgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBsZXQgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHNoaXBzID0gW107XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcCg1KTtcclxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcbiAgXHJcbiAgICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXVxyXG4gIH0gXHJcblxyXG4gIGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4gYm9hcmQ7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pID0+IHtcclxuICAgIGlmIChib2FyZFtyb3ddW2NvbF0gIT09IHNoaXApIHtcclxuICAgICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2xdID0gc2hpcDtcclxuXHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByYW5kb21TaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmFuZG9tU2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3JpeicsICd2ZXJ0J107XHJcblxyXG4gICAgcmFuZG9tU2hpcHMuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIGxldCByb3c7XHJcbiAgICAgIGxldCBjb2x1bW47XHJcbiAgICAgIGxldCBvcmllbnRhdGlvbjtcclxuICAgICAgbGV0IGZsYWc7XHJcbiAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbSgpIHtcclxuICAgICAgICByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonICYmIChjb2x1bW4gKyBvYmplY3QubGVuZ3RoIC0gMSkgPiA5KSB7XHJcbiAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAndmVydCcgJiYgKHJvdyArIG9iamVjdC5sZW5ndGggLSAxKSA+IDkpIHtcclxuICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmYWxzZSA9IG5vIHNoaXBcclxuICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gY29sdW1uOyBpIDwgY29sdW1uICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbcm93XVtpXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8IHJvdyArIG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICBmbGFnID0gKGJvYXJkW2ldW2NvbHVtbl0gIT09ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGdldFJhbmRvbSgpO1xyXG5cclxuICAgICAgcGxhY2VTaGlwKG9iamVjdCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWxsU3VuaygpIHtcclxuICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmRbcm93XVtjb2x1bW5dO1xyXG4gICAgLy8gYWxyZWFkeSBndWVzc2VkXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSBcIm1pc3NcIiB8fCBib2FyZENlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgcmV0dXJuIFwiQWxyZWFkeSBndWVzc2VkLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaXAgaGFzIGJlZW4gaGl0XHJcbiAgICBpZiAodHlwZW9mIGJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0uaGl0KCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwiaGl0XCI7XHJcbiAgICAgIGlmIChhbGxTdW5rKCkpIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNoaXAgaGFzIG5vdCBiZWVuIGhpdFxyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1pc3NcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7cmFuZG9tU2hpcFBsYWNlbWVudCwgYWxsU3VuaywgY2xlYXJCb2FyZCwgc2hvd0JvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDsiLCJpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IG15Qm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3QgYXR0YWNrID0gKHJvdywgY29sdW1uLCBib2FyZCkgPT4ge1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbik7XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSA9PT0gJ2hpdCc7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzID0gKHNoaXBzUGxhY2VkQXJyYXkpID0+IHtcclxuICAgIHNoaXBzUGxhY2VkQXJyYXkuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgIG15Qm9hcmQucGxhY2VTaGlwKG9iamVjdC5zaGlwLCBvYmplY3Qucm93LCBvYmplY3QuY29sdW1uLCBvYmplY3Qub3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzUmFuZG9tbHkgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdldE15Qm9hcmQgPSAoKSA9PiBteUJvYXJkXHJcblxyXG4gIGNvbnN0IGNob29zZVJhbmRvbUNvb3JkID0gKGJvYXJkKSA9PiB7XHJcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dO1xyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09ICdtaXNzJyB8fCBib2FyZENlbGwgPT09ICdoaXQnKSB7XHJcbiAgICAgIGNob29zZVJhbmRvbUNvb3JkKGJvYXJkKTtcclxuICAgIH0gXHJcblxyXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck15Qm9hcmQgPSAoKSA9PiB7XHJcbiAgICBteUJvYXJkLmNsZWFyQm9hcmQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4gbXlCb2FyZC5hbGxTdW5rKClcclxuXHJcbiAgcmV0dXJuIHtnYW1lT3ZlciwgcGxhY2VTaGlwc1JhbmRvbWx5LCBjbGVhck15Qm9hcmQsIGdldE15Qm9hcmQsIHBsYWNlU2hpcHMsIGF0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IHtcclxuICBzdGF0aWMgcGxheWVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLnBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIHRoaXMuY29tcHV0ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICBpZiAodGhpcy5jb21wdXRlci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLnBsYXllcldpbnMoKTsgICAgIC8vIHBsYXllciBoYXMgd29uXHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jb21wdXRlck1vdmUoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJNb3ZlKCkge1xyXG4gICAgY29uc3QgY29vcmRzID0gdGhpcy5jb21wdXRlci5jaG9vc2VSYW5kb21Db29yZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLmNvbXB1dGVyLmF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgdGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KGNvb3Jkc1swXS50b1N0cmluZygpLCBjb29yZHNbMV0udG9TdHJpbmcoKSwgJ3BsYXllci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIGlmICh0aGlzLnBsYXllci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLmNvbXB1dGVyV2lucygpO1xyXG4gICAgICAvLyBjb21wdXRlciBoYXMgd29uXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIC8vIHRha2UgdHVybnMgYW5kIHBsYXkgdGhlIGdhbWVcclxuXHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcbmNvbnN0IGtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rZXknKTtcclxuXHJcblxyXG5jb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuXHJcbiAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbmVycyB7XHJcbiAgc3RhdGljIG9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuXHJcbiAgc3RhdGljIHNoaXBJbmRleCA9IDA7XHJcblxyXG4gIHN0YXRpYyBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuICBzdGF0aWMgc2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG5cclxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuXHJcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucm90YXRlU2hpcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaGF2aW5nIHNvbWUgdHJvdWJsZSB3aXRoIHJlc2V0dGluZyBhbmQgcGxheWluZyBhIG5ldyBnYW1lLiBOZWVkXHJcbiAgICAvLyB0byByZXNldCB0aGUgbWFpbiBib2FyZHMuIFRoZXkgYXJlbid0IGNsZWFyaW5nIHByb3Blcmx5XHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAga2V5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdGFydEdhbWUoKSB7XHJcbiAgICBHYW1lcGxheS5zdGFydEdhbWUodGhpcy5zaGlwc1BsYWNlZCk7XHJcbiAgICB0aGlzLmFkZEF0dGFja0xpc3RlbmVycygpO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gICAgcGxhY2VTaGlwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIG1haW5Cb2FyZHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICBrZXkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBhZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGFjZS1zaGlwcy1ib2FyZCAuY2VsbCcpO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7IHJvdyB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IGNvbHVtbiB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGhpcy5zaGlwSW5kZXggPCA1ICYmIHRoaXMuaXNMZWdhbFNoaXBQbGFjZW1lbnQodGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0ubGVuZ3RoLCByb3csIGNvbHVtbikpIHtcclxuICAgICAgICAgIHRoaXMucGxhY2VTaGlwKHJvdywgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYWRkQXR0YWNrTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZW5lbXlDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpO1xyXG4gICAgZW5lbXlDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLWdhbWUtcG9wdXAnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2F0dGFjayBjb25kaXRpb25hbCByYW4nKTtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICBHYW1lcGxheS5wbGF5ZXJNb3ZlKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgVUkucGxhY2VTaGlwKHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4sIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgY29uc3Qgc2hpcHNJbmZvT2JqZWN0ID0ge1xyXG4gICAgICBcInNoaXBcIjogdGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0sXHJcbiAgICAgIFwicm93XCI6IE51bWJlcihyb3cpLFxyXG4gICAgICBcImNvbHVtblwiOiBOdW1iZXIoY29sdW1uKSxcclxuICAgICAgXCJvcmllbnRhdGlvblwiOiB0aGlzLm9yaWVudGF0aW9uXHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkLnB1c2goc2hpcHNJbmZvT2JqZWN0KTtcclxuICAgIHRoaXMuc2hpcEluZGV4ICs9IDE7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNMZWdhbFNoaXBQbGFjZW1lbnQobGVuZ3RoLCByb3csIGNvbHVtbikge1xyXG4gICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSBjZWxscyBoYXMgYSBzaGlwIGluIGl0XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChOdW1iZXIoY29sdW1uKSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBOdW1iZXIoY29sdW1uKTsgaSA8IE51bWJlcihjb2x1bW4pICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAocm93LCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICBpZiAoTnVtYmVyKHJvdykgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihyb3cpOyBpIDwgTnVtYmVyKHJvdykgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChpLCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyByb3RhdGVTaGlwKCkge1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicgPyAndmVydCcgOiAnaG9yaXonO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlc2V0KCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXBzLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcbiAgICB0aGlzLnNoaXBJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkID0gW107XHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XHJcbiAgc3RhdGljIGNyZWF0ZUJvYXJkKGlkLCBib2FyZCA9IG51bGwpIHtcclxuICAgIGZvcihsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gID0gY29sdW1uO1xyXG4gICAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBpY2tlZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgICBjb25zdCBwaWNrZWQgPSB0aGlzLmZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gICAgaWYgKGlzSGl0KSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbikge1xyXG4gICAgbGV0IGNob2ljZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbChyb3csIChOdW1iZXIoY29sdW1uKSArIGkpLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwoKE51bWJlcihyb3cpICsgaSkudG9TdHJpbmcoKSwgY29sdW1uLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfVxyXG4gICAgICBjaG9pY2UuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRhaW5zU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZmluZENlbGwocm93LnRvU3RyaW5nKCksIGNvbHVtbi50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYXllcldpbnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYgLndpbm5lcicpLnRleHRDb250ZW50ID0gJ1lvdSB3aW4hJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCAuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlcldpbnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYgLndpbm5lcicpLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIHdpbnMhJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTGlzdGVuZXJzIGZyb20gJy4vbGlzdGVuZXJzJztcclxuXHJcbkxpc3RlbmVycy5ldmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsInNoaXBzIiwiY2xlYXJCb2FyZCIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hvd0JvYXJkIiwicGxhY2VTaGlwIiwic2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwicHVzaCIsImkiLCJsZW5ndGgiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiZmxhZyIsImdldFJhbmRvbSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImFsbFN1bmsiLCJldmVyeSIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJib2FyZENlbGwiLCJfdHlwZW9mIiwiaGl0IiwiUGxheWVyIiwibXlCb2FyZCIsImF0dGFjayIsInBsYWNlU2hpcHMiLCJzaGlwc1BsYWNlZEFycmF5IiwicGxhY2VTaGlwc1JhbmRvbWx5IiwiZ2V0TXlCb2FyZCIsImNob29zZVJhbmRvbUNvb3JkIiwiY2xlYXJNeUJvYXJkIiwiZ2FtZU92ZXIiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImhpdENvdW50IiwiVUkiLCJHYW1lcGxheSIsImtleSIsInZhbHVlIiwicGxheWVyTW92ZSIsImlzSGl0IiwicGxheWVyIiwiY29tcHV0ZXIiLCJkaXNwbGF5TW92ZVJlc3VsdCIsInBsYXllcldpbnMiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJjb21wdXRlcldpbnMiLCJzdGFydEdhbWUiLCJzaGlwc0FycmF5IiwiY3JlYXRlUGxheWVyQm9hcmQiLCJjcmVhdGVPcHBvbmVudEJvYXJkIiwiZGVmYXVsdCIsInJvdGF0ZUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydEJ0biIsInBsYXlBZ2FpbkJ0biIsInBsYWNlU2hpcHNDb250YWluZXIiLCJtYWluQm9hcmRzQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsIkxpc3RlbmVycyIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdGF0ZVNoaXAiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImFkZFBsYWNlU2hpcExpc3RlbmVycyIsInNoaXBzUGxhY2VkIiwiYWRkQXR0YWNrTGlzdGVuZXJzIiwicmVzZXQiLCJfdGhpczIiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJzaGlwSW5kZXgiLCJpc0xlZ2FsU2hpcFBsYWNlbWVudCIsImVuZW15Q2VsbHMiLCJjb250YWlucyIsImNvbnNvbGUiLCJsb2ciLCJwcmV2ZW50RGVmYXVsdCIsInNoaXBzSW5mb09iamVjdCIsIk51bWJlciIsImNvbnRhaW5zU2hpcCIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJjaG9pY2UiXSwic291cmNlUm9vdCI6IiJ9