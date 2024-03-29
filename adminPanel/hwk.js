let app = angular.module("AngApp", []);
//let url = "http://tactravels.com:3000";
let url = "localhost:3000";


function urltoFile(url, filename, mimeType) {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, {type: mimeType});
            })
    );
}

let globalCollection = "";
let globalCity = "";
let globalAlbumId = "";

app.controller("AngContr", function ($scope, request, $rootScope) {




    $scope.albumTab = false;
    $scope.storyTab = false;
    $scope.reviewTab = false;
    $scope.aboutTab = false;
    $scope.contactTab = false;
    $scope.rightBar = false;


    $scope.showAlbum = false;
    $scope.showModule = false;

    $scope.albums = [];
    $scope.number;
    $scope.newObj = {name: "", image: ""};


    $scope.cities = [];
    $scope.collection = "";
    $scope.stories = [];
    $scope.title = "";
    $scope.story = {};
    $scope.reviews = [];
    $scope.reviewIndex = 0;
    $scope.review = {};
    $scope.about = {};
    $scope.contact = {};
    $scope.albumIndex=0;
    $scope.albumName="";
    $scope.modal = false;
    $scope.albumModal = false;
    $scope.cityModal = false;

    $scope.deleteModal = false;


    $scope.newReview = {};
    $scope.newStory = {};
    $scope.newAlbum = "";
    $scope.newCity = {};

    $scope.imageBar = false;
    $scope.city = {};


    $scope.goBack = function () {
        if ($scope.showAlbum === true) {
            $scope.showAlbum = false
        }
    }


    $scope.showAlbums = function () {

        request.albumRequest( function (data) {

                $scope.albums=data;



        })
    }

    $scope.showImageModule = function (index) {
        $scope.showModule = true;
        $scope.newObj.image = $scope.albums[index].image;
        $scope.newObj.name = $scope.albums[index].name;
        $scope.number = index;

    }


    $scope.saveName = function () {
        $scope.albums[$scope.number].name = $scope.newObj.name;
    }


    $scope.findImages = function (collection) {
        globalCollection = collection;
        $scope.collection = collection;
        request.collectionRequest(collection, function (data) {
            $scope.cities = data;
            $scope.rightBar = true;
            $scope.imageBar = false;
        })


    }


    $scope.saveCityData = function (name, image, id) {  //function that called by click "save"
        let strImage = image;
        let filename = "image";
        let collection = $scope.collection;
        urltoFile(strImage, filename).then(function (imageFile) {
            request.updateAlbum(imageFile, name, id, collection);
        });
        alert("Changes saved!");
    }

    $scope.storeImage = "";


    $scope.showAlbumsTab = function () {
        $scope.showAlbums();
        $scope.storyTab = false;
        $scope.albumTab = true;
        $scope.reviewTab = false;
        $scope.aboutTab = false;
        $scope.contactTab = false;
        $scope.modal = false;
    }

    $scope.showStoriesTab = function () {
        $scope.findStory();
        $scope.albumTab = false;
        $scope.storyTab = true;
        $scope.reviewTab = false;
        $scope.aboutTab = false;
        $scope.contactTab = false;
        $scope.modal = false;
    }

    $scope.findStory = function () {

        request.storyRequest(function (data) {
            $scope.stories = data;


        })
    }

    $scope.showStory = function (story) {
        $scope.story = story;
        $scope.rightBar = true;

    }

    $scope.saveStoryData = function (id, title, text, image) {
        let strImage = image;
        let filename = "image";

        urltoFile(strImage, filename).then(function (imageFile) {
            request.updateStory(imageFile, id, title, text, $scope.showStoriesTab);


        });
    }


    $scope.showReviewsTab = function () {
        $scope.findReview();
        $scope.albumTab = false;
        $scope.storyTab = false;
        $scope.reviewTab = true;
        $scope.aboutTab = false;
        $scope.contactTab = false;
        $scope.modal = false;

    }


    $scope.findReview = function () {
        request.reviewRequest(function (data) {
            $scope.reviews = data;


        })
    }

    $scope.showReview = function (review, index) {
        $scope.review = review;
        $scope.reviewIndex = index;
        $scope.rightBar = true;
    }


    $scope.saveReviewData = function (id, name, text) {
        request.updateReview(id, name, text);
        $scope.showReviewsTab();

    }


    $scope.showAboutTab = function () {
        $scope.findAbout();
        $scope.albumTab = false;
        $scope.storyTab = false;
        $scope.reviewTab = false;
        $scope.contactTab = false;
        $scope.aboutTab = true;
        $scope.modal = false;
    }

    $scope.findAbout = function () {
        request.aboutRequest(function (data) {
            $scope.about = data[0];
        })
    }


    $scope.saveAboutData = function (id, name, image, text, mission) {
        let strImage = image;
        let filename = "image";

        urltoFile(strImage, filename).then(function (imageFile) {
            request.updateAbout(id, name, imageFile, text, mission);

        });
    };


    $scope.showContactTab = function () {
        $scope.findContact();
        $scope.albumTab = false;
        $scope.storyTab = false;
        $scope.reviewTab = false;
        $scope.aboutTab = false;
        $scope.contactTab = true;
        $scope.modal = false;
    };


    $scope.findContact = function () {
        request.contactRequest(function (data) {
            $scope.contact = data[0];


        })
    };


    $scope.saveContactData = function (id, facebook, email, phone) {
        request.updateContact(id, facebook, email, phone);


    }


    $scope.addReview = function () {
        $scope.modal = true;

    }
    $scope.saveNewReview = function (name, text) {
        request.addNewReview(name, text, $scope.showReviewsTab);

        $scope.modal = false;
    }

    $scope.delete = function (index) {
        $scope.albumIndex= index;
        $scope.deleteModal = true;



    }

    $scope.deleteReview = function (id) {
        $scope.deleteModal = false;
        request.deleteReview(id);
        $scope.reviews.splice($scope.reviewIndex, 1);
        $scope.rightBar = false;


    }

    $scope.addStory = function () {
        $scope.modal = true;
    }
    $scope.saveNewStory = function (title, text, image) {

        let strImage = image;
        let filename = "image";

        urltoFile(strImage, filename).then(function (imageFile) {
            request.addNewStory(title, text, imageFile, $scope.showStoriesTab);

        });


        $scope.showStoriesTab();

        $scope.modal = false;


    }
    $scope.deleteStory = function (id) {
        $scope.deleteModal = false;
        $scope.rightBar = false;
        request.deleteStory(id);
        $scope.showStoriesTab();

    }

    $scope.addAlbum = function () {
        $scope.albumModal = true;
    }
    $scope.saveNewAlbum = function (album) {
        request.addNewAlbum(album, $scope.showAlbumsTab);

        $scope.albumModal = false;
    }
    $scope.deleteAlbum = function () {
        request.deleteAlbum($scope.albums[$scope.albumIndex].collName, $scope.albums[$scope.albumIndex]._id,  $scope.showAlbumsTab);
    $scope.albums.splice($scope.albumIndex, 1);
$scope.deleteModal= false;
    }

    $scope.addCity = function (collection) {
        $scope.collection= collection;
        $scope.cityModal = true;
    }
    $scope.saveNewCity = function (name, cityImage) {
        let strImage = cityImage;
        let filename = "image";
        urltoFile(strImage, filename).then(function (imageFile) {

           request.addNewCity($scope.collection, name, imageFile, $scope.showAlbumsTab)
        });

        $scope.closeModal();
    }
    $scope.deleteCity = function (album, id, index) {
        request.deleteCity(album, id);
        $scope.showAlbumsTab();
        $scope.cities.splice(index, 1);
    }

    $scope.closeModal = function () {
        $scope.modal = false;
        $scope.albumModal = false;
        $scope.cityModal = false;
    }


    $scope.closeDeleteModal = function () {
        $scope.deleteModal = false;

    }


    $scope.showCityImages = function (city, collection, id) {
        globalCity = city.name;
        globalAlbumId = id;
        $scope.imageBar = true;
        $scope.city = city;
        $scope.collection = collection;
        $scope.id = id;
    }


    $rootScope.updateNewImage = function (image) {

        let strImage = image;
        let filename = "image";
        let city = $scope.city.name;
        let collection = $scope.collection;
        let id = $scope.city['_id'];


        urltoFile(strImage, filename).then(function (imageFile) {
            request.updateImages(imageFile, city, collection, id);

        });


    }


    $scope.deleteCityImage = function (collection, id, index) {
        $scope.city.images.splice(index, 1);
        request.deleteCityImage(collection, id, index);
    }

    $scope.updateAlbumName=function(collName, newName){
        request.updateAlbumName(collName, newName);
    }

})