$(document).ready(function() {
    $("#description").append("Forrás: PCGURU.");

    $(".weapon")
        .css({'font-weight' : 'bold'})
        .each(function() {
            var txt = $(this).text();
            var txt_new = '"' + txt + '"';
            $(this).text(txt_new);
        });

    $("#field").css({'background-color' : '#85ab7e'});

    $("#hide").click(function() {
        $("#cat").hide();
    });

    $("#show").click(function() {
        $("#cat").show();
    });

    $("#jump").click(function() {
        $("#cat")
            .animate({top: "-=100"}, 200)
            .animate({top: "+=100"}, 200);
    });

    $("#buttons").append('<div id="exchange" class="button">Csere</div>');

    $("#exchange").on('click', firstClick)

    function firstClick() {
        // console.log("First Clicked");
        $("#cat").attr('src', 'cat12.png');
        $("#exchange").off('click').on('click', secondClick)
    }

    function secondClick() {
        // console.log("Second Clicked");
        $("#cat").attr('src', 'cat123.png');
        $("#exchange").off('click').on('click', thirdClick)
    }

    function thirdClick() {
        // console.log("Second Clicked");
        $("#cat").attr('src', 'cat1234.png');
        $("#exchange").off('click').on('click', firstClick)
    }
});