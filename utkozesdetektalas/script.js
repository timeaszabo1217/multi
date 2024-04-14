// jatekterulet
let game_area;
// jatekterulet szelessege, hosszusaga
let ga_width, ga_height;

// ellenseg
let enemy;
// tomb az ellensegnek
let enemy_array = [];
// a megjelenitendo ellenseg kezdo x koordinataja
let start_ex = 100;
// a megjelenitendo ellenseg kezdo y koordinataja
let start_ey = 100;
// a megjelenitendo ellenseg vég ys koordinataja
let end_ey = 500;
// megjelenitendo ellenseg szama
let enemy_num = 10;
// az ellenseg szelessege
let offset_x = (end_ey - start_ey) / enemy_num;

// urhajp
let defender;
// az urhajo szelessege, magassaga
let def_width = offset_x, def_height;
// az urhajo elmozdulasanak merteke
let move_step = def_width / 2;

// ismetlodo fuggveny
let mov_int;
let score = 0;

$(document).ready(function () {
    game_area = $('#gamearea');
    defender = $('<img src="def.png" id="defender">');
    enemy = $('<img src="enemy.png" class="enemy">');

    // urhajo hozzaadasa a jatekterhez
    game_area.append(defender);
    // a jatekter szelessegenek lekerdezese
    ga_width = parseInt(game_area.css('width'));
    // a jatekter magassaganak lekerdezese
    ga_height = parseInt(game_area.css('height'));

    // ha mar elerheto a kep, akkor rajzolja ki az urhajot
    defender.on('load', function () {
        init_defender();
    });

    // ha mar elerheto a kep, akkor rajzolja ki az ellenseget
    enemy.on('load', function () {
        init_enemy();
    });

    // esemenykezeles gomblenyomasra
    $(window).on('keydown', move_defender);
    // esemenykezeles egermozgasra a jatekteren belul
    game_area.on('mousemove', mousemove_defender);

    // idozites az ellenseg mozgatasara
    mov_int = setInterval(moving_enemy, 1000);

    //
    $(game_area).on('click', init_shoot);
    setInterval(check_collisoin, 1);

    game_area.append('<div id="score_tab">Score:<span id="score" style="padding-left: 10px"></span></div>')
    $('#score').text(score);
});


// fuggveny az ellenseg definialasara
function init_enemy() {
    // az osszes ellenseg poziciojat es a megjelenitendo kepet egy eltaroljuk az erre a celra korabban letrehozott tombben
    for (let i = 0; i < enemy_num; i++) {
        // az x koordinatat novelni kell minden ellenseg eseteben, hogy egymas mellett helyezkedjenek el
        enemy_array.push({
            x_pos: start_ex + i * offset_x,
            y_pos: start_ey,
            imgObj: enemy.clone()
        })
    }

    // az ellenseg tomb elemeinek kirajzolasa
    draw_enemy();
}


// fuggveny az ellenseg kirajzolasara
function draw_enemy() {
    // vegigmegyunk az ellenseg tomb minden elemen
    for (let e in enemy_array) {
        // vesszuk az aktualis elemet
        let act_enemy = enemy_array[e];
        // lekerjuk a megjelenitendo kepet
        let act_img = act_enemy.imgObj;
        // hozzaadjuk az ellenseg kepet a jatekterulethez
        game_area.append(act_img);
        // beallitjuk az aktualis ellenseg (x, y) koordinatajat es a kep szelesseget
        act_img.css({
            left: act_enemy.x_pos,
            top: act_enemy.y_pos,
            width: offset_x
        });
        // hozzaadjuk az enemy class-t
        act_img.addClass('enemy');
    }
}

// fuggveny, mely megadott idokozonkent meghivodik es megvaltoztatja az ellenseg poziciojat
function moving_enemy() {
    // az osszes ellenseg poziciojat megvaltoztatjuk egyenkent
    $('.enemy').each(function () {
        // ha az aktualis pozicio 300px alatt van, akkor noveljuk az ellenseg y koordinatajat 20px-el
        if ($(this).position().top < 300) {
            $(this).css({
                top: '+=20'
            });
        } else {
            // egyebkent toroljuk az idozitest
            clearInterval(mov_int)
        }
    });
}

// fuggveny az urhajo parametereinek lekeresere, beallitasara
function init_defender() {
    // az urhajo szelessegenek beallitasa
    defender.css({
        width: def_width,
    });

    // az urhajo magassaga
    def_height = parseInt(defender.css('height'));

    // az urhajo y poziciojanak beallitasa
    defender.css({
        top: ga_height - def_height,
    });
}

// az urhajo vezerlese a kurzurmozgato billentyuk segitsegevel
function move_defender(ev) {
    // lenyomott billentyu
    let pressed_key = ev.key;
    // ha a lenyomott billentyu a jobbra nyil
    let pos_y;
    if (pressed_key === 'ArrowRight') {
        // annak vizsgalata, hogy a jatekteren belul vagyunk-e meg
        if (parseInt(defender.css('left')) + def_width < ga_width) {
            defender.animate({
                left: '+=' + move_step
            }, 1)
        } else {
            defender.animate({
                left: ga_width - def_width
            }, 1)
        }
        // ha a lenyomott billentyu a balra nyil
    } else if (pressed_key === 'ArrowLeft') {
        // annak vizsgalata, hogy a jatekteren belul vagyunk-e meg
        if (parseInt(defender.css('left')) - move_step > 0) {
            defender.animate({
                left: '-=' + move_step
            }, 1)
        } else {
            defender.animate({
                left: 0
            }, 1)
        }
    } else if (pressed_key === ' ') {
        init_shoot();
    }
}

// egeresemeny kezelese
function mousemove_defender(e) {
    // a div offset lekerese a pontos egerpozicio megadashoz a div-en belul
    let div_pos = game_area.offset();
    // az x egerpozicio meghatarozasa a defender kozepere
    let mouse_pos_x = Math.ceil(e.clientX - div_pos.left - move_step);

    // annak vizsgalata, hogy meg a jatekteruleten belul vagyunk-e
    if (mouse_pos_x > 0 && mouse_pos_x < ga_width - def_width) {
        defender.css({
            left: mouse_pos_x,
        });
    }
}

//
function init_shoot() {
    let def_pos_x = defender.position().left + move_step;
    let def_pos_y = defender.position().top;
    let cartridge = $('<img src="bomb.jpg">');
    cartridge.css({
        top: def_pos_y,
        left: def_pos_x,
        position: 'relative'
    });
    cartridge.animate({
        top: 0
    }, 1000, function () {
        cartridge.remove()
    });
    cartridge.addClass('shoot');
    game_area.append(cartridge);
}


function check_collisoin() {
    $('.shoot').each(function () {
        let act_shoot = $(this);
        let act_x = act_shoot.position().left + move_step;
        let act_y = act_shoot.position().top;

        $('.enemy').each(function () {
            let e_pos_x = $(this).position().left + move_step + parseInt(enemy.css('width')) / 2;
            let e_pos_y = $(this).position().top + parseInt(enemy.css('height')) / 2;

            if (distance({x: act_x, y: act_y}, {x: e_pos_x, y: e_pos_y}) <= parseInt($(this).css('height')) / 2) {
                $(this).remove();
                act_shoot.remove();
                score += 1;
                $('#score').text(score);
            }
        });
    });
}

function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy)
}

