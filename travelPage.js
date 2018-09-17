

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


    /*let img = $('#');
    let modalImg = $('.destinationImages');

    img.onclick = function () {
        $('.modal').style.display = "block";
        modalImg.src = this.src;
    }

    $('.close').onclick = function () {
        $('.modal').style.display = "none";
    }

*/



    /*let galleryImages= ''+
        '<div class="row">'+
            '<div class= "col-3"><img src="images/cruise:roomNumber"></div>'+
            '<div class= "col-3"><img src="images/cruise:bathroom1"></div>'+
           ' <div class= "col-3"><img src="images/"></div>'+
            '<div class= "col-3"><img src="images/"></div>'+
        '</div>';
        /*<div class="row">
            <div class= "col-3"><img src="images/"></div>
            <div class= "col-3"><img src="images/"></div>
            <div class= "col-3"><img src="images/"></div>
            <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
            <div class= "col-3"><img src="images/"></div>
            <div class= "col-3"><img src="images/"></div>
            <div class= "col-3"><img src="images/"></div>
            <div class= "col-3"><img src="images/"></div>
         </div>
    '
        ;*/

    //$('#imgSection').html(cruiseImgs);


/*
function jamaicaImages(){
    let destinationButtons= $('# destinationButtons');
    destinationButtons.style.backgroundColor= "rgb(48,48,48)";
    let jamaicaButton= $('#jamaicaButton');
    jamaicaButton.style.backgroundColor="orange";

    let jamaicaImgs= "
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
    "
    ;

    $(#imgSection).html(jamaicaImgs);

}

function mexicoImages(){
    let destinationButtons= $('# destinationButtons');
    destinationButtons.style.backgroundColor= "rgb(48,48,48)";
    let mexicoButton= $('#mexicoButton');
    mexicoButton.style.backgroundColor="orange";
    let mexicoImgs= "
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
    "
    ;

    $(#imgSection).html(mexicoImgs);

}

function haitiImages(){
    let destinationButtons= $('#destinationButtons');
    destinationButtons.style.backgroundColor= "rgb(48,48,48)";
    let haitiButton= $('#haitiButton');
    haitiButton.style.backgroundColor="orange";
    let haitiImgs= "
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
        <div class="row">
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        <div class= "col-3"><img src="images/"></div>
        </div>
    "
    ;

    $(#imgSection).html(haitiImgs);



let tripCounter=1;
function previousTripButton(){

    let previousBtn= document.createElement("button");
    previousBtn.id= "currentTrip" + tripCounter;


    function onclick(){
        previousBtn.id= "currentTrip" + tripCounter-1;
        $(#info).html();
    }

}


function nextTripButton(){

    let nextBtn= document.createElement("button");
    nextBtn.id= "currentTrip" + tripCounter;


    function onclick(){
        nextBtn.id= "currentTrip" + tripCounter+1;
        $(#info).html();
    }

}

let reviewCounter=1;
function previousReviewButton(){

    let previousBtn= document.createElement("button");
    previousBtn.id= "currentReview" + reviewCounter;


    function onclick(){
        previousBtn.id= "currentReview" + reviewCounter-1;
        $(#info).html();
    }

}


function nextReviewButton(){

    let nextBtn= document.createElement("button");
    nextBtn.id= "currentReview" + reviewCounter;


    function onclick(){
        nextBtn.id= "currentTrip" + reviewCounter+1;
        $(#info).html();
    }

}


}*/