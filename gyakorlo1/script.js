let game_area;
const tile_sz = 100;

function createTile(row, column) {
    let tile;
    if((row+column) % 2 === 0) {
        tile=$('<div class="tile black"></div>');
    }
    else {
        tile=$('<div class="tile white"></div>');
    }
    tile.attr('row', row);
    tile.attr('column', column);
    tile.attr('stone', 0);
    tile.css({
        width: tile_sz,
        height: tile_sz,
        top: row * tile_sz,
        left: column * tile_sz
    });
    return tile;
}

function createTable() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let tile = createTile(row, column);
            game_area.append(tile);
        }
    }
}

function createGameArea() {
    game_area = $('#gameArea');
    game_area.css({
        width: 800,
        height: 800
    });
}

function createStone() {
    let stone=$('<img class="tile stone" src="stone.jpg" alt="stone">');
    stone.css({
        width: tile_sz,
        height: tile_sz,
        top: 0,
        left: 0
    });
    stone.animate({
        opacity:0,
    }, 0).animate({
        opacity:1,
    }, 1600);

    return stone;
}

function clickEvent() {
    game_area.find('.tile').click(function() {
        let row=$(this).attr("row");
        let column=$(this).attr("column");
        if($(this).attr("stone")==='0') {
            $(".tile[row="+row.toString()+"][column="+column.toString()+"]").append(createStone());
            $(this).attr('stone', 1);
        }
        console.log(parseInt(row)+1, parseInt(column)+1);
    });
}

$(document).ready(function() {
    createGameArea();
    createTable();
    clickEvent();
});

