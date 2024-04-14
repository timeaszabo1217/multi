let game_area;

let frog;
let frog_x, frog_y;
let move_offset = 50;
let game_area_width = 800, game_area_height = 800;
let car_left, car_right;
let hit_tresh;
let car_birth, coll_check;

$(document).ready(function () {

    game_area = $('#game_area');

    init();

    car_left = $('<img src="car_left.png" class="car">');
    car_right = $('<img src="car_right.png" class="car">');

    $(window).on('keydown', move_frog);


});


function init() {
    add_road();
    add_frog();

    car_birth = setInterval(add_cars, 500);
    coll_check = setInterval(check_collision, 1);
}


function add_road() {
    let s_pos = 50;
    let offset = 100;

    for (let i = 0; i < 6; i++) {
        let road = $('<div><img src="road.png" id = "road"></div>');
        road.css({
            left: 0,
            top: s_pos + i * offset,
            position: 'absolute'
        });
        road.addClass('road' + i);
        game_area.append(road)
    }
}


function add_frog() {
    frog = $('<img src="frog.png">');
    frog.css({
        top: game_area_height - move_offset,
        left: 400,
        position: 'absolute'
    });
    game_area.append(frog);
}


function move_frog(e) {
    let key = e.key;
    frog_x = frog.position().left;
    frog_y = frog.position().top;

    if (key === 'ArrowLeft') {
        if (frog_x - move_offset >= 0) {
            frog.animate({
                left: frog_x - move_offset
            }, 1);
        }
    } else if (key === 'ArrowRight') {
        if (frog_x + move_offset < game_area_width) {
            frog.animate({
                left: frog_x + move_offset
            }, 1);
        }
    } else if (key === 'ArrowUp') {
        if (frog_y - move_offset >= 0) {
            frog.animate({
                top: frog_y - move_offset
            }, 1);
        }
    } else if (key === 'ArrowDown') {
        if (frog_y + move_offset < game_area_height) {
            frog.animate({
                top: frog_y + move_offset
            }, 1);
        }
    }
}


function add_cars() {
    if (Math.random() > 0.35) {
        let car = car_right.clone();
        let y_coord;

        if (Math.random() > 0.75) {
            y_coord = 250;
        }
        else if (Math.random() > 0.5) {
            y_coord = 450;
        }
        else {
            y_coord = 50;
        }

        car.css({
            position: 'absolute',
            left: 0,
            top: y_coord
        });
        game_area.append(car);
        car.addClass('car_r');

        car.animate({
            left: game_area_width - 74,
        }, 2000, function () {
            car.remove()
        })

    } else {
        let car = car_left.clone();
        let y_coord;

        if (Math.random() > 0.75) {
            y_coord = 350;
        }
        else if (Math.random() > 0.5) {
            y_coord = 550;
        }
        else {
            y_coord = 150;
        }

        car.css({
            position: 'absolute',
            left: game_area_width - 56,
            top: y_coord
        });
        game_area.append(car);
        car.addClass('car_l');

        car.animate({
            left: 0
        }, 2000, function () {
            car.remove()
        });
    }
}


function check_collision() {

    $('.car').each(function () {

        let act_c_x = $(this).position().left;
        let act_c_y = $(this).position().top;

        let frog_x = frog.position().left;
        let frog_y = frog.position().top;

        let car_type = this.className.split(' ')[1];
        if (car_type === 'car_r' && frog_y === act_c_y) {
            hit_tresh = 74;
        } else {
            hit_tresh = 50;
        }

        if (distance({x: act_c_x, y: act_c_y}, {x: frog_x, y: frog_y}) <= hit_tresh) {
            init();
        }
    });

    win_check(frog_y);
}


function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy)
}


function win_check(f_y) {
    if (f_y <= 50) {
        clearInterval(car_birth);
        clearInterval(coll_check);
        setTimeout(clearContents, 200);
    }
}

function clearContents() {
    game_area.empty();
    game_area.append('<div id="wintext">😿</div style>');
}