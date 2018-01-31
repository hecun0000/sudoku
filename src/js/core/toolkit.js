// 矩阵和数组相关的工具
const matrixToolkit = {
    makeRow(v = 0){
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v))
    },  
    /***
     * 洗牌算法
     */
    shuffle(array) {
        const length = array.length;
        const endIndex = length - 1;
        for (let i = 0; i < endIndex; i++) {
            const j = i + Math.floor(Math.random() * (length - i));
            [array[i], array[j]] = [array[j], array[i]];

        }
        return array;
    },

    /***
     * 检查指定位置是否有值
     */
    checkFillable(matrix, n, rowIndex, colIndex){
        const row =  matrix[rowIndex];
        const col = this.makeRow().map((v,i)=>matrix[i][colIndex]);
        const {boxIndex} =  boxToolit.convertToBoxIndex(rowIndex,colIndex);
        const box = boxToolit.getBoxCells(matrix,boxIndex);
        for (let i = 0; i < 9; i++) {
            if(row[i]===n||col[i]===n||box[i]===n){
                return false;
            }
            
        }
        return true;
    }
};
/***
 * 宫坐标系
 */

const boxToolit ={
    getBoxCells(matrix, boxIndex){
        const startRowIndex = Math.floor(boxIndex/3)*3;
        const startColIndex = boxIndex%3*3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex/3);
            const colIndex = startColIndex +  cellIndex%3;
            result.push(matrix[rowIndex][colIndex]);
            
        }

        return result;
    },
    convertToBoxIndex(rowIndex,colIndex){
        return  {
            boxIndex: Math.floor(rowIndex/3)*3+Math.floor(colIndex/3),
            cellIndex: rowIndex%3*3 + colIndex % 3
        }
    },

    convertFromBoxIndex(boxIndex,cellIndex){
        return {
            rowIndex: Math.floor(boxIndex/3)*3 + Math.floor(cellIndex/3),
            colIndex:boxIndex%3*3 + cellIndex%3
        }
    }
};
module.exports  = class ToolKit{
    static get matrix(){
        return matrixToolkit;
    }

    static get box(){
        return boxToolit;
    }
};