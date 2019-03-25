let images = {
    cruiseBtn: 24,
    jamaicaBtn: 3,
    mexicoBtn: 3,
    haitiBtn: 3,
    dominicanRepublicBtn: 3
};

$(document).ready(function () {

    $("#cruiseBtn").css("backgroundColor", "orange");
    let div = $("#imgSection");
    div.html("Coming Soon");


});

function moveSlow(id, time) {
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


function imageGallery(id) {

    $("#imgSection").html("Coming Soon");


    $.ajax({
        type: "GET",
        url: "http://localhost:27017/search",
        data: {
            'collection': id,
            'album':


        },
        success: function (data) {//array of items found
            console.log(data);

            showSearch(data);

        }
    });

    /*  let number = images[id];
      let folder = "images/" + id;

      for (let i = 1; i <= number; i++) {
          let modalImg = folder + "/" + i + ".jpg";
          $("#imgSection").append("<img onclick=\"showModal(\'" + modalImg + "\')\" id= '" + i + "' class='destinationImages' src='" + folder + "/" + i + ".jpg" + "'>");


      }
      */
}

function showSearch(data) {
    for (let i=0; i<=data.length; i++){
    $("#imgSection").append(data[i].name)
   // $("#imgSection").append(onclick=\"showModal(\'" + modalImg + "\')\" id= '" + i + "' class='destinationImages')


    }
}


function showModal(modalImg) {
    $('#modal').css("display", "block");
    $('#modalImage').attr("src", modalImg);
}

function hideModal() {
    $('#modal').css("display", "none");
}

let items = [];

function loadData() {
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
        beforeSend: function (request) {
            request.setRequestHeader(" Access-Control-Request-Headers", "x-requested-with");
        }

    }).done(function (data) {
        $.each(data, function (key, val) {
            items.push(val);

        })
    });

}

loadData();

let reviews = [];
let stories = [];


function getData() {
    $.getJSON("reviewData.json", function (data) {
        $.each(data, function (key, val) {
            reviews.push(val);

        });

        console.log(reviews);
        changeReview(reviews);
        addReviewInfo(reviews[0].name, reviews[0].text);
    })
    $.getJSON("storyData", function (data) {
        $.each(data, function (key, val) {
            stories.push(val);

        });


        //console.log(stories);
        changeStory(stories);
        addStoryInfo(stories[0].title, stories[0].text, stories[0].image);
        choseDot(0);
    });
}

getData();


function changeReview(arr) {
    let div = $('#circle');
    for (let i = 0; i < arr.length; i++) {

        let circle = document.createElement("i");
        circle.className = "fa fa-circle btn navDots";
        circle.onclick = function () {
            addReviewInfo(reviews[i].name, reviews[i].text)
        };
        div.append(circle);

    }
}


function addReviewInfo(name, text) {
    $('#nameClient').empty();
    $('#reviewClient').empty();
    $('#nameClient').append(name);
    $('#reviewClient').append(text);
}

function choseDot(num) {
    let dots = $('#dots').children();           //chose all dots, which are child of #dots
    for (let i = 0; i < dots.length; i++) {                //remove all orange dots
        dots[i].classList.remove('chosenDot');
    }
    let dot = dots[num];        //chose necessary dot
    dot.classList.add('chosenDot');     //make it orange
}

function changeStory(arr) {
    let dotsDiv = $('#dots');
    for (let i = 0; i < arr.length; i++) {
        let circle = document.createElement("i");
        circle.className = "fa fa-circle btn navDots";
        circle.onclick = function () {
            addStoryInfo(stories[i].title, stories[i].text, stories[i].image);
            choseDot(i);
        };
        dotsDiv.append(circle);

    }


}

function setListeneers() {
    $('#story').hover(function () {
        let status = $(this).css('overflow-y');
        if (status == "auto") {
            $(this).css('overflow-y', 'hidden');
        } else {
            $(this).css('overflow-y', 'auto');
        }
    });
};

function addStoryInfo(title, text, image) {
    $('#story').fadeOut("slow", function () {
        $('#story').empty();
        $('#story').append(text);
        $('#story').fadeIn("slow", function () {

        });
    });
    $('#title').fadeOut("slow", function () {
        $('#title').empty();
        $('#title').append(title);
        $('#title').fadeIn("slow", function () {

        });
    });
    let back = $('.infoSection');
    back.addClass('hideBackground');
    back.css("background", "url(" + image + ")");
}

setListeneers();
