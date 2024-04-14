// jatekter
let game_area;
// reszkepek merete
let offset = 200;
// jo helyen levo elemek szama
let rpos_num = 0;

// tomb a kepreszletek tarolasara
let parts = [];
// tomb feltoltese a 4 kepreszlettel
for (let i = 0; i < 4; i++) {
    // kep peldany
    parts[i] = new Image();
    // eleresi utvonal beallitasa
    parts[i].src = 'fatcat_p' + (i + 1) + '.png';
}

$(document).ready(function () {
    // jatekter elerese
    game_area = $('#game_area');
    // a kepreszletek elhelyezese a jatekteren
    setImageParts();
    // a helyen levo elemek szamanak kijelzese
    $('#clicks').text(rpos_num);

    // az egyes kepreszletek random elforgatasa, jatek elokeszitese
    $(".catpart").each(function () {
        random_rotate($(this));
    });

    // amennyiben barmelyik kepreszletre kattintunk, mely rendelkezik meg a catpart class-al
    $('.catpart').on('click', function () {
        // lekerjuk az elforgatasra mertekere vonatkozo valtozot (melyik iranyba, hanyszor forgattuk el az elemet 90 fokkal). mivel ez egy szam, ezert be kell szorozni 90-el es hozzaadni 90-et, hogy tenylegesen elforgassuk kattintast kovetoen
        let angle = parseInt($(this).attr('rot')) * 90 + 90;
        // beallitjuk az uj elforgatasi szoget
        $(this).css({
            transform: 'rotate(' + angle + 'deg)'
        });
        // beallitjuk az elforgatas mertekere vonatkozo uj erteket
        $(this).attr('rot', (angle / 90));

        // ha nincs elforgatas a kepen vagy teljesen elforgattuk
        if (angle === 0 || angle === 360) {
            // vegyuk le az elemrol a kattintas esemenyt
            $(this).off('click');
            // ne is tartozzon azok koze az elemek koze, amit vizsgalunk tovabb
            $(this).removeClass("catpart");
            // noveljuk meg a helyen levo elemek szamat
            rpos_num += 1;
            // vizualisan is frissitsuk ezt a szamot
            $('#clicks').text(rpos_num);
        }

    });
});


function setImageParts() {
    // menjunk vegig a kepreszleteket tartalmazo tombon ugy, hogy soronkent rajzoljuk az elemeket
    for (let r = 0; r < parts.length / 2; r++) {
        get_image_part(r);
    }

}


function get_image_part(act_row) {
    // mivel egy sorban csak ket elem lesz, igy csak az elemek szamanak feleig megyunk
    for (let j = 0; j < parts.length / 2; j++) {
        // letrehozunk egy DIV-et a kep befoglalasara
        let img_part = $('<div>');
        // hozzaadjuk a jatekterhez
        img_part.appendTo(game_area);
        // bepozicionaljuk az aktualis kepet es megjelenitjuk
        img_part.css({
            left: j * offset,
            top: act_row * offset,
            backgroundImage: "url(" + parts[parts.length / 2 * act_row + j].src + ")",
            width: offset,
            height: offset,
            position: 'absolute'
        });
        // hozzadjuk a catpart class-t, hogy konnyen elerjuk az elemeket
        img_part.addClass('catpart');
        // letrehozunk egy attributumot is, melyet arra fogunk hasznalni, hogy megnezzuk, helyen van-e az elem
        img_part.attr('rot', "0");
    }
}


function random_rotate(image) {
    // generalunk veletlenszeruen egy szamot 1 es 3 kozott. azert ebben az intervallumban, mert 4 elem van a kepek tombjeben, de mindenkeppen szeretnek valamekkora elforgatottsagot hozzarendelni a kepreszlethez
    let degree = Math.floor(Math.random() * 3) + 1;
    // 50% eséllyel beszorozzuk a kapott erteket -1-gyel azért, hogy ne csak egy iranyba forgassuk a kepeket
    degree *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    // elforgatjuk az elemet a kapott szam * 90-el, hogy tenylegesen elforgatott legyen
    image.css({
        transform: 'rotate(' + degree * 90 + 'deg)'
    });
    // letaroljuk egy attributumban, hogy milyen mertekben forgattuk el a kepet. ez fontos annak a vizsgalatahoz, hogy az a helyere kerult-e
    image.attr('rot', degree);
}
