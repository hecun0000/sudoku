// 生成九宫格
const generator = require("../core/generator");
const Sudoku = require("../core/sudoku");
class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        // const generate = new generator();
        // generate.generate();
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;
        const rowGrounpClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGrounpClasses = ["col_g_left", "col_g_center", "col_g_right"];
        const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>")
                    .text(cellValue)
                    .addClass(colGrounpClasses[colIndex % 3])
                    .addClass(cellValue?"fixed":"empty");
        }));

        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>").append($spanArray).addClass("row").addClass(rowGrounpClasses[rowIndex % 3]);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container).height(width).css({
            "line-height": `${width}px`,
            "font-size": width > 32 ? `${width / 2}px` : ""
        })
    }

    bindPopup(popupNumbers){
        this._$container.on("click","span:not('.fixed')",e=>{
            const $cell = $(e.target);
            console.log($cell);
            popupNumbers.popup($cell);
        })
    }

    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }

    check(){

    }

    reset1(){

    }

    clear1(){
        
    }
}

module.exports = Grid;