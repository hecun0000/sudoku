// 生成数独解决方案
const Toolkit = require("./toolkit");
class Generator {
    generate(){
        while (!this.internalGenerate()) {
            console.log("1241")
        }
    }
    internalGenerate(){
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
                    .map(row=>row.map((v,i)=>i))
                    .map(row=>Toolkit.matrix.shuffle(row));
        for (let n = 1; n <= 9; n++) {
            if(!this.fillNumber(n)){
                return false;
            }
        }
        return true;
        
    }

    fillNumber(n){
        return this.fillRow(n,0);
    }

    fillRow(n,rowIndex){
        if(rowIndex>8){
            return true;
        }
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            // 这个位置已经有值了
            if(row[colIndex]){
                continue;
            }
            // 检查这个位置是否有值
            if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)){
                continue;
            }
            row[colIndex] = n;
            // 当前行填写成功, 递归调用
            if(!this.fillRow(n, rowIndex + 1)){
                row[colIndex] = 0;
                continue;
            }
            return true;

        }

    }
}

module.exports = Generator;

// const generator = new Generator();
// generator.generate();


// console.log(generator.matrix);
