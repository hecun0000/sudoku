// 生成数独游戏
const Generator = require("./generator");
// 1. 生成完整的解决方案

// 2. 去除部分数据

class Sudoku {
    constructor(){
        const generator =new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;

    }

    // 生成迷盘
    make(level = 5){
        

        this.puzzleMatrix = this.solutionMatrix.map(row=>{
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        })
    }
}

module.exports = Sudoku;