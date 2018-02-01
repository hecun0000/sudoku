


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
$("#ckeck").click(e=>{
    grid.ckeck();
})
$("#clear1").click(e=>{
    grid.clear1();
})
$("#reset1").click(e=>{
    grid.reset1();
})