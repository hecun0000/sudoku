class PopupNumbers {
    constructor($panel){
        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click","span",e=>{
            const $cell= this._$targetCell;
           const  $span = $(e.target);
            if($span.hasClass("mark1")){
                if ($cell.hasClass("mark1")){
                    $cell.removeClass("mark1");
                }else{
                    $cell.removeClass("mark2").addClass("mark1");
                }
            }else if($span.hasClass("mark2")){
                if ($cell.hasClass("mark2")){
                    $cell.removeClass("mark2");
                }else{
                    $cell.removeClass("mark1").addClass("mark2");
                }
            }else if ($span.hasClass("empty")) {
                $cell.text(0).addClass("empty");
            }else{
                $cell.removeClass("empty").text($span.text());
            }

            this.hide();
        })
    }

    popup($cell){
        this._$targetCell = $cell;
        const width = $cell.width();
        console.log(width);
        $("#popupNumbers").find("span").css({
            "width": width,
            "height":width,
            "line-height":`${width}px`
        });

        const popupWidth = $("#popupNumbers").width();
        const sreenWidth = $(window).width();
        const {left,top} = $cell.position();
        this._$panel.css({
            left:`${left}px`,
            top:`${top}px`
        }).show();
        if (left + popupWidth > sreenWidth) {
            this._$panel.css("left",sreenWidth - popupWidth)
        }
    }

    hide(){
        this._$panel.hide();
    }
}

module.exports = PopupNumbers;