app.factory('request', function ($http) {
    return {
        collectionRequest: function (collection, callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findCity",
                params: {
                    collection: collection
                }
            }).then(function (data) {
                callback(data.data);
            })
        },
        updateAlbum: function (file, name, id, collection) {
            let fd = new FormData();
            fd.append("name", name);
            fd.append('collection', collection);
            fd.append('id', id);
            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/updateAlbum", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },

        updateStory: function (file, id, title, text, callback) {
            let fd = new FormData();
            fd.append("title", title);
            fd.append('text', text);
            fd.append('id', id);
            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/updateStory", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
               // withCredentials: true,
                //headers: {'Content-Type': undefined},
                //transformRequest: angular.identity,
            }).then(function () {
                callback();
            })
        },


        storyRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findStory",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },
        reviewRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findReview",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },

        updateReview: function (id, name, text) {


            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/updateReview?id=" + id + "&name=" + name + "&text=" + text
            })


        },

        aboutRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findAbout",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },

        updateAbout: function (id, name, file, text, mission) {
            let fd = new FormData();
            fd.append('id', id);
            fd.append("name", name);
            fd.append('text', text);
            fd.append("mission", mission);
            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/updateAbout", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },


        contactRequest: function (callback) {
            $http({
                method: "GET",
                url: "http://tactravels.com:3000/findContact",
                params: {}
            }).then(function (data) {
                callback(data.data);

            })

        },

        updateContact: function (id, facebook, email, phone) {

            let fd = {};
            fd["id"] = id;
            fd["facebook"] = facebook;
            fd["email"] = email;
            fd["phone"] = phone;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/updateContact?id=" + id + "&facebook=" + facebook + "&email=" + email + "&phone=" + phone
            })


        },
        addNewStory: function (title, text, file, callback) {
            let fd = new FormData();
            fd.append('title', title);
            fd.append("text", text);

            fd.append("image", file);  //suppose to be last
            $http.post("http://tactravels.com:3000/addNewStory", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                callback();
            });
        },

        addNewCity: function (album, name, file, callback) {
            let fd = new FormData();
            fd.append('album', album);
            fd.append("name", name);

            fd.append("image", file);

            $http.post("http://tactravels.com:3000/addNewCity", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
               callback();
            })
        },

        addNewAlbum: function (album, callback) {



            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/addNewAlbum?album=" + album
            }).then(function(data) {
                callback();
            });


        },

        addNewReview: function (name, text, callback) {


            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/addNewReview?name=" + name + "&text=" + text
            }).then(function (data) {
                callback();
            })


        },

        deleteReview: function (id) {

            let fd = {};

            fd["id"] = id;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteReview?id=" + id
            })


        },

        deleteStory: function (id) {

            let fd = {};

            fd["id"] = id;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteStory?id=" + id
            })


        },

        deleteAlbum: function (collection) {


            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteAlbum?collection=" + collection
            })


        },

        deleteCity: function (album, id) {

            let fd = {};

            fd["album"] = album;
            fd["id"] = id;

            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteCity?id=" + id + "&album=" + album
            })

        },

        updateImages: function (file, city, collection, id) {
            let fd = new FormData();

            fd.append('collection', collection);
            fd.append('city', city);
            fd.append('id', id);
            fd.append("image", file);  //suppose to be last
            $http.post("http://localhost:3000/updateImages", fd, {  //put http://tactravels.com:3000/updateAlbum instead there
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function (data) {
                console.log(data);
            })
        },

    deleteCityImage: function (collection, id, index ) {


            $http({
                method: 'GET',
                url: "http://tactravels.com:3000/deleteCityImage?collection=" + collection + "&id=" + id+ "&index=" + index
            })


    }



    }
});





