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
    console.log(myBoard.showBoard());
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
      document.getElementById('computer-board').textContent = '';
      document.getElementById('player-board').textContent = '';
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
  }, {
    key: "playerWins",
    value: function playerWins() {
      document.querySelector('div h2').textContent = 'You win!';
      document.getElementById('end-game-popup').classList.add('show');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ1MsU0FBUyxDQUFDRSxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2pFO0VBQUM7RUFBQSxPQUFBakMsRUFBQTtBQUFBOzs7Ozs7O1VDeEVIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vQztBQUVwQzJCLGtEQUFTLENBQUNDLGNBQWMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Zpc2libGVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgbGV0IGJvYXJkO1xyXG5cclxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIGJvYXJkID0gWy4uLkFycmF5KDEwKV0ubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKFwiXCIpKTtcclxuICAgIHJldHVybiBib2FyZDtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgbGV0IHNoaXBzID0gW107XHJcblxyXG4gIGNvbnN0IGNsZWFyQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICBzaGlwcyA9IFtdO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxuICB9IFxyXG5cclxuICBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdICE9PSBzaGlwKSB7XHJcbiAgICAgIHNoaXBzLnB1c2goc2hpcCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IHNoaXA7XHJcblxyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhbmRvbVNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXonLCAndmVydCddO1xyXG5cclxuICAgIHJhbmRvbVNoaXBzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sdW1uO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb247XHJcbiAgICAgIGxldCBmbGFnO1xyXG4gICAgICBmdW5jdGlvbiBnZXRSYW5kb20oKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDJdO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6JyAmJiAoY29sdW1uICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkge1xyXG4gICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnICYmIChyb3cgKyBvYmplY3QubGVuZ3RoIC0gMSkgPiAwKSB7XHJcbiAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IGNvbHVtbjsgaSA8IGNvbHVtbiArIG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICBmbGFnID0gKGJvYXJkW3Jvd11baV0gIT09ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbaV1bY29sdW1uXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgIHBsYWNlU2hpcChvYmplY3QsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge3JhbmRvbVNoaXBQbGFjZW1lbnQsIGFsbFN1bmssIGNsZWFyQm9hcmQsIHNob3dCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuICBjb25zdCBteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IGF0dGFjayA9IChyb3csIGNvbHVtbiwgYm9hcmQpID0+IHtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xyXG5cclxuICAgIHJldHVybiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09ICdoaXQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc1BsYWNlZEFycmF5KSA9PiB7XHJcbiAgICBzaGlwc1BsYWNlZEFycmF5LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBteUJvYXJkLnBsYWNlU2hpcChvYmplY3Quc2hpcCwgb2JqZWN0LnJvdywgb2JqZWN0LmNvbHVtbiwgb2JqZWN0Lm9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRNeUJvYXJkID0gKCkgPT4gbXlCb2FyZFxyXG5cclxuICBjb25zdCBjaG9vc2VSYW5kb21Db29yZCA9IChib2FyZCkgPT4ge1xyXG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXTtcclxuXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSAnbWlzcycgfHwgYm9hcmRDZWxsID09PSAnaGl0Jykge1xyXG4gICAgICBjaG9vc2VSYW5kb21Db29yZChib2FyZCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJNeUJvYXJkID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5jbGVhckJvYXJkKCk7XHJcbiAgICBjb25zb2xlLmxvZyhteUJvYXJkLnNob3dCb2FyZCgpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdhbWVPdmVyID0gKCkgPT4gbXlCb2FyZC5hbGxTdW5rKClcclxuXHJcbiAgcmV0dXJuIHtnYW1lT3ZlciwgcGxhY2VTaGlwc1JhbmRvbWx5LCBjbGVhck15Qm9hcmQsIGdldE15Qm9hcmQsIHBsYWNlU2hpcHMsIGF0dGFjaywgY2hvb3NlUmFuZG9tQ29vcmR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gIH1cclxuICBcclxuICBoaXRDb3VudCA9IDA7XHJcblxyXG4gIGhpdCA9ICgpID0+IHtcclxuICAgIHRoaXMuaGl0Q291bnQgKz0gMTtcclxuICB9XHJcbiAgXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5oaXRDb3VudCA+PSB0aGlzLmxlbmd0aFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9wbGF5ZXJcIjtcclxuaW1wb3J0IFVJIGZyb20gXCIuL3Zpc2libGVCb2FyZFwiO1xyXG5cclxuLy8gY3JlYXRlIHBsYXllcnMgYW5kIGdhbWVib2FyZHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVwbGF5IHtcclxuICBzdGF0aWMgcGxheWVyID0gUGxheWVyKCk7XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgcGxheWVyTW92ZShyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLnBsYXllci5hdHRhY2socm93LCBjb2x1bW4sIHRoaXMuY29tcHV0ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCAnY29tcHV0ZXItYm9hcmQnLCBpc0hpdCk7XHJcbiAgICBpZiAodGhpcy5jb21wdXRlci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLnBsYXllcldpbnMoKTsgICAgIC8vIHBsYXllciBoYXMgd29uXHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jb21wdXRlck1vdmUoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJNb3ZlKCkge1xyXG4gICAgY29uc3QgY29vcmRzID0gdGhpcy5jb21wdXRlci5jaG9vc2VSYW5kb21Db29yZCh0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgY29uc3QgaXNIaXQgPSB0aGlzLmNvbXB1dGVyLmF0dGFjayhjb29yZHNbMF0sIGNvb3Jkc1sxXSwgdGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmRpc3BsYXlNb3ZlUmVzdWx0KGNvb3Jkc1swXS50b1N0cmluZygpLCBjb29yZHNbMV0udG9TdHJpbmcoKSwgJ3BsYXllci1ib2FyZCcsIGlzSGl0KTtcclxuICAgIGlmICh0aGlzLnBsYXllci5nYW1lT3ZlcigpKSB7XHJcbiAgICAgIFVJLmNvbXB1dGVyV2lucygpO1xyXG4gICAgICAvLyBjb21wdXRlciBoYXMgd29uXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIC8vIHRha2UgdHVybnMgYW5kIHBsYXkgdGhlIGdhbWVcclxuXHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluJyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuXHJcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdGF0ZVNoaXAoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGhhdmluZyBzb21lIHRyb3VibGUgd2l0aCByZXNldHRpbmcgYW5kIHBsYXlpbmcgYSBuZXcgZ2FtZS4gTmVlZFxyXG4gICAgLy8gdG8gcmVzZXQgdGhlIG1haW4gYm9hcmRzLiBUaGV5IGFyZW4ndCBjbGVhcmluZyBwcm9wZXJseVxyXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLWJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgR2FtZXBsYXkuc3RhcnRHYW1lKHRoaXMuc2hpcHNQbGFjZWQpO1xyXG4gICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW5lcnMoKTtcclxuICAgIHBsYWNlU2hpcHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBtYWluQm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcGxhY2Utc2hpcHMtYm9hcmQgLmNlbGwnKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyByb3cgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpcEluZGV4IDwgNSAmJiB0aGlzLmlzTGVnYWxTaGlwUGxhY2VtZW50KHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4pKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYWNlU2hpcChyb3csIGNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZEF0dGFja0xpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGVuZW15Q2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29tcHV0ZXItYm9hcmQgLmNlbGwnKTtcclxuICAgIGVuZW15Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICBHYW1lcGxheS5wbGF5ZXJNb3ZlKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgVUkucGxhY2VTaGlwKHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLmxlbmd0aCwgcm93LCBjb2x1bW4sIHRoaXMub3JpZW50YXRpb24pO1xyXG4gICAgY29uc3Qgc2hpcHNJbmZvT2JqZWN0ID0ge1xyXG4gICAgICBcInNoaXBcIjogdGhpcy5zaGlwc1t0aGlzLnNoaXBJbmRleF0sXHJcbiAgICAgIFwicm93XCI6IE51bWJlcihyb3cpLFxyXG4gICAgICBcImNvbHVtblwiOiBOdW1iZXIoY29sdW1uKSxcclxuICAgICAgXCJvcmllbnRhdGlvblwiOiB0aGlzLm9yaWVudGF0aW9uXHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkLnB1c2goc2hpcHNJbmZvT2JqZWN0KTtcclxuICAgIHRoaXMuc2hpcEluZGV4ICs9IDE7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNMZWdhbFNoaXBQbGFjZW1lbnQobGVuZ3RoLCByb3csIGNvbHVtbikge1xyXG4gICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSBjZWxscyBoYXMgYSBzaGlwIGluIGl0XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgc2hpcCBnb2VzIG91dCBvZiBib3VuZHNcclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgIGlmIChOdW1iZXIoY29sdW1uKSArIGxlbmd0aCAtIDEgPiA5KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIFxyXG4gICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhcmdldCBjZWxscyBhbHJlYWR5IGhhcyBhIHNoaXAgaW4gaXRcclxuICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBOdW1iZXIoY29sdW1uKTsgaSA8IE51bWJlcihjb2x1bW4pICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAocm93LCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0Jykge1xyXG4gICAgICBpZiAoTnVtYmVyKHJvdykgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgZm9yIChsZXQgaSA9IE51bWJlcihyb3cpOyBpIDwgTnVtYmVyKHJvdykgKyBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgZmxhZyA9IFVJLmNvbnRhaW5zU2hpcChpLCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKCFmbGFnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyByb3RhdGVTaGlwKCkge1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3JpeicgPyAndmVydCcgOiAnaG9yaXonO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlc2V0KCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6JztcclxuICAgIHRoaXMuc2hpcEluZGV4ID0gMDtcclxuICAgIHRoaXMuc2hpcHNQbGFjZWQgPSBbXTtcclxuICAgIHRoaXMuYWRkUGxhY2VTaGlwTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcclxuICBzdGF0aWMgY3JlYXRlQm9hcmQoaWQsIGJvYXJkID0gbnVsbCkge1xyXG4gICAgZm9yKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XHJcbiAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiAgPSBjb2x1bW47XHJcbiAgICAgICAgaWYgKGJvYXJkICYmIGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXSAhPT0gJycpIHtcclxuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVQbGF5ZXJCb2FyZChib2FyZCkge1xyXG4gICAgdGhpcy5jcmVhdGVCb2FyZCgncGxheWVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZU9wcG9uZW50Qm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ2NvbXB1dGVyLWJvYXJkJywgYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCkge1xyXG4gICAgbGV0IHBpY2tlZDtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7aWR9IC5jZWxsYCk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGlmIChjZWxsLmRhdGFzZXQucm93ID09PSByb3cgJiYgY2VsbC5kYXRhc2V0LmNvbHVtbiA9PT0gY29sdW1uKSB7XHJcbiAgICAgICAgcGlja2VkID0gY2VsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGlja2VkO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3BsYXlNb3ZlUmVzdWx0KHJvdywgY29sdW1uLCBpZCwgaXNIaXQpIHtcclxuICAgIGNvbnN0IHBpY2tlZCA9IHRoaXMuZmluZENlbGwocm93LCBjb2x1bW4sIGlkKTtcclxuXHJcbiAgICBpZiAoaXNIaXQpIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnTyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwaWNrZWQuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xyXG4gICAgICBwaWNrZWQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2x1bW4sIG9yaWVudGF0aW9uKSB7XHJcbiAgICBsZXQgY2hvaWNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBjaG9pY2UgPSB0aGlzLmZpbmRDZWxsKHJvdywgKE51bWJlcihjb2x1bW4pICsgaSkudG9TdHJpbmcoKSwgJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbCgoTnVtYmVyKHJvdykgKyBpKS50b1N0cmluZygpLCBjb2x1bW4sICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNob2ljZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29udGFpbnNTaGlwKHJvdywgY29sdW1uKSB7XHJcbiAgICBjb25zdCBjZWxsID0gdGhpcy5maW5kQ2VsbChyb3cudG9TdHJpbmcoKSwgY29sdW1uLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgcmV0dXJuIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGxheWVyV2lucygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiBoMicpLnRleHRDb250ZW50ID0gJ1lvdSB3aW4hJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtZ2FtZS1wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTsgXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcHV0ZXJXaW5zKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2IGgyJykudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgd2lucyEnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1nYW1lLXBvcHVwJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuTGlzdGVuZXJzLmV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lYm9hcmQiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiQXJyYXkiLCJtYXAiLCJmaWxsIiwic2hpcHMiLCJjbGVhckJvYXJkIiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlwIiwicm93IiwiY29sIiwib3JpZW50YXRpb24iLCJwdXNoIiwiaSIsImxlbmd0aCIsInJhbmRvbVNoaXBQbGFjZW1lbnQiLCJyYW5kb21TaGlwcyIsIm9yaWVudGF0aW9ucyIsImZvckVhY2giLCJvYmplY3QiLCJjb2x1bW4iLCJmbGFnIiwiZ2V0UmFuZG9tIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWxsU3VuayIsImV2ZXJ5IiwiaXNTdW5rIiwicmVjZWl2ZUF0dGFjayIsImJvYXJkQ2VsbCIsIl90eXBlb2YiLCJoaXQiLCJQbGF5ZXIiLCJteUJvYXJkIiwiYXR0YWNrIiwicGxhY2VTaGlwcyIsInNoaXBzUGxhY2VkQXJyYXkiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJnZXRNeUJvYXJkIiwiY2hvb3NlUmFuZG9tQ29vcmQiLCJjbGVhck15Qm9hcmQiLCJjb25zb2xlIiwibG9nIiwiZ2FtZU92ZXIiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImhpdENvdW50IiwiVUkiLCJHYW1lcGxheSIsImtleSIsInZhbHVlIiwicGxheWVyTW92ZSIsImlzSGl0IiwicGxheWVyIiwiY29tcHV0ZXIiLCJkaXNwbGF5TW92ZVJlc3VsdCIsInBsYXllcldpbnMiLCJzZXRUaW1lb3V0IiwiY29tcHV0ZXJNb3ZlIiwiY29vcmRzIiwidG9TdHJpbmciLCJjb21wdXRlcldpbnMiLCJzdGFydEdhbWUiLCJzaGlwc0FycmF5IiwiY3JlYXRlUGxheWVyQm9hcmQiLCJjcmVhdGVPcHBvbmVudEJvYXJkIiwiZGVmYXVsdCIsInJvdGF0ZUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdGFydEJ0biIsInBsYXlBZ2FpbkJ0biIsInBsYWNlU2hpcHNDb250YWluZXIiLCJtYWluQm9hcmRzQ29udGFpbmVyIiwiTGlzdGVuZXJzIiwiZXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicm90YXRlU2hpcCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImFkZFBsYWNlU2hpcExpc3RlbmVycyIsInRleHRDb250ZW50Iiwic2hpcHNQbGFjZWQiLCJhZGRBdHRhY2tMaXN0ZW5lcnMiLCJfdGhpczIiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJzaGlwSW5kZXgiLCJpc0xlZ2FsU2hpcFBsYWNlbWVudCIsImVuZW15Q2VsbHMiLCJzaGlwc0luZm9PYmplY3QiLCJOdW1iZXIiLCJjb250YWluc1NoaXAiLCJyZXNldCIsImlkIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZmluZENlbGwiLCJwaWNrZWQiLCJjb25jYXQiLCJjaG9pY2UiLCJjb250YWlucyIsInF1ZXJ5U2VsZWN0b3IiXSwic291cmNlUm9vdCI6IiJ9