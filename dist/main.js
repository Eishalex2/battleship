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
      document.querySelector('div h2').textContent = 'You win!';
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
      document.querySelector('div h2').textContent = 'Computer wins!';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZXBsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aXNpYmxlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGxldCBib2FyZDtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGxldCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBjbGVhckJvYXJkID0gKCkgPT4ge1xyXG4gICAgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgc2hpcHMgPSBbXTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGF2YWlsYWJsZVNoaXBzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKDMpO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuICBcclxuICAgIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbiAgfSBcclxuXHJcbiAgYm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xyXG5cclxuICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiBib2FyZDtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikgPT4ge1xyXG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSAhPT0gc2hpcCkge1xyXG4gICAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbF0gPSBzaGlwO1xyXG5cclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJhbmRvbVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByYW5kb21TaGlwcyA9IGF2YWlsYWJsZVNoaXBzKCk7XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbnMgPSBbJ2hvcml6JywgJ3ZlcnQnXTtcclxuXHJcbiAgICByYW5kb21TaGlwcy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgbGV0IHJvdztcclxuICAgICAgbGV0IGNvbHVtbjtcclxuICAgICAgbGV0IG9yaWVudGF0aW9uO1xyXG4gICAgICBsZXQgZmxhZztcclxuICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tKCkge1xyXG4gICAgICAgIHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gICAgICAgIG9yaWVudGF0aW9uID0gb3JpZW50YXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicgJiYgKGNvbHVtbiArIG9iamVjdC5sZW5ndGggLSAxKSA+IDkpIHtcclxuICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0JyAmJiAocm93ICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkge1xyXG4gICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZhbHNlID0gbm8gc2hpcFxyXG4gICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSBjb2x1bW47IGkgPCBjb2x1bW4gKyBvYmplY3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICAgICAgZmxhZyA9IChib2FyZFtyb3ddW2ldICE9PSAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIGdldFJhbmRvbSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbaV1bY29sdW1uXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZ2V0UmFuZG9tKCk7XHJcblxyXG4gICAgICBwbGFjZVNoaXAob2JqZWN0LCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbGxTdW5rKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtyb3ddW2NvbHVtbl07XHJcbiAgICAvLyBhbHJlYWR5IGd1ZXNzZWRcclxuICAgIGlmIChib2FyZENlbGwgPT09IFwibWlzc1wiIHx8IGJvYXJkQ2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJBbHJlYWR5IGd1ZXNzZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgIGlmICh0eXBlb2YgYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXS5oaXQoKTtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJoaXRcIjtcclxuICAgICAgaWYgKGFsbFN1bmsoKSkge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBoYXMgbm90IGJlZW4gaGl0XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sdW1uXSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtyYW5kb21TaGlwUGxhY2VtZW50LCBhbGxTdW5rLCBjbGVhckJvYXJkLCBzaG93Qm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFja31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2x1bW4sIGJvYXJkKSA9PiB7XHJcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKTtcclxuXHJcbiAgICByZXR1cm4gYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dID09PSAnaGl0JztcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoc2hpcHNQbGFjZWRBcnJheSkgPT4ge1xyXG4gICAgc2hpcHNQbGFjZWRBcnJheS5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgbXlCb2FyZC5wbGFjZVNoaXAob2JqZWN0LnNoaXAsIG9iamVjdC5yb3csIG9iamVjdC5jb2x1bW4sIG9iamVjdC5vcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHNSYW5kb21seSA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2V0TXlCb2FyZCA9ICgpID0+IG15Qm9hcmRcclxuXHJcbiAgY29uc3QgY2hvb3NlUmFuZG9tQ29vcmQgPSAoYm9hcmQpID0+IHtcclxuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl07XHJcblxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gJ21pc3MnIHx8IGJvYXJkQ2VsbCA9PT0gJ2hpdCcpIHtcclxuICAgICAgY2hvb3NlUmFuZG9tQ29vcmQoYm9hcmQpO1xyXG4gICAgfSBcclxuXHJcbiAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsZWFyTXlCb2FyZCA9ICgpID0+IHtcclxuICAgIG15Qm9hcmQuY2xlYXJCb2FyZCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiBteUJvYXJkLmFsbFN1bmsoKVxyXG5cclxuICByZXR1cm4ge2dhbWVPdmVyLCBwbGFjZVNoaXBzUmFuZG9tbHksIGNsZWFyTXlCb2FyZCwgZ2V0TXlCb2FyZCwgcGxhY2VTaGlwcywgYXR0YWNrLCBjaG9vc2VSYW5kb21Db29yZH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgfVxyXG4gIFxyXG4gIGhpdENvdW50ID0gMDtcclxuXHJcbiAgaGl0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5oaXRDb3VudCArPSAxO1xyXG4gIH1cclxuICBcclxuICBpc1N1bmsgPSAoKSA9PiB0aGlzLmhpdENvdW50ID49IHRoaXMubGVuZ3RoXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9jb21wb25lbnRzL3BsYXllclwiO1xyXG5pbXBvcnQgVUkgZnJvbSBcIi4vdmlzaWJsZUJvYXJkXCI7XHJcblxyXG4vLyBjcmVhdGUgcGxheWVycyBhbmQgZ2FtZWJvYXJkc1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXBsYXkge1xyXG4gIHN0YXRpYyBwbGF5ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBwbGF5ZXJNb3ZlKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMucGxheWVyLmF0dGFjayhyb3csIGNvbHVtbiwgdGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sICdjb21wdXRlci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIGlmICh0aGlzLmNvbXB1dGVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkucGxheWVyV2lucygpOyAgICAgLy8gcGxheWVyIGhhcyB3b25cclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbXB1dGVyTW92ZSgpO1xyXG4gICAgfSwgMzAwKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlck1vdmUoKSB7XHJcbiAgICBjb25zdCBjb29yZHMgPSB0aGlzLmNvbXB1dGVyLmNob29zZVJhbmRvbUNvb3JkKHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMuY29tcHV0ZXIuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgaWYgKHRoaXMucGxheWVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgVUkuY29tcHV0ZXJXaW5zKCk7XHJcbiAgICAgIC8vIGNvbXB1dGVyIGhhcyB3b25cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBzdGFydEdhbWUoc2hpcHNBcnJheSkge1xyXG4gICAgLy8gY2xlYXIgdGhlIGJvYXJkc1xyXG4gICAgdGhpcy5jb21wdXRlci5jbGVhck15Qm9hcmQoKTtcclxuICAgIHRoaXMucGxheWVyLmNsZWFyTXlCb2FyZCgpO1xyXG5cclxuICAgIC8vIGhhdmUgdGhlIHBsYXllciBwbGFjZSB0aGVpciBzaGlwc1xyXG4gICAgdGhpcy5wbGF5ZXIucGxhY2VTaGlwcyhzaGlwc0FycmF5KTtcclxuXHJcbiAgICAvLyBlbmVteSBwbGFjZXMgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMuY29tcHV0ZXIucGxhY2VTaGlwc1JhbmRvbWx5KCk7XHJcblxyXG4gICAgLy8gc2hvdyB0aGUgYm9hcmRzXHJcbiAgICBVSS5jcmVhdGVQbGF5ZXJCb2FyZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuY3JlYXRlT3Bwb25lbnRCb2FyZCh0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcblxyXG4gICAgLy8gdGFrZSB0dXJucyBhbmQgcGxheSB0aGUgZ2FtZVxyXG5cclxuICB9XHJcbn0iLCJpbXBvcnQgR2FtZXBsYXkgZnJvbSAnLi9nYW1lcGxheSdcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXBcIjtcclxuXHJcbmNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUnKTtcclxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYWdhaW4nKTtcclxuY29uc3QgcGxhY2VTaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwcy1jb250YWluZXInKTtcclxuY29uc3QgbWFpbkJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcclxuXHJcblxyXG5jb25zdCBhdmFpbGFibGVTaGlwcyA9ICgpID0+IHtcclxuICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKDQpO1xyXG4gIGNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICBjb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcCgyKTtcclxuXHJcbiAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbmVycyB7XHJcbiAgc3RhdGljIG9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuXHJcbiAgc3RhdGljIHNoaXBJbmRleCA9IDA7XHJcblxyXG4gIHN0YXRpYyBzaGlwc1BsYWNlZCA9IFtdO1xyXG5cclxuICBzdGF0aWMgc2hpcHMgPSBhdmFpbGFibGVTaGlwcygpO1xyXG5cclxuICBzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuXHJcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucm90YXRlU2hpcCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaGF2aW5nIHNvbWUgdHJvdWJsZSB3aXRoIHJlc2V0dGluZyBhbmQgcGxheWluZyBhIG5ldyBnYW1lLiBOZWVkXHJcbiAgICAvLyB0byByZXNldCB0aGUgbWFpbiBib2FyZHMuIFRoZXkgYXJlbid0IGNsZWFyaW5nIHByb3Blcmx5XHJcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKCkge1xyXG4gICAgR2FtZXBsYXkuc3RhcnRHYW1lKHRoaXMuc2hpcHNQbGFjZWQpO1xyXG4gICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcGxhY2Utc2hpcHMtYm9hcmQgLmNlbGwnKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyByb3cgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcEluZGV4IDwgNSAmJiB0aGlzLmlzTGVnYWxTaGlwUGxhY2VtZW50KHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4pKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYWNlU2hpcChyb3csIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZEF0dGFja0xpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGVuZW15Q2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29tcHV0ZXItYm9hcmQgLmNlbGwnKTtcclxuICAgIGVuZW15Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdhdHRhY2sgY29uZGl0aW9uYWwgcmFuJyk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSAnJykge1xyXG4gICAgICAgICAgR2FtZXBsYXkucGxheWVyTW92ZShlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIFVJLnBsYWNlU2hpcCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgIGNvbnN0IHNoaXBzSW5mb09iamVjdCA9IHtcclxuICAgICAgXCJzaGlwXCI6IHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLFxyXG4gICAgICBcInJvd1wiOiBOdW1iZXIocm93KSxcclxuICAgICAgXCJjb2x1bW5cIjogTnVtYmVyKGNvbHVtbiksXHJcbiAgICAgIFwib3JpZW50YXRpb25cIjogdGhpcy5vcmllbnRhdGlvblxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwc1BsYWNlZC5wdXNoKHNoaXBzSW5mb09iamVjdCk7XHJcbiAgICB0aGlzLnNoaXBJbmRleCArPSAxO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzTGVnYWxTaGlwUGxhY2VtZW50KGxlbmd0aCwgcm93LCBjb2x1bW4pIHtcclxuICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgY2VsbHMgaGFzIGEgc2hpcCBpbiBpdFxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICBpZiAoTnVtYmVyKGNvbHVtbikgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YXJnZXQgY2VsbHMgYWxyZWFkeSBoYXMgYSBzaGlwIGluIGl0XHJcbiAgICAgIC8vIGZhbHNlID0gbm8gc2hpcFxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gTnVtYmVyKGNvbHVtbik7IGkgPCBOdW1iZXIoY29sdW1uKSArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKHJvdywgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydCcpIHtcclxuICAgICAgaWYgKE51bWJlcihyb3cpICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBOdW1iZXIocm93KTsgaSA8IE51bWJlcihyb3cpICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAoaSwgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcm90YXRlU2hpcCgpIHtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonID8gJ3ZlcnQnIDogJ2hvcml6JztcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZXNldCgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZS1zaGlwcy1ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICBVSS5jcmVhdGVCb2FyZCgncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXonO1xyXG4gICAgdGhpcy5zaGlwSW5kZXggPSAwO1xyXG4gICAgdGhpcy5zaGlwc1BsYWNlZCA9IFtdO1xyXG4gICAgdGhpcy5hZGRQbGFjZVNoaXBMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjcmVhdGVCb2FyZChpZCwgYm9hcmQgPSBudWxsKSB7XHJcbiAgICBmb3IobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcclxuICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uICA9IGNvbHVtbjtcclxuICAgICAgICBpZiAoYm9hcmQgJiYgYm9hcmQuc2hvd0JvYXJkKClbcm93XVtjb2x1bW5dICE9PSAnJykge1xyXG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZVBsYXllckJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdwbGF5ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlT3Bwb25lbnRCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgnY29tcHV0ZXItYm9hcmQnLCBib2FyZCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZmluZENlbGwocm93LCBjb2x1bW4sIGlkKSB7XHJcbiAgICBsZXQgcGlja2VkO1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtpZH0gLmNlbGxgKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgaWYgKGNlbGwuZGF0YXNldC5yb3cgPT09IHJvdyAmJiBjZWxsLmRhdGFzZXQuY29sdW1uID09PSBjb2x1bW4pIHtcclxuICAgICAgICBwaWNrZWQgPSBjZWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwaWNrZWQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGlzcGxheU1vdmVSZXN1bHQocm93LCBjb2x1bW4sIGlkLCBpc0hpdCkge1xyXG4gICAgY29uc3QgcGlja2VkID0gdGhpcy5maW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpO1xyXG5cclxuICAgIGlmIChpc0hpdCkge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdPJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XHJcbiAgICAgIHBpY2tlZC50ZXh0Q29udGVudCA9ICdYJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbHVtbiwgb3JpZW50YXRpb24pIHtcclxuICAgIGxldCBjaG9pY2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwocm93LCAoTnVtYmVyKGNvbHVtbikgKyBpKS50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKChOdW1iZXIocm93KSArIGkpLnRvU3RyaW5nKCksIGNvbHVtbiwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH1cclxuICAgICAgY2hvaWNlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb250YWluc1NoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmZpbmRDZWxsKHJvdy50b1N0cmluZygpLCBjb2x1bW4udG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICByZXR1cm4gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGF5ZXJXaW5zKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IGgyJykudGV4dENvbnRlbnQgPSAnWW91IHdpbiEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbXB1dGVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiBoMicpLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIHdpbnMhJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTGlzdGVuZXJzIGZyb20gJy4vbGlzdGVuZXJzJztcclxuXHJcbkxpc3RlbmVycy5ldmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6WyJTaGlwIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsIl90b0NvbnN1bWFibGVBcnJheSIsIkFycmF5IiwibWFwIiwiZmlsbCIsInNoaXBzIiwiY2xlYXJCb2FyZCIsImF2YWlsYWJsZVNoaXBzIiwiY2FycmllciIsImJhdHRsZXNoaXAiLCJjcnVpc2VyIiwic3VibWFyaW5lIiwiZGVzdHJveWVyIiwic2hvd0JvYXJkIiwicGxhY2VTaGlwIiwic2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwicHVzaCIsImkiLCJsZW5ndGgiLCJyYW5kb21TaGlwUGxhY2VtZW50IiwicmFuZG9tU2hpcHMiLCJvcmllbnRhdGlvbnMiLCJmb3JFYWNoIiwib2JqZWN0IiwiY29sdW1uIiwiZmxhZyIsImdldFJhbmRvbSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImFsbFN1bmsiLCJldmVyeSIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJib2FyZENlbGwiLCJfdHlwZW9mIiwiaGl0IiwiUGxheWVyIiwibXlCb2FyZCIsImF0dGFjayIsInBsYWNlU2hpcHMiLCJzaGlwc1BsYWNlZEFycmF5IiwicGxhY2VTaGlwc1JhbmRvbWx5IiwiZ2V0TXlCb2FyZCIsImNob29zZVJhbmRvbUNvb3JkIiwiY2xlYXJNeUJvYXJkIiwiZ2FtZU92ZXIiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImhpdENvdW50IiwiVUkiLCJHYW1lcGxheSIsImtleSIsInZhbHVlIiwicGxheWVyTW92ZSIsImlzSGl0IiwicGxheWVyIiwiY29tcHV0ZXIiLCJkaXNwbGF5TW92ZVJlc3VsdCIsInBsYXllcldpbnMiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJjb21wdXRlcldpbnMiLCJzdGFydEdhbWUiLCJzaGlwc0FycmF5IiwiY3JlYXRlUGxheWVyQm9hcmQiLCJjcmVhdGVPcHBvbmVudEJvYXJkIiwiZGVmYXVsdCIsInJvdGF0ZUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydEJ0biIsInBsYXlBZ2FpbkJ0biIsInBsYWNlU2hpcHNDb250YWluZXIiLCJtYWluQm9hcmRzQ29udGFpbmVyIiwiTGlzdGVuZXJzIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicm90YXRlU2hpcCIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiYWRkUGxhY2VTaGlwTGlzdGVuZXJzIiwic2hpcHNQbGFjZWQiLCJhZGRBdHRhY2tMaXN0ZW5lcnMiLCJyZXNldCIsIl90aGlzMiIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsInNoaXBJbmRleCIsImlzTGVnYWxTaGlwUGxhY2VtZW50IiwiZW5lbXlDZWxscyIsImNvbnRhaW5zIiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiY29udGFpbnNTaGlwIiwiaWQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJmaW5kQ2VsbCIsInBpY2tlZCIsImNvbmNhdCIsImNob2ljZSIsInF1ZXJ5U2VsZWN0b3IiXSwic291cmNlUm9vdCI6IiJ9