/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独解决方案
var Toolkit = __webpack_require__(1);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalGenerate()) {
                console.log("1241");
            }
        }
    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            this.matrix = Toolkit.matrix.makeMatrix();
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }
            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                // 这个位置已经有值了
                if (row[colIndex]) {
                    continue;
                }
                // 检查这个位置是否有值
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n;
                // 当前行填写成功, 递归调用
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                return true;
            }
        }
    }]);

    return Generator;
}();

module.exports = Generator;

// const generator = new Generator();
// generator.generate();


// console.log(generator.matrix);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 矩阵和数组相关的工具
var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return Array.from({ length: 9 }, function () {
            return _this.makeRow(v);
        });
    },

    /***
     * 洗牌算法
     */
    shuffle: function shuffle(array) {
        var length = array.length;
        var endIndex = length - 1;
        for (var i = 0; i < endIndex; i++) {
            var j = i + Math.floor(Math.random() * (length - i));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },


    /***
     * 检查指定位置是否有值
     */
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        var row = matrix[rowIndex];
        var col = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });

        var _boxToolit$convertToB = boxToolit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolit$convertToB.boxIndex;

        var box = boxToolit.getBoxCells(matrix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || col[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};
/***
 * 宫坐标系
 */

var boxToolit = {
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }

        return result;
    },
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
module.exports = function () {
    function ToolKit() {
        _classCallCheck(this, ToolKit);
    }

    _createClass(ToolKit, null, [{
        key: "matrix",
        get: function get() {
            return matrixToolkit;
        }
    }, {
        key: "box",
        get: function get() {
            return boxToolit;
        }
    }]);

    return ToolKit;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(3);
var PopupNumbers = __webpack_require__(6);
var grid = new Grid($("#container"));
grid.build();
grid.layout();

var popunumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popunumbers);

$("#rebuild").click(function (e) {
    grid.rebuild();
});
$("#check").click(function (e) {
    grid.check();
});
$("#clear1").click(function (e) {
    grid.clear1();
});
$("#reset1").click(function (e) {
    grid.reset1();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成九宫格
var generator = __webpack_require__(0);
var Sudoku = __webpack_require__(4);
var Checker = __webpack_require__(5);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            // const generate = new generator();
            // generate.generate();
            var sudoku = new Sudoku();
            sudoku.make();
            var matrix = sudoku.puzzleMatrix;
            var rowGrounpClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGrounpClasses = ["col_g_left", "col_g_center", "col_g_right"];
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").text(cellValue).addClass(colGrounpClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty");
                });
            });

            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").append($spanArray).addClass("row").addClass(rowGrounpClasses[rowIndex % 3]);
            });

            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width > 32 ? width / 2 + "px" : ""
            });
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span:not('.fixed')", function (e) {
                var $cell = $(e.target);
                console.log($cell);
                popupNumbers.popup($cell);
            });
        }
    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }, {
        key: "check",
        value: function check() {
            var data = this._$container.children().map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($data) {
                return $data.toArray();
            });
            var checker = new Checker(data);

            if (checker.check()) {
                return true;
            }

            var marks = checker.matrixMarks;
            console.log(marks);
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    if ($(span).is(".fixed") || marks[rowIndex][colIndex]) {
                        $(span).removeClass("error");
                    } else {
                        $(span).addClass("error");
                    }
                });
            });
        }
    }, {
        key: "reset1",
        value: function reset1() {
            this._$container.find("span:not('.fixed')").removeClass("mark1 mark2 error").addClass("empty").text(0);
        }
    }, {
        key: "clear1",
        value: function clear1() {
            this._$container.find("span.error").removeClass("error");
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独游戏
var Generator = __webpack_require__(0);
// 1. 生成完整的解决方案

// 2. 去除部分数据

var Sudoku = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        var generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    // 生成迷盘


    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;


            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

module.exports = Sudoku;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 检查数独的解决方案
function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);

    for (var i = 0; i < length; i++) {
        if (!marks[i]) {
            continue;
        }
        var v = array[i];

        if (!v) {
            marks[i] = false;
            continue;
        }

        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}
var Toolkit = __webpack_require__(1);
module.exports = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            // 检查是否成功
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);

                for (var colIndex = 0; colIndex < 9; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            var cols = [];
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }
                var marks = checkArray(cols);
                for (var _rowIndex = 0; _rowIndex < 9; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _Toolkit$box$convertF.rowIndex,
                            colIndex = _Toolkit$box$convertF.colIndex;

                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PopupNumbers = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                $cell.text(0).addClass("empty");
            } else {
                $cell.removeClass("empty").text($span.text());
            }

            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;
            var width = $cell.width();
            console.log(width);
            $("#popupNumbers").find("span").css({
                "width": width,
                "height": width,
                "line-height": width + "px"
            });

            var popupWidth = $("#popupNumbers").width();
            var sreenWidth = $(window).width();

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
            if (left + popupWidth > sreenWidth) {
                this._$panel.css("left", sreenWidth - popupWidth);
            }
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

module.exports = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map