

let images = {
    cruiseBtn: 3,
    jamaicaBtn: 3,
    mexicoBtn: 3,
    haitiBtn: 3
};


function moveSlow(id,time) {
    $('html,body').animate({
        scrollTop: $(id).offset().top
    }, time);
    }



function addGallery(id) {

    let child = $('#destinationButtons').children();

    for (let i = 0; i < child.length; i++) {
        child.css('background-color', 'rgb(48,48,48)');
    }


    $('#' + id).css("background-color", "orange");
    imageGallery(id);
}
function imageGallery (id) {
    $("#imgSection").html("");
    let number = images[id];
    let folder = "images/" + id;

    for (let i = 1; i <= number; i++) {
        let modalImg = folder + "/" + i + ".jpg";
        $("#imgSection").append("<img onclick=\"showModal(\'" + modalImg + "\')\" id= '" + i + "' class='destinationImages' src='" + folder + "/" + i + ".jpg" + "'>");


    }
}
function showModal(modalImg){
$('#modal').css("display", "block");
$('#modalImage').attr("src", modalImg);
}

function hideModal(){
    $('#modal').css("display", "none");
}



function changeInfo(id) {
    let img= "/images/galleryPics/" + id + ".jpg";
    let information= "/images/galleryInfo/" + id;
('#info').backgroundImage(img);
('#info').text(information);
}
