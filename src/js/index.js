const toolkit = require("./core/toolkit");

class Grid{
    constructor(container){
        this._$container = container;
    }

    build(){
        const matrix = toolkit.makeMatrix();
        const rowGrounpClasses = ["row_g_top","row_g_middle","row_g_bottom"];
        const colGrounpClasses = ["col_g_left","col_g_center","col_g_right"];
        const $cells = matrix.map(rowValues => rowValues.map((cellValue,colIndex) => {
            return $("<span>").text(cellValue).addClass(colGrounpClasses[colIndex%3]);
        }));
        
        const $divArray = $cells.map(($spanArray,rowIndex) =>{
            return $("<div>").append($spanArray).addClass("row").addClass(rowGrounpClasses[rowIndex%3]);
        });

        this._$container.append($divArray);
    }

    layout(){
        const width = $("span:first",this._$container).width();
        $("span",this._$container).height(width).css({
            "line-height":`${width}px`,
            "font-size": width>32?`${width/2}px`:""
        })
    }
}

const grid = new Grid($("#container"));
grid.build();
grid.layout();