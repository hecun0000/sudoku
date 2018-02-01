


const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popunumbers");
const grid = new Grid($("#container"));
grid.build();
grid.layout();

const popunumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popunumbers);

$("#rebuild").click(e=>{
    grid.rebuild();
})
$("#check").click(e=>{
    console.log("检查了")
    grid.check();
})
$("#clear1").click(e=>{
    grid.clear1();
})
$("#reset1").click(e=>{
    grid.reset1();
})