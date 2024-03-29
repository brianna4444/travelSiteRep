let url= "https://tactravels.com:3000";

function moveSlow(id, time) {
    $('html,body').animate({
        scrollTop: $(id).offset().top
    }, time);
}


function addGallery(collName) {

    $.ajax({
        type: "GET",
        url: url + "/findCity",
        data: {
            'collection': collName


        },
        success: function (data) {

            showCityCard(data, collName);

        }
    });






    let child = $('#destinationButtons').children();

    for (let i = 0; i < child.length; i++) {
        child.css('background-color', 'rgb(48,48,48)');
    }


    $('#' + collName).css("background-color", "orange");
    findCity(collName);

}


function findCity(id) {

    $("#imgSection").html("Coming Soon");


    $.ajax({
        type: "GET",
        url: url + "/findCity",
        data: {
            'collection': id


        },
        success: function (data) {//array of items found

           showCityCard(data, id);

        }
    });

}

function showCityCard(data, id) {
    let listDiv= $("#imgSection");
    listDiv.empty();
    listDiv.className = "list row";

    for (let i=0; i<data.length; i++){
        let div= document.createElement("div");
        div.className= " col-md-4 pt-2 pl-2 pr-2";
        let cardDiv= document.createElement("div");
        cardDiv.className= "card h-100 w-100 imageBox animated fadeIn delay-0.5s";
        let imgPart= document.createElement("img");
        cardDiv.append(imgPart);
        imgPart.className= "card-img-top img-fluid";
        let image= data[i].cityImage;
        imgPart.append(image);
        imgPart.src=image;
        imgPart.alt= "Card Image";
        let bodyPart= document.createElement("div");
        bodyPart.className= "card-body text-center";
        cardDiv.append(bodyPart);
        let cardTitlePart= document.createElement("h");
        bodyPart.append(cardTitlePart);
        cardTitlePart.className= "card-title";
        let cityName= data[i].name;
        cardTitlePart.append(cityName + " Photos");


        cardDiv.onclick= function(){
            findImages(cityName, id);
        };

    div.appendChild(cardDiv);
    listDiv[0].appendChild(div);
    }
}

function showDestinationBtns(){
    let listDiv= $("#destinationButtons");
    for (let i=0; i<albums.length; i++){
        let button= document.createElement("button");
        button.className= "destinationBtn buttonHoverEffect";
        button.onclick = function () {
            addGallery(albums[i].collName);
            button.setAttribute("style", "background-color: orange;");
        };

        button.innerHTML= albums[i].name;
        listDiv.append(button);
    }

}



function findImages(cityName, id) {
    $.ajax({
        type: "GET",
        url: url + "/findImages",
        data: {
            'collection': id,
            'album': cityName


        },
        success: function (data) {//array of items found
            showImages(data[0]);


        }
    });

}

function showImages(data){
    let listDiv= $("#imgSection");
    listDiv.empty();
    listDiv.className = "list row";

    for (let i=0; i<data.images.length; i++){
        let div= document.createElement("div");
        div.className= "col-md-3 pt-2 pl-2 pr-2";
        let imgDiv= document.createElement("div");
        imgDiv.className= "card h-100 w-100";
       let img= document.createElement("img");
        img.className= "image img-fluid";
        imgDiv.append(img);
        let image= data.images[i];
        img.src=image;
        img.alt= "Image";
        img.onclick= function(){

            showModal(image)};
        listDiv[0].appendChild(div);
        div.appendChild(imgDiv);


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
let about={};



    let albums = [];


    function getData() {


        $.ajax({
            type: 'GET',
            url: url + "/findReview",
            success: function (data) {
                $.each(data, function (key, val) {
                    reviews.push(val);

                });

                changeReview(reviews);
                addReviewInfo(reviews[0].name, reviews[0].text);
                choseNavDot(0);
            }
        })

        $.ajax({
            type: 'GET',
            url: url + "/findStory",
            success: function (data) {
                $.each(data, function (key, val) {
                    stories.push(val);

                })
                changeStory(stories);
                addStoryInfo(stories[0].title, stories[0].text, stories[0].image);
                choseDot(0);
            }
        })

        $.ajax({
            type: 'GET',
            url: url + "/findAbout",
            success: function (data) {

                showAbout(data[0].name, data[0].image, data[0].text, data[0].mission);

            }
        })


        $.ajax({
            type: 'GET',
            url: url + "/findContact",
            success: function (data) {

                showContact(data[0].facebook, data[0].email, data[0].phone);

            }
        })

        $.ajax({
            type: 'GET',
            url: url + "/findAlbums",
            success: function (data) {
                $.each(data, function (key,val){
                    albums.push(val);
})

                showDestinationBtns();
                let divBtns= document.getElementById("destinationButtons");
                let albumBtns= divBtns.childNodes;
                let firstBtn= albumBtns[1];

                addGallery(albums[0].collName);

                firstBtn.setAttribute("style", "background-color: orange;");
                console.log(firstBtn);
            }

        })
    }

        getData();


        function changeReview(arr) {
            let div = $('#circle');
            for (let i = 0; i < arr.length; i++) {

                let circle = document.createElement("i");
                circle.className = "fa fa-circle btn navDots";

                circle.onclick = function () {
                    addReviewInfo(reviews[i].name, reviews[i].text);
                    choseNavDot(i);
                };
                div.append(circle);

            }
        }


        function addReviewInfo(name, text) {

            $('#nameClient').fadeOut("slow", function () {
                $('#nameClient').empty();
                $('#nameClient').append(name);
                $('#nameClient').fadeIn("slow", function () {

                });
            });

            $('#reviewClient').fadeOut("slow", function () {
                $('#reviewClient').empty();
                $('#reviewClient').append(text);
                $('#reviewClient').fadeIn("slow", function () {

                });
            });
        }


        function choseDot(num) {
            let dots = $('#dots').children();           //chose all dots, which are child of #dots
            for (let i = 0; i < dots.length; i++) {                //remove all orange dots
                dots[i].classList.remove('chosenDot');
            }
            let dot = dots[num];        //chose necessary dot
            dot.classList.add('chosenDot');     //make it orange
        }

        function choseNavDot(num) {
            let dots = $('#circle').children();           //chose all dots, which are child of #dots
            for (let i = 0; i < dots.length; i++) {                //remove all orange dots
                dots[i].classList.remove('chosenNavDot');
            }
            let dot = dots[num];        //chose necessary dot
            dot.classList.add('chosenNavDot');     //make it orange
        }


        function changeStory(arr) {
            let dotsDiv = $('#dots');
            for (let i = 0; i < arr.length; i++) {
                let circle = document.createElement("i");
                circle.className = "fa fa-circle btn navDots";
                circle.onclick = function () {
                    addStoryInfo(stories[i].title, stories[i].text, stories[i].image);
                    choseDot(i);
                    $('#story').scrollTop(0);
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


        function showAbout(name, image, text, mission) {


            $('#mission').text(mission);
            $('#nameImage').attr("src", image);
            $('#name').text(name);
            $('#text').text(text);
        }


        function showContact(facebook, email, phone) {


            $('#facebook').text(facebook);
            $('#email').text(email);
            $('#phone').text(phone);
        }

        function sendMessage() {
            let firstName = $('#form_name').val();
            let lastName = $('#form_lastname').val();
            let email = $('#form_email').val();
            let phone = $('#form_tel').val();
            let message = $('#form_message').val();
            $.ajax({
                type: "GET",
                url: url + "/postMessage",
                data: {
                    'collection': "contactFormMessages",
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': email,
                    'phone': phone,
                    'message': message

                },
                success: function (data) {
                    alert("Message Sent");
                    $('.buttonSend').attr("disabled")
                }

            })

        }


