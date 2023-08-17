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
  var createBoard = function createBoard() {
    var board = _toConsumableArray(Array(10)).map(function () {
      return Array(10).fill("");
    });
    return board;
  };
  var clearBoard = function clearBoard() {
    var board = _toConsumableArray(Array(10)).map(function () {
      return Array(10).fill("");
    });
    return board;
  };
  var ships = [];
  var availableShips = function availableShips() {
    var carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](5);
    var battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4);
    var cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    var submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    var destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2);
    return [carrier, battleship, cruiser, submarine, destroyer];
  };
  var board = createBoard();
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
      var isHit = this.player.attack(row, column, this.computer.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].displayMoveResult(row, column, 'computer-board', isHit);
      if (this.computer.gameOver()) {
        console.log('Player win!'); // player has won
      }

      this.computerMove();
    }
  }, {
    key: "computerMove",
    value: function computerMove() {
      var coords = this.computer.chooseRandomCoord(this.player.getMyBoard());
      var isHit = this.computer.attack(coords[0], coords[1], this.player.getMyBoard());
      _visibleBoard__WEBPACK_IMPORTED_MODULE_1__["default"].displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
      if (this.player.gameOver()) {
        console.log('Computer win!');
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
      startBtn.addEventListener('click', function () {
        _this.startGame();
      });
      this.addPlaceShipListeners();
    }
  }, {
    key: "startGame",
    value: function startGame() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ3hDO0VBQUM7RUFBQSxPQUFBM0QsRUFBQTtBQUFBOzs7Ozs7O1VDOURIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vQztBQUVwQ3lCLGtEQUFTLENBQUNDLGNBQWMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3Zpc2libGVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBib2FyZCA9IFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChcIlwiKSk7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhckJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYm9hcmQgPSBbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwoXCJcIikpO1xyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoNSk7XHJcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoNCk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcCgzKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKDIpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl1cclxuICB9IFxyXG5cclxuICBjb25zdCBib2FyZCA9IGNyZWF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IGJvYXJkO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSA9PiB7XHJcbiAgICBpZiAoYm9hcmRbcm93XVtjb2xdICE9PSBzaGlwKSB7XHJcbiAgICAgIHNoaXBzLnB1c2goc2hpcCk7XHJcbiAgICAgIGJvYXJkW3Jvd11bY29sXSA9IHNoaXA7XHJcblxyXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3JpeicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGJvYXJkW3JvdyArIGldW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmFuZG9tU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhbmRvbVNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXonLCAndmVydCddO1xyXG5cclxuICAgIHJhbmRvbVNoaXBzLmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcm93O1xyXG4gICAgICBsZXQgY29sdW1uO1xyXG4gICAgICBsZXQgb3JpZW50YXRpb247XHJcbiAgICAgIGxldCBmbGFnO1xyXG4gICAgICBmdW5jdGlvbiBnZXRSYW5kb20oKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuXHJcbiAgICAgICAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKSAqIDJdO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6JyAmJiAoY29sdW1uICsgb2JqZWN0Lmxlbmd0aCAtIDEpID4gOSkge1xyXG4gICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnICYmIChyb3cgKyBvYmplY3QubGVuZ3RoIC0gMSkgPiAwKSB7XHJcbiAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZmFsc2UgPSBubyBzaGlwXHJcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IGNvbHVtbjsgaSA8IGNvbHVtbiArIG9iamVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgICBmbGFnID0gKGJvYXJkW3Jvd11baV0gIT09ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnQnKSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDwgcm93ICsgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghZmxhZykge1xyXG4gICAgICAgICAgICAgIGZsYWcgPSAoYm9hcmRbaV1bY29sdW1uXSAhPT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBnZXRSYW5kb20oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZ2V0UmFuZG9tKCk7XHJcbiAgICAgIHBsYWNlU2hpcChvYmplY3QsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFsbFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW3Jvd11bY29sdW1uXTtcclxuICAgIC8vIGFscmVhZHkgZ3Vlc3NlZFxyXG4gICAgaWYgKGJvYXJkQ2VsbCA9PT0gXCJtaXNzXCIgfHwgYm9hcmRDZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcIkFscmVhZHkgZ3Vlc3NlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAgaWYgKHR5cGVvZiBib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLmhpdCgpO1xyXG4gICAgICBib2FyZFtyb3ddW2NvbHVtbl0gPSBcImhpdFwiO1xyXG4gICAgICBpZiAoYWxsU3VuaygpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGhhcyBub3QgYmVlbiBoaXRcclxuICAgICAgYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge3JhbmRvbVNoaXBQbGFjZW1lbnQsIGFsbFN1bmssIGNsZWFyQm9hcmQsIHNob3dCb2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmNvbnN0IFBsYXllciA9ICgpID0+IHtcclxuICBjb25zdCBteUJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IGF0dGFjayA9IChyb3csIGNvbHVtbiwgYm9hcmQpID0+IHtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pO1xyXG5cclxuICAgIHJldHVybiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gPT09ICdoaXQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc1BsYWNlZEFycmF5KSA9PiB7XHJcbiAgICBzaGlwc1BsYWNlZEFycmF5LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICBteUJvYXJkLnBsYWNlU2hpcChvYmplY3Quc2hpcCwgb2JqZWN0LnJvdywgb2JqZWN0LmNvbHVtbiwgb2JqZWN0Lm9yaWVudGF0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwc1JhbmRvbWx5ID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnZXRNeUJvYXJkID0gKCkgPT4gbXlCb2FyZFxyXG5cclxuICBjb25zdCBjaG9vc2VSYW5kb21Db29yZCA9IChib2FyZCkgPT4ge1xyXG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG5cclxuICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkLnNob3dCb2FyZCgpW3Jvd11bY29sdW1uXTtcclxuXHJcbiAgICBpZiAoYm9hcmRDZWxsID09PSAnbWlzcycgfHwgYm9hcmRDZWxsID09PSAnaGl0Jykge1xyXG4gICAgICBjaG9vc2VSYW5kb21Db29yZChib2FyZCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2xlYXJNeUJvYXJkID0gKCkgPT4ge1xyXG4gICAgbXlCb2FyZC5jbGVhckJvYXJkKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBnYW1lT3ZlciA9ICgpID0+IG15Qm9hcmQuYWxsU3VuaygpXHJcblxyXG4gIHJldHVybiB7Z2FtZU92ZXIsIHBsYWNlU2hpcHNSYW5kb21seSwgY2xlYXJNeUJvYXJkLCBnZXRNeUJvYXJkLCBwbGFjZVNoaXBzLCBhdHRhY2ssIGNob29zZVJhbmRvbUNvb3JkfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICB9XHJcbiAgXHJcbiAgaGl0Q291bnQgPSAwO1xyXG5cclxuICBoaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmhpdENvdW50ICs9IDE7XHJcbiAgfVxyXG4gIFxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0Q291bnQgPj0gdGhpcy5sZW5ndGhcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbXBvbmVudHMvcGxheWVyXCI7XHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuXHJcbi8vIGNyZWF0ZSBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lcGxheSB7XHJcbiAgc3RhdGljIHBsYXllciA9IFBsYXllcigpO1xyXG5cclxuICBzdGF0aWMgY29tcHV0ZXIgPSBQbGF5ZXIoKTtcclxuXHJcbiAgc3RhdGljIHBsYXllck1vdmUocm93LCBjb2x1bW4pIHtcclxuICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5wbGF5ZXIuYXR0YWNrKHJvdywgY29sdW1uLCB0aGlzLmNvbXB1dGVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBVSS5kaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgJ2NvbXB1dGVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgaWYgKHRoaXMuY29tcHV0ZXIuZ2FtZU92ZXIoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnUGxheWVyIHdpbiEnKTsgICAgICAvLyBwbGF5ZXIgaGFzIHdvblxyXG4gICAgfVxyXG4gICAgdGhpcy5jb21wdXRlck1vdmUoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wdXRlck1vdmUoKSB7XHJcbiAgICBjb25zdCBjb29yZHMgPSB0aGlzLmNvbXB1dGVyLmNob29zZVJhbmRvbUNvb3JkKHRoaXMucGxheWVyLmdldE15Qm9hcmQoKSk7XHJcbiAgICBjb25zdCBpc0hpdCA9IHRoaXMuY29tcHV0ZXIuYXR0YWNrKGNvb3Jkc1swXSwgY29vcmRzWzFdLCB0aGlzLnBsYXllci5nZXRNeUJvYXJkKCkpO1xyXG4gICAgVUkuZGlzcGxheU1vdmVSZXN1bHQoY29vcmRzWzBdLnRvU3RyaW5nKCksIGNvb3Jkc1sxXS50b1N0cmluZygpLCAncGxheWVyLWJvYXJkJywgaXNIaXQpO1xyXG4gICAgaWYgKHRoaXMucGxheWVyLmdhbWVPdmVyKCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0NvbXB1dGVyIHdpbiEnKVxyXG4gICAgICAvLyBjb21wdXRlciBoYXMgd29uXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3RhcnRHYW1lKHNoaXBzQXJyYXkpIHtcclxuICAgIC8vIGNsZWFyIHRoZSBib2FyZHNcclxuICAgIHRoaXMuY29tcHV0ZXIuY2xlYXJNeUJvYXJkKCk7XHJcbiAgICB0aGlzLnBsYXllci5jbGVhck15Qm9hcmQoKTtcclxuXHJcbiAgICAvLyBoYXZlIHRoZSBwbGF5ZXIgcGxhY2UgdGhlaXIgc2hpcHNcclxuICAgIHRoaXMucGxheWVyLnBsYWNlU2hpcHMoc2hpcHNBcnJheSk7XHJcblxyXG4gICAgLy8gZW5lbXkgcGxhY2VzIHRoZWlyIHNoaXBzXHJcbiAgICB0aGlzLmNvbXB1dGVyLnBsYWNlU2hpcHNSYW5kb21seSgpO1xyXG5cclxuICAgIC8vIHNob3cgdGhlIGJvYXJkc1xyXG4gICAgVUkuY3JlYXRlUGxheWVyQm9hcmQodGhpcy5wbGF5ZXIuZ2V0TXlCb2FyZCgpKTtcclxuICAgIFVJLmNyZWF0ZU9wcG9uZW50Qm9hcmQodGhpcy5jb21wdXRlci5nZXRNeUJvYXJkKCkpO1xyXG5cclxuICAgIC8vIHRha2UgdHVybnMgYW5kIHBsYXkgdGhlIGdhbWVcclxuXHJcbiAgfVxyXG59IiwiaW1wb3J0IEdhbWVwbGF5IGZyb20gJy4vZ2FtZXBsYXknXHJcbmltcG9ydCBVSSBmcm9tIFwiLi92aXNpYmxlQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vY29tcG9uZW50cy9zaGlwXCI7XHJcblxyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJyk7XHJcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbmNvbnN0IHBsYWNlU2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2Utc2hpcHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IG1haW5Cb2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XHJcblxyXG5cclxuY29uc3QgYXZhaWxhYmxlU2hpcHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgY2FycmllciA9IG5ldyBTaGlwKDUpO1xyXG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcCg0KTtcclxuICBjb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoMyk7XHJcbiAgY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoMik7XHJcblxyXG4gIHJldHVybiBbY2FycmllciwgYmF0dGxlc2hpcCwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lcnMge1xyXG4gIHN0YXRpYyBvcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcblxyXG4gIHN0YXRpYyBzaGlwSW5kZXggPSAwO1xyXG5cclxuICBzdGF0aWMgc2hpcHNQbGFjZWQgPSBbXTtcclxuXHJcbiAgc3RhdGljIHNoaXBzID0gYXZhaWxhYmxlU2hpcHMoKTtcclxuXHJcbiAgc3RhdGljIGV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgVUkuY3JlYXRlQm9hcmQoJ3BsYWNlLXNoaXBzLWJvYXJkJyk7XHJcblxyXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJvdGF0ZVNoaXAoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSgpIHtcclxuICAgIEdhbWVwbGF5LnN0YXJ0R2FtZSh0aGlzLnNoaXBzUGxhY2VkKTtcclxuICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuZXJzKCk7XHJcbiAgICBwbGFjZVNoaXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgbWFpbkJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGFkZFBsYWNlU2hpcExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BsYWNlLXNoaXBzLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgcm93IH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGNvbnN0IHsgY29sdW1uIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGlmICh0aGlzLnNoaXBJbmRleCA8IDUgJiYgdGhpcy5pc0xlZ2FsU2hpcFBsYWNlbWVudCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uKSkge1xyXG4gICAgICAgICAgdGhpcy5wbGFjZVNoaXAocm93LCBjb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRBdHRhY2tMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBlbmVteUNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkIC5jZWxsJyk7XHJcbiAgICBlbmVteUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSAnJykge1xyXG4gICAgICAgICAgR2FtZXBsYXkucGxheWVyTW92ZShlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwbGFjZVNoaXAocm93LCBjb2x1bW4pIHtcclxuICAgIFVJLnBsYWNlU2hpcCh0aGlzLnNoaXBzW3RoaXMuc2hpcEluZGV4XS5sZW5ndGgsIHJvdywgY29sdW1uLCB0aGlzLm9yaWVudGF0aW9uKTtcclxuICAgIGNvbnN0IHNoaXBzSW5mb09iamVjdCA9IHtcclxuICAgICAgXCJzaGlwXCI6IHRoaXMuc2hpcHNbdGhpcy5zaGlwSW5kZXhdLFxyXG4gICAgICBcInJvd1wiOiBOdW1iZXIocm93KSxcclxuICAgICAgXCJjb2x1bW5cIjogTnVtYmVyKGNvbHVtbiksXHJcbiAgICAgIFwib3JpZW50YXRpb25cIjogdGhpcy5vcmllbnRhdGlvblxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwc1BsYWNlZC5wdXNoKHNoaXBzSW5mb09iamVjdCk7XHJcbiAgICB0aGlzLnNoaXBJbmRleCArPSAxO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzTGVnYWxTaGlwUGxhY2VtZW50KGxlbmd0aCwgcm93LCBjb2x1bW4pIHtcclxuICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgY2VsbHMgaGFzIGEgc2hpcCBpbiBpdFxyXG5cclxuICAgIC8vIGNoZWNrIGlmIHNoaXAgZ29lcyBvdXQgb2YgYm91bmRzXHJcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6Jykge1xyXG4gICAgICAvLyBjaGVjayBpZiBzaGlwIGdvZXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICBpZiAoTnVtYmVyKGNvbHVtbikgKyBsZW5ndGggLSAxID4gOSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YXJnZXQgY2VsbHMgYWxyZWFkeSBoYXMgYSBzaGlwIGluIGl0XHJcbiAgICAgIC8vIGZhbHNlID0gbm8gc2hpcFxyXG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICBmb3IgKGxldCBpID0gTnVtYmVyKGNvbHVtbik7IGkgPCBOdW1iZXIoY29sdW1uKSArIGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFmbGFnKSB7XHJcbiAgICAgICAgICBmbGFnID0gVUkuY29udGFpbnNTaGlwKHJvdywgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAoIWZsYWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydCcpIHtcclxuICAgICAgaWYgKE51bWJlcihyb3cpICsgbGVuZ3RoIC0gMSA+IDkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSBOdW1iZXIocm93KTsgaSA8IE51bWJlcihyb3cpICsgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgIGZsYWcgPSBVSS5jb250YWluc1NoaXAoaSwgY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICghZmxhZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcm90YXRlU2hpcCgpIHtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXonID8gJ3ZlcnQnIDogJ2hvcml6JztcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZXNldCgpIHtcclxuICAgIFVJLmNyZWF0ZUJvYXJkKCdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpeic7XHJcbiAgICB0aGlzLnNoaXBJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNoaXBzUGxhY2VkID0gW107XHJcbiAgICB0aGlzLmFkZFBsYWNlU2hpcExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XHJcbiAgc3RhdGljIGNyZWF0ZUJvYXJkKGlkLCBib2FyZCA9IG51bGwpIHtcclxuICAgIGZvcihsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xyXG4gICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gID0gY29sdW1uO1xyXG4gICAgICAgIGlmIChib2FyZCAmJiBib2FyZC5zaG93Qm9hcmQoKVtyb3ddW2NvbHVtbl0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlUGxheWVyQm9hcmQoYm9hcmQpIHtcclxuICAgIHRoaXMuY3JlYXRlQm9hcmQoJ3BsYXllci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGVPcHBvbmVudEJvYXJkKGJvYXJkKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCdjb21wdXRlci1ib2FyZCcsIGJvYXJkKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kQ2VsbChyb3csIGNvbHVtbiwgaWQpIHtcclxuICAgIGxldCBwaWNrZWQ7XHJcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke2lkfSAuY2VsbGApO1xyXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgICBpZiAoY2VsbC5kYXRhc2V0LnJvdyA9PT0gcm93ICYmIGNlbGwuZGF0YXNldC5jb2x1bW4gPT09IGNvbHVtbikge1xyXG4gICAgICAgIHBpY2tlZCA9IGNlbGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBpY2tlZDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkaXNwbGF5TW92ZVJlc3VsdChyb3csIGNvbHVtbiwgaWQsIGlzSGl0KSB7XHJcbiAgICBjb25zdCBwaWNrZWQgPSB0aGlzLmZpbmRDZWxsKHJvdywgY29sdW1uLCBpZCk7XHJcblxyXG4gICAgaWYgKGlzSGl0KSB7XHJcbiAgICAgIHBpY2tlZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGlja2VkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcclxuICAgICAgcGlja2VkLnRleHRDb250ZW50ID0gJ1gnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sdW1uLCBvcmllbnRhdGlvbikge1xyXG4gICAgbGV0IGNob2ljZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXonKSB7XHJcbiAgICAgICAgY2hvaWNlID0gdGhpcy5maW5kQ2VsbChyb3csIChOdW1iZXIoY29sdW1uKSArIGkpLnRvU3RyaW5nKCksICdwbGFjZS1zaGlwcy1ib2FyZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNob2ljZSA9IHRoaXMuZmluZENlbGwoKE51bWJlcihyb3cpICsgaSkudG9TdHJpbmcoKSwgY29sdW1uLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgICAgfVxyXG4gICAgICBjaG9pY2UuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRhaW5zU2hpcChyb3csIGNvbHVtbikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZmluZENlbGwocm93LnRvU3RyaW5nKCksIGNvbHVtbi50b1N0cmluZygpLCAncGxhY2Utc2hpcHMtYm9hcmQnKTtcclxuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xyXG5cclxuTGlzdGVuZXJzLmV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJnYW1lYm9hcmQiLCJjcmVhdGVCb2FyZCIsImJvYXJkIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiQXJyYXkiLCJtYXAiLCJmaWxsIiwiY2xlYXJCb2FyZCIsInNoaXBzIiwiYXZhaWxhYmxlU2hpcHMiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaG93Qm9hcmQiLCJwbGFjZVNoaXAiLCJzaGlwIiwicm93IiwiY29sIiwib3JpZW50YXRpb24iLCJwdXNoIiwiaSIsImxlbmd0aCIsInJhbmRvbVNoaXBQbGFjZW1lbnQiLCJyYW5kb21TaGlwcyIsIm9yaWVudGF0aW9ucyIsImZvckVhY2giLCJvYmplY3QiLCJjb2x1bW4iLCJmbGFnIiwiZ2V0UmFuZG9tIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWxsU3VuayIsImV2ZXJ5IiwiaXNTdW5rIiwicmVjZWl2ZUF0dGFjayIsImJvYXJkQ2VsbCIsIl90eXBlb2YiLCJoaXQiLCJQbGF5ZXIiLCJteUJvYXJkIiwiYXR0YWNrIiwicGxhY2VTaGlwcyIsInNoaXBzUGxhY2VkQXJyYXkiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJnZXRNeUJvYXJkIiwiY2hvb3NlUmFuZG9tQ29vcmQiLCJjbGVhck15Qm9hcmQiLCJnYW1lT3ZlciIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiaGl0Q291bnQiLCJVSSIsIkdhbWVwbGF5Iiwia2V5IiwidmFsdWUiLCJwbGF5ZXJNb3ZlIiwiaXNIaXQiLCJwbGF5ZXIiLCJjb21wdXRlciIsImRpc3BsYXlNb3ZlUmVzdWx0IiwiY29uc29sZSIsImxvZyIsImNvbXB1dGVyTW92ZSIsImNvb3JkcyIsInRvU3RyaW5nIiwic3RhcnRHYW1lIiwic2hpcHNBcnJheSIsImNyZWF0ZVBsYXllckJvYXJkIiwiY3JlYXRlT3Bwb25lbnRCb2FyZCIsImRlZmF1bHQiLCJyb3RhdGVCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3RhcnRCdG4iLCJwbGFjZVNoaXBzQ29udGFpbmVyIiwibWFpbkJvYXJkc0NvbnRhaW5lciIsIkxpc3RlbmVycyIsImV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdGF0ZVNoaXAiLCJhZGRQbGFjZVNoaXBMaXN0ZW5lcnMiLCJzaGlwc1BsYWNlZCIsImFkZEF0dGFja0xpc3RlbmVycyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIl90aGlzMiIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsInNoaXBJbmRleCIsImlzTGVnYWxTaGlwUGxhY2VtZW50IiwiZW5lbXlDZWxscyIsInRleHRDb250ZW50Iiwic2hpcHNJbmZvT2JqZWN0IiwiTnVtYmVyIiwiY29udGFpbnNTaGlwIiwicmVzZXQiLCJpZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImZpbmRDZWxsIiwicGlja2VkIiwiY29uY2F0IiwiY2hvaWNlIiwiY29udGFpbnMiXSwic291cmNlUm9vdCI6IiJ9