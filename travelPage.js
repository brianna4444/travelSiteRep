

let images = {
    cruiseBtn: 24,
    jamaicaBtn: 3,
    mexicoBtn: 3,
    haitiBtn: 3,
    dominicanRepublicBtn: 3
};


function moveSlow(id,time) {
    $('html,body').animate({
        scrollTop: $(id).offset().top
    }, time);
    }



    $(document).ready(function() {

        $("#cruiseBtn").css("backgroundColor", "orange");
        let div = $("#imgSection");
        div.html("Coming Soon");
        /*
        let folder = "images/cruiseBtn";
        let number= images.cruiseBtn;
        for (let i = 1; i <= number; i++) {
            let modalImg = folder + "/" + i + ".jpg";
            div.append("<img onclick=\"showModal(\'" + modalImg + "\')\" id= '" + i + "' class='destinationImages' src='" + folder + "/" + i + ".jpg" + "'>");



        }
        */

    });

function addGallery(id) {

    let child = $('#destinationButtons').children();

    for (let i = 0; i < child.length; i++) {
        child.css('background-color', 'rgb(48,48,48)');
    }


    $('#' + id).css("background-color", "orange");
    imageGallery(id);

}


function imageGallery (id) {

    $("#imgSection").html("Coming Soon");
  /*  let number = images[id];
    let folder = "images/" + id;

    for (let i = 1; i <= number; i++) {
        let modalImg = folder + "/" + i + ".jpg";
        $("#imgSection").append("<img onclick=\"showModal(\'" + modalImg + "\')\" id= '" + i + "' class='destinationImages' src='" + folder + "/" + i + ".jpg" + "'>");


    }
    */
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
   /* $.getJSON("data.json", function(data){
        $.each( data, function(key,val){
            items.push(val);

        })
console.log(items);

    })
    */

    $.ajax({
        type: 'GET',
        url: "data.json",
        beforeSend: function(request) {
            request.setRequestHeader(" Access-Control-Request-Headers", "x-requested-with");
        }

    }).done(function(data) {
        $.each( data, function(key,val){
            items.push(val);

        })
    });

}
loadData();

let reviews=[];
let stories= [];



function getData(){
    $.getJSON("reviewData.json", function(data) {
        $.each(data, function (key, val) {
            reviews.push(val);

        })

        console.log(reviews);
        changeReview(reviews);
        addReviewInfo(reviews[0].name, reviews[0].text);
    })
        $.getJSON("storyData", function(data){
            $.each( data, function(key,val){
                stories.push(val);

            })


        console.log(stories);
        changeStory(stories);
        addStoryInfo(stories[0].title, stories[0].text, stories[0].image)
});
}

getData();


function changeReview(arr) {
    let div= $('#circle');
    for (let i=0; i< arr.length; i++){

        let circle= document.createElement("i");
        circle.className="fa fa-circle btn navDots";
        circle.onclick= function(){ addReviewInfo(reviews[i].name, reviews[i].text)};
        div.append(circle);

    }
}




function addReviewInfo(name, text) {
    $('#nameClient').empty();
    $('#reviewClient').empty();
    $('#nameClient').append(name);
    $('#reviewClient').append(text);
}

function changeStory(arr) {
    let dotsDiv= $('#dots');
    for (let i=0; i< arr.length; i++){

        let circle= document.createElement("i");
        circle.className="fa fa-circle btn navDots";
        circle.onclick= function(){ addStoryInfo(stories[i].title, stories[i].text, stories[i].image)};
        dotsDiv.append(circle);

    }



}

function addStoryInfo(title, text, image){
$('#title').empty();
$('#story').empty();
$('#title').append(title);
$('#story').append(text);
$('.infoSection').css("background", "url(" + image+ ") no-repeat center center");

}
