

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

let items=[];

function loadData(){
    $.getJSON("data.json", function(data){
        $.each( data, function(key,val){
            items.push(val);

        })
console.log(items);

    })
}
loadData();

let reviews=[];

function getData(){
    $.getJSON("reviewData.json", function(data){
        $.each( data, function(key,val){
            reviews.push(val);

        })
        console.log(reviews);

    })
}
getData();

function changeInfo(n) {
let div= $('#info').html("<h1>" + items[n].header + "</h1>" + "<p>" + items[n].text + "</p>");
let backgroundImg= $('#galleryImage').css("background", "url("+items[n].image+") no-repeat center center")

}

function changeReview(n) {
    $('#nameClient').html("<h1>"+ reviews[n].name + "</h1>");
    $('#reviewClient').html("<p>" + reviews[n].text + "</p>");
}

